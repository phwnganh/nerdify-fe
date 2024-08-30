import { Avatar, Col, Row } from "antd";
import ButtonCustom from "../../../components/Button";
import CardCustom from "../../../components/Card";
import Meta from "antd/es/card/Meta";
import { TrophyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
export default function ViewPersonalProfile() {
      const navigate = useNavigate();
      return (
            <div style={{padding: '30px'}}>
            <div
              style={{
                backgroundColor: "#e0e0e0",
                height: "100px",
                position: "relative",
              }}
            >
              <Avatar
                size={80}
                style={{ position: "absolute", bottom: "-40px", left: "20px" }}
              ></Avatar>
            </div>
            <div style={{ padding: "50px 20px 20px" }}>
              <h2>Capybara</h2>
              <ButtonCustom buttonType="primary" onClick={() => navigate(CLIENT_URI.EDIT_PROFILE)}>Chỉnh sửa trang cá nhân</ButtonCustom>
            </div>
            <div style={{ padding: "20px" }}>
              <h3>Kết quả luyện tập</h3>
              <Row gutter={16}>
                <Col span={12}>
                  <CardCustom hoverable style={{ marginBottom: "16px" }}>
                    <Meta
                      title="Bài tập nghe 1"
                      description={
                        <>
                          <p>listening</p>
                          <p>Ngày làm bài gần nhất: 29/08/2024</p>
                          <p>Kết quả: 50%</p>
                          <ButtonCustom buttonType="primary">Xem chi tiết</ButtonCustom>
                        </>
                      }
                    />
                  </CardCustom>
                </Col>
                <Col span={12}>
                    <CardCustom hoverable style={{ marginBottom: '16px' }}>
                      <Meta
                        title="Bài tập đọc 1"
                        description={
                          <>
                            <p>reading</p>
                            <p>Ngày làm bài gần nhất: 29/08/2024</p>
                            <p>Kết quả: 50%</p>
                            <ButtonCustom buttonType="primary">Xem chi tiết</ButtonCustom>
                          </>
                        }
                      />
                    </CardCustom>
                  </Col>
              </Row>
            </div>
            <div style={{ padding: '20px' }}>
                <h3>Các chứng chỉ</h3>
                <TrophyOutlined style={{ fontSize: '48px', color: '#faad14' }} />
              </div>
          </div>
      )
 
}
