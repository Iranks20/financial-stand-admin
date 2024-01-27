import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Upload, message, Spin } from 'antd';
import UilExport from '@iconscout/react-unicons/icons/uil-export';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { adminUrl } from '../../../apiUrls/apiUrls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Dragger } = Upload;

function EditTestimonial() {
  const navigate = useNavigate();
  const { testimonialId } = useParams();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleDescriptionChange = (content) => {
    form.setFieldsValue({ description: content });
  };

  const handleSubmit = (values) => {
    setLoading(true);
  
    // Merge form values with uploaded file
    const updatedValues = {
      ...values,
      description: values.description,
    };
  
    // Create form data to send as a multipart/form-data request
    const formData = new FormData();
    Object.entries(updatedValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Send the updated testimonial data to the API
    fetch(`${adminUrl}/testimonials/${testimonialId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated Testimonial:', data);
        setLoading(false);
        message.success('Testimonial updated successfully.');
        navigate('/admin/users/testimoniallist');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        message.error('Failed to update testimonial.');
      });
  };

  useEffect(() => {
    fetch(`${adminUrl}/testimonials/${testimonialId}`)
      .then((response) => response.json())
      .then((data) => {
        form.setFieldsValue({
          full_name: data.full_name,
          description: data.description,
        });
      })
      .catch((error) => console.error(error));
  }, [testimonialId, form]);

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Edit Testimonial" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="EditProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Testimonial">
                                  <Form.Item name="full_name" label="Full Name">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="description" label="Testimonial Description">
                                    <ReactQuill
                                      value={form.getFieldValue('description')}
                                      onChange={handleDescriptionChange}
                                    />
                                  </Form.Item>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="large"
                              htmlType="submit"
                              type="primary"
                              raised
                              disabled={loading}
                              style={{ backgroundColor: '#47abff' }}
                            >
                              {loading ? <Spin /> : 'Update Testimonial'}
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default EditTestimonial;
