import React, { useEffect, useState } from 'react';
import { Table, message, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';
import { Modal } from 'antd';
import moment from 'moment';



function SavingsListTable() {
  const [savingsTableData, setSavingsTableData] = useState([]);
  const navigate = useNavigate();

  const handleRefresh = () => {
    fetch(`${adminUrl}/savings/all_savings`)
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
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const showDeleteConfirm = (saving_id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this saving?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleClickDelete(saving_id);
      },
    });
  };
  

  const handleClickDelete = (saving_id) => {
    fetch(`${adminUrl}/savings/delete_saving`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ saving_id }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 100) {
        message.success('Saving deleted successfully');
        setSavingsTableData(savingsTableData.filter(item => item.saving_id !== saving_id));
      } else {
        message.error(data.message || 'Failed to delete saving');
      }
    })
    .catch(error => {
      console.error('Error deleting saving:', error);
      message.error('An error occurred while deleting saving');
    });
  };


  const handleClickEdit = (saving_id) => {
    // Implement navigation or action to edit saving
    console.log('Clicked Edit Saving ID:', saving_id);
    // navigate to edit saving page with saving_id
  };

  const savingsTableColumns = [
    {
      title: 'Saving ID',
      dataIndex: 'saving_id',
      key: 'saving_id',
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
      title: 'Date & Time',
      dataIndex: 'date_time',
      key: 'date_time',
      render: date_time => moment(date_time).format('MMMM Do YYYY, h:mm:ss a'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="table-actions">
          <Tooltip title="Edit">
            <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClickEdit(record.saving_id)}>
              <UilEdit />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button className="btn-icon" type="danger" shape="circle" onClick={() => showDeleteConfirm(record.saving_id)}>
              <UilTrashAlt />
            </Button>
          </Tooltip>
        </div>
      ),
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
              defaultPageSize: 5,
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
