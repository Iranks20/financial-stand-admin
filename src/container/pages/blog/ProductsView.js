import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import ProductCard from '../../../components/cards/ProductCard';
import { Main } from '../../styled';
import { useNavigate } from 'react-router-dom';

function ProductsView() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch('http://54.243.89.55:8030/api/products')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error(error));
  }, []);

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Products',
    },
  ];

  const handleAddNewProduct = () => {
    navigate('/admin/ecommerce/products-adding');
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <PageHeader className="ninjadash-page-header-main" title="Products" routes={PageRoutes} />
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddNewProduct}>
            Add New Product
          </Button>
        </Col>
      </Row>
      <Main>
        <Row gutter={25} className="mt-sm-10">
          {productData.map((product) => (
            <Col key={product.product_id} xl={8} sm={12} xs={24}>
              <ProductCard item={product} />
            </Col>
          ))}
        </Row>
      </Main>
    </>
  );
}

export default ProductsView;
