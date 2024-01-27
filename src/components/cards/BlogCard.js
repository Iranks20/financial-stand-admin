import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { BlogCardStyleWrap } from './Style';
import UilFile from '@iconscout/react-unicons/icons/uil-file-alt';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart-sign';
import propTypes from 'prop-types';

function BlogCard({ item, theme }) {
  const { blog_title, description, category, blog_image, blog_author } = item;
  const navigate = useNavigate();

  const formattedDescription = description.split('<br><br>').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  const handleClick = () => {
    const blogId = item.blog_id;
    console.log('Clicked Blog ID:', blogId);
    navigate(`/admin/ecommerce/edit-blog/${blogId}`);
  };
  

  return (
    <BlogCardStyleWrap>
      <figure className={`ninjadash-blog ninjadash-blog-${theme}`}>
        <div className="ninjadash-blog-thumb">
          <img className="ninjadash-blog__image" src={blog_image} alt="ninjadash Blog" />
        </div>
        <figcaption>
          {theme === 'style-1' ? (
            <div className="ninjadash-blog-meta ninjadash-blog-meta-theme-1">
              <span className="ninjadash-blog-meta__single ninjadash-date-meta">01 July 2020</span>
            </div>
          ) : theme === 'style-2' ? (
            <div className="ninjadash-blog-meta ninjadash-blog-meta-theme-2">
              <span className="ninjadash-blog-meta__single ninjadash-category-meta">Web Development</span>
              <span className="ninjadash-blog-meta__single ninjadash-date-meta">01 July 2020</span>
            </div>
          ) : theme === 'style-3' ? (
            <div className="ninjadash-blog-meta ninjadash-blog-meta-theme-3">
              <span className="ninjadash-blog-meta__single ninjadash-date-meta">01 July 2020</span>
              <span className="ninjadash-blog-meta__single ninjadash-category-meta">Web Development</span>
              <span className="ninjadash-blog-meta__single ninjadash-time-meta">6 mins read</span>
            </div>
          ) : (
            ''
          )}
          <div className="ninjadash-blog-info">
            <h2 className="ninjadash-blog-title">
              <Link to="#">{blog_title}</Link>
            </h2>
            <div className="ninjadash-blog-text">{formattedDescription}</div>
            <Button size="default" type="primary" onClick={handleClick}>
              Read More $ Edit
              {/* <UilFile className="ninjadash-blog-icon" /> */}
            </Button>
          </div>
          <div className="ninjadash-blog-footer">
            <div className="ninjadash-blog-author">
              <img src={blog_author.profile_pic} alt="Author" />
              <span>{blog_author.name}</span>
            </div>
            <div className="ninjadash-blog-icons">
              <span className="ninjadash-blog-icon">
                <UilHeart /> 32
              </span>
            </div>
          </div>
        </figcaption>
      </figure>
    </BlogCardStyleWrap>
  );
}

BlogCard.propTypes = {
  item: propTypes.object.isRequired,
  theme: propTypes.string,
};

export default BlogCard;
