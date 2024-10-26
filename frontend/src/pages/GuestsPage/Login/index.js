import React from "react";
import { Form, Checkbox, Input, notification } from "antd";
import InputCustom from "../../../components/Input";
import ButtonCustom from "../../../components/Button";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import loginImage from "../../../assets/loginImage.png";
import { CLIENT_URI, PASSWORD_REGEX } from "../../../constants";
import { useAuth } from "../../../hooks";
import { login } from "../../../services/GuestService";
import { signin } from "../../../hooks/auth/reducers";
import { validationRules } from "../../../helpers/validate";
import { AUTH_SERVER_URI } from "../../../services/GuestService/url";
import { style } from "./styled";

export const LoginPage = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const onLoginWithGoogle = () => {
    window.open(`${AUTH_SERVER_URI.AUTH_SERVICE.LOGIN_WITH_GOOGLE}`, "_self");
  };

  const onLogin = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    login(data)
      .then((resp) => {
        dispatch(
          signin({
            user: {
              id: resp.data.id,
              email: resp.data.email,
              fullName: resp.data.fullName,
              role: resp.data.role,
            },
          })
        );
        notification.success({
          message: "Đăng nhập thành công",
          description: "Chào mừng bạn đến với Deutsch Nerd!",
        });
        navigate(CLIENT_URI.COURSE_PAGE);
      })
      .catch((err) => {
        notification.error({
          message: "Đăng nhập thất bại",
          description:
            err.response?.data?.message ||
            "Vui lòng kiểm tra email và mật khẩu của bạn.",
        });
      });
  };

  return (
    <div style={style.loginContainer}>
      <div style={style.leftSide}>
        <img
          src={loginImage}
          alt="Deutsch Nerd"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px 0 0 20px",
          }}
        />
      </div>
      <div style={style.rightSide}>
        <div style={style.formLogin}>
          <img src={logo} alt="Deutsch Nerd" style={{ width: "100px", height: "50px" }} />
          <span style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>Chào mừng đến với Deutsch Nerd</span>
          <span style={{ color: "#555", paddingBottom: "5px", textAlign: 'center' }}>Đăng nhập để tiếp tục</span>
          <Form
            layout="vertical"
            name="formLogin"
            style={{ width: "100%", padding: "0 20px" }}
            onFinish={onLogin}
          >
            {/* input email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                validationRules.required("Vui lòng nhập email"),
                validationRules.email("Email không hợp lệ"),
              ]}
            >
              <InputCustom
                placeholder="Nhập email"
                prefix={<UserOutlined />}
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            {/* input password */}
            <Form.Item
              label="Mật khẩu"
              type="password"
              name="password"
              style={{ width: "100%" }}
              rules={[
                {
                  pattern: PASSWORD_REGEX,
                  message:
                    "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Nhập mật khẩu"
                prefix={<LockOutlined />}
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            {/* remember and forgot password */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <Link to={CLIENT_URI.FORGOT_PASSWORD} style={{ color: "#ffa454" }}>
                Quên mật khẩu
              </Link>
            </div>

            {/* button login */}
            <Form.Item>
              <ButtonCustom
                htmlType="submit"
                type="primary"
                style={{
                  width: "100%",
                  background: "#ffa454",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                Đăng nhập
              </ButtonCustom>
            </Form.Item>

            {/* social login */}
            <div style={{ justifyContent: "center", marginBottom: "20px" }}>
              <span>Hoặc đăng nhập với</span>
              <ButtonCustom
                type="primary"
                icon={<GoogleOutlined />}
                shape="circle"
                onClick={onLoginWithGoogle}
                style={{ marginLeft: "8px", background: "#4285F4", border: "none" }}
              />
            </div>
            {/* register link */}
            <div style={{ textAlign: "center", color: "#555" }}>
              <span>Bạn không có tài khoản? </span>
              <Link to={CLIENT_URI.REGISTER} style={{ color: "#ffa454" }}>
                Đăng ký tại đây
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};