import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputNumber, Input, message, Select } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { useNavigate } from 'react-router-dom';
import { adminUrl } from '../../../apiUrls/apiUrls';

const { Option } = Select;

function FineAdding() {
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
    fetch(`${adminUrl}/fines/add_fine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: selectedUserId,
        amount: values.amount,
        reason: values.reason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Stop loading
        if (data.status === 100) {
          message.success(data.message);
          navigate('/admin/users/headingslist');
        } else {
          throw new Error(data.message || 'Failed to add fine.');
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        console.error(error);
        message.error('Failed to add fine.');
      });
  };

  return (
    <>
      <PageHeader title="Add Fine" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Form form={form} name="addFine" onFinish={handleSubmit}>
                <BasicFormWrapper>
                    <div className="add-product-block">
                      <Row gutter={15}>
                        <Col xs={24}>
                          <div className="add-product-content">
                            <Cards title="adding Fine">
                              <Form.Item name="user_id" label="Full Name" rules={[{ required: true, message: 'Please select a user!' }]}>
                                <Select
                                  showSearch
                                  placeholder="Search user by name"
                                  optionFilterProp="children"
                                  onSearch={onSearch}
                                  onSelect={onSelect}
                                  filterOption={false}
                                >
                                  {users.map(user => (
                                    <Option key={user.user_id} value={user.first_name + ' ' + user.last_name}>
                                      {user.first_name} {user.last_name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.Item name="reason" label="Reason" rules={[{ required: true, message: 'Please input the reason!' }]}>
                                <Select
                                  showSearch
                                  placeholder="Select reason "
                                  optionFilterProp="children"
                                  onSearch={null}
                                  onSelect={(value) => setReason(value)}
                                  filterOption={false}
                                >
                                    <Option key="MISSED_MEETING" value="MISSED_MEETING">
                                      MISSED MEETING
                                    </Option>
                                    <Option key="LATE_SAVING" value="LATE_SAVING">
                                      LATE SAVING
                                    </Option>
                                </Select>
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
                        Add Fine
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

export default FineAdding;
