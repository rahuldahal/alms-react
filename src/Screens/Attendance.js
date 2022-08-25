import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Button, DatePicker, Input, Space, Table } from "antd";
import { attendancesColumnPrincipal } from "../constants/tableColumns";
import DashboardNav, { getItem, MenuLink } from "../components/DashboardNav";
import {
  getAllAttendances,
  getAttendancesOfSubject,
} from "../services/attendances";
import { Link, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Title from "../components/Title";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";

export default function Attendance() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");

  const { auth } = useAuth();
  const { role } = auth;

  const isTeacher = role === "TEACHER";

  // states
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const searchInput = useRef(null);

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

  const handleSearch = (searchTerm) => {
    if (searchTerm === null) {
      return setFilteredData([]);
    }

    const filteredData = data.filter((record) =>
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

  return subject ? (
    <Wrapper className="flex dashboard">
      <DashboardNav navItems={navItems} />

      <section>
        {data.length ? (
          <Title level={2} className="brand-text">
            Subject: {data[0].subject.name}
          </Title>
        ) : null}
        <div className="flex flex-column items-end">
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
            columns={attendancesColumnCommon}
            rowKey={(record) => record._id}
            dataSource={filteredData.length ? filteredData : data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
      </section>
    </Wrapper>
  ) : (
    <Wrapper className="flex dashboard">
      <DashboardNav navItems={navItems} />

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
          columns={[...attendancesColumnCommon, ...attendancesColumnPrincipal]}
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
