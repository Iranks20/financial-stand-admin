import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { AuthFormWrap } from './style';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/authentication/actionCreator';
import { adminUrl } from '../../../../apiUrls/apiUrls';

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const memberData = localStorage.getItem('member_details');
  const parsedData = JSON.parse(memberData);
  const user_id = parsedData.user_id
  console.log('current user id :', user_id)

  const handleSubmit = useCallback(async (values) => {
    if (!user_id) {
      message.error("User ID is missing. Please try again.");
      return;
    }

    try {
      const response = await fetch(`${adminUrl}/users/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          code: values.code,
        }),
      });

      const data = await response.json();

      if (data.status === 100) {
        dispatch(login(data.data.token)); // Assuming the token is needed for login
        localStorage.setItem('login', 'true'); // Update local storage as necessary
        navigate('/user');
      } else {
        message.error(data.message || 'Verification failed, please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  }, [user_id, navigate, dispatch]);

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="verifyOTP" form={form} onFinish={handleSubmit} layout="vertical">
            <div className="ninjadash-authentication-top">
              <h2 className="ninjadash-authentication-top__title">Verify OTP</h2>
            </div>
            <div className="ninjadash-authentication-content">
              <p className="verify-text">
                Enter the OTP sent to your email address.
              </p>
              <Form.Item
                label="OTP Code"
                name="code"
                rules={[{ required: true, message: 'Please input the OTP code!' }]}
              >
                <Input placeholder="OTP Code" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-verify" htmlType="submit" type="primary" size="large">
                  Verify Code
                </Button>
              </Form.Item>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default OTPVerification;
