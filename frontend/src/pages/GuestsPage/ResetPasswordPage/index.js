import React, { useState } from "react";
import { Form } from "antd";
import InputCustom from "../../../components/Input";
import ButtonCustom from "../../../components/Button";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import loginImage from "../../../assets/loginImage.png";
import { CLIENT_URI, PASSWORD_REGEX } from "../../../constants";
import { resetPassword } from "../../../services/GuestService";

export const ResetPasswordPage = () => {
  const [isReset, setIsReset] = useState(false);
  const { resetToken } = useParams();

  const onResetPassword = (values) => {
    const data = {
      email: values.email,
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation,
      passwordResetToken: resetToken,
    };
    resetPassword(data)
      .then(() => {
        setIsReset(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={style.resetContainer}>
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
        <div style={style.formReset}>
          <img
            src={logo}
            alt="Deustch Nerd"
            style={{ width: "100px", height: "50px" }}
          />
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Đặt lại mật khẩu
          </span>
          {!isReset ? (
            <>
              <span>Nhập thông tin để đặt lại mật khẩu</span>
              <Form
                layout="vertical"
                name="formResetPassword"
                style={{ width: "100%" }}
                onFinish={onResetPassword}
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

                {/* input new password */}
                <Form.Item
                  label="Mật khẩu mới"
                  name="new_password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới" },
                    {
                      pattern: PASSWORD_REGEX,
                      message:
                        "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
                    },
                  ]}
                >
                  <InputCustom
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>

                {/* confirm new password */}
                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="new_password_confirmation"
                  dependencies={["new_password"]}
                  rules={[
                    { required: true, message: "Vui lòng xác nhận mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Mật khẩu xác nhận không khớp")
                        );
                      },
                    }),
                  ]}
                >
                  <InputCustom
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>

                {/* button submit */}
                <Form.Item>
                  <ButtonCustom
                    htmlType="submit"
                    type="primary"
                    style={{ width: "100%", background: "#ffa454" }}
                  >
                    Đặt lại mật khẩu
                  </ButtonCustom>
                </Form.Item>
              </Form>
            </>
          ) : (
            <span>
              Mật khẩu của bạn đã được đặt lại thành công, vui lòng đăng nhập!
            </span>
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
  resetContainer: {
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
  formReset: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    margin: "auto",
  },
};

export default ResetPasswordPage;
