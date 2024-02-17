// import { Button, Col, Form, Input, Row, message } from 'antd';
// import React, { useCallback, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { AuthFormWrap } from './style';
// import { Checkbox } from '../../../../components/checkbox/checkbox';
// import { login } from '../../../../redux/authentication/actionCreator';
// import { adminUrl } from '../../../../apiUrls/apiUrls';

// function SignIn() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isLoading = useSelector((state) => state.auth.loading);
//   const [form] = Form.useForm();
//   const [state, setState] = useState({
//     checked: null,
//   });

//   const handleSubmit = useCallback(async (values) => {
//     console.log(values)
//     try {
//       const response = await fetch(`${adminUrl}/users/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         dispatch(login(data.token));
//         localStorage.setItem('login', 'true');
//         navigate('/admin');
//       } else {
//         message.error(data.error);
//       }
//     } catch (error) {
//       message.error('An error occurred. Please try again.');
//     }
//   }, [dispatch, navigate]);

//   const onChange = (checked) => {
//     setState({ ...state, checked });
//   };

//   return (
//     <Row justify="center">
//       <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
//         <AuthFormWrap>
//           <div className="ninjadash-authentication-top">
//             <h2 className="ninjadash-authentication-top__title">Sign in To Financial Stand Savings Group</h2>
//           </div>
//           <div className="ninjadash-authentication-content">
//             <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
//               <Form.Item
//                 name="email"
//                 rules={[{ message: 'Please input your username or Email!', required: true }]}
//                 label="Username or Email Address"
//               >
//                 <Input placeholder="please enter admin email" />
//               </Form.Item>
//               <Form.Item name="password" label="Password">
//                 <Input.Password placeholder="please enter password" />
//               </Form.Item>
//               <Form.Item>
//                 <Button className="btn-signin" htmlType="submit" type="primary" size="large" style={{ backgroundColor: "#47abff", borderColor: "#47abff" }}>
//                   {isLoading ? 'Loading...' : 'Sign In'}
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//           <div className="ninjadash-authentication-bottom"></div>
//         </AuthFormWrap>
//       </Col>
//     </Row>
//   );
// }

// export default SignIn;


import { Button, Col, Form, Input, Row, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthFormWrap } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { adminUrl } from '../../../../apiUrls/apiUrls';


function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = useCallback(async (values) => {
    try {
      const requestBody = {
        ...values,
        type: "ADMIN"
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
        dispatch(login(data.data.token));
        localStorage.setItem('login', 'true');
        localStorage.setItem('member_details', JSON.stringify(data.data));
        navigate('/admin');
      } else {
        message.error(data.message || 'Login failed, please try again.');
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
            <h2 className="ninjadash-authentication-top__title">SignIn To Your Account</h2>
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
                <NavLink className="forgot-pass-link" to="/forgotPassword">
                  Forgot password?
                </NavLink>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large" style={{ backgroundColor: "#47abff", borderColor: "#47abff" }}>
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Don't have an account?<Link to="/register">Sign up</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
