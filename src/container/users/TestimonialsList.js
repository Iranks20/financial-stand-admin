import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'antd';
import UserListTable from '../pages/overview/TestimonialsTable';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import { adminUrl } from '../../apiUrls/apiUrls';
import { DollarCircleOutlined, BankOutlined, ShoppingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { UserTableStyleWrapper } from '../pages/style';
import { Cards } from '../../components/cards/frame/cards-frame';

function UserList() {
  const { users } = useSelector((state) => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
    };
  });

  const [userName, setUserName] = useState('');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const memberDetails = JSON.parse(localStorage.getItem('member_details'));
    if (memberDetails) {
      setUserName(`${memberDetails.first_name + " " +  memberDetails.last_name}`|| '');

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
          setUserDetails(data.data);
        } else {
        }
      })
      .catch(error => {
        console.error('Error fetching user balance:', error);
      });
    }
  }, []);

  // ... rest of your code ...

  return (
    <>
      <Cards headless>
        <UserTableStyleWrapper>
          <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
            <Card
              title="Total Savings"
              extra={<DollarCircleOutlined />}
              style={{ 
                minWidth: '300px', 
                maxWidth: '400px', 
                flexGrow: 1, 
                margin: '10px', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', 
                border: '2px solid #f0f0f0', 
                backgroundColor: '#fafafa'
              }}
              bodyStyle={{ fontSize: '20px' }}
            >
              <p>{userDetails.balance} UGX</p>
            </Card>
            <Card
              title="Total Shares"
              extra={<DollarCircleOutlined />}
              style={{ 
                minWidth: '300px', 
                maxWidth: '400px', 
                flexGrow: 1, 
                margin: '10px', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', 
                border: '2px solid #f0f0f0', 
                backgroundColor: '#fafafa'
              }}
              bodyStyle={{ fontSize: '20px' }}
            >
              <p>{userDetails.shares}</p>
            </Card>
            <Card
              title="Total Membership"
              extra={<DollarCircleOutlined />}
              style={{ 
                minWidth: '300px', 
                maxWidth: '400px', 
                flexGrow: 1, 
                margin: '10px', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', 
                border: '2px solid #f0f0f0', 
                backgroundColor: '#fafafa'
              }}
              bodyStyle={{ fontSize: '20px' }}
            >
              {
                userDetails.membership == "False" ?
                <p>Not yet Paid</p> :
                <p>{userDetails.membership} UGX</p>
              }
            </Card>
          </div>
        </UserTableStyleWrapper>
      </Cards>

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
