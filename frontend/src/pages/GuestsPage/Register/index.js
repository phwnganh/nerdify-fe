import React, { useState } from "react";
import { Form, notification } from "antd";
import InputCustom from "../../../components/Input";
import ButtonCustom from "../../../components/Button";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import registerImage from "../../../assets/registerImage.png";
import { CLIENT_URI, EMAIL_REGEX, PASSWORD_REGEX } from "../../../constants";
import { validationRules } from "../../../helpers/validate";
import { style } from "./styled";

export const RegisterPage = () => {
  const [messageResp, setMessageResp] = useState({
    type: "",
    message: "",
  });

  const onRegister = async (values) => {
    const { fullName, email, password } = values;
    const data = {
      fullName,
      email,
      password,
      role: "learner",
      gender: "male",
      accountType: "freemium",
      phone: "0865921245",
      dob: "2024-10-02",
      avatar: "",
    };

    // Check if the email already exists
    try {
      const response = await fetch(`http://localhost:9999/users?email=${encodeURIComponent(email)}`);
      const existingUser = await response.json();

      if (existingUser.length > 0) {
        notification.error({
          message: "Error",
          description: "Tài khoản đã tồn tại!",
        });
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      notification.error({
        message: "Error",
        description: "Đã có lỗi xảy ra khi kiểm tra email!",
      });
      return;
    }

    // Send a POST request to register the user
    fetch("http://localhost:9999/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed!");
        }
        return response.json();
      })
      .then((resp) => {
        setMessageResp({
          type: "success",
          message: "Đăng ký thành công!",
        });

        // Show success notification
        notification.success({
          message: "Success",
          description: "Đăng ký thành công!",
        });

        console.log("User registered:", resp);
      })
      .catch((err) => {
        setMessageResp({
          type: "error",
          message: err.response?.data?.message || err.message || "Đăng ký tài khoản không thành công",
        });

        // Show error notification
        notification.error({
          message: "Error",
          description: err.response?.data?.message || "Đăng ký tài khoản không thành công",
        });
      });
  };

  return (
    <div style={style.loginContainer}>
      <div style={style.leftSide}>
        <div style={style.formLogin}>
          <img src={logo} alt="Deutsch Nerd" style={{ width: "100px", height: "50px" }} />
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>Chào mừng đến với Deutsch Nerd</span>
          <span>Đăng ký tài khoản mới của bạn tại đây</span>
          <Form layout="vertical" name="formLogin" style={{ width: "100%" }} onFinish={onRegister}>
            {/* input full name */}
            <Form.Item
              name="fullName"
              label="Họ và Tên"
              rules={[
                validationRules.minLength(2, "Tên phải có ít nhất 2 kí tự"),
                validationRules.required("Vui lòng nhập tên của bạn"),
                {
                  pattern: /^[\p{L} ]+$/u,
                  message: "Tên phải là chuỗi các ký tự",
                },
              ]}
            >
              <InputCustom placeholder="Nhập tên của bạn" prefix={<UserOutlined />} />
            </Form.Item>

            {/* input email */}
            <Form.Item label="Email" name="email" rules={[validationRules.required("Vui lòng nhập email"), validationRules.email("Email không hợp lệ")]}>
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
                  message: "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
                },
              ]}
            >
              <InputCustom type="password" placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>

            {/* confirm password */}
            <Form.Item
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                validationRules.required("Vui lòng nhập mật khẩu"),
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
              <InputCustom type="password" placeholder="Xác nhận mật khẩu" prefix={<LockOutlined />} />
            </Form.Item>

            {/* button register */}
            <Form.Item>
              <ButtonCustom htmlType="submit" type="primary" style={{ width: "100%", background: "#ffa454" }}>
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
              <ButtonCustom type="primary" icon={<GoogleOutlined />} shape="circle" />
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
          alt="Deutsch Nerd"
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

export default RegisterPage;
