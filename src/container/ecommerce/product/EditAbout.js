import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import { adminUrl } from '../../../apiUrls/apiUrls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditHomePage = () => {
  const navigate = useNavigate();

  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Edit Home Page Data',
    },
  ];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);

    // Send the updated home page data to the API
    fetch(`${adminUrl}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated Home Page Data:', data);
        setLoading(false);
        message.success('Home page data updated successfully.');
        navigate('/admin/users/headingslist');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        message.error('Failed to update home page data.');
      });
  };

  useEffect(() => {
    fetch(`${adminUrl}/about`)
      .then((response) => response.json())
      .then((data) => {
        form.setFieldsValue({
          heading: data.heading,
          sub_heading: data.sub_heading,
        });
        console.log('Fetched Home Page Data:', data);
      })
      .catch((error) => console.error(error));
  }, [form]);

  const handleHeadingChange = (content) => {
    form.setFieldsValue({ heading: content });
  };

  const handleSubHeadingChange = (content) => {
    form.setFieldsValue({ sub_heading: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Edit Home Page Data" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="EditHomePage" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Home Page Data">
                                  <Form.Item name="heading" label="Heading">
                                    <ReactQuill
                                      value={form.getFieldValue('heading')}
                                      onChange={handleHeadingChange}
                                    />
                                  </Form.Item>
                                  <Form.Item name="sub_heading" label="Subheading">
                                    <ReactQuill
                                      value={form.getFieldValue('sub_heading')}
                                      onChange={handleSubHeadingChange}
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
                            <Button size="large" htmlType="submit" type="primary" raised disabled={loading} style={{ backgroundColor: "#47abff" }}>
                              {loading ? <Spin /> : 'Update Home Page Data'}
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
};

export default EditHomePage;
