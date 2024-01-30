import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Product = lazy(() => import('../../container/ecommerce/product/Products'));
const ProductAdd = lazy(() => import('../../container/ecommerce/product/AddProduct'));
const ProductEdit = lazy(() => import('../../container/ecommerce/product/EditProduct'));
const BlogEdit = lazy(() => import('../../container/ecommerce/product/EditBlog'));
const AddBlogs = lazy(() => import('../../container/ecommerce/product/AddBlogs'));
const AddFaqs = lazy(() => import('../../container/ecommerce/product/AddFaqs'));
const UpdateShares = lazy(() => import('../../container/ecommerce/product/EditFaq'));
const TestimonialEdit = lazy(() => import('../../container/ecommerce/product/EditTestimonial'));
const EditComments = lazy(() => import('../../container/ecommerce/product/EditComments'));
const AddTestimonial = lazy(() => import('../../container/ecommerce/product/AddTestimonial'));
const AddAbout = lazy(() => import('../../container/ecommerce/product/AddAbout'));
const EditAbout = lazy(() => import('../../container/ecommerce/product/EditAbout'));

const AddComment = lazy(() => import('../../container/ecommerce/product/AddComment'));
const ProductDetails = lazy(() => import('../../container/ecommerce/product/ProductDetails'));
const ProductsUpdate = lazy(() => import('../../container/ecommerce/product/ProductsUpdate'));
const ProductsAdding = lazy(() => import('../../container/ecommerce/product/ProductsAdding'));
const EditSponsors = lazy(() => import('../../container/ecommerce/product/EditSponsors'));
const AddSponsor = lazy(() => import('../../container/ecommerce/product/AddSponsor'));
const EditOtcDesk = lazy(() => import('../../container/ecommerce/product/EditOtcDesk'));
const EditHomePage = lazy(() => import('../../container/ecommerce/product/EditHomePage'));

const NotFound = lazy(() => import('../../container/pages/404'));

function EcommerceRoute() {
  return (
    <Routes>
      <Route path="products/*" element={<Product />} />
      <Route exact path="add-product" element={<ProductAdd />} />
      <Route exact path="addfaqs" element={<AddFaqs />} />
      <Route exact path="update-shares" element={<UpdateShares />} />
      <Route exact path="edit-product" element={<ProductEdit />} />
      <Route exact path="edit-blog/:blogId" element={<BlogEdit />} />
      <Route exact path="add-blog" element={<AddBlogs />} />
      <Route exact path="edit-testimonial/:testimonialId" element={<TestimonialEdit />} />
      <Route exact path="edit-comment/:commentId" element={<EditComments />} />
      <Route exact path="add-testimonial" element={<AddTestimonial />} />
      <Route exact path="add-about" element={<AddAbout />} />
      <Route exact path="edit-about" element={<EditAbout />} />
      <Route exact path="add-comment" element={<AddComment />} />
      <Route exact path="productDetails/:id" element={<ProductDetails />} />
      <Route exact path="products-update/:id" element={<ProductsUpdate />} />
      <Route exact path="products-adding" element={<ProductsAdding />} />
      <Route exact path="edit-sponsor" element={<EditSponsors />} />
      <Route exact path="add-sponsor" element={<AddSponsor />} />
      <Route exact path="edit-otcdesk" element={<EditOtcDesk />} />
      <Route exact path="edit-homepagedata" element={<EditHomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default EcommerceRoute;
