import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox } from 'antd';
import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import { useDispatch } from 'react-redux';
import { WizardWrapper, WizardFour } from '../Style';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../styled';

function WizardsFour() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
    profile: {
      fname: '',
      lname: '',
      email: '',
      address: '',
    },
  });

  const { status, isFinished, current, profile } = state;

  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const done = () => {
    const confirm = window.confirm('Are sure to submit order?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
  };

  const onHandleProfile = (event) => {
    setState({
      ...state,
      profile: {
        ...profile,
        [event.target.name]: event.target.value,
      },
    });
  };
  return (
    <WizardWrapper className="ninjadash-wizard-page">
      <WizardFour>
      </WizardFour>
    </WizardWrapper>
  );
}

export default WizardsFour;
