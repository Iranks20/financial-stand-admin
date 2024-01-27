import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, message } from 'antd';
import { TestimonialStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { adminUrl } from '../../apiUrls/apiUrls';


function OtcDesk() {
  const navigate = useNavigate();

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'OTC Desk',
    },
  ];

  const [otcDescription, setOtcDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOtcDescription = () => {
    setLoading(true); // Set loading state to true

    fetch(`${adminUrl}/otc_descriptions`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOtcDescription(data[0].otc_description);
        }
        setLoading(false); // Set loading state back to false
      })
      .catch((error) => {
        console.error('Error occurred while fetching OTC description:', error);
        message.error('Failed to fetch OTC description');
        setLoading(false); // Set loading state back to false
      });
  };

  useEffect(() => {
    fetchOtcDescription();
  }, []);

  const handleEdit = () => {
    navigate('/admin/ecommerce/edit-otcdesk');
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="OTC Desk" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <TestimonialStyleWrapper>
              <Cards headless>
                <div className="otc-desk-block theme-4">
                  <div className="otc-desk-heading">
                    <h2 className="otc-desk-title">OTC Desk</h2>
                    <Button
                      size="default"
                      type="primary"
                      className="edit-otc-desk-button"
                      onClick={handleEdit}
                    >
                      Edit OTC Description
                    </Button>
                  </div>
                  <div className="otc-desk-description">
                    <p>{otcDescription}</p>
                  </div>
                </div>
              </Cards>
            </TestimonialStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default OtcDesk;
