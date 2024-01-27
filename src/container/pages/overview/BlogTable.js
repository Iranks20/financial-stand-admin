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
    fetch(`${adminUrl}/blogs`)
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

  const handleClick = (blog_id) => {
    const blogId = blog_id;
    console.log('Clicked Blog ID:', blogId);
    navigate(`/admin/ecommerce/edit-blog/${blogId}`);
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
      title: 'blog_title',
      dataIndex: 'blog_title',
      key: 'blog_title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <Tooltip placement="topLeft" title={removeTags(DOMPurify.sanitize(description))}>
          <span dangerouslySetInnerHTML={{ __html: description.split(' ').slice(0, 10).join(' ') }} />
          {description.split(' ').length > 10 ? '...' : ''}
        </Tooltip>
      ),
    },
    {
      title: 'blog_author',
      dataIndex: 'blog_author',
      key: 'blog_author',
    },
    {
      title: 'blog_quote',
      dataIndex: 'blog_quote',
      key: 'blog_quote',
      render: (blog_quote) => (
        <Tooltip placement="topLeft" title={removeTags(DOMPurify.sanitize(blog_quote))}>
          <span dangerouslySetInnerHTML={{ __html: blog_quote.split(' ').slice(0, 10).join(' ') }} />
          {blog_quote.split(' ').length > 10 ? '...' : ''}
        </Tooltip>
      ),
    },
    {
      title: 'Quote Author',
      dataIndex: 'quote_author',
      key: 'quote_author',
    },
    {
      title: 'Written Date',
      dataIndex: 'written_date',
      key: 'written_date',
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
              id: user.blog_id,
              blog_title: (
                <div className="user-info">
                  <figure>
                    <img style={{ width: '40px' }} src={user.blog_image} alt="" />
                  </figure>
                  <figcaption>
                    <Heading className="user-name" as="h6">
                      {user.blog_title}
                    </Heading>
                  </figcaption>
                </div>
              ),
              category: user.category,
              description: user.description,
              blog_author: user.blog_author,
              blog_quote: user.blog_quote,
              quote_author: user.quote_author,
              written_date: user.written_date,
              action: (
                <div className="table-actions">
                  <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClick(user.blog_id)}>
                    <UilEdit />
                  </Button>
                  <Button
                    className="btn-icon"
                    type="danger"
                    shape="circle"
                    onClick={() => {
                      fetch(`${adminUrl}/blogs/${user.blog_id}`, {
                        method: 'DELETE',
                      })
                        .then(() => {
                          setUsersTableData(usersTableData.filter((item) => item.blog_id !== user.blog_id));
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
