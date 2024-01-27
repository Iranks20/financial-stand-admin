import {
  UilBookOpen,
} from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import { NavTitle } from './Style';
import versions from '../demoData/changelog.json';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const dispatch = useDispatch();

  const path = '/admin';

  // const pathName = window.location.pathname;
  // const pathArray = pathName.split(path);
  // Replace window.location.pathname with window.location.hash
  const pathName = typeof window !== 'undefined' ? window.location.hash : '';
  const pathArray = pathName.split(path);

  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const changeLayout = (mode) => {
    dispatch(changeLayoutMode(mode));
  };
  const changeNavbar = (topMode) => {
    const html = document.querySelector('html');
    if (topMode) {
      html.classList.add('ninjadash-topmenu');
    } else {
      html.classList.remove('ninjadash-topmenu');
    }
    dispatch(changeMenuMode(topMode));
  };
  const changeLayoutDirection = (rtlMode) => {
    if (rtlMode) {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'rtl');
    } else {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'ltr');
    }
    dispatch(changeDirectionMode(rtlMode));
  };

  const darkmodeActivated = () => {
    document.body.classList.add('dark-mode');
  };

  const darkmodeDiactivated = () => {
    document.body.classList.remove('dark-mode');
  };

  const items = [
    getItem(
      !topMenu && <NavTitle className="ninjadash-sidebar-nav-title">{t('Pages')}</NavTitle>,
      'page-title',
      null,
      null,
      'group',
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/users/testimoniallist`}>
        {('Users')}
      </NavLink>,
      'users',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/users/testimoniallist`}>
          <UilBookOpen />
        </NavLink>
      ),
    ),

    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/users/aboutlist`}>
        {('Savings')}
      </NavLink>,
      'about',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/users/aboutlist`}>
          <UilBookOpen />
        </NavLink>
      ),
    ),
    // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/users/commentlist`}>
    //     {t('Comments')}
    //   </NavLink>,
    //   'Comments',
    //   !topMenu && (
    //     <NavLink className="menuItem-iocn" to={`${path}/users/commentlist`}>
    //       <UilBookOpen />
    //     </NavLink>
    //   ),
    // ),

    // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/users/sponsorslist`}>
    //     {t('sponsors')}
    //   </NavLink>,
    //   'sponsors',
    //   !topMenu && (
    //     <NavLink className="menuItem-iocn" to={`${path}/users/sponsorslist`}>
    //       <UilBookOpen />
    //     </NavLink>
    //   ),
    // ),

    // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/users/otcdesklist`}>
    //     {t('Otc Desk')}
    //   </NavLink>,
    //   'Otc Desk',
    //   !topMenu && (
    //     <NavLink className="menuItem-iocn" to={`${path}/users/otcdesklist`}>
    //       <UilBookOpen />
    //     </NavLink>
    //   ),
    // ),

    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/users/headingslist`}>
        {t('Fines')}
      </NavLink>,
      'fines',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/users/headingslist`}>
          <UilBookOpen />
        </NavLink>
      ),
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/users/sponsorslist`}>
        {('Loans')}
      </NavLink>,
      'loans',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/users/sponsorslist`}>
          <UilBookOpen />
        </NavLink>
      ),
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/users/testimoniallist`}>
        {('Expenses')}
      </NavLink>,
      'expenses',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/users/testimoniallist`}>
          <UilBookOpen />
        </NavLink>
      ),
    ),

    // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/users/bloglist`}>
    //     {t('Blogs')}
    //   </NavLink>,
    //   'Blogs',
    //   !topMenu && (
    //     <NavLink className="menuItem-iocn" to={`${path}/users/bloglist`}>
    //       <UilBookOpen />
    //     </NavLink>
    //   ),
    // ),
    // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/users/faqslist`}>
    //     {t('Faqs')}
    //   </NavLink>,
    //   'Faqs',
    //   !topMenu && (
    //     <NavLink className="menuItem-iocn" to={`${path}/users/faqslist`}>
    //       <UilBookOpen />
    //     </NavLink>
    //   ),
    // ),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
