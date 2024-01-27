import React from 'react';
import { Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { DropdownStyle } from './ui-elements-styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';

function Popovers() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Popovers',
    },
  ];
  return (
    <DropdownStyle>
      <PageHeader className="ninjadash-page-header-main" title="Popovers" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={12} sm={12} xs={24}>
            <Cards title="Basic Popover" caption="The simplest use of Popover">
            </Cards>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <Cards title="Placement" caption="The simplest use of Popover">
            </Cards>
          </Col>
        </Row>
      </Main>
    </DropdownStyle>
  );
}

export default Popovers;
