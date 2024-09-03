import React, { useState } from "react";
import { Layout, Typography, Card, Radio, List, Modal } from "antd";
import ButtonCustom from "../../../components/Button";
import {
  AudioOutlined,
  CheckSquareOutlined,
  CheckSquareTwoTone,
  ReadOutlined,
} from "@ant-design/icons";
import ModalCustom from "../../../components/Modal";
import { TextCustom } from "../../../components/Typography";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";

const { Title, Text } = Typography;
const { Content } = Layout;

const plans = [
  { name: "Basic", duration: "6 tháng", price: "299.000đ" },
  { name: "Standard", duration: "1 năm", price: "499.000đ" },
];

export const PremiumPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate(-1);
  };

  return (
    <>
      <ModalCustom
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>
            Nâng cấp tài khoản với các gói Premium
          </h1>
          <h2 style={{ width: "450px", margin: "auto" }}>
            <CheckSquareTwoTone /> Mở khóa tất cả các phase của khóa học <br />{" "}
            <CheckSquareTwoTone /> Luyện bài tập nói
          </h2>
        </div>
        <div style={{ display: "inline-grid", width: "100%" }}>
          <ButtonCustom
            key="submit"
            buttonType="primary"
            onClick={() => {
              handleOk();
              navigate(CLIENT_URI.PREMIUM);
            }}
            style={{ width: "215px", margin: "20px auto" }}
          >
            Mở khóa ngay
          </ButtonCustom>
          <ButtonCustom
            key="submit"
            buttonType="secondary"
            onClick={handleOk}
            style={{ width: "215px", margin: "auto" }}
          >
            Không phải bây giờ
          </ButtonCustom>
        </div>
      </ModalCustom>

      <Content
        style={{
          padding: "0 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div style={{ padding: "16px 0" }}>
          <Title level={2}>TÍNH NĂNG NÂNG CẤP TÀI KHOẢN PREMIUM</Title>
          <Card style={{}}>
            <List style={{ width: "500px", margin: "auto" }} split={false}>
              <List.Item>
                <h2>
                  <ReadOutlined /> &nbsp; Mở khóa tất cả các phase của khóa học
                </h2>
              </List.Item>
              <List.Item>
                <h2>
                  <AudioOutlined /> &nbsp; Mở bài tập luyện nói
                </h2>
              </List.Item>
            </List>
          </Card>{" "}
        </div>

        <div>
          <Title level={2}>VUI LÒNG CHỌN CÁC GÓI DƯỚI ĐÂY</Title>
          <Card bordered={false}>
            <Radio.Group
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  title={plan.name}
                  bordered={true}
                  style={{ marginBottom: "16px", border: "1px solid" }}
                >
                  <Title level={4}>{plan.price}</Title>
                  <Text>Thời hạn: {plan.duration}</Text>
                  <ButtonCustom
                    type="primary"
                    style={{ marginTop: "16px" }}
                    block
                  >
                    Chọn ngay
                  </ButtonCustom>
                </Card>
              ))}
            </Radio.Group>
          </Card>
        </div>
      </Content>
    </>
  );
};
