import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { AuthFormWrap } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import { register } from '../../../../redux/authentication/actionCreator';
import { adminUrl } from '../../../../apiUrls/apiUrls';


function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = useCallback(async (values) => {
    try {
      const response = await fetch(`${adminUrl}/users/signup`, { // Replace {{LIVE}} with your actual server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          type: 'ADMIN'
        }),
      });

      const data = await response.json();

      if (data.status === 100) {
        dispatch(register(data.data.token));
        message.success(data.message);
        localStorage.setItem('user_id', data.data.user_id);
        // localStorage.setItem('login', 'true');
        navigate('/otp');
      } else {
        message.error(data.message || 'Registration failed, please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  }, [dispatch, navigate]);

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
          <NavLink style={{float: "left"}} to="http://financialstand.club" target="_blank" rel="noopener noreferrer">Back to login</NavLink>
            <h2 className="ninjadash-authentication-top__title">Sign Up For Account</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
                <Input placeholder="First name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
                <Input placeholder="Last name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Creating an account means you’re okay with our Terms of Service and Privacy Policy
                </Checkbox>
              </div>
              <Form.Item>
              <Button className="btn-signin" htmlType="submit" type="primary" size="large" style={{ backgroundColor: "#47abff", borderColor: "#47abff" }}>
                  {isLoading ? 'Loading...' : 'Create Account'}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Already have an account?<Link to="/">Sign In</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignUp;
