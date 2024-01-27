import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, message } from 'antd';
import { TestimonialStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { adminUrl } from '../../apiUrls/apiUrls';


const Home = () => {
  const navigate = useNavigate();

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Home',
    },
  ];

  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHomePageData = () => {
    setLoading(true); // Set loading state to true

    fetch(`${adminUrl}/headings`)
      .then((response) => response.json())
      .then((data) => {
        if (data.heading) {
          setHeading(data.heading);
        }
        if (data.sub_heading) {
          setSubHeading(data.sub_heading);
        }
        setLoading(false); // Set loading state back to false
      })
      .catch((error) => {
        message.error('Failed to fetch home page data');
        setLoading(false); // Set loading state back to false
      });
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const handleEdit = () => {
    navigate('/admin/ecommerce/edit-homepagedata');
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Home" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <TestimonialStyleWrapper>
              <Cards headless>
                <Button size="default" type="primary" className="edit-home-page-data-button" onClick={handleEdit}>
                    Edit Home Page Data
                </Button>
                <div className="home-card">
                  <div className="home-card-heading">
                    <h2 className="home-card-title">Heading</h2>
                  </div>
                  <div className="home-card-content">
                    <p>{heading}</p>
                  </div>
                </div>
                <div className="home-card">
                  <div className="home-card-heading">
                    <h2 className="home-card-title">Subheading</h2>
                  </div>
                  <div className="home-card-content">
                    <p>{subHeading}</p>
                  </div>
                </div>
              </Cards>
            </TestimonialStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Home;
