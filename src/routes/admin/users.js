import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import WelfareList from '../../container/users/welfares';

const Users = lazy(() => import('../../container/users/Users'));
const AddUser = lazy(() => import('../../container/users/AddUsers'));
const DataTable = lazy(() => import('../../container/users/UserListDataTable'));
const BlogTable = lazy(() => import('../../container/users/BlogList'));
const ProductTable = lazy(() => import('../../container/users/ProductList'));
const TestimonialsTable = lazy(() => import('../../container/users/TestimonialsList'));
const AboutTable = lazy(() => import('../../container/users/AboutList'));
const CommentsTable = lazy(() => import('../../container/users/CommentsList'));
const OtcdeskTable = lazy(() => import('../../container/users/OtcdeskList'));
const HeadingsTable = lazy(() => import('../../container/users/HeadingsList'));
const SponsorsTable = lazy(() => import('../../container/users/SponsorsList'));
const FaqsTable = lazy(() => import('../../container/users/FaqsList'));
const Team = lazy(() => import('../../container/users/Team'));
const NotFound = lazy(() => import('../../container/pages/404'));

function PagesRoute() {
  return (
    <Routes>
      <Route path="/*" element={<Users />} />
      <Route path="add-user/*" element={<AddUser />} />
      <Route path="dataTable" element={<DataTable />} />
      <Route path="bloglist" element={<BlogTable />} />
      <Route path="productlist" element={<ProductTable />} />
      <Route path="testimoniallist" element={<TestimonialsTable />} />
      <Route path="aboutlist" element={<AboutTable />} />
      <Route path="commentlist" element={<CommentsTable />} />
      <Route path="otcdesklist" element={<OtcdeskTable />} />
      <Route path="headingslist" element={<HeadingsTable />} />
      <Route path="sponsorslist" element={<SponsorsTable />} />
      <Route path="faqslist" element={<FaqsTable />} />
      <Route path="team" element={<Team />} />
      <Route path="welfarelist" element={<WelfareList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PagesRoute;
