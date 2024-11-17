import React, { useState } from "react";
import { Form, Input, notification } from "antd";
import InputCustom from "../../../components/Input/InputCustom";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import registerImage from "../../../assets/registerImage.png";
import { CLIENT_URI, EMAIL_REGEX, PASSWORD_REGEX } from "../../../constants";
import { register } from "../../../services/GuestService";
import { style } from "../Login/styled";

export const RegisterPage = () => {
  const [messageResp, setMessageResp] = useState({
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const onRegister = (values) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    console.log("Success:", values);
    register(data)
      .then((resp) => {
        notification.success({
          message: "Đăng ký tài khoản thành công!"
        })
      })
      navigate(CLIENT_URI.LOGIN)
      .catch((err) => {
        setMessageResp({
          type: "error",
          message: err.response.data.message || err.message || "Đăng ký tài khoản thất bại!",
        });
      });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ ...style.leftSide, flex: "1", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={logo} alt="Deutsch Nerd" style={{ width: "120px", height: "60px" }} />
          <h2 style={{ fontSize: "26px", fontWeight: "bold", margin: "10px 0" }}>Chào mừng đến với Deutsch Nerd</h2>
          <p style={{ color: "#666", fontSize: "16px" }}>Đăng ký tài khoản mới của bạn tại đây</p>
        </div>
        <Form layout="vertical" name="formLogin" style={{ width: "100%", maxWidth: "400px" }} onFinish={onRegister}>
          <Form.Item
            name="fullName"
            label="Họ và Tên"
            rules={[
              { min: 2, message: "Tên phải có ít nhất 2 kí tự" },
              { required: true, message: "Vui lòng nhập tên của bạn" },
              { pattern: /^[\p{L} ]+$/u, message: "Tên phải là chuỗi các ký tự" },
            ]}
          >
            <InputCustom placeholder="Nhập tên của bạn" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <InputCustom placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                pattern: PASSWORD_REGEX,
                message: "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
              },
            ]}
          >
            <Input.Password type="password" placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password type="password" placeholder="Xác nhận mật khẩu" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <ButtonCustom htmlType="submit" type="primary" style={{ width: "100%", background: "#ffa454" }}>
              Đăng ký
            </ButtonCustom>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "#666" }}>
            <Link to={CLIENT_URI.FORGOT_PASSWORD}>Quên mật khẩu</Link>
            <span>
              Bạn đã có tài khoản? <Link to={CLIENT_URI.LOGIN}>Đăng nhập tại đây</Link>
            </span>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span>Hoặc đăng ký với</span>
            <ButtonCustom type="primary" icon={<GoogleOutlined />} shape="circle" style={{ marginLeft: "10px" }} />
          </div>
        </Form>
      </div>
      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={registerImage} alt="Deutsch Nerd" style={{ width: "100%", height: "100vh", objectFit: "cover", borderRadius: "0 20px 20px 0" }} />
      </div>
    </div>
  );
};

export default RegisterPage;
