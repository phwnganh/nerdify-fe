import { TextCustom, TitleCustom } from "../../../components/Typography/TypographyCustom";
import CardCustom from "../../../components/Card/CardCustom";
import ButtonCustom from '../../../components/Button/ButtonCustom'
import { Col, Row } from "antd";
import { userGetTransactionDetail } from "../../../services/LearnerService";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";
import { useEffect, useState } from "react";
export default function PaymentSuccess() {
      const [transactionDetail, setTransactionDetail] = useState(null);
      const { transactionId } = useParams();
      const navigate = useNavigate();
      useEffect(() => {
            if (transactionId) {
              userGetTransactionDetail(transactionId)
                .then((resp) => {
                  setTransactionDetail(resp.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }, [transactionId]);
  return (
    <div style={{ padding: "50px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f7f7f7",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"  }}>
      <TitleCustom level={2}>Cảm ơn bạn đã tin tưởng và lựa chọn gói Premium của chúng tôi!</TitleCustom>
      <TitleCustom level={4}>Tài khoản của bạn đang được chúng tôi xác nhận và phê duyệt! Chúng tôi sẽ cập nhật sớm nhất có thể!</TitleCustom>
      <CardCustom style={{ marginTop: "30px", maxWidth: "500px", borderRadius: "10px", width: "100%" }}>
        <Row>
          <Col span={12} style={{ padding: "10px" }}>
            <TextCustom style={{ fontWeight: "bold" }}>Thông tin gói:</TextCustom>
            <br />
            <TextCustom>Gói Premium {transactionDetail?.packageId?.packageName}</TextCustom>
          </Col>
          <Col span={12} style={{ padding: "10px" }}>
            <TextCustom style={{ fontWeight: "bold" }}>Tổng:</TextCustom>
            <br />
            <TextCustom>{transactionDetail?.totalPrice?.toLocaleString("vi-VN")} VNĐ</TextCustom>
          </Col>
        </Row>
      </CardCustom>
      <ButtonCustom buttonType="primary" style={{padding: '20px', marginTop: '30px'}} onClick={() => navigate(CLIENT_URI.COURSE_PAGE)}>Quay về trang chủ</ButtonCustom>
    </div>
  );
}
