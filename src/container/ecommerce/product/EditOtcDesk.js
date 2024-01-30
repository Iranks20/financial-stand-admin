import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputNumber, Select, message } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminUrl } from '../../../apiUrls/apiUrls';

const { Option } = Select;

function EditOTCDesk() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Extracting loan data from state (passed from previous component)
  const { user_id, first_name, last_name } = location.state.user || {};

  useEffect(() => {
    if (user_id) {
      form.setFieldsValue({ user_id });
      form.setFieldsValue({ first_last_name: first_name + " " + last_name });
    }
  }, [user_id, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    fetch(`${adminUrl}/users/update_membership`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: values.user_id,
        membership: values.amount,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setLoading(false);
      if (data.status === 100) {
        message.success(data.message);
        navigate('/admin/users/commentlist');
      } else {
        throw new Error(data.message || 'Failed to add shares.');
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
      message.error('Failed to add shares.');
    });
  };

  return (
    <>
      <PageHeader title="Update Membership" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Form form={form} name="payMembership" onFinish={handleSubmit}>
                <BasicFormWrapper>
                  <div className="add-product-block">
                    <Row gutter={15}>
                      <Col xs={24}>
                        <div className="add-product-content">
                          <Cards title="Pay Membership">
                            <Form.Item name="user_id" label="User ID" rules={[{ required: true }]}>
                              <InputNumber style={{ width: '100%' }} disabled />
                            </Form.Item>
                            <Form.Item name="first_last_name" label="Member Account" rules={[{ required: true }]}>
                              <InputNumber style={{ width: '100%' }} disabled />
                            </Form.Item>
                            <Form.Item name="amount" label="Membership Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
                              <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                          </Cards>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="add-form-action">
                    <Form.Item>
                      <Button className="btn-cancel" size="large" onClick={() => navigate('/admin/users/commentlist')}>
                        Cancel
                      </Button>
                      <Button size="large" htmlType="submit" type="primary" raised disabled={loading}>
                        Pay Membership
                      </Button>
                    </Form.Item>
                  </div>
                </BasicFormWrapper>
              </Form>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default EditOTCDesk;