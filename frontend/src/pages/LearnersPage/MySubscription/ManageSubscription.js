import { Modal, Row } from "antd";
import CardCustom from "../../../components/Card/CardCustom";
import { TextCustom, TitleCustom } from "../../../components/Typography/TypographyCustom";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { useEffect, useState } from "react";
import { getCurrentPremiumPackage } from "../../../services/LearnerService";
import { cancelPremium } from "../../../services/GuestService";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";

export default function ManageSubscription() {
  const [currentPackage, setCurrentPackage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentPremiumPackage().then((res) => {
      setCurrentPackage(res.data);
    });
  }, []);

  const cancelPremiumPackage = async () => {
    try {
      const res = await cancelPremium();
      navigate(CLIENT_URI.PREMIUM);
    } catch (error) {
      console.log(error);
    }
  };

  const showCancelCurrentPackageConfirm = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn hủy gói?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => cancelPremiumPackage(),
    });
  };
  return (
    <div>
      <div>
        <TitleCustom level={2}>QUẢN LÝ GÓI ĐĂNG KÝ</TitleCustom>
      </div>
      <div style={{ fontWeight: "bold" }}>Gói đăng ký hiện tại</div>
      <div>
        <CardCustom bordered={true} style={{ borderColor: "orange", marginTop: "20px" }}>
          <TitleCustom level={4}>Gói Premium {currentPackage?.packageName}</TitleCustom>
          <TextCustom>{currentPackage?.price?.toLocaleString("vi-VN")} VNĐ</TextCustom>
          <div>
            <TextCustom>Hủy bất cứ lúc nào</TextCustom>
          </div>
          <Row justify={"end"}>
            <ButtonCustom buttonType="primary" onClick={() => showCancelCurrentPackageConfirm()}>Hủy gói</ButtonCustom>
          </Row>
        </CardCustom>
      </div>
      {/* <div style={{ marginTop: "20px", fontWeight: "bold" }}>Các gói có sẵn</div> */}
      {/* <div>
        <CardCustom bordered={true} style={{ borderColor: "orange", marginTop: "20px" }}>
          <TitleCustom level={4}>Gói Freemium</TitleCustom>
          <TextCustom>Miễn phí</TextCustom>
          <Row justify={"end"}>
            <ButtonCustom buttonType="primary">Đăng ký ngay</ButtonCustom>
          </Row>
        </CardCustom>
      </div> */}
    </div>
  );
}
