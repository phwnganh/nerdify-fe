import React, { useState } from "react";
import { Form } from "antd";
import InputCustom from "../../../components/Input";
import ButtonCustom from "../../../components/Button";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import loginImage from "../../../assets/loginImage.png";
import { CLIENT_URI } from "../../../constants";
import { forgotPassword } from "../../../services/GuestService";

export const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onForgotPassword = (values) => {
    forgotPassword({
      email: values.email,
    })
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={style.forgotContainer}>
      <div style={style.leftSide}>
        <img
          src={loginImage}
          alt="Deustch Nerd"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px 0 0 20px",
          }}
        />
      </div>
      <div style={style.rightSide}>
        <div style={style.formForgot}>
          <img
            src={logo}
            alt="Deustch Nerd"
            style={{ width: "100px", height: "50px" }}
          />
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Quên mật khẩu
          </span>
          {!isSubmitted ? (
            <>
              <span>Nhập email để lấy lại mật khẩu</span>
              <Form
                layout="vertical"
                name="formForgotPassword"
                style={{ width: "100%" }}
                onFinish={onForgotPassword}
              >
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
                  <InputCustom
                    placeholder="Nhập email"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>

                {/* button submit */}
                <Form.Item>
                  <ButtonCustom
                    htmlType="submit"
                    type="primary"
                    style={{ width: "100%", background: "#ffa454" }}
                  >
                    Gửi yêu cầu
                  </ButtonCustom>
                </Form.Item>
              </Form>
            </>
          ) : (
            <span>Vui lòng kiểm tra email để đặt lại mật khẩu</span>
          )}

          {/* login link */}
          <div>
            <span>Quay lại trang </span>
            <Link to={CLIENT_URI.LOGIN}>Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const style = {
  forgotContainer: {
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
  leftSide: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "40%",
    height: "80%",
    background: "#ffe45c",
    borderRadius: "20px 0 0 20px",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    height: "80%",
    background: "white",
    borderRadius: "0 20px 20px 0",
  },
  formForgot: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    margin: "auto",
  },
};

export default ForgotPasswordPage;
