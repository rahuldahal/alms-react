import { Button, Space, Table, Tag } from 'antd';
import { Menu } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import Wrapper from '../components/Wrapper';

const data = [
    {
      key: '1',
      fullname: 'John Brown',
      email: 'john@email.com',
      batch: 2020,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      fullname: 'Jim Green',
      email: 'jim@email.com',
      batch: 2020,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      fullname: 'Joe Black',
      email: 'joe@email.com',
      batch: 2016,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  

export default function HODs(){
    const DASHBOARD_BASE = "/dashboard";
    const navLinkURLs = {
        student: `${DASHBOARD_BASE}/students`,
        teacher: `${DASHBOARD_BASE}/teachers`,
        hod: `${DASHBOARD_BASE}/hods`,
    };

    const { Column } = Table;
    
    return(
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
        <Title level={3}>Students</Title>

  <Table dataSource={data} onRow={(record, index)=>{
    return {
        onClick: e=>{
            console.log(record);
        }
    }
  }}>
      <Column title="Fullname" dataIndex="fullname" key="fullname" />
    <Column title="Email" dataIndex="email" key="email" render={
        email=><a href={`mailto:${email}`}>{email}</a>
    } />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
            {/* {console.log(record)} */}
          <Button type='primary' onClick={e=>{
            e.stopPropagation();
            console.log('edit action');
          }}>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      )}
    />
  </Table>
    </section>
    </Wrapper>
    )
}