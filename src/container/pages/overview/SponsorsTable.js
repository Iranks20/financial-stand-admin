import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import moment from 'moment';

function LoansListTable() {
  const [loansTableData, setLoansTableData] = useState([]);

  const handleRefresh = () => {
    // Retrieve user_id from localStorage
    const memberDetails = JSON.parse(localStorage.getItem('member_details'));
    const userId = memberDetails && memberDetails.user_id;

    if (userId) {
      fetch(`${adminUrl}/loans/my_loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
          setLoansTableData(data.data);
        } else {
          message.error('Failed to fetch loans data');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching loans data');
      });
    } else {
      message.error('User details not found');
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const loansTableColumns = [
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
  ]

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={loansTableData}
            columns={loansTableColumns}
            rowKey="loan_id"
            pagination={{
              defaultPageSize: 5,
              total: loansTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default LoansListTable;
