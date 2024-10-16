import React, { useEffect, useState, useCallback } from "react";
import { Layout, Typography, Card, Radio, List } from "antd";
import ButtonCustom from "../../../components/Button";
import { AudioOutlined, BookOutlined, EditOutlined, ReadOutlined } from "@ant-design/icons";
import CardCustom from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../constants";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import moment from "moment";
import { createPayment, getPackageList } from "../../../services/LearnerService";

const { Content } = Layout;

export const PremiumPage = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPackageList()
      .then((data) => setPackages(data.data));
  }, []);

  // Tạo hàm handleRedirectToBill với useCallback để không bị tạo lại mỗi khi render
  const handleRedirectToBill = useCallback((packageId, duration) => {
    // const startDate = moment().format("DD/MM/YYYY");
    // const endDate = moment().add(duration, "months").format("DD/MM/YYYY");
    const newTransaction = {
      packageId,
      
      // discount
    };

    createPayment()
      .then((data) => {
        navigate(`${CLIENT_URI.BILLINFO}/${data?.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);

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
          <TitleCustom level={2}>TÍNH NĂNG NÂNG CẤP TÀI KHOẢN PREMIUM</TitleCustom>
          <CardCustom style={{}}>
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
              <List.Item>
                <h2>
                  <BookOutlined /> &nbsp; Tạo bộ flashcard mới(nhiều nhất là 50 từ)
                </h2>
              </List.Item>
              <List.Item>
                <h2>
                  <EditOutlined /> &nbsp; Viết bài luận và được giáo viên chấm chữa cẩn thận
                </h2>
              </List.Item>
            </List>
          </CardCustom>{" "}
        </div>

        <div>
          <TitleCustom level={2}>VUI LÒNG CHỌN CÁC GÓI DƯỚI ĐÂY</TitleCustom>
          <CardCustom bordered={false}>
            <Radio.Group
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {packages.map((pack) => (
                <CardCustom
                  key={pack.name}
                  title={pack.packageName}
                  bordered={true}
                  style={{ marginBottom: "16px", border: "1px solid" }}
                >
                  <TitleCustom level={4}>{pack.price?.toLocaleString("vi-VN")} VNĐ</TitleCustom>
                  <TextCustom>Thời hạn: {pack.duration} tháng</TextCustom>
                  <ButtonCustom
                    type="primary"
                    style={{ marginTop: "16px" }}
                    block
                    onClick={() => handleRedirectToBill(pack.id, pack.duration)}
                  >
                    Chọn ngay
                  </ButtonCustom>
                </CardCustom>
              ))}
            </Radio.Group>
          </CardCustom>
        </div>
      </Content>
    </>
  );
};
