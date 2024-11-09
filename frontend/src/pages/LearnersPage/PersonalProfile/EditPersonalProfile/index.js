import React, { useEffect, useState } from "react";
import { Avatar, Col, DatePicker, Form, Input, Modal, notification, Radio, Row, Upload } from "antd";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import { changeUserProfile, viewUserProfile } from "../../../../services/GuestService";
import { useAuth } from "../../../../hooks";
import { validationRules } from "../../../../helpers/validate";

export default function EditPersonalProfile() {
  const [form] = Form.useForm();
  const [avatarPhoto, setAvatarPhoto] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const { user } = useAuth();

  const showCancelConfirm = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn hủy cập nhật thông tin?",
      okText: "OK",
      cancelText: "Hủy",
      onOk: () => {
        form.setFieldsValue(initialValues); // Đặt lại form về giá trị ban đầu
      },
    });
  };

  useEffect(() => {
    viewUserProfile()
      .then((res) => {
        if (res && res.data && res.data[0]) {
          const dob = res?.data[0]?.dateOfBirth && dayjs(res.data[0].dateOfBirth, "YYYY-MM-DD").isValid() ? dayjs(res.data[0].dateOfBirth, "YYYY-MM-DD") : null;
          const values = {
            fullname: res?.data[0]?.fullName,
            gender: res?.data[0]?.gender,
            dateOfBirth: dob,
            phone: res?.data[0]?.phone,
            email: res?.data[0]?.email,
            role: res?.data[0]?.role,
            address: res?.data[0]?.address,
          };
          form.setFieldsValue(values);
          setAvatarPhoto(res.data[0]?.avatar || "");
          setInitialValues(values); // Lưu lại giá trị ban đầu
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        notification.error({
          message: "Lỗi tải thông tin",
          description: "Không thể tải thông tin cá nhân. Vui lòng thử lại sau.",
        });
      });
  }, [form, user]);

  const handleChangeInformation = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullname);
      formData.append("gender", values.gender);
      formData.append("dateOfBirth", values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("role", values.role);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      console.log("form data:", [...formData]);

      const res = await changeUserProfile(formData);
      notification.success({
        message: "Cập nhật thông tin thành công!",
        description: "Cập nhật thông tin cá nhân thành công",
      });
      if (res.data?.avatar) {
        setAvatarPhoto(res.data.avatar);
      }
      setInitialValues(values);
      console.log(res.data.avatar);
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMsg = error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
      notification.error({
        message: "Cập nhật thông tin thất bại!",
        description: errorMsg,
      });
    }
  };

  const handleAvatarPhotoChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      setAvatarFile(file);
      const newAvatarPhotoUrl = URL.createObjectURL(file);
      setAvatarPhoto(newAvatarPhotoUrl);
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
                  setAvatarFile(file);
                  const newAvatarPhotoUrl = URL.createObjectURL(file);
                  setAvatarPhoto(newAvatarPhotoUrl);
                  return false; // Ngăn việc tải lên tự động
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
                <Form.Item label="Họ tên" name="fullname" rules={[validationRules.required("Vui lòng nhập họ tên")]}>
                  <InputCustom placeholder="Họ tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                    <Radio value="other">Khác</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[validationRules.required("Vui lòng chọn ngày sinh!")]}>
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
              <Col span={12}>
                <Form.Item label="Địa chỉ" name="address">
                  <InputCustom placeholder="Địa chỉ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Vai trò" name="role">
                  <InputCustom placeholder="Vai trò" disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Email hiện tại" name="email">
                  <InputCustom placeholder="Email hiện tại" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="start" style={{ marginTop: 20 }}>
              <ButtonCustom type="primary" style={{ marginRight: 10, backgroundColor: "#00a2ae", borderColor: "#00a2ae" }} onClick={showCancelConfirm}>
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
