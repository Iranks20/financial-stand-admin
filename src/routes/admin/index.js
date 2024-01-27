import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Axios from './axios';
import Ecommerce from './ecommerce';
import Features from './features';
import Pages from './pages';
import Users from './users';
import withAdminLayout from '../../layout/withAdminLayout';

const KnowledgeBase = lazy(() => import('../../container/pages/knowledgeBase/Index'));
const AllArticle = lazy(() => import('../../container/pages/knowledgeBase/AllArticle'));
const KnowledgeSingle = lazy(() => import('../../container/pages/knowledgeBase/SingleKnowledge'));
const Components = lazy(() => import('./components'));
const Icons = lazy(() => import('./icons'));
const Tables = lazy(() => import('./table'));
const Firebase = lazy(() => import('./firebase'));
const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
        <Routes>
          <Route index path="/*" element={<Pages />} />
          <Route path="/pages/*" element={<Pages />} />
          <Route path="all-articles" element={<AllArticle />} />
          <Route path="knowledgeBase/*" element={<KnowledgeBase />} />
          <Route path="knowledgebaseSingle/:id" element={<KnowledgeSingle />} />
          <Route path="components/*" element={<Components />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="features/*" element={<Features />} />
          <Route path="/ecommerce/*" element={<Ecommerce />} />
          <Route path="icons/*" element={<Icons />} />
          <Route path="tables/*" element={<Tables />} />
          <Route path="firestore/*" element={<Firebase />} />
          <Route path="axios/*" element={<Axios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);