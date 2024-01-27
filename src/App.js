import { ConfigProvider, Spin } from 'antd';
import 'antd/dist/antd.less';
import React, { useEffect, useState, lazy } from 'react';
import { Provider, useSelector } from 'react-redux';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import SimpleReactLightbox from 'simple-react-lightbox';
import { ThemeProvider } from 'styled-components';
import ProtectedRoute from './components/utilities/protectedRoute';
import config from './config/config';
import store, { rrfProps } from './redux/store';
import history from './customHistory'; // Import the custom history object


import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';

const NotFound = lazy(() => import('./container/pages/404'));

const { themeColor } = config;

function ProviderConfig() {
  const { rtl, topMenu, mainContent, auth } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      mainContent: state.ChangeLayoutMode.mode,
      auth: state.fb.auth,
    };
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localStorageLogin = localStorage.getItem('login');
    setIsLoading(false);

    if ((localStorageLogin === 'true' || auth.login) && history.location.pathname !== "/user") {
      history.push('/user');
    }
  }, [auth.login]);

  const loginStatus = localStorage.getItem('login');
  console.log(loginStatus)

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {!isLoaded(auth) || isLoading ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <SimpleReactLightbox>
              <Router>
                <Routes>
                  {loginStatus === 'true' ? (
                    <Route path="/user*" element={<Admin />} />
                  ) : (
                    <Route path="/*" element={<Auth />} />
                  )}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </SimpleReactLightbox>
          )}
        </ReactReduxFirebaseProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}


function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;
