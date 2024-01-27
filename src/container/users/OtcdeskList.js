import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UserListTable from '../pages/overview/OtcdeskTable';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../styled';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';

function UserList() {
  const { users } = useSelector((state) => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
    };
  });

  const usersTableData = [];

  users.map((user) => {
    const { id, product_name, designation, img, status } = user;

    return usersTableData.push({
      key: id,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={require(`../../${img}`)} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {product_name}
            </Heading>
            <span className="user-designation">San Francisco, CA</span>
          </figcaption>
        </div>
      ),
      category: 'john@gmail.com',
      company: 'Business Development',
      blog_quote: designation,
      joinDate: 'January 20, 2020',
      status: <span className={`status-text ${status}`}>{status}</span>,
      action: (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle">
            <UilEdit />
          </Button>
        </div>
      ),
    });
  });

  return (
    <>
      <CardToolbox>
        <PageHeader
          className="ninjadash-page-header-main"
          ghost
          title="OTC Description"
        //   buttons={[
        //     <Button className="btn-add_new" size="default" type="primary" key="1">
        //       <Link to="/admin/ecommerce/products-adding">+ Add user</Link>
        //     </Button>,
        //   ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default UserList;
