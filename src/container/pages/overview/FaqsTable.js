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
  // const [state, setState] = useState({});
  const navigate = useNavigate();


  // user data in the table
  const handleRefresh = () => {
    fetch(`${adminUrl}/faqs`)
      .then((response) => response.json())     
      .then((data) => {
        console.log(data)
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

  const removeTags = (str) => {
    if (typeof str === 'string') {
      return str.replace(/<[^>]+>/g, '');
    }
    return str;
  };

  const handleClick = (faq_id) => {
    const faqId = faq_id;
    // console.log('Clicked comment ID:', commentId);
    navigate(`/admin/ecommerce/editfaq/${faqId}`);
  };

  const usersTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      render: (answer) => (
        <Tooltip placement="topLeft" title={removeTags(DOMPurify.sanitize(answer))}>
          <span dangerouslySetInnerHTML={{ __html: answer.split(' ').slice(0, 10).join(' ') }} />
          {answer.split(' ').length > 10 ? '...' : ''}
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
            //   user: (
            //     <div className="user-info" key={key}>
            //       <figcaption>
            //         <Heading className="user-name" as="h6">
            //           {user.name}
            //         </Heading>
            //         <span className="user-designation">{user.designation}</span>
            //       </figcaption>
            //     </div>
            //   ),
              id: user.faq_id,
              question: (
                <div className="user-info">
                  <figcaption>
                    <Heading className="user-name" as="h6">
                      {user.question}
                    </Heading>
                  </figcaption>
                </div>
              ),
              answer: user.answer,
              created_at: user.created_at,
              action: (
                <div className="table-actions">
                  <Button className="btn-icon" type="info" shape="circle" onClick={() => handleClick(user.faq_id)}>
                    <UilEdit />
                  </Button>
                  <Button
                    className="btn-icon"
                    type="danger"
                    shape="circle"
                    onClick={() => {
                      fetch(`${adminUrl}/faqs/${user.faq_id}`, {
                        method: 'DELETE',
                      })
                        .then(() => {
                          setUsersTableData(usersTableData.filter((item) => item.faq_id !== user.faq_id));
                          message.success('Faq deleted successfully');
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
