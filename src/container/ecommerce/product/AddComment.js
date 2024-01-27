import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, message, Upload } from 'antd';
import UilExport from '@iconscout/react-unicons/icons/uil-export';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { adminUrl } from '../../../apiUrls/apiUrls';


const { TextArea } = Input;

const { Dragger } = Upload;


function AddComment() {
  const navigate = useNavigate();
  // const PageRoutes = [
  //   {
  //     path: '/admin',
  //     breadcrumbName: 'Dashboard',
  //   },
  //   {
  //     path: '',
  //     breadcrumbName: 'Add Comment',
  //   },
  // ];
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const [state, setState] = useState({
    file: null,
    list: null,
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
    defaultFileList: null,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Create form data to send as a multipart/form-data request
      const formData = new FormData();
      formData.append('blog_id', values.blog_id);
      formData.append('full_name', values.full_name);
      formData.append('email', values.email);
      formData.append('message', values.message);
      formData.append('photo', state.file.originFileObj);
  
      const response = await fetch(`${adminUrl}/comments`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Handle the response data or show success message
      console.log('Comment added:', data);
      message.success('Comment added successfully.');
      form.resetFields();
      navigate('/admin/users/commentlist');
    } catch (error) {
      // Handle error or show error message
      console.error('Error adding comment:', error);
      message.error('Failed to add comment. Please try again.');
    }
    setSubmitting(false);
  };
  
  

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={18} xs={24}>
                  <BasicFormWrapper>
                    <Form form={form} name="addComment" onFinish={handleSubmit}>
                      <div className="add-product-block">
                        <Row gutter={15}>
                          <Col xs={24}>
                            <div className="add-product-content">
                              <Cards title="Add Comment">
                                <Form.Item name="blog_id" label="Blog Id" rules={[{ required: true, message: 'please enter the id of  the blog your commentint at' }]}>
                                  <Input />
                                </Form.Item>
                                <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: 'Please enter Full Name' }]}>
                                  <Input />
                                </Form.Item>
                                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
                                  <Input />
                                </Form.Item>
                                <Form.Item name="message" label="Comment Message" rules={[{ required: true, message: 'Please enter comment message' }]}>
                                  <TextArea rows={5} />
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
                                    <p className="ant-upload-drag-icon">
                                      <UilExport />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">
                                      or <span>Browse</span> to choose a file
                                    </p>
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
                            disabled={submitting}
                          >
                            Cancel
                          </Button>
                          <Button size="large" htmlType="submit" type="primary" raised loading={submitting} style={{ backgroundColor: "#47abff" }}>
                            Save Comment
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </BasicFormWrapper>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default AddComment;
