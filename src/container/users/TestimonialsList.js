import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import UserListTable from '../pages/overview/TestimonialsTable';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';

function UserList() {
  const { users } = useSelector((state) => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
    };
  });

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const memberDetails = JSON.parse(localStorage.getItem('member_details'));
    if (memberDetails) {
      setUserName(memberDetails.first_name || '');
    }
  }, []);

  const usersTableData = [];

  users.forEach((user) => {
    const { id, full_name, designation, img, status } = user;

    usersTableData.push({
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={require(`../../${img}`).default} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {full_name}
            </Heading>
            <span className="user-designation">San Francisco, CA</span>
          </figcaption>
        </div>
      ),
      category: 'john@gmail.com',
      company: 'Business Development',
      blog_quote: designation,
      joinDate: 'January 20, 2020',
      status: <span className={`status-text ${status}`}>{status}</span>,
      action: (
        <div className="table-actions">
          <Button className="btn-icon" type="primary" to="#" shape="circle">
            <UilEye />
          </Button>
          <Button className="btn-icon" type="info" to="#" shape="circle">
            <UilEdit />
          </Button>
          <Button className="btn-icon" type="danger" to="#" shape="circle">
            <UilTrashAlt />
          </Button>
        </div>
      ),
    });
  });

  return (
    <>
      <CardToolbox style={{ display: 'flex', justifyContent: 'center' }}>
        <PageHeader
          className="ninjadash-page-header-main"
          ghost
          title={`Welcome to Your Financial Stand Dashboard, ${userName}`}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default UserList;
