import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { BlogCardStyleWrap } from './Style';
import UilFile from '@iconscout/react-unicons/icons/uil-file-alt';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart-sign';
import propTypes from 'prop-types';

function ProductCard({ item, theme }) {
  const { product_id, product_name, product_description, product_image } = item;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/ecommerce/products-update/${product_id}`);
  };

  const handleDelete = () => {
    setLoading(true);

    // Send a DELETE request to the API
    fetch(`http://localhost:8030/api/products/${product_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log('Product deleted:', data);
        message.success('Product deleted successfully.');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error deleting product:', error);
        message.error('Failed to delete product.');
      });
  };

  return (
    <BlogCardStyleWrap>
      <figure className={`ninjadash-blog ninjadash-blog-${theme}`}>
        <div className="ninjadash-blog-thumb">
          <img className="ninjadash-blog__image" src={product_image} alt="ninjadash Product" />
        </div>
        <figcaption>
          <div className="ninjadash-blog-info">
            <h2 className="ninjadash-blog-title">
              <Link to="#">{product_name}</Link>
            </h2>
            <div className="ninjadash-blog-text">{product_description}</div>
            <div className="ninjadash-blog-buttons">
              <Button size="default" type="primary" onClick={handleEdit}>
                Edit
              </Button>
              <span className="button-spacing" />
              <Button size="default" type="danger" onClick={handleDelete} loading={loading} style={{ marginLeft: '10px' }}>
                Delete
              </Button>
            </div>
          </div>
          <div className="ninjadash-blog-footer">
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

ProductCard.propTypes = {
  item: propTypes.object.isRequired,
  theme: propTypes.string,
};

export default ProductCard;
