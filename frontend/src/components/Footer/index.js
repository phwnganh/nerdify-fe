import React from "react";
import { Row, Col } from "antd";
import logo from "../../assets/logo.png";
import {
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  TikTokOutlined,
} from "@ant-design/icons";
export default function Footer() {
  return (
    <Row gutter={[32, 32]} style={{ maxWidth: "100%" }}>
      <Col span={6}>
        <Row style={{ marginLeft: "13px" }}>
          {/* <Col> */}
          <img
            src={logo}
            alt="Deustch Nerd"
            style={{ width: "100px", height: "50px" }}
          />
          {/* </Col>
          <Col> */}
          <p style={{ paddingLeft: "2px" }}>
            Chào mừng đến với Deustch Nerd, là nơi bạn học tiếng Đức online!
            Chúng tôi tận tâm cung cấp các nguồn tài nguyên chất lượng hàng đầu
            và hỗ trợ đặc biệt để giúp bạn đạt được mục tiêu học ngôn ngữ của
            mình.
          </p>
          {/* </Col> */}
        </Row>
      </Col>
      <Col span={6}>
        <h5>Tài nguyên học tập</h5>
        <p>Các bài tập đa dạng</p>
        <p>Bộ từ vựng flashcards</p>
        <p>Blog học tiếng Đức</p>
      </Col>
      <Col span={6}>
        <h5>Hỗ trợ học viên</h5>
        <p>Điều khoản và điều kiện</p>
        <p>Chính sách bảo mật</p>
        <p>Chính sách hoàn tiền</p>
        <p>Khảo sát và phản hồi</p>
      </Col>
      <Col span={6}>
        <h5>Liên hệ</h5>
        <p>
          <PhoneOutlined /> 0943206786
        </p>
        <p>
          <FacebookOutlined /> <a href="#">Deustch Nerd</a>
        </p>
        <p>
          <TikTokOutlined /> <a href="#">Deustch Nerd</a>
        </p>
        <p>
          <MailOutlined /> <a href="#">deustchnerd@gg.edu.vn</a>
        </p>
      </Col>
    </Row>
  );
}
