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
import { adminUrl } from '../../../apiUrls/apiUrls';
import DOMPurify from 'dompurify';

function UserListTable() {
  const [usersTableData, setUsersTableData] = useState([]);
  const navigate = useNavigate();

  const handleRefresh = () => {
    fetch(`${adminUrl}/products`)
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

  const handleClick = (product_id) => {
    const productId = product_id;
    console.log('Clicked product ID:', productId);
    navigate(`/admin/ecommerce/products-update/${productId}`);
  };

  const removeTags = (str) => {
    if (typeof str === 'string') {
      return str.replace(/<[^>]+>/g, '');
    }
    return str;
  };

  const usersTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'product_name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'product_description',
      dataIndex: 'product_description',
      key: 'product_description',
      render: (product_description) => (
        <Tooltip placement="topLeft" title={removeTags(DOMPurify.sanitize(product_description))}>
          <span dangerouslySetInnerHTML={{ __html: product_description.split(' ').slice(0, 10).join(' ') }} />
          {product_description.split(' ').length > 10 ? '...' : ''}
        </Tooltip>
      ),
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
              id: user.product_id,
              product_name: (
                <div className="user-info">
                  <figure>
                    <img style={{ width: '40px' }} src={user.product_image} alt="" />
                  </figure>
                  <figcaption>
                    <Heading className="user-name" as="h6">
                      {user.product_name}
                    </Heading>
                  </figcaption>
                </div>
              ),
              product_description: user.product_description,
              created_at: user.created_at,
              action: (
                <div className="table-actions">
                  <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClick(user.product_id)}>
                    <UilEdit />
                  </Button>
                  <Button
                    className="btn-icon"
                    type="danger"
                    shape="circle"
                    onClick={() => {
                      fetch(`${adminUrl}/products/${user.product_id}`, {
                        method: 'DELETE',
                      })
                        .then(() => {
                          setUsersTableData(usersTableData.filter((item) => item.product_id !== user.product_id));
                          message.success('Product deleted successfully');
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
