import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputNumber, Select, message } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminUrl } from '../../../apiUrls/apiUrls';

const { Option } = Select;

function LoanPayment() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Extracting loan data from state (passed from previous component)
  const { loan_id } = location.state.loan || {};

  useEffect(() => {
    if (loan_id) {
      form.setFieldsValue({ loan_id });
    }
  }, [loan_id, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    fetch(`${adminUrl}/loans/pay_loan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loan_id: values.loan_id,
        amount: values.amount,
        type: values.type,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setLoading(false);
      if (data.status === 100) {
        message.success(data.message);
        navigate('/admin/users/sponsorslist');
      } else {
        throw new Error(data.message || 'Failed to pay loan.');
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
      message.error('Failed to pay loan.');
    });
  };

  return (
    <>
      <PageHeader title="Pay Loan" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Form form={form} name="payLoan" onFinish={handleSubmit}>
                <BasicFormWrapper>
                  <div className="add-product-block">
                    <Row gutter={15}>
                      <Col xs={24}>
                        <div className="add-product-content">
                          <Cards title="Pay Loan">
                            <Form.Item name="loan_id" label="Loan ID" rules={[{ required: true }]}>
                              <InputNumber style={{ width: '100%' }} disabled />
                            </Form.Item>
                            <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
                              <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="type" label="Payment Type" rules={[{ required: true, message: 'Please select a payment type!' }]}>
                              <Select placeholder="Select a payment type">
                                <Option value="WALLET">WALLET</Option>
                                <Option value="CASH">CASH</Option>
                              </Select>
                            </Form.Item>
                          </Cards>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="add-form-action">
                    <Form.Item>
                      <Button className="btn-cancel" size="large" onClick={() => navigate('/admin/users/loanlist')}>
                        Cancel
                      </Button>
                      <Button size="large" htmlType="submit" type="primary" raised loading={loading}>
                        Pay Loan
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

export default LoanPayment;
