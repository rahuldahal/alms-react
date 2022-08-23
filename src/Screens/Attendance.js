import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Table } from "antd";
import {
  attendancesColumnCommon,
  attendancesColumnPrincipal,
} from "../constants/tableColumns";
import DashboardNav, { getItem, MenuLink } from "../components/DashboardNav";
import {
  getAllAttendances,
  getAttendancesOfSubject,
} from "../services/attendances";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Title from "../components/Title";

export default function Attendance() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");

  const { auth } = useAuth();
  const { role } = auth;

  const isTeacher = role === "TEACHER";

  // states
  const [data, setData] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (!subject || !data.length) {
      return;
    }

    setNavItems([
      getItem(
        <MenuLink to={`/subjects`} label="View Subjects" />,
        "viewSubjects",
        null
      ),
    ]);
  }, [data]);

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
      <DashboardNav navItems={navItems} />

      <section>
        {isTeacher && data.length ? (
          <Title level={2}>Subject: {data[0].subject.name}</Title>
        ) : null}
        <Table
          bordered
          columns={
            isTeacher
              ? attendancesColumnCommon
              : [...attendancesColumnCommon, ...attendancesColumnPrincipal]
          }
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
