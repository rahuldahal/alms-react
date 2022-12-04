import { Table } from "antd";
import useData from "../hooks/useData";
import Wrapper from "../components/Wrapper";
import React, { useEffect, useState } from "react";
import { getAllStudents } from "../services/students";
import DashboardNav from "../components/DashboardNav";
import { studentsColumnCommon } from "../constants/tableColumns";

export default function Students() {
  // states
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data, setData } = useData();

  const fetchData = async (params = {}) => {
    setLoading(true);
    const { students, total } = await getAllStudents();

    setData((previousState) => ({ ...previousState, students }));
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
        <Table
          className="w-100"
          bordered
          columns={[...studentsColumnCommon]}
          rowKey={(record) => record._id}
          dataSource={data.students}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </section>
    </Wrapper>
  );
}
