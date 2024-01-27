import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import { logOut } from '../../../redux/authentication/actionCreator';

import { Dropdown } from '../../dropdown/dropdown';
import Heading from '../../heading/heading';

const AuthInfo = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = (e) => {
    e.preventDefault();

    // Clear login status from local storage
    localStorage.removeItem('login');

    // Dispatch logout action
    dispatch(logOut());

    // Navigate to root route
    navigate('/');
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <UilSignout /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <div className="ninjadash-nav-actions__item ninjadash-nav-actions__author">
        <Link to="#" className="ninjadash-nav-action-link">
          <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
            <UilSignout /> Sign Out
          </Link>
        </Link>
      </div>
    </InfoWraper>
  );
});

export default AuthInfo;
