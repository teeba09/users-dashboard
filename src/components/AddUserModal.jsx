import React from "react";

import { Modal, Button, Form, Input, Col, Row, Typography } from "antd";
import { useMutation } from "react-query";
import { addNewUser } from "../api";
import { useApp } from "../store/useApp";
import { queryClient } from "../queryClient";

function AddUserModal() {
  const { isAddUserModal, setIisAddUserModal } = useApp();

  const { mutate, isLoading } = useMutation(addNewUser, {
    onSuccess: (data) => {
      setIisAddUserModal(false);
      queryClient.invalidateQueries("users");
    },
  });
  const onCancelfunc = () => {
    setIisAddUserModal(false);
  };
  const [form] = Form.useForm();

  const { Title } = Typography;

  const onFinish = (values) => {
    const createdAt = new Date();
    const date = new Date(createdAt);
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    values.createdAt = formattedDate;
    values.role = "user";
    mutate(values);
  };

  return (
    <div>
      <Modal
        forceRender
        title={<Title level={5}> Add User</Title>}
        onCancel={onCancelfunc}
        footer={false}
        destroyOnClose={true}
        width={400}
        centered
        visible={isAddUserModal}
      >
        <Form
          requiredMark={"optional"}
          name="basic"
          form={form}
          footer={false}
          initialValues={{ remember: true, price: 0 }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true }]}
              >
                <Input placeholder="UserName" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <Input placeholder=" First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder={"07**** ****"}
                  maxLength="11"
                  minLength="11"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input placeholder={"example@gmail.com"} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input placeholder="******" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button loading={isLoading} htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default AddUserModal;
