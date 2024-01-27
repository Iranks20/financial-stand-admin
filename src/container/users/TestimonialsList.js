import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UserListTable from '../pages/overview/TestimonialsTable';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import { adminUrl } from '../../apiUrls/apiUrls';


function UserList() {
  const { users } = useSelector((state) => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
    };
  });

  const [userName, setUserName] = useState('');
  const [userBalance, setUserBalance] = useState('Loading...');

  useEffect(() => {
    const memberDetails = JSON.parse(localStorage.getItem('member_details'));
    if (memberDetails) {
      setUserName(memberDetails.first_name || '');

      // Fetch user details including balance
      fetch(`${adminUrl}/users/user_details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: memberDetails.user_id }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 100 && data.data) {
          setUserBalance(data.data.balance);
        } else {
          setUserBalance('Unable to fetch balance');
        }
      })
      .catch(error => {
        console.error('Error fetching user balance:', error);
        setUserBalance('Error fetching balance');
      });
    }
  }, []);

  // ... rest of your code ...

  return (
    <>
      <CardToolbox style={{ display: 'flex', justifyContent: 'center' }}>
        <PageHeader
          className="ninjadash-page-header-main"
          ghost
          title={`${userName}, Your total Savings are: ${userBalance}`}
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
