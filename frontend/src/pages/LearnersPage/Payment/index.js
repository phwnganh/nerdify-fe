import { Col, QRCode, Row } from "antd";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Payment() {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  useEffect(() => {
    fetch(`http://localhost:9999/transaction/${transactionId}`)
      .then((res) => res.json())
      .then((data) => setTransaction(data));
  }, [transactionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
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
          <TitleCustom level={4} style={{ fontWeight: "bold" }}>
            {transaction?.totalPrice?.toLocaleString("vi-VN")} VNĐ
          </TitleCustom>
          <div>
            <TextCustom>
              Thực hiện giao dịch:{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {formattedTime(timeLeft)}
              </span>
            </TextCustom>
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextCustom>
              Nội dung chuyển khoản: {transaction?.processingContent}
            </TextCustom>
          </div>
        </Col>
      </Row>
    </div>
  );
}
