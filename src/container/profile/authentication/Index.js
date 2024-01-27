import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { AuthenticationWrap } from './overview/style';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <AuthenticationWrap>
          <div className="ninjadash-authentication-wrap">
            <div className="ninjadash-authentication-brand">
              <img src={require(`../../../static/img/logo-new.png`)} alt="failed" />
            </div>
            <WraperContent />
          </div>
        </AuthenticationWrap>
      </Suspense>
    );
  };
};

export default AuthLayout;
