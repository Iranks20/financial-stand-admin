import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { UserTableStyleWrapper } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import { DollarCircleOutlined, BankOutlined, ShoppingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function UserListTable() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch(`${adminUrl}/loans/add_loan`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 100) {
          // Transform the data to match your card data structure
          const transformedData = data.data.map(item => {
            let icon;
            switch (item.name) {
              case "Total Savings":
                icon = <DollarCircleOutlined />;
                break;
              case "Total Loans":
                icon = <BankOutlined />;
                break;
              case "Total Fines":
                icon = <ExclamationCircleOutlined />;
                break;
              default:
                icon = null;
            }
            return {
              title: item.name,
              amount: `$${item.total_amount || item.total_loans}`,
              icon: icon,
            };
          });
          setCardData(transformedData);
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px' }}>
          {cardData.map((data, index) => (
            <Card
              key={index}
              title={data.title}
              extra={data.icon}
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
              <p>{data.amount}</p>
            </Card>
          ))}
        </div>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default UserListTable;
