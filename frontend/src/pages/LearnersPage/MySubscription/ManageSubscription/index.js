import { Row } from "antd";
import CardCustom from "../../../../components/Card";
import { TextCustom, TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import { useEffect, useState } from "react";
import { getCurrentPremiumPackage } from "../../../../services/LearnerService";

export default function ManageSubscription() {
  const [currentPackage, setCurrentPackage] = useState();
  useEffect(() => {
    getCurrentPremiumPackage().then(res => {
      setCurrentPackage(res.data);
    })
  }, [])
  return (
    <div>
      <div>
        <TitleCustom level={2}>QUẢN LÝ GÓI ĐĂNG KÝ</TitleCustom>
      </div>
      <div style={{ fontWeight: "bold" }}>Gói đăng ký hiện tại</div>
      <div>
        <CardCustom bordered={true} style={{ borderColor: "orange", marginTop: "20px" }}>
          <TitleCustom level={4}>Gói Premium {currentPackage?.packageName}</TitleCustom>
          <TextCustom>{(currentPackage?.price)?.toLocaleString("vi-VN")} VNĐ</TextCustom>
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
