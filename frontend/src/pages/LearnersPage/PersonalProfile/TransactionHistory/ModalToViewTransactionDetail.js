import { Button, Col, Image, Row } from "antd";
import ModalCustom from "../../../../components/Modal/index";
import { TitleCustom } from "../../../../components/Typography";
import moment from "moment";
export default function TransactionDetailModal({ visible, onClose, transaction }) {
  return (
    <ModalCustom
      title="Giao Dịch Chi Tiết"
      visible={visible}
      onCancel={onClose}
      footer={
        <div>
          <Button onClick={onClose}>Hủy</Button>
        </div>
      }
    >
      {transaction && (
        <div>
          <TitleCustom level={2}>Xem Lịch Sử Giao Dịch</TitleCustom>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Row style={{ whiteSpace: "nowrap" }}>
                  <Col style={{ paddingRight: "20px" }}>Gói Premium:</Col>
                  <Col>{transaction?.packageId?.packageName}</Col>
                </Row>
                <Row style={{ whiteSpace: "nowrap", marginTop: "10px" }}>
                  <Col style={{ paddingRight: "80px" }}>Giá:</Col>
                  <Col>{transaction?.packageId?.price?.toLocaleString("vi-VN")} VNĐ</Col>
                </Row>
                <Row style={{ whiteSpace: "nowrap", marginTop: "10px" }}>
                  <Col style={{ paddingRight: "15px" }}>Ngày Bắt Đầu:</Col>
                  <Col>{moment(transaction?.startDate).format("DD-MM-YYYY")}</Col>
                </Row>
                <Row style={{ whiteSpace: "nowrap", marginTop: "10px" }}>
                  <Col style={{ paddingRight: "10px" }}>Ngày Kết Thúc:</Col>
                  <Col>{moment(transaction?.endDate).format("DD-MM-YYYY")}</Col>
                </Row>
                <Row style={{ whiteSpace: "nowrap", marginTop: "10px" }}>
                  <Col style={{ paddingRight: "45px" }}>Discount:</Col>
                  <Col>{transaction?.packageId?.discount}%</Col>
                </Row>
                <Row style={{ whiteSpace: "nowrap", marginTop: "10px" }}>
                  <Col style={{ paddingRight: "65px" }}>Tổng:</Col>
                  <Col>{transaction?.totalPrice?.toLocaleString("vi-VM")} VNĐ</Col>
                </Row>
              </Col>
              <Col span={12}>
                <Image src={transaction?.evidence} width={"50%"} preview={true}/>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </ModalCustom>
  );
}
