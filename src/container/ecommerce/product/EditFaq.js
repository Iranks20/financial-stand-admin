import React, { useState, useEffect } from 'react';
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

const EditOTCDesk = () => {
  const { faqId } = useParams();
  const navigate = useNavigate();


  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Edit FAQ',
    },
  ];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [faqData, setFaqData] = useState([]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await fetch(`${adminUrl}/faqs/${faqId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Updated FAQ:', data);
        setLoading(false);
        message.success('FAQ updated successfully.');
        navigate('/admin/users/faqslist');
      } else {
        throw new Error('Failed to update FAQ.');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error('Failed to update FAQ.');
    }
  };

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await fetch(`${adminUrl}/faqs/${faqId}`);
        if (response.ok) {
          const data = await response.json();
          setFaqData(data);
          console.log('tuliwano', data)
          form.setFieldsValue({
            question: data.question,
            answer: data.answer,
          });
          console.log('Fetched FAQ:', data);
        } else {
          throw new Error('Failed to fetch FAQ data.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFaqData();
  }, [faqId, form]);

  const handleEditorChange = (content) => {
    form.setFieldsValue({ answer: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Edit FAQ" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="EditFAQ" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Edit FAQ">
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
                              {loading ? <Spin /> : 'Update FAQ'}
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

export default EditOTCDesk;
