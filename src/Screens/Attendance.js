import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Table } from "antd";
import { attendancesColumn } from "../constants/tableColumns";
import DashboardNav from "../components/DashboardNav";
import {
  getAllAttendances,
  getAttendancesOfSubject,
} from "../services/attendances";
import { useSearchParams } from "react-router-dom";

export default function Attendance() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");

  // states
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const fetchData = async (params = {}) => {
    setLoading(true);
    const { attendances, total } = subject
      ? await getAttendancesOfSubject({ subject })
      : await getAllAttendances();

    setData(attendances);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

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

      <section>
        <Table
          bordered
          columns={attendancesColumn}
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
