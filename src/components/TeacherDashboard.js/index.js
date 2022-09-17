import Title from "../Title";
import Wrapper from "../Wrapper";
import useData from "../../hooks/useData";
import { getISODateOnly } from "../../utils/date";
import { SearchOutlined } from "@ant-design/icons";
import DashboardNav, { getItem } from "../DashboardNav";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Input, Space, Table } from "antd";
import { getAttendancesOfSubject } from "../../services/attendances";

export function getTeacherDashboardNav(subjects) {
  return subjects?.map(({ _id, name: subjectName, course, semester }) =>
    getItem(subjectName, subjectName, null, [
      getItem(
        <Link to={`/attendances?subject=${_id}`} type="primary">
          View Attendance
        </Link>,
        "viewAttendance",
        null
      ),
      getItem(
        <Link
          to={`/subjects/students?course=${course._id}&semester=${semester}`}
          state={{ data: { subjectName, subjectId: _id } }}
          type="primary"
        >
          Create Attendance
        </Link>,
        "createAttendance",
        null
      ),
    ])
  );
}

export default function TeacherDashboard() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");

  const { data, setData } = useData();

  // states
  const [filteredData, setFilteredData] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const searchInput = useRef(null);

  useEffect(() => {
    const teacherNavItems = getTeacherDashboardNav(data.subjects);

    return setNavItems(teacherNavItems);
  }, [data.attendances]);

  const fetchData = async (date = "2022-08-29", params = {}) => {
    setLoading(true);
    const { attendances, total } = await getAttendancesOfSubject({
      subject,
      date, // TODO: change this to empty string before comitting
    });

    setData((previousState) => ({ ...previousState, attendances }));
    setLoading(false);
    setPagination({
      ...params.pagination,
      total,
    });
  };

  useEffect(() => {
    fetchData(getISODateOnly());
  }, []);

  const handleDateFilter = (_, dateString) => {
    fetchData(dateString);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === null) {
      return setFilteredData([]);
    }

    const filteredData = data.attendances.filter((record) =>
      record.student.user.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredData);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            handleSearch(selectedKeys[0]);
            confirm({ closeDropdown: true });
          }}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSearch(selectedKeys[0]);
              confirm({ closeDropdown: true });
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleSearch(null);
              clearFilters({ closeDropdown: true });
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const attendancesColumnCommon = [
    {
      title: "Student",
      children: [
        {
          title: "Full Name",
          dataIndex: "student",
          render: (student) => student?.user?.fullName,
          ...getColumnSearchProps("name"),
        },
        {
          title: "Semester",
          dataIndex: "student",
          render: (student) => student?.semester,
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
        {data.attendances?.length ? (
          <Title level={2} className="brand-text">
            Subject: {data.attendances[0].subject.name}
          </Title>
        ) : null}
        <div className="flex flex-column items-end">
          <DatePicker className="mb-2" onChange={handleDateFilter} />
          <Table
            className="w-100"
            bordered
            columns={attendancesColumnCommon}
            rowKey={(record) => record._id}
            dataSource={filteredData.length ? filteredData : data.attendances}
            pagination={pagination}
            loading={loading}
          />
        </div>
      </section>
    </Wrapper>
  );
}
