import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Button, Table } from "antd";
import { getAllStudents } from "../services/students";
import {
  studentsColumnCommon,
  studentsColumnPrincipalAction,
} from "../constants/tableColumns";
import DashboardNav from "../components/DashboardNav";
import { ReloadOutlined } from "@ant-design/icons";

export default function Students() {
  // states
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchData = async (params = {}) => {
    setLoading(true);
    const { students, total } = await getAllStudents();

    setData(students);
    setLoading(false);
    setPagination({
      ...params.pagination,
      total,
    });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  return (
    <Wrapper className="flex dashboard">
      <DashboardNav />

      <section className="flex flex-column items-end">
        <Button
          icon={<ReloadOutlined />}
          className="btn mb-2"
          onClick={fetchData}
        >
          Refresh
        </Button>
        <Table
          className="w-100"
          bordered
          columns={[...studentsColumnCommon, ...studentsColumnPrincipalAction]}
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </section>
    </Wrapper>
  );
}
