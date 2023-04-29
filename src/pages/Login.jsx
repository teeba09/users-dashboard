import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useApp } from "../store/useApp";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const { setIisLogin } = useApp();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  const onFinish = (data) => {
    console.log(
      JSON.stringify({
        username: "mor_2314",
        password: "83r5^_",
      })
    );
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setIisLogin(true);
        navigate("/");
      })
      .catch((error) => {
        setIisLogin(false);
        message.warning("something went wrong");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center"> login page</div>
      <div className="flex justify-center items-center m-16">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
