import React from "react";
import { Form, Checkbox } from "antd";
import InputCustom from "../../../components/Input";
import ButtonCustom from "../../../components/Button";
import { GoogleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import loginImage from "../../../assets/loginImage.png";
import { CLIENT_URI, EMAIL_REGEX, SERVER_URI } from "../../../constants";
import { authService } from "../../../services";
import { useAuth } from "../../../hooks";
import { signin } from "../../../hooks/auth/reducers";

export const LoginPage = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const onLoginWithGoogle = () => {
    window.open(`${SERVER_URI.AUTH_SERVICE.LOGIN_WITH_GOOGLE}`, "_self");
  };

  const onLogin = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      remember: values.remember,
    };
    authService
      .login(data)
      .then((resp) => {
        console.log(resp);
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
        window.location.href = CLIENT_URI.HOME_PAGE;
      })
      .catch((err) => {});
  };

  return (
    <div style={style.loginContainer}>
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
        <div style={style.formLogin}>
          <img
            src={logo}
            alt="Deustch Nerd"
            style={{ width: "100px", height: "50px" }}
          />
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Chào mừng đến với Deustch Nerd
          </span>
          <span>Đăng nhập để tiếp tục</span>
          <Form
            layout="vertical"
            name="formLogin"
            style={{ width: "100%" }}
            onFinish={onLogin}
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
              <InputCustom placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>

            {/* input password */}
            <Form.Item
              label="Mật khẩu"
              type="password"
              name="password"
              rules={[
                {
                  pattern: EMAIL_REGEX,
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
              <Link to={CLIENT_URI.FORGOT_PASSWORD}>Quên mật khẩu</Link>
            </div>

            {/* button login */}
            <Form.Item>
              <ButtonCustom
                htmlType="submit"
                type="primary"
                style={{ width: "100%", background: "#ffa454" }}
              >
                Đăng nhập
              </ButtonCustom>
            </Form.Item>

            {/* social login */}
            <div style={{ justifyContent: "space-between" }}>
              <span>Hoặc đăng nhập với</span>
              <ButtonCustom
                type="primary"
                icon={<GoogleOutlined />}
                shape="circle"
                onClick={() => onLoginWithGoogle()}
              />
            </div>
            {/* register link */}
            <div>
              <span>Bạn không có tài khoản?</span>
              <Link to={CLIENT_URI.REGISTER}>Đăng ký tại đây</Link>
            </div>
          </Form>
        </div>
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
  formLogin: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
};

export default LoginPage;
