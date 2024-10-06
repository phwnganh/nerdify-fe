import { Checkbox, Col, Divider, Row } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URI } from "../../../../constants/uri.constants";
import { useEffect, useState } from "react";
import moment from "moment";
export default function BillInfo() {
  const navigate = useNavigate();
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [useVoucher, setUseVoucher] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { transactionId } = useParams();
  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionResponse = await fetch(
        `http://localhost:9999/transaction/${transactionId}`
      );
      const packageResponse = await fetch("http://localhost:9999/package");
      const transaction = await transactionResponse.json();
      const packages = await packageResponse.json();
      const packageDetail = packages.find(
        (packageDetail) =>
          Number(packageDetail.id) === Number(transaction.packageId)
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
  }, [transactionId]);

  const handleVoucherToggle = (e) => {
    const isChecked = e.target.checked;
    setUseVoucher(isChecked);

    const hasDiscount = isChecked ? transactionDetail?.discount : 0;
    const priceWithVoucher = transactionDetail?.price * (1 - hasDiscount);
    setTotalPrice(priceWithVoucher);
  };

  const handlePaymentProcessing = () => {
    fetch(`http://localhost:9999/transaction/${transactionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: totalPrice,
        processingContent: `KH NGUYEN VIET HOANG CHUYEN TIEN GOI PREMIUM ${(transactionDetail?.packageName).toUpperCase()}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`${CLIENT_URI.PAYMENT}/${data?.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                <TextCustom>{transactionDetail?.startDate}</TextCustom>
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
                  {transactionDetail?.endDate}
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
            <Row>
              <ButtonCustom
                buttonType="primary"
                style={{ padding: "23px" }}
                onClick={() => navigate(-1)}
              >
                Hủy
              </ButtonCustom>
              <ButtonCustom
                buttonType="primary"
                style={{ padding: "23px", marginLeft: "30px" }}
                onClick={handlePaymentProcessing}
              >
                Thanh toán
              </ButtonCustom>
            </Row>
          </Col>
        </Row>
      </CardCustom>
    </div>
  );
}
