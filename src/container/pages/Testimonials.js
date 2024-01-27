import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button, message } from 'antd';
import { TestimonialStyleWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Swiper from 'react-id-swiper';
import { adminUrl } from '../../apiUrls/apiUrls';


import 'swiper/scss';
import 'swiper/scss/pagination';

SwiperCore.use([Navigation, Pagination]);

function Testimonials() {
  const navigate = useNavigate();

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Testimonials',
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false); // State to track delete button loading

  const handleClick = (testimonialId) => {
    console.log('Clicked Testimonial ID:', testimonialId);
    navigate(`/admin/ecommerce/edit-testimonial/${testimonialId}`);
  };

  // fetching all testimonials
  const fetchTestimonials = () => {
    fetch('${adminUrl}/testimonials')
    .then((response) => response.json())
    .then((data) => {
      setTestimonials(data);
      console.log('Fetched Testimonials:', data);
    })
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchTestimonials()
  }, []);

  const paramsThree = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // const handleAddNewTestimonial = () => {
  //   navigate('/admin/ecommerce/add-testimonial');
  // };

  const handleDelete = (testimonialId) => {
    setDeleteLoading(true); // Set loading state to true

    // Send DELETE request to delete the testimonial
    fetch(`${adminUrl}/testimonials/${testimonialId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Testimonial successfully deleted
          message.success('Testimonial deleted successfully');
          // Remove the deleted testimonial from the state
          fetchTestimonials()
        } else {
          // Error occurred while deleting the testimonial
          message.error('Failed to delete testimonial');
        }
        setDeleteLoading(false); // Set loading state back to false
      })
      .catch((error) => {
        console.error('Error occurred while deleting testimonial:', error);
        message.error('An error occurred. Please try again.');
        setDeleteLoading(false); // Set loading state back to false
      });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Testimonials" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <TestimonialStyleWrapper>
              <Cards headless>
                <div className="testimonial-block theme-4">
                  <div className="testimonial-heading">
                    <h2 className="testimonial-title">Testimonials</h2>
                    {/* <Button
                      size="default"
                      type="primary"
                      className="add-testimonial-button"
                      onClick={handleAddNewTestimonial}
                    >
                      Add New Testimonial
                    </Button> */}
                    <Link to="/admin/ecommerce/add-testimonial">Add Testimonial</Link>
                  </div>
                  <Swiper {...paramsThree}>
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.testimonial_id} className="testimonial-block__single">
                        <div className="testimonial-block__inner">
                          <div className="testimonial-block__author">
                            <img src={`../../${testimonial.photo}`} alt="" />
                          </div>
                          <div className="testimonial-block__review">
                            <p>{testimonial.description}</p>
                          </div>
                          <div className="author-info">
                            <h2 className="client-name">{testimonial.full_name}</h2>
                          </div>
                          <div className="button-container">
                            <Button.Group>
                              <Button
                                size="default"
                                type="primary"
                                onClick={() => handleClick(testimonial.testimonial_id)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="default"
                                type="primary"
                                danger
                                onClick={() => handleDelete(testimonial.testimonial_id)}
                                style={{ marginLeft: '10px' }}
                                loading={deleteLoading} // Set loading state on the delete button
                              >
                                Delete
                              </Button>
                            </Button.Group>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Swiper>
                </div>
              </Cards>
            </TestimonialStyleWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Testimonials;
