import React from "react";
import { Row, Col } from "antd";
import logo from "../../assets/logo1.png";
import {
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
import { TitleCustom } from "../Typography";
export default function Footer() {
  return (
    <Row gutter={[32, 32]} style={{ width: "100%" }}>
      <Col span={6}>
        <Row style={{ marginLeft: "13px" }}>
          {/* <Col> */}
          <img
            src={logo}
            alt="Deutsch Nerd"
            style={{ width: "100px", height: "50px" }}
          />
          {/* </Col>
          <Col> */}
          <p style={{ paddingLeft: "2px" }}>
            Chào mừng đến với Deutsch Nerd, là nơi bạn học tiếng Đức online!
            Chúng tôi tận tâm cung cấp các nguồn tài nguyên chất lượng hàng đầu
            và hỗ trợ đặc biệt để giúp bạn đạt được mục tiêu học ngôn ngữ của
            mình.
          </p>
          {/* </Col> */}
        </Row>
      </Col>
      <Col span={6}>
        <TitleCustom level={5}>Tài nguyên học tập</TitleCustom>
        <p>Các bài tập đa dạng</p>
        <p>Bộ từ vựng flashcards</p>
        <p>Blog học tiếng Đức</p>
      </Col>
      <Col span={6}>
        <TitleCustom level={5}>Hỗ trợ học viên</TitleCustom>
        <p>Điều khoản và điều kiện</p>
        <p>Chính sách bảo mật</p>
        <p>Chính sách hoàn tiền</p>
        <p>Khảo sát và phản hồi</p>
      </Col>
      <Col span={6}>
        <TitleCustom level={5}>Liên hệ</TitleCustom>
        <p>
          <PhoneOutlined /> 0867980329
        </p>
        <p>
          <FacebookOutlined /> <a href="https://www.facebook.com/deutschnerd">Deutsch Nerd</a>
        </p>
        <p>
          <TikTokOutlined /> <a href="https://www.facebook.com/deutschnerd">Deutsch Nerd</a>
        </p>
        <p>
          <MailOutlined /> <a href="#">deutschnerd.2024@gmail.com</a>
        </p>
      </Col>
    </Row>
  );
}
