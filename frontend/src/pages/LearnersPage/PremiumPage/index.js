import React from "react";
import { Layout, Typography, Card, Radio, List } from "antd";
import ButtonCustom from "../../../components/Button";
import { AudioOutlined, ReadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const plans = [
  { name: "Basic", duration: "6 tháng", price: "299.000đ" },
  { name: "Standard", duration: "1 năm", price: "499.000đ" },
];

export const PremiumPage = () => {
  return (
    <>
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
