import React, { useEffect, useState } from 'react';
import { Table, message, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { adminUrl } from '../../../apiUrls/apiUrls';


function UserListTable() {
  const [usersTableData, setUsersTableData] = useState([]);
  const navigate = useNavigate();

  const handleRefresh = () => {
    fetch(`${adminUrl}/users/all_users`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
          setUsersTableData(data.data); 
        } else {
          message.error('Failed to fetch users data');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching users data');
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleClickEdit = (user_id) => {
    // Implement navigation or action to edit user
    console.log('Clicked Edit User ID:', user_id);
    // navigate to edit user page with user_id
  };

  const showDeleteConfirm = (user_id) => {
    Modal.confirm({
      title: 'Are you sure you want to Suspend User?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleClickDelete(user_id);
      },
    });
  };
  

  const handleClickDelete = (user_id) => {
    fetch(`${adminUrl}/users/deactivate_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 100) {
        message.success('User deactivated successfully');
        handleRefresh();
      } else {
        message.error(data.message || 'Failed to deactivate user');
      }
    })
    .catch(error => {
      console.error('Error:', error);
        message.error('An error occurred while deactivating user');
    });
  };

  const usersTableColumns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="table-actions">
          {/* <Tooltip title="Edit">
            <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClickEdit(record.user_id)}>
              <UilEdit />
            </Button>
          </Tooltip> */}
          <Tooltip title="Suspend">
            <Button className="btn-icon" type="danger" shape="circle" onClick={() => showDeleteConfirm(record.user_id)}>
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
            dataSource={usersTableData}
            columns={usersTableColumns}
            rowKey="user_id"
            pagination={{
              defaultPageSize: 5,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default UserListTable;
