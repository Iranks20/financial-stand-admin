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

function EditBlog() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState({});

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
    file2: null,
    list: null,
    submitValues: {},
    blogImage: null,
  });

  const [blogsImage, setBlogsImage] = useState('');
  const [blogImage2, setBlogImage2] = useState('');

  useEffect(() => {
    fetch(`${adminUrl}/blogs/${blogId}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogData(data);
        setBlogsImage(data.blog_image);
        setBlogImage2(data.blog_image2);
      })
      .catch((error) => console.error(error));
  }, [blogId]);

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        setBlogsImage(response.url);
        setState({ ...state, blogImage: info.file.response.url });
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

  const fileUploadProps2 = {
    name: 'file2',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status, response } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file2: info.file });
      }
      if (status === 'done') {
        setBlogImage2(response.url);
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

    const updatedValues = {
      ...values,
      description: form.getFieldValue('description'),
      file: state.file,
    };

    const formData = new FormData();
    Object.entries(updatedValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (state.file) {
      formData.append('blog_image', state.file.originFileObj);
    } else {
      formData.append('blog_image', state.blogImage);
    }

    if (state.file2) {
      formData.append('blog_image2', state.file2.originFileObj);
    } else {
      formData.append('blog_image2', blogImage2);
    }

    fetch(`${adminUrl}/blogs/${blogId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        message.success('Blog updated successfully.');
        navigate('/admin/users/bloglist');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        message.error('Failed to update blog.');
      });
  };

  useEffect(() => {
    form.setFieldsValue(blogData);
  }, [form, blogData]);

  const handleEditorChange = (content) => {
    form.setFieldsValue({ description: content });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="View & Edit Blog" routes={PageRoutes} />
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
                                <Cards title="About Blog">
                                  <Form.Item name="blog_title" label="Blog Title">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="category" label="Category">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="description" label="Blog Description">
                                    <ReactQuill
                                      value={form.getFieldValue('description')}
                                      onChange={handleEditorChange}
                                    />
                                  </Form.Item>
                                  <Form.Item name="blog_author" label="Blog Author">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="blog_quote" label="Blog Quote">
                                    <Input />
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
                                <Cards title="Primary Image">
                                  <Dragger {...fileUploadProps}>
                                    {blogsImage ? (
                                      <div>
                                        <img src={blogsImage} alt="Primary Image" style={{ width: '100%', height: '100%' }} />
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
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Additional Image">
                                  <Dragger {...fileUploadProps2}>
                                    {blogImage2 ? (
                                      <div>
                                        <img src={blogImage2} alt="Additional Image" style={{ width: '100%', height: '100%' }} />
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
                            <Button size="large" htmlType="submit" type="primary" raised disabled={loading} style={{ backgroundColor: "#47abff" }}>
                              {loading ? <Spin /> : 'Update Blog'}
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

export default EditBlog;
