import React from 'react';
import { Card } from 'antd';
import { UserTableStyleWrapper } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { DollarCircleOutlined, BankOutlined, ShoppingOutlined } from '@ant-design/icons';

function UserListTable() {
  // Dummy data for the cards
  const cardData = [
    { title: "Total Savings", amount: "$20,000", icon: <DollarCircleOutlined /> },
    { title: "Total Loan", amount: "$15,000", icon: <BankOutlined /> },
    { title: "Total Expenses", amount: "$5,000", icon: <ShoppingOutlined /> },
    { title: "Total Profits", amount: "$10,000", icon: <ShoppingOutlined /> },
  ];

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
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', // Increased shadow
                border: '2px solid #f0f0f0', // Bold border
                backgroundColor: '#fafafa' // Slightly different background color for contrast
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