import React, { useState } from "react";
import { Layout, Typography, Card, Radio, List } from "antd";
import ButtonCustom from "../../../components/Button";
import { AudioOutlined, ReadOutlined } from "@ant-design/icons";
import CardCustom from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import moment from "moment";

const { Content } = Layout;



export const PremiumPage = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  fetch("http://localhost:9999/package")
    .then((res) => res.json())
    .then((data) => setPackages(data));

  const handleRedirectToBill = (packageId, duration) => {
    const startDate = moment().format("DD/MM/YYYY");
    const endDate = moment().add(duration, "months").format("DD/MM/YYYY");
    const newTransaction = {
      packageId,
      startDate,
      endDate,
      discount: 0.15
    }

    fetch(`http://localhost:9999/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    }).then(res => res.json()).then(data => {
      navigate(`${CLIENT_URI.BILLINFO}/${data?.id}`)
    }).catch(err => {
      console.error(err);
    })
  }
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
