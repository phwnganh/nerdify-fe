import React, { useEffect, useState, useCallback } from "react";
import { Layout, Typography, Card, Radio, List } from "antd";
import ButtonCustom from "../../../components/Button";
import { AudioOutlined, BookOutlined, EditOutlined, ReadOutlined } from "@ant-design/icons";
import CardCustom from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../constants";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import moment from "moment";
import { createPayment, getPackageDetail, getPackageList } from "../../../services/LearnerService";

const { Content } = Layout;

export const PremiumPage = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPackageList()
      .then((data) => setPackages(data.data));
  }, []);

  // Tạo hàm handleRedirectToBill với useCallback để không bị tạo lại mỗi khi render
  const handleRedirectToBill = useCallback(async (packageId) => {
    // const startDate = moment().format("DD/MM/YYYY");
    // const endDate = moment().add(duration, "months").format("DD/MM/YYYY");
    // const packageDetail = await getPackageDetail(packageId);
    // const newTransaction = {
    //   packageId: packageDetail._id,
    //   discount: 0
    //   // discount
    // };

    // const learnerTransaction = await createPayment(newTransaction);
    // navigate(`${CLIENT_URI.BILLINFO}/transaction`)
    //   .catch((err) => {
    //     console.error(err);
    //   });
    try {
      // Fetch package details using the packageId
      const packageDetails = await getPackageDetail(packageId);
  
      const newTransaction = {
        packageId: packageDetails._id, // Pass the correct packageId from the fetched package
        discount: 0 // You can adjust this value based on user input or offer
      };
  
      // Create a new payment and get the transaction response
      const transaction = await createPayment(newTransaction);
  
      // Navigate to the bill info page using the returned transaction ID
      navigate(`${CLIENT_URI.BILLINFO}/${transaction?.data?._id}`);
    } catch (err) {
      console.error(err);
    }
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
                    onClick={() => handleRedirectToBill(pack._id)}
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
