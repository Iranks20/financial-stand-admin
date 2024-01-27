import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Upload, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import UilExport from '@iconscout/react-unicons/icons/uil-export';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { adminUrl } from '../../../apiUrls/apiUrls';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Dragger } = Upload;

function AddBlogs() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    // Fetch blog data and update the state
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`${adminUrl}/blogs/${blogId}`);
        const data = await response.json();
        setBlogData(data);
        console.log('Fetched Data:', data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    file: null,
    list: null,
    file2: null,
    list2: null,
    submitValues: {},
  });

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
      } else if (status === 'error') {
      }
    },
    listType: 'picture',
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const fileUploadProps2 = {
    name: 'file2',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file2: info.file, list2: info.fileList });
      }
      if (status === 'done') {
      } else if (status === 'error') {
      }
    },
    listType: 'picture',
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('blog_title', values.blog_title);
    formData.append('category', values.category);
    formData.append('description', values.description);
    formData.append('blog_author', values.blog_author);
    formData.append('blog_quote', values.blog_quote);
    formData.append('quote_author', values.quote_author);
    formData.append('written_date', values.written_date);
    formData.append('blog_image', state.file.originFileObj);
    formData.append('blog_image2', state.file2.originFileObj);

    fetch(`${adminUrl}/blogs`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated Data:', data);
        setLoading(false);
        navigate('/admin/users/bloglist');
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    form.setFieldsValue(blogData);
  }, [form, blogData]);

  const handleDescriptionChange = (content) => {
    form.setFieldsValue({ description: content });
  };

  const handleQuoteChange = (content) => {
    form.setFieldsValue({ blog_quote: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title=" Add Blog" />
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
                                <Cards title="Add New Blog">
                                  <Form.Item name="blog_title" label="Blog Title">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="category" label="Category">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="description" label="Blog Description">
                                    <ReactQuill
                                      value={form.getFieldValue('description')}
                                      onChange={handleDescriptionChange}
                                    />
                                  </Form.Item>
                                  <Form.Item name="blog_author" label="Blog Author">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="blog_quote" label="Blog Quote">
                                    <ReactQuill
                                      value={form.getFieldValue('blog_quote')}
                                      onChange={handleQuoteChange}
                                    />
                                  </Form.Item>
                                  <Form.Item name="quote_author" label="Quote Author">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="written_date" label="Written Date">
                                    <Input />
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
                                <Cards title="Blog Image">
                                  <Dragger {...fileUploadProps}>
                                    <p className="ant-upload-drag-icon">
                                      <UilExport />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">or Browse to choose a file</p>
                                  </Dragger>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Blog Image 2">
                                  <Dragger {...fileUploadProps2}>
                                    <p className="ant-upload-drag-icon">
                                      <UilExport />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">or Browse to choose a file</p>
                                  </Dragger>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-form-action">
                          <Form.Item>
                            <Button size="large" htmlType="submit" type="primary" raised disabled={loading} style={{ backgroundColor: '#47abff' }}>
                              {loading ? <Spin /> : 'Add Blog'}
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

export default AddBlogs;
