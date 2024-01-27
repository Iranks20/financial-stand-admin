import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const Maintenance = lazy(() => import('../../container/pages/Maintenance'));
const Search = lazy(() => import('../../container/pages/SearchResult'));
const TermsCondition = lazy(() => import('../../container/pages/TermsComditions'));
const Wizards = lazy(() => import('../../container/pages/wizards/Wizards'));
const BlogOne = lazy(() => import('../../container/pages/blog/BlogOne'));
const ProductsView = lazy(() => import('../../container/pages/blog/ProductsView'));
const BlogTwo = lazy(() => import('../../container/pages/blog/BlogTwo'));
const BlogThree = lazy(() => import('../../container/pages/blog/BlogThree'));
const BlogDetails = lazy(() => import('../../container/pages/blog/BlogDetails'));
const BlankPage = lazy(() => import('../../container/pages/BlankPage'));
const Settings = lazy(() => import('../../container/profile/settings/Settings'));
const ChangeLog = lazy(() => import('../../container/pages/ChangeLog'));
const Banners = lazy(() => import('../../container/pages/Banners'));
const Testimonials = lazy(() => import('../../container/pages/Testimonials'));
const TestimonialsTable = lazy(() => import('../../container/users/TestimonialsList'));
const Sponsors = lazy(() => import('../../container/pages/Sponsors'));
const OtcDesk = lazy(() => import('../../container/pages/OtcDesk'));
const HomePage = lazy(() => import('../../container/pages/HomePage'));



function PagesRoute() {
  return (
    <Routes>
      <Route index element={<TestimonialsTable />} />
      <Route path="changelog" element={<ChangeLog />} />
      <Route path="banners" element={<Banners />} />
      <Route path="testimonials" element={<Testimonials />} />
      <Route path="sponsors" element={<Sponsors />} />
      <Route path="otcdesk" element={<OtcDesk />} />
      <Route path="homepage" element={<HomePage />} />
      <Route path="search" element={<Search />} />
      <Route path="starter" element={<BlankPage />} />
      <Route path="termCondition" element={<TermsCondition />} />
      <Route path="wizards/*" element={<Wizards />} />
      <Route path="blog/blogone" element={<BlogOne />} />
      <Route path="/products-view" element={<ProductsView />} />
      <Route path="blog/blogtwo" element={<BlogTwo />} />
      <Route path="blog/blogthree" element={<BlogThree />} />
      <Route path="blog/details" element={<BlogDetails />} />
      <Route path="*" element={<NotFound />} />
      <Route path="maintenance" element={<Maintenance />} />
    </Routes>
  );
}

export default PagesRoute;
