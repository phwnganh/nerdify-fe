import { Row } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";

export default function ManageSubscription() {
  return (
    <div>
      <div>
        <TitleCustom level={2}>QUẢN LÝ GÓI ĐĂNG KÝ</TitleCustom>
      </div>
      <div style={{ fontWeight: "bold" }}>Gói đăng ký hiện tại</div>
      <div>
        <CardCustom bordered={true} style={{ borderColor: "orange", marginTop: "20px" }}>
          <TitleCustom level={4}>Gói Premium 12 tháng</TitleCustom>
          <TextCustom>42,000 VNĐ / 1 tháng</TextCustom>
          <div>
            <TextCustom>Hủy bất cứ lúc nào</TextCustom>
          </div>
          <Row justify={"end"}>
            <ButtonCustom buttonType="primary">Hủy gói</ButtonCustom>
          </Row>
        </CardCustom>
      </div>
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>Các gói có sẵn</div>
      <div>
        <CardCustom bordered={true} style={{ borderColor: "orange", marginTop: "20px" }}>
          <TitleCustom level={4}>Gói Freemium</TitleCustom>
          <TextCustom>Miễn phí</TextCustom>
          <Row justify={"end"}>
            <ButtonCustom buttonType="primary">Đăng ký ngay</ButtonCustom>
          </Row>
        </CardCustom>
      </div>
    </div>
  );
}
