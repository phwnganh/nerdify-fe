import { useState } from "react";
import ModalCustom from "../../../../components/Modal";
import ButtonCustom from "../../../../components/Button";
import { TextCustom } from "../../../../components/Typography";

export default function StartExamModal({onStart}){
      const [isModalVisible, setIsModalVisible] = useState(true);

      const handleOk = () => {
            setIsModalVisible(false);
            onStart();
      }
      return (
            <ModalCustom title="Bài kiểm tra cuối trình độ A1" visible={isModalVisible} onOk={handleOk} footer={[<ButtonCustom key="submit" buttonType="primary" onClick={handleOk}>Bắt đầu làm bài</ButtonCustom>]} centered>
                  <TextCustom>Thời gian làm bài: <span style={{color: 'red'}}>20 phút</span></TextCustom>
            </ModalCustom>
      )
}