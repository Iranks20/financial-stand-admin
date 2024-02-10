import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputNumber, Input, message, Select } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';
import { adminUrl } from '../../../apiUrls/apiUrls';

const { Option } = Select;

function ExpenseAdding() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false); // State to handle loading

  useEffect(() => {
    fetchUsers('');
  }, []);

  const fetchUsers = (searchText) => {
    fetch(`${adminUrl}/users/search_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: searchText }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 100) {
          setUsers(data.data);
        } else {
          throw new Error('Failed to fetch users');
        }
      })
      .catch((error) => {
        console.error(error);
        message.error('Failed to fetch users');
      });
  };

  const onSearch = (value) => {
    fetchUsers(value);
  };

  const onSelect = (value, option) => {
    setSelectedUserId(option.key);
  };

  const handleSubmit = (values) => {
    setLoading(true); // Start loading
    fetch(`${adminUrl}/expenses/add_expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: values.reason,
        amount: values.amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Stop loading
        if (data.status === 100) {
          message.success(data.message);
          navigate('/admin/users/expenseslist');
        } else {
          throw new Error(data.message || 'Failed to add expense.');
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        console.error(error);
        message.error('Failed to add expense.');
      });
  };

  return (
    <>
      <PageHeader title="Add Expense" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Form form={form} name="AddExpense" onFinish={handleSubmit}>
                <BasicFormWrapper>
                    <div className="add-product-block">
                      <Row gutter={15}>
                        <Col xs={24}>
                          <div className="add-product-content">
                            <Cards title="Add Expense">
                                <Form.Item name="reason" label="Reason" rules={[{ required: true, message: 'Please input the reason!' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input the amount!' }]}>
                                    <InputNumber prefix="shs" style={{ width: '100%' }} />
                                </Form.Item>
                            </Cards>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  <div className="add-form-action">
                    <Form.Item>
                      <Button className="btn-cancel" size="large" onClick={() => form.resetFields()}>
                        Cancel
                      </Button>
                      <Button size="large" htmlType="submit" type="primary" raised loading={loading}>
                        Add Expense
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

export default ExpenseAdding;
