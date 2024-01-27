import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Upload, message, Spin } from 'antd';
import UilExport from '@iconscout/react-unicons/icons/uil-export';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { useNavigate } from 'react-router-dom';
import { adminUrl } from '../../../apiUrls/apiUrls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Dragger } = Upload;

const CustomTextArea = ({ value, ...props }) => {
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    if (value) {
      const formattedText = value.replace(/<strong>(.*?)<\/strong>/g, '<b>$1</b>');
      setFormattedValue(formattedText);
    }
  }, [value]);

  return <Input.TextArea value={formattedValue} {...props} />;
};

function ProductsUpdate() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Edit Product',
    },
  ];
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
    productImage: null,
  });
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const productId = window.location.hash.split('/').pop();
    fetch(`${adminUrl}/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setState({ ...state, productImage: data.product_image });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        name: productData.product_name,
        description: productData.product_description,
      });
    }
  }, [productData]);

  const fileUploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        setState({ ...state, productImage: info.file.response.url });
      } else if (status === 'error') {
      }
    },
    listType: 'picture',
    defaultFileList: state.list,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const productId = window.location.hash.split('/').pop();
    // const productId = window.location.pathname.split('/').pop();
    const updatedProductData = new FormData();
    updatedProductData.append('product_name', values.name);
    updatedProductData.append('product_description', values.description);

    if (state.file) {
      updatedProductData.append('product_image', state.file.originFileObj);
    } else {
      updatedProductData.append('product_image', state.productImage);
    }

    try {
      const response = await fetch(`${adminUrl}/products/${productId}`, {
        method: 'PUT',
        body: updatedProductData,
      });

      if (response.ok) {
        message.success('Product updated successfully.');
        setLoading(false);
        navigate('/admin/users/productlist');
      } else {
        throw new Error('Failed to update product.');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error('Failed to update product.');
    }
  };

  const handleDescriptionChange = (content) => {
    form.setFieldsValue({ description: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Edit Product" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="editProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Product">
                                  <Form.Item name="name" label="Product Name">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item name="description" label="Product Description">
                                    <ReactQuill
                                      value={form.getFieldValue('description')}
                                      onChange={handleDescriptionChange}
                                    />
                                  </Form.Item>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Product Image">
                                  <Dragger {...fileUploadProps}>
                                    {state.productImage ? (
                                      <div>
                                        <img src={state.productImage} alt="Product" style={{ width: '100%', height: '100%' }} />
                                        <div className="upload-instructions">
                                          <p className="ant-upload-drag-icon">
                                            <UilExport />
                                          </p>
                                          <Heading as="h4" className="ant-upload-text">
                                            Drag and drop an image
                                          </Heading>
                                          <p className="ant-upload-hint">or Browse to choose a file</p>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <p className="ant-upload-drag-icon">
                                          <UilExport />
                                        </p>
                                        <Heading as="h4" className="ant-upload-text">
                                          Drag and drop an image
                                        </Heading>
                                        <p className="ant-upload-hint">or Browse to choose a file</p>
                                      </>
                                    )}
                                  </Dragger>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                        size="large"
                        htmlType="submit"
                        type="primary"
                        raised
                        disabled={loading}
                        style={{ backgroundColor: '#47abff' }}
                      >
                        {loading ? <Spin /> : 'Update Product'}
                      </Button>
                     </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default ProductsUpdate;
