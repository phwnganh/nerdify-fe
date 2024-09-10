import { Checkbox, Col, Divider, Row } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants/uri.constants";
import { useEffect, useState } from "react";
import moment from "moment";
export default function BillInfo() {
  const navigate = useNavigate();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [useVoucher, setUseVoucher] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionResponse = await fetch(
        "http://localhost:9999/transaction/2"
      );
      const packageResponse = await fetch("http://localhost:9999/package");
      const transaction = await transactionResponse.json();
      const packages = await packageResponse.json();
      const packageDetail = packages.find(
        (packageDetail) => Number(packageDetail.id) === transaction.packageId
      );

      const transactionData = {
        ...transaction,
        packageName: packageDetail?.packageName,
        price: packageDetail?.price,
        duration: packageDetail?.duration,
      };
      console.log("joined: ", transactionData);

      setTransactionDetail(transactionData);
      setTotalPrice(transactionData?.price);
    };
    fetchTransaction();
  }, []);

  useEffect(() => {
    const currentDate = moment();
    setStartDate(currentDate.format("DD/MM/YYYY"));

    const endDate = currentDate.add(transactionDetail?.duration, "months");
    setEndDate(endDate.format("DD/MM/YYYY"));
  });

  const handleVoucherToggle = (e) => {
    const isChecked = e.target.checked;
    setUseVoucher(isChecked);

    const hasDiscount = isChecked ? transactionDetail?.discount : 0;
    const priceWithVoucher = transactionDetail?.price * (1 - hasDiscount);
    setTotalPrice(priceWithVoucher);
  };

  const handlePaymentProcessing = () => {};
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <TitleCustom level={2}>CHI TIẾT HÓA ĐƠN</TitleCustom>
      </div>
      <CardCustom
        bordered={false}
        style={{ backgroundColor: "#d9d9d9", padding: "30px" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={11}>
            <TextCustom strong>Thông tin hóa đơn</TextCustom>
            <div style={{ marginTop: 16 }}>
              <Checkbox checked>
                Gói Premium {transactionDetail?.packageName}
              </Checkbox>
            </div>
            <div style={{ marginTop: 16 }}>
              <Checkbox checked={useVoucher} onChange={handleVoucherToggle}>
                Áp dụng voucher
              </Checkbox>
            </div>
          </Col>
          <Col span={2}>
            <Divider
              type="vertical"
              style={{ height: "100%", color: "black" }}
            ></Divider>
          </Col>
          <Col span={11}>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col span={12}>
                <TextCustom style={{ whiteSpace: "nowrap" }}>
                  Ngày đặt hàng:{" "}
                </TextCustom>
              </Col>
              &nbsp;
              <Col span={10}>
                <TextCustom>{startDate}</TextCustom>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Col span={12}>
                <TextCustom
                  style={{
                    whiteSpace: "nowrap",
                    marginRight: "150px",
                    color: "red",
                  }}
                >
                  sử dụng đến ngày:
                </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom type="danger" style={{ marginLeft: "20px" }}>
                  {endDate}
                </TextCustom>
              </Col>
            </Row>
            <Row style={{ marginTop: 8 }}>
              <Col span={12}>
                <TextCustom>Giá tiền: </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ marginLeft: "20px" }}>
                  {transactionDetail?.price?.toLocaleString("vi-VN")} VNĐ
                </TextCustom>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Col span={12}>
                <TextCustom
                  style={{ whiteSpace: "nowrap", marginRight: "120px" }}
                >
                  Voucher ưu đãi:{" "}
                </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ marginLeft: "20px" }}>
                  {useVoucher ? transactionDetail?.discount : 0}
                </TextCustom>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider style={{ color: "black" }} />
        <Row justify="space-around" style={{ marginTop: 16 }}>
          <Col>
            <Row>
              <Col span={12}>
                <TextCustom strong>TỔNG: </TextCustom>
              </Col>
              <Col span={12}>
                <TextCustom style={{ color: "red", whiteSpace: "nowrap" }}>
                  {totalPrice?.toLocaleString("vi-VN")} VNĐ
                </TextCustom>
              </Col>
            </Row>
          </Col>
          <Col>
            <ButtonCustom
              buttonType="primary"
              onClick={() => {
                navigate(CLIENT_URI.PAYMENT);
              }}
            >
              Thanh toán
            </ButtonCustom>
          </Col>
        </Row>
      </CardCustom>
    </div>
  );
}
