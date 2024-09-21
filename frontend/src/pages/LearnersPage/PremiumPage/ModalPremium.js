import React, { useState } from "react";
import ButtonCustom from "../../../components/Button";
import { CheckSquareTwoTone } from "@ant-design/icons";
import ModalCustom from "../../../components/Modal";
import {setStorage} from "../../../library/storage";
import { useNavigate } from "react-router-dom";
import { CLIENT_URI } from "../../../constants";

export const ModalPremium = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const handleOk = () => {
    setStorage("isPremium", "true");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate(CLIENT_URI.PREMIUM);
  };

  return (
    <>
      <ModalCustom
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>
            Nâng cấp tài khoản với các gói Premium
          </h1>
          <h2 style={{ width: "450px", margin: "auto" }}>
            <CheckSquareTwoTone /> Mở khóa tất cả các phase của khóa học <br />{" "}
            <CheckSquareTwoTone /> Luyện bài tập nói
          </h2>
        </div>
        <div style={{ display: "inline-grid", width: "100%" }}>
          <ButtonCustom
            key="submit"
            buttonType="primary"
            onClick={() => {
              handleOk();
              navigate(CLIENT_URI.PREMIUM);
            }}
            style={{ width: "215px", margin: "20px auto" }}
          >
            Mở khóa ngay
          </ButtonCustom>
          <ButtonCustom
            key="submit"
            buttonType="secondary"
            onClick={handleOk}
            style={{ width: "215px", margin: "auto" }}
          >
            Không phải bây giờ
          </ButtonCustom>
        </div>
      </ModalCustom>
    </>
  );
};
