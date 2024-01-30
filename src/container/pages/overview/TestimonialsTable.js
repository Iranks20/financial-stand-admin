import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import moment from 'moment';

function SavingsListTable() {
  const [savingsTableData, setSavingsTableData] = useState([]);

  const handleRefresh = () => {
    // Retrieve user_id from localStorage
    const memberDetails = JSON.parse(localStorage.getItem('member_details'));
    const userId = memberDetails && memberDetails.user_id;

    if (userId) {
      fetch(`${adminUrl}/savings/my_savings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
          setSavingsTableData(data.data);
        } else {
          message.error('Failed to fetch savings data');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching savings data');
      });
    } else {
      message.error('User details not found');
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const savingsTableColumns = [
    {
      title: 'Date & Time',
      dataIndex: 'date_time',
      key: 'date_time',
      render: date_time => moment(date_time).format('MMMM Do YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Contributor',
      dataIndex: 'contributor',
      key: 'contributor',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Saving ID',
      dataIndex: 'saving_id',
      key: 'saving_id',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={savingsTableData}
            columns={savingsTableColumns}
            rowKey="saving_id"
            pagination={{
              defaultPageSize: 10,
              total: savingsTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default SavingsListTable;
