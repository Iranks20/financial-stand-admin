import React, { useState } from 'react';
import { Row, Col, Form, message, Spin, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { adminUrl } from '../../../apiUrls/apiUrls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddFAQ = () => {
const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Add FAQ',
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(`${adminUrl}/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Added FAQ:', data);
        setLoading(false);
        message.success('FAQ added successfully.');
        navigate('/admin/users/faqslist');
      } else {
        throw new Error('Failed to add FAQ.');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error('Failed to add FAQ.');
    }
  };

  const handleEditorChange = (content) => {
    form.setFieldsValue({ answer: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Add FAQ" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="AddFAQ" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Add FAQ">
                                  <Form.Item name="question" label="Question">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="answer" label="Answer">
                                    <ReactQuill value={form.getFieldValue('answer')} onChange={handleEditorChange} />
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
                                // Navigate to the appropriate page
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
                              {loading ? <Spin /> : 'Add FAQ'}
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

export default AddFAQ;
