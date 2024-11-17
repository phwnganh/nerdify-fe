import { useState } from "react";
import ModalCustom from "../../../components/Modal/ModalCustom";
import ButtonCustom from "../../../components/Button/ButtonCustom";
import { TextCustom } from "../../../components/Typography/TypographyCustom";
import { useNavigate } from "react-router-dom";

export default function StartExamModal({ onStart }) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();
  const handleOk = () => {
    setIsModalVisible(false);
    onStart();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate(-1);
  };
  return (
    <div>
      <ModalCustom
        title="Bài kiểm tra cuối trình độ A1"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <ButtonCustom key="submit" buttonType="primary" onClick={handleOk}>
            Bắt đầu làm bài
          </ButtonCustom>,
        ]}
        centered
      >
        <TextCustom>
          Thời gian làm bài: <span style={{ color: "red" }}>20 phút</span>
        </TextCustom>
      </ModalCustom>
    </div>
  );
}
