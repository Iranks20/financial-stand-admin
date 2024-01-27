import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import moment from 'moment';

function FinesListTable() {
  const [finesTableData, setFinesTableData] = useState([]);

  const handleRefresh = () => {
    // Retrieve user_id from localStorage
    const memberDetails = JSON.parse(localStorage.getItem('member_details'));
    const userId = memberDetails && memberDetails.user_id;

    if (userId) {
      fetch(`${adminUrl}/fines/my_fines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
          setFinesTableData(data.data);
        } else {
          message.error('Failed to fetch fines data');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching fines data');
      });
    } else {
      message.error('User details not found');
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const finesTableColumns = [
    {
      title: 'Fine ID',
      dataIndex: 'fine_id',
      key: 'fine_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Contributor',
      dataIndex: 'contributor',
      key: 'contributor',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Date & Time',
      dataIndex: 'date_time',
      key: 'date_time',
      render: date_time => moment(date_time).format('MMMM Do YYYY, h:mm:ss a'),
    },
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={finesTableData}
            columns={finesTableColumns}
            rowKey="fine_id"
            pagination={{
              defaultPageSize: 5,
              total: finesTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default FinesListTable;
