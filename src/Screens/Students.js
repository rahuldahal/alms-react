import { Button, Menu, Space } from "antd";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { Table } from 'antd';
import qs from 'qs';
import { getAllStudents } from "../services/students";

const columns = [
  {
    title: 'Fullname',
    dataIndex: 'userId',
    sorter: true,
    render: (userId) => userId.fullName,
    width: '25%',
  },
  {
    title: 'Email',
    dataIndex: 'userId',
    render: (userId) => userId.email
  },
  {
    title: 'Batch',
    dataIndex: 'batch',
  },
  {
    title: 'Course',
    dataIndex: 'courseId',
    render: (courseId) => courseId.shortName
  },
  {
    title: 'Semester',
    dataIndex: 'semester',
  },
  {
    title: 'Actions',
    dataIndex: 'userId',
    render: name => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button danger>Delete</Button>
      </Space>
    )
  }
];

export default function Students() {

  // constants
  const DASHBOARD_BASE = "/dashboard";
  const navLinkURLs = {
    student: `${DASHBOARD_BASE}/students`,
    teacher: `${DASHBOARD_BASE}/teachers`,
    hod: `${DASHBOARD_BASE}/hods`,
  };

  // states
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  
  
  
    const fetchData = async (params = {}) => {
      setLoading(true);
      const data = await getAllStudents();
      console.log(data.data.students);

      setData(data.data.students);
          setLoading(false);
          setPagination({
            ...params.pagination,
            total: 8, // 200 is mock data, you should read it from server
            // total: data.totalCount,
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
      <Menu className="dashboardNav">
        <Menu.Item key="students">
          <Link className="dashboardNav__link" to={navLinkURLs.student}>
            Students
          </Link>
        </Menu.Item>

        <Menu.Item key="teachers">
          <Link className="dashboardNav__link" to={navLinkURLs.teacher}>
            Teachers
          </Link>
        </Menu.Item>

        <Menu.Item key="hods">
          {" "}
          <Link className="dashboardNav__link" to={navLinkURLs.hod}>
            HODs
          </Link>
        </Menu.Item>
      </Menu>

      <section>
      <Table
      columns={columns}
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
