import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { AuthFormWrap } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { adminUrl } from '../../../../apiUrls/apiUrls';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async (values) => {
    try {
      const requestBody = {
        ...values,
        type: "MEMBER"
      };

      const response = await fetch(`${adminUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.status === 100) {
        dispatch(login(data.data.token)); // Assuming login action updates the state including the isLoading
        localStorage.setItem('login', 'true');
        localStorage.setItem('member_details', JSON.stringify(data.data));
        navigate('/user');
      } else {
        message.error(data.message || 'Login failed, please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  }, [dispatch, navigate]);

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <NavLink style={{float: "left"}} to="http://financialstand.club" target="_blank" rel="noopener noreferrer">Back to home</NavLink>
            <h2 className="ninjadash-authentication-top__title">Log In To Account</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                label="Email Address"
              >
                <Input placeholder="please enter your email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                label="Password"
              >
                <Input.Password placeholder="please enter your password" />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <NavLink to="/forgotPassword">Forgot password?</NavLink>
              </div>
              <Form.Item>
                <Button 
                  className="btn-signin" 
                  htmlType="submit" 
                  type="primary" 
                  size="large" 
                  loading={isLoading}
                  style={{ backgroundColor: "#47abff", borderColor: "#47abff" }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
