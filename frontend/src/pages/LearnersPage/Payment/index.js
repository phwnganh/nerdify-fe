import { Col, QRCode, Row } from "antd";
import { TextCustom, TitleCustom } from "../../../components/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_SERVER, CLIENT_URI } from "../../../constants";
import qrCode from '../../../assets/qrCode.jpg'
import ButtonCustom from "../../../components/Button";

export default function Payment() {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${BASE_SERVER}/transaction/${transactionId}`)
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
          navigate(CLIENT_URI.CONFIRM_PAYMENT)
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

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
          <img src={qrCode} alt="" srcset="" width={300}/>
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
          <div style={{marginTop: '20px'}}>
            <ButtonCustom onClick={() => navigate(CLIENT_URI.CONFIRM_PAYMENT)}>Xác nhận giao dịch</ButtonCustom>
          </div>
        </Col>
      </Row>
    </div>
  );
}
