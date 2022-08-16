import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Table } from "antd";
import { subjectsColumn } from "../constants/tableColumns";
import DashboardNav from "../components/DashboardNav";
import { getTeacherByUserId } from "../services/teachers";
import useAuth from "../hooks/useAuth";

export default function Subjects() {
  const { auth } = useAuth();
  const { userId } = auth;

  // states
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchData = async (params = {}) => {
    setLoading(true);
    const { teacher } = await getTeacherByUserId({ userId });
    const { subjects } = teacher;

    setData(subjects);
    setLoading(false);
    setPagination({
      ...params.pagination,
      total: subjects?.length || 0,
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
      <section>
        <Table
          bordered
          columns={subjectsColumn}
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
