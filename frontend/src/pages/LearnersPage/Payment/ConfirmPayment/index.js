import { useState } from "react";
import axios from "axios";
import { Button, Row, Upload, Typography, Modal, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useAFileUpload } from "../../../../components/Upload/UploadAFile"; // Import custom hook
import { TitleCustom } from "../../../../components/Typography";
import ButtonCustom from "../../../../components/Button";
import CardCustom from "../../../../components/Card";
import { useParams } from "react-router-dom";
import { finishPayment } from "../../../../services/LearnerService";
export default function ConfirmPayment() {
  const { transactionId } = useParams();
  const { file, handleFileChange, handleFileUpload } = useAFileUpload();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Vui lòng chọn một tệp để upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await finishPayment(transactionId, formData);
      alert("Thông tin đã gửi qua email của bạn. Vui lòng kiểm tra");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <CardCustom style={{ maxWidth: "800px", width: "100%", padding: "20px", bordered: false }}>
        <Row justify={"center"}>
          <TitleCustom level={3}>Vui lòng gửi thông tin giao dịch để chúng mình xác nhận nhé!</TitleCustom>
        </Row>
        <Row justify={"center"} style={{ marginTop: "20px" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                onChange={(info) => {
                  handleFileChange(info);
                }}
                maxCount={1}
              >
                <div style={{ textAlign: "center" }}>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>

              <ButtonCustom buttonType="primary" onClick={handleUpload} style={{ marginTop: "10px" }}>
                Upload ảnh
              </ButtonCustom>
            </div>
          </Space>
        </Row>
      </CardCustom>
    </div>
  );
}
