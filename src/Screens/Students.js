import { Button, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { Table } from "antd";
import { getAllStudents } from "../services/students";
import { studentsColumn } from "../constants/tableColumns";
import { dashboard } from "../constants/urls";

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
      <Menu className="dashboardNav">
        <Menu.Item key="students">
          <Link className="dashboardNav__link" to={dashboard.student}>
            Students
          </Link>
        </Menu.Item>

        <Menu.Item key="teachers">
          <Link className="dashboardNav__link" to={dashboard.teacher}>
            Teachers
          </Link>
        </Menu.Item>

        <Menu.Item key="hods">
          <Link className="dashboardNav__link" to={dashboard.hod}>
            HODs
          </Link>
        </Menu.Item>
      </Menu>

      <section>
        <Table
          bordered
          columns={studentsColumn}
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
