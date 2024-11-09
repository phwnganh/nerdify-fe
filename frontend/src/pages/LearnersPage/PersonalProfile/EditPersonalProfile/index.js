import React, { useEffect, useState } from "react";
import { Avatar, Col, DatePicker, Form, Input, notification, Radio, Row, Upload } from "antd";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import { changeUserProfile, viewUserProfile } from "../../../../services/GuestService";
import { useAuth } from "../../../../hooks";

export default function EditPersonalProfile() {
  const [form] = Form.useForm();
  const [avatarPhoto, setAvatarPhoto] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    viewUserProfile()
      .then((res) => {
        if (res && res.data && res.data[0]) {
          const userData = res.data[0];
          const dob = userData.dateOfBirth && dayjs(userData.dateOfBirth, "YYYY-MM-DD").isValid() ? dayjs(userData.dateOfBirth, "YYYY-MM-DD") : null;
          form.setFieldsValue({
            fullname: userData.fullName,
            gender: userData.gender,
            dateOfBirth: dob,
            phone: userData.phone,
            email: userData.email,
          });
          setAvatarPhoto(userData.avatar || "");
        }
      })
      .catch((err) => console.log(err));
  }, [form, user]);

  const handleChangeInformation = async (values) => {
    try {
      const formData = {
        fullName: values.fullname,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
        phone: values.phone,
        avatar: avatarBase64 || undefined,
      };

      const res = await changeUserProfile(formData);
      if (res && res.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công!",
          description: "Cập nhật thông tin cá nhân thành công",
        });
        if (res.data?.avatar) {
          setAvatarPhoto(res.data.avatar); // Cập nhật ảnh mới từ phản hồi
        }
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      notification.error({
        message: "Cập nhật thông tin thất bại!",
        description: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
    }
  };

  const handleAvatarPhotoChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setAvatarBase64(base64); // Gửi chuỗi base64 đầy đủ (bao gồm tiền tố)
        setAvatarPhoto(base64); // Hiển thị ảnh với tiền tố đầy đủ
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom title="CHỈNH SỬA THÔNG TIN CÁ NHÂN" style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ position: "relative" }}>
              <Avatar size={100} src={avatarPhoto || "avatar-url"} alt="avatar" />
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const base64 = reader.result;
                    setAvatarBase64(base64);
                    setAvatarPhoto(base64);
                  };
                  reader.readAsDataURL(file);
                  return false;
                }}
                onChange={handleAvatarPhotoChange}
              >
                <ButtonCustom
                  buttonType="primary"
                  shape="circle"
                  icon={<UploadOutlined />}
                  style={{
                    position: "absolute",
                    right: -10,
                    bottom: 0,
                  }}
                />
              </Upload>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={handleChangeInformation}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Họ tên" name="fullname">
                  <InputCustom placeholder="Họ tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name="dateOfBirth">
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày sinh"
                    format="YYYY-MM-DD"
                    allowClear
                    disabledDate={(current) => current && current > moment().endOf("day")}
                    showToday={true}
                    inputReadOnly={true}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Điện thoại" name="phone">
                  <InputCustom placeholder="Điện thoại" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Email hiện tại" name="email">
                  <InputCustom placeholder="Email hiện tại" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="start" style={{ marginTop: 20 }}>
              <ButtonCustom type="primary" style={{ marginRight: 10, backgroundColor: "#00a2ae", borderColor: "#00a2ae" }}>
                Hủy
              </ButtonCustom>
              <ButtonCustom type="primary" htmlType="submit" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}>
                Lưu
              </ButtonCustom>
            </Row>
          </Form>
        </CardCustom>
      </div>
    </div>
  );
}
