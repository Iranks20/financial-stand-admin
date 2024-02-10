import React, { useEffect, useState } from 'react';
import { Table, message, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import moment from 'moment';

function ExpensesTable() {
  const [expensesTableData, setExpensesTableData] = useState([]);
  const navigate = useNavigate();

  const handleRefresh = () => {
    fetch(`${adminUrl}/expenses/all_expenses`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
            setExpensesTableData(data.data);
        } else {
          message.error('Failed to fetch fines data');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching fines data');
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleClickEdit = (fine_id) => {
    console.log('Clicked Edit Fine ID:', fine_id);
  };

  const handleClickDelete = (fine_id) => {
    console.log('Clicked Delete Fine ID:', fine_id);
  };

  const finesTableColumns = [
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
      title: 'Reason',
      dataIndex: 'message',
      key: 'message',
    },

    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <div className="table-actions">
    //       <Tooltip title="Edit">
    //         <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClickEdit(record.fine_id)}>
    //           <UilEdit />
    //         </Button>
    //       </Tooltip>
    //       <Tooltip title="Delete">
    //         <Button className="btn-icon" type="danger" shape="circle" onClick={() => handleClickDelete(record.fine_id)}>
    //           <UilTrashAlt />
    //         </Button>
    //       </Tooltip>
    //     </div>
    //   ),
    // },
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={expensesTableData}
            columns={finesTableColumns}
            rowKey="fine_id"
            pagination={{
              defaultPageSize: 5,
              total: expensesTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default ExpensesTable;
