import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, message, Spin } from 'antd';
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

const EditOTCDesk = () => {
  const navigate = useNavigate();
  const { otcDeskId } = useParams();

  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Edit OTC Desk',
    },
  ];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);

    // Send the updated OTC Desk data to the API
    fetch(`${adminUrl}/otc_descriptions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated OTC Desk:', data);
        setLoading(false);
        message.success('OTC Desk updated successfully.');
        navigate('/admin/users/otcdesklist');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        message.error('Failed to update OTC Desk.');
      });
  };

  useEffect(() => {
    fetch(`${adminUrl}/otc_descriptions`)
      .then((response) => response.json())
      .then((data) => {
        form.setFieldsValue({
          otc_description: data[0].otc_description,
        });
        console.log('Fetched OTC Desk:', data);
      })
      .catch((error) => console.error(error));
  }, [form]);

  const handleEditorChange = (content) => {
    form.setFieldsValue({ otc_description: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Edit OTC Desk" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="EditOTCDesk" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About OTC Desk">
                                  <Form.Item name="otc_description" label="OTC Description">
                                    <ReactQuill
                                      value={form.getFieldValue('otc_description')}
                                      onChange={handleEditorChange}
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
                              {loading ? <Spin /> : 'Update OTC Desk'}
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
