import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, message } from 'antd';
import { TestimonialStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { adminUrl } from '../../apiUrls/apiUrls';


function Sponsors() {
  const navigate = useNavigate();

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Sponsors',
    },
  ];

  const [sponsors, setSponsors] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false); // State to track delete button loading

  const handleClick = (sponsorId) => {
    console.log('Clicked Sponsor ID:', sponsorId);
    navigate(`/admin/ecommerce/edit-sponsor/${sponsorId}`);
  };

  // fetching all sponsors
  const fetchSponsors = () => {
    fetch('${adminUrl}/sponsors')
      .then((response) => response.json())
      .then((data) => {
        setSponsors(data);
        console.log('Fetched Sponsors:', data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleAddNewSponsor = () => {
    navigate('/admin/ecommerce/add-sponsor');
  };

  const handleDelete = (sponsorId) => {
    setDeleteLoading(true); // Set loading state to true

    // Send DELETE request to delete the sponsor
    fetch(`${adminUrl}/sponsors/${sponsorId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Sponsor successfully deleted
          message.success('Sponsor deleted successfully');
          // Remove the deleted sponsor from the state
          fetchSponsors();
        } else {
          // Error occurred while deleting the sponsor
          message.error('Failed to delete sponsor');
        }
        setDeleteLoading(false); // Set loading state back to false
      })
      .catch((error) => {
        console.error('Error occurred while deleting sponsor:', error);
        message.error('An error occurred. Please try again.');
        setDeleteLoading(false); // Set loading state back to false
      });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Sponsors" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <TestimonialStyleWrapper>
              <Cards headless>
                <div className="sponsor-block theme-4">
                  <div className="sponsor-heading">
                    <h2 className="sponsor-title">Sponsors</h2>
                    <Button
                      size="default"
                      type="primary"
                      className="add-sponsor-button"
                      onClick={handleAddNewSponsor}
                    >
                      Add New Sponsor
                    </Button>
                  </div>
                  <Row gutter={16}>
                    {sponsors.map((sponsor) => (
                      <Col key={sponsor.sponsor_id} xs={24} sm={12} md={8} lg={6}>
                        <div className="sponsor-card">
                          <div className="sponsor-card__inner">
                            <div className="sponsor-card__image">
                              <img src={sponsor.sponsor_photo} alt={sponsor.sponsor_name} />
                            </div>
                            <div className="sponsor-card__name">
                              <h3>{sponsor.sponsor_name}</h3>
                            </div>
                            <div className="button-container">
                              <Button.Group>
                                <Button
                                  size="default"
                                  type="primary"
                                  onClick={() => handleClick(sponsor.sponsor_id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="default"
                                  type="primary"
                                  danger
                                  onClick={() => handleDelete(sponsor.sponsor_id)}
                                  style={{ marginLeft: '10px' }}
                                  loading={deleteLoading} // Set loading state on the delete button
                                >
                                  Delete
                                </Button>
                              </Button.Group>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Cards>
            </TestimonialStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Sponsors;
