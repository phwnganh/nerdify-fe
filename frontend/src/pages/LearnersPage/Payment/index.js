import { Col, QRCode, Row } from "antd";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import { useEffect } from "react";

export default function Payment() {
  // useEffect(() => {
  //   fetch("http://localhost:9999/transaction")
  // })
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Row justify="center">
        <Col>
          <TitleCustom level={2}>THANH TOÁN</TitleCustom>
          <TextCustom>Vui lòng quét mã để thanh toán trực tuyến</TextCustom>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          {/* Ant Design QRCode Component */}
          <QRCode value="https://payment-link.com" size={150} />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col>
          <TitleCustom level={4} style={{ fontWeight: "bold" }}>29,000 VNĐ</TitleCustom>
          <div>
            <TextCustom>
              Thực hiện giao dịch: <span style={{ color: "red", fontWeight: "bold" }}>04:59</span>
            </TextCustom>
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextCustom>
              Nội dung chuyển khoản: KH NGUYEN VIET HOANG CHUYEN TIEN GOI PREMIUM 6 THANG
            </TextCustom>
          </div>
        </Col>
      </Row>
    </div>
  );
}
