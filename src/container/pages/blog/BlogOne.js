import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import BlogCard from '../../../components/cards/BlogCard';
import { Main } from '../../styled';

function BlogOne() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://54.243.89.55:8030/api/blogs')
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.error(error));
  }, []);

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Blog One',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Blog One" routes={PageRoutes} />
      <Main>
        <Row gutter={25} className="mt-sm-10">
          {blogData.slice(0, 9).map((blog) => (
            <Col key={blog.blog_id} xl={8} sm={12} xs={24}>
              <BlogCard item={blog} />
            </Col>
          ))}
        </Row>
      </Main>
    </>
  );
}

export default BlogOne;
