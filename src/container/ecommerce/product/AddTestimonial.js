import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, message, Upload } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { adminUrl } from '../../../apiUrls/apiUrls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function AddTestimonial() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Create form data to send as a multipart/form-data request
      const formData = new FormData();
      formData.append('full_name', values.full_name);
      formData.append('description', values.description);
      // formData.append('photo', state.file.originFileObj);

      const response = await fetch(`${adminUrl}/testimonials`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Handle the response data or show success message
      console.log('Testimonial added:', data);
      message.success('Testimonial added successfully.');
      form.resetFields();
      navigate('/admin/users/testimoniallist');
    } catch (error) {
      // Handle error or show error message
      console.error('Error adding testimonial:', error);
      message.error('Failed to add testimonial. Please try again.');
    }
    setSubmitting(false);
  };

  const handleDescriptionChange = (content) => {
    form.setFieldsValue({ description: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Add Testimonial" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={18} xs={24}>
                  <BasicFormWrapper>
                    <Form form={form} name="addProduct" onFinish={handleSubmit}>
                      <div className="add-product-block">
                        <Row gutter={15}>
                          <Col xs={24}>
                            <div className="add-product-content">
                              <Cards title="About Testimonial">
                                <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
                                  <Input />
                                </Form.Item>
                                <Form.Item name="description" label="Testimonial Description" rules={[{ required: true, message: 'Please enter testimonial description' }]}>
                                  <ReactQuill value={form.getFieldValue('description')} onChange={handleDescriptionChange} />
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
                            disabled={submitting}
                          >
                            Cancel
                          </Button>
                          <Button size="large" htmlType="submit" type="primary" raised loading={submitting} style={{ backgroundColor: '#47abff' }}>
                            Save Testimonial
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </BasicFormWrapper>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default AddTestimonial;
