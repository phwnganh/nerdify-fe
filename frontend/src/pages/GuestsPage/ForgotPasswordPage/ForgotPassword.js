import React, { useState } from "react";
import { Form } from "antd";
import InputCustom from "../../../components/Input/InputCustom";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import loginImage from "../../../assets/loginImage.png";
import { CLIENT_URI } from "../../../constants";
import { forgotPassword } from "../../../services/GuestService";
import { style } from "./styled";
import { validationRules } from "../../../helpers/validate";

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
          <img src={logo} alt="Deustch Nerd" style={{ width: "100px", height: "50px" }} />
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>Quên mật khẩu</span>
          {!isSubmitted ? (
            <>
              <span>Nhập email để lấy lại mật khẩu</span>
              <Form layout="vertical" name="formForgotPassword" style={{ width: "100%" }} onFinish={onForgotPassword}>
                {/* input email */}
                <Form.Item label="Email" name="email" rules={[validationRules.required("Vui lòng nhập email"), validationRules.email("Email không hợp lệ")]}>
                  <InputCustom placeholder="Nhập email" prefix={<UserOutlined />} />
                </Form.Item>

                {/* button submit */}
                <Form.Item>
                  <ButtonCustom htmlType="submit" type="primary" style={{ width: "100%", background: "#ffa454" }}>
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

export default ForgotPasswordPage;
