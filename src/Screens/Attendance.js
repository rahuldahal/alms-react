import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Button, DatePicker, Space, Table } from "antd";
import { attendancesColumnPrincipal } from "../constants/tableColumns";
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
  const [filteredData, setFilteredData] = useState([]);
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

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const handleDateFilter = (date) => {
    if (date === null) {
      return setFilteredData([]);
    }

    const filteredData = data.filter((record) => {
      const recordDate = record.date.split("T")[0];
      const valueOfDate = new Date(date).valueOf();
      const valueOfRecord = new Date(recordDate).valueOf();

      return valueOfDate === valueOfRecord;
    });

    setFilteredData(filteredData);
  };

  const attendancesColumnCommon = [
    {
      title: "Student",
      children: [
        {
          title: "FullName",
          dataIndex: "student",
          render: (student) => student?.user?.fullName,
        },
        {
          title: "Email",
          dataIndex: "student",
          render: (student) => student?.user?.email,
        },
        {
          title: "Batch",
          dataIndex: "student",
          render: (student) => student?.batch,
        },
      ],
    },
    {
      title: "Attendance",
      children: [
        {
          title: "Date",
          dataIndex: "date",
          render: (date) => date.split("T")[0],
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
            <>
              <DatePicker
                // format={"DD-MM-YY"}
                onChange={(e) => {
                  setSelectedKeys([e.format("YYYY-MM-DD")]);
                }}
                allowClear={false}
              />
              <Space>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    handleDateFilter(selectedKeys[0]);
                    confirm({ closeDropdown: true });
                  }}
                >
                  Filter
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    handleDateFilter(null);
                    clearFilters();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </>
          ),
        },
        {
          title: "Status",
          dataIndex: "isPresent",
          render: (isPresent) =>
            isPresent ? (
              <span className="color-green">Present</span>
            ) : (
              <span className="color-red">Absent</span>
            ),
          filters: [
            {
              text: "Present",
              value: true,
            },
            {
              text: "Absent",
              value: false,
            },
          ],
          onFilter: (value, record) => record.isPresent === value,
        },
      ],
    },
  ];

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
          dataSource={filteredData.length ? filteredData : data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </section>
    </Wrapper>
  );
}
