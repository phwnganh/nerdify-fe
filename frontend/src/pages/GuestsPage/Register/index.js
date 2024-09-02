import React, { useState } from "react";
import { Form } from "antd";
import InputCustom from "../../../components/Input";
import ButtonCustom from "../../../components/Button";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import registerImage from "../../../assets/registerImage.png";
import { authService } from "../../../services";
import { CLIENT_URI, EMAIL_REGEX, PASSWORD_REGEX } from "../../../constants";

export const RegisterPage = () => {
  const [messageResp, setMessageResp] = useState({
    type: "",
    message: "",
  });
  const onRegister = (values) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    console.log("Success:", values);
    authService
      .register(data)
      .then((resp) => {
        setMessageResp({
          type: "success",
          message: resp.data.message,
        });
      })
      .catch((err) => {
        setMessageResp({
          type: "error",
          message:
            err.response.data.message ||
            err.message ||
            "Đăng ký tài khoản không thành công",
        });
      });
  };

  return (
    <div style={style.loginContainer}>
      <div style={style.leftSide}>
        <div style={style.formLogin}>
          <img
            src={logo}
            alt="Deustch Nerd"
            style={{ width: "100px", height: "50px" }}
          />
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Chào mừng đến với Deustch Nerd
          </span>
          <span>Đăng ký tài khoản mới của bạn tại đây</span>
          <Form
            layout="vertical"
            name="formLogin"
            style={{ width: "100%" }}
            onFinish={onRegister}
          >
            {/* input full name */}
            <Form.Item
              name="fullName"
              label="Họ và Tên"
              rules={[
                { min: 2, message: "Tên phải có ít nhất 2 kí tự" },
                {
                  required: true,
                  message: "Vui lòng nhập tên của bạn",
                },
                {
                  pattern: /^[\p{L} ]+$/u,
                  message: "Tên phải là chuỗi các ký tự",
                },
              ]}
            >
              <InputCustom
                placeholder="Nhập tên của bạn"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            {/* input email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                {
                  type: "email",
                  message: "Email không hợp lệ",
                },
              ]}
            >
              <InputCustom placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>

            {/* input password */}
            <Form.Item
              label="Mật khẩu"
              type="password"
              name="password"
              rules={[
                {
                  pattern: PASSWORD_REGEX,
                  message:
                    "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
                },
              ]}
            >
              <InputCustom
                type="password"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            {/* confirm password */}
            <Form.Item
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui là nhập mật khẩu" },
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
              <InputCustom
                type="password"
                placeholder="Xác nhận mật khẩu"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            {/* button login */}
            <Form.Item>
              <ButtonCustom
                htmlType="submit"
                type="primary"
                style={{ width: "100%", background: "#ffa454" }}
              >
                Đăng ký
              </ButtonCustom>
            </Form.Item>

            {/* forgot password */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Link to={CLIENT_URI.FORGOT_PASSWORD}>Quên mật khẩu</Link>
            </div>

            {/* social login */}
            <div style={{ justifyContent: "space-between" }}>
              <span>Hoặc đăng ký với</span>
              <ButtonCustom
                type="primary"
                icon={<GoogleOutlined />}
                shape="circle"
              />
            </div>
            {/* register link */}
            <div>
              <span>Bạn đã có tài khoản?</span>
              <Link to={CLIENT_URI.LOGIN}>Đăng nhập tại đây</Link>
            </div>
          </Form>
        </div>
      </div>
      <div style={style.rightSide}>
        <img
          src={registerImage}
          alt="Deustch Nerd"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "0 20px 20px 0",
          }}
        />
      </div>
    </div>
  );
};

const style = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    background: "#f4fcfc",
    margin: 0,
    padding: 0,
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "40%",
    height: "80%",
    background: "#ffe45c",
    borderRadius: "0 20px 20px 0",
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    height: "80%",
    background: "white",
    borderRadius: "20px 0 0 20px",
  },
  formLogin: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    width: "80%",
  },
};

export default RegisterPage;