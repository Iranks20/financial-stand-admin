import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, message, Spin, Upload } from 'antd';
import UilExport from '@iconscout/react-unicons/icons/uil-export';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { adminUrl } from '../../../apiUrls/apiUrls';


const { Dragger } = Upload;

function EditComment() {
  const navigate = useNavigate();
  const { commentId } = useParams();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
    commentImage: null,

  });
  const [commentsImage, setCommentsImage] = useState('');

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
        setCommentsImage(response.url); // Set the product image URL from the response
        message.success(`${info.file.name} file uploaded successfully.`);
        setState({ ...state, commentImage: info.file.response.url });
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: state.list,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };


  const handleSubmit = (values) => {
    setLoading(true);
    const updatedValues = {
      ...values,
      file: state.file,
    };
  
    // Create form data to send as a multipart/form-data request
    const formData = new FormData();
    Object.entries(updatedValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Append the existing image if it exists
    if (state.file) {
      // If a new file was uploaded, append the file object to the form data
      formData.append('photo', state.file.originFileObj);
    } else {
      // No file uploaded, continue with the former photo
      formData.append('photo', state.commentImage);
    }

    // Send the updated comment data to the API
    fetch(`${adminUrl}/comments/${commentId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated Comment:', data);
        setLoading(false);
        message.success('Comment updated successfully.');
        navigate('/admin/users/commentlist');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        message.error('Failed to update comment.');
      });
  };
  // ...

    useEffect(() => {
        fetch(`${adminUrl}/comments/${commentId}`)
        .then((response) => response.json())
        .then((data) => {
            form.setFieldsValue({
            blog_id: data[0].blog_id,
            full_name: data[0].full_name,
            email: data[0].email,
            message: data[0].message,
            });
            console.log('Fetched Comment:', data);
            setCommentsImage(data[0].photo); // Set the product image from the API response
            setState({ ...state, commentImage: data[0].photo });
        })
        .catch((error) => console.error(error));
    }, [commentId, form]);
  
  // ...
  

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Edit Comment" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="EditComment" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Comment">
                                  <Form.Item name="blog_id" label="Blog Id">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="full_name" label="Full Name">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="email" label="Email">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="message" label="message">
                                    <Input.TextArea rows={5} />
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
                                  {state.commentImage ? (
                                    <div>
                                      <img src={state.commentImage} alt="Product" style={{ width: '100%', height: '100%' }} />
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
                            <Button size="large" htmlType="submit" type="primary" raised disabled={loading} style={{ backgroundColor: "#47abff" }}>
                              {loading ? <Spin /> : 'Update Comment'}
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

export default EditComment;
