import React from "react";
import { Row, Col } from "antd";
import logo from "../../assets/logo1.png";
import { FacebookOutlined, MailOutlined, PhoneOutlined, TikTokOutlined } from "@ant-design/icons";
import { TitleCustom } from "../Typography";

export default function Footer() {
  return (
    <div style={{ padding: "0 50px" }}>
      {/* Add padding to the sides */}
      <Row gutter={[32, 32]} style={{ width: "100%", padding: "20px 0" }}>
        <Col span={6}>
          <Row style={{ marginLeft: "13px" }}>
            <img src={logo} alt="Deutsch Nerd" style={{ width: "100px", height: "50px" }} />
            <p style={{ paddingLeft: "2px", marginTop: "10px" }}>
              Chào mừng đến với Deutsch Nerd, là nơi bạn học tiếng Đức online! Chúng tôi tận tâm cung cấp các nguồn tài nguyên chất lượng hàng đầu và hỗ trợ đặc biệt để giúp bạn đạt được mục tiêu học
              ngôn ngữ của mình.
            </p>
          </Row>
        </Col>

        <Col span={6}>
          <TitleCustom level={5}>Tài nguyên học tập</TitleCustom>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Các bài tập đa dạng</li>
            <li>Bộ từ vựng flashcards</li>
            <li>Blog học tiếng Đức</li>
          </ul>
        </Col>

        <Col span={6}>
          <TitleCustom level={5}>Hỗ trợ học viên</TitleCustom>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Điều khoản và điều kiện</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách hoàn tiền</li>
            <li>Khảo sát và phản hồi</li>
          </ul>
        </Col>

        <Col span={6}>
          <TitleCustom level={5}>Liên hệ</TitleCustom>
          <p>
            <PhoneOutlined /> 0867980329
          </p>
          <p>
            <FacebookOutlined />
            <a href="https://www.facebook.com/deutschnerd" target="_blank" rel="noopener noreferrer">
              Deutsch Nerd
            </a>
          </p>
          <p>
            <TikTokOutlined />
            <a href="https://www.facebook.com/deutschnerd" target="_blank" rel="noopener noreferrer">
              Deutsch Nerd
            </a>
          </p>
          <p>
            <MailOutlined /> <a href="mailto:deutschnerd.2024@gmail.com">deutschnerd.2024@gmail.com</a>
          </p>
        </Col>
      </Row>
    </div>
  );
}