import { Checkbox, Col, Divider, Row } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { useEffect, useState } from "react";
import moment from "moment";
import { BASE_SERVER } from "../../../constants";
import { createPayment, userGetTransactionDetail } from "../../../services/LearnerService";
import qrCode from "../../../../assets/qrCode.jpg"; // Importing QR code image

export default function BillInfo() {
  const navigate = useNavigate();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [useVoucher, setUseVoucher] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { transactionId } = useParams();

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

  const handleVoucherToggle = (e) => {
    // const isChecked = e.target.checked;
    // setUseVoucher(isChecked);
    // const hasDiscount = isChecked ? transactionDetail?.discount : 0;
    // const priceWithVoucher = transactionDetail?.price * (1 - hasDiscount);
    // setTotalPrice(priceWithVoucher);
  };

  const handlePaymentProcessing = async () => {
    try {
      const paymentParams = {
        transactionId,
        useVoucher,
      };
      await createPayment(paymentParams);
      navigate(`${CLIENT_URI.PAYMENT}/${transactionId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <TitleCustom level={2}>CHI TIẾT HÓA ĐƠN</TitleCustom>
      </div>
      <CardCustom bordered={false} style={{ backgroundColor: "#d9d9d9", padding: "30px" }}>
        <Row gutter={[16, 16]}>
          <Col span={11}>
            <TextCustom strong>Thông tin hóa đơn</TextCustom>
            <div style={{ marginTop: 16 }}>
              <Checkbox checked>Gói Premium {transactionDetail?.packageId?.packageName}</Checkbox>
            </div>
            {/* <div style={{ marginTop: 16 }}>
              <Checkbox checked={useVoucher} onChange={handleVoucherToggle}>
                Áp dụng voucher
              </Checkbox>
            </div> */}
          </Col>
          <Col span={2}>
            <Divider type="vertical" style={{ height: "100%", color: "black" }}></Divider>
          </Col>
          <Col span={11}>
            {/* Transaction details */}
            <Row >
              <Col span={12}>
                <TextCustom style={{ whiteSpace: "nowrap" }}>Ngày đặt hàng: </TextCustom>
              </Col>
              <Col span={10}>
                <TextCustom>{moment(transactionDetail?.startDate).format("DD/MM/yyyy")}</TextCustom>
              </Col>
            </Row>
            <Row style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              {/* <Col span={12}>
                <TextCustom style={{ whiteSpace: "nowrap", marginRight: "150px", color: "red" }}>sử dụng đến ngày:</TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom type="danger" style={{ marginLeft: "20px" }}>
                  {transactionDetail?.endDate}
                </TextCustom>
              </Col> */}
                        <Col>
            <Row>
              <Col span={12}>
                <TextCustom strong>TỔNG: </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ color: "red", whiteSpace: "nowrap" }}>{transactionDetail?.totalPrice?.toLocaleString("vi-VN")} VNĐ</TextCustom>
              </Col>
            </Row>
          </Col>
            </Row>
            {/* <Row style={{ marginTop: 8 }}>
              <Col span={12}>
                <TextCustom>Giá tiền: </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ marginLeft: "20px" }}>{transactionDetail?.packageId?.price?.toLocaleString("vi-VN")} VNĐ</TextCustom>
              </Col>
            </Row> */}
            <Row style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              {/* <Col span={12}>
                <TextCustom style={{ whiteSpace: "nowrap", marginRight: "120px" }}>Voucher ưu đãi:</TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ marginLeft: "20px" }}>{useVoucher ? transactionDetail?.discount : 0}</TextCustom>
              </Col> */}
            </Row>
          </Col>
        </Row>

        {/* <Divider style={{ color: "black" }} /> */}

        {/* <Row justify="space-around" style={{ marginTop: 16 }}>
          <Col>
            <Row>
              <Col span={12}>
                <TextCustom strong>TỔNG: </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ color: "red", whiteSpace: "nowrap" }}>{transactionDetail?.totalPrice?.toLocaleString("vi-VN")} VNĐ</TextCustom>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row></Row>
          </Col>
        </Row> */}

        {/* QR Code Section */}
        <Divider style={{ marginTop: "40px" }} />
        <Row justify="center">
          <Col>
            <TitleCustom level={4}>THANH TOÁN QUA MÃ QR</TitleCustom>
            <TextCustom>Vui lòng quét mã để thanh toán trực tuyến</TextCustom>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <img src={qrCode} alt="QR Code" width={300} />
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "10px" }}>
          <Col>
            <div style={{ marginTop: "20px" }}>
              <ButtonCustom buttonType="primary" style={{padding: '20px', marginRight: '25px'}} onClick={() => navigate(-1)}>
                Hủy
              </ButtonCustom>
              <ButtonCustom  buttonType="primary" style={{padding: '20px'}} onClick={() => navigate(`${CLIENT_URI.CONFIRM_PAYMENT}/${transactionId}`)}>Xác nhận giao dịch</ButtonCustom>
            </div>
          </Col>
        </Row>
      </CardCustom>
    </div>
  );
}
