import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { adminUrl } from '../../../apiUrls/apiUrls';


function UserListTable() {
  const [usersTableData, setUsersTableData] = useState([]);
  // const [state, setState] = useState({});
  const navigate = useNavigate();


  // user data in the table
  const handleRefresh = () => {
    fetch(`${adminUrl}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setUsersTableData(data);
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred while fetching users user');
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleClick = (commment_id) => {
    const commentId = commment_id;
    console.log('Clicked comment ID:', commentId);
    navigate(`/admin/ecommerce/edit-comment/${commentId}`);
  };

  const usersTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Blog Id',
      dataIndex: 'blog_id',
      key: 'blog_id',
    },
    {
      title: 'full_name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            dataSource={usersTableData.map((user, key) => ({
              user: (
                <div className="user-info" key={key}>
                  <figcaption>
                    <Heading className="user-name" as="h6">
                      {user.name}
                    </Heading>
                    <span className="user-designation">{user.designation}</span>
                  </figcaption>
                </div>
              ),
              id: user.commment_id,
              blog_id: user.blog_id,
              full_name: (
                <div className="user-info">
                  <figure>
                    <img style={{ width: '40px' }} src={user.photo} alt="" />
                  </figure>
                  <figcaption>
                    <Heading className="user-name" as="h6">
                      {user.full_name}
                    </Heading>
                  </figcaption>
                </div>
              ),
              email: user.email,
              message: user.message,
              created_at: user.created_at,
              action: (
                <div className="table-actions">
                  <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClick(user.commment_id)}>
                    <UilEdit />
                  </Button>
                  <Button
                    className="btn-icon"
                    type="danger"
                    shape="circle"
                    onClick={() => {
                      fetch(`${adminUrl}/comments/${user.commment_id}`, {
                        method: 'DELETE',
                      })
                        .then(() => {
                          setUsersTableData(usersTableData.filter((item) => item.commment_id !== user.commment_id));
                          message.success('User deleted successfully');
                          handleRefresh();
                        })
                        .catch((error) => {
                          console.error(error);
                          message.error('An error occurred while deleting user');
                        });
                    }}
                  >
                    <UilTrashAlt />
                  </Button>
                </div>
              ),
            }))}
            columns={usersTableColumns}
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
