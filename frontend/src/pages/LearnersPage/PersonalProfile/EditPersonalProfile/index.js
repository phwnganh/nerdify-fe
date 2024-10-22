import React, { useEffect, useState } from "react";
import { Avatar, Col, DatePicker, Form, Input, notification, Radio, Row, Upload } from "antd";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import STORAGE, { getStorage } from "../../../../library/storage";
import dayjs from "dayjs";
import { BASE_SERVER } from "../../../../constants";
import { changeUserProfile, viewUserProfile } from "../../../../services/GuestService";
import { useAuth } from "../../../../hooks";

export default function EditPersonalProfile() {
  const [form] = Form.useForm();
  const [avatarPhoto, setAvatarPhoto] = useState("");
  const [users, setUsers] = useState({});
  const { user } = useAuth();
  const userId = user?.id;
  // const userId = getStorage(STORAGE.USER_ID);

  useEffect(() => {
    viewUserProfile()
      .then((res) => {
        if(res && res.data && res.data[0]){
          console.log("user profile", res.data[0]);

          setUsers(res.data[0]);
          const dob = res?.data[0]?.dateOfBirth && dayjs(res.data[0].dateOfBirth, "YYYY-MM-DD").isValid() ? dayjs(res.data[0].dateOfBirth, "YYYY-MM-DD") : null;
          form.setFieldsValue({
            fullname: res?.data[0]?.fullName,
            gender: res?.data[0]?.gender,
            dateOfBirth: dob,
            phone: res?.data[0]?.phone,
            email: res?.data[0]?.email,
          });
        }
        
      })
      .catch((err) => console.log(err));
  }, [form, userId]);

  const handleChangeInformation = async (values) => {
    try {
      const updatedUserData = {
        ...users,
        fullName: values.fullname,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DD") : null,
        phone: values.phone,
      };

      const res = await changeUserProfile(updatedUserData)
      notification.success({
        message: "Cập nhật thông tin thành công!",
        description: "Cập nhật thông tin cá nhân thành công"
      })
    } catch (error) {
      notification.error({
        message: "Cập nhật thông tin thất bại!"
      })
    }

  };

  const handleAvatarPhotoChange = (info) => {
    if (info.file.status === "done") {
      const newAvatarPhotoUrl = URL.createObjectURL(info.file.originFileObj);
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
              <Avatar size={100} style={{ backgroundColor: "#ffd54f" }} icon={<img src={avatarPhoto || "avatar-url"} alt="avatar" />} />
              <Upload showUploadList={false} onChange={handleAvatarPhotoChange}>
                <ButtonCustom
                  buttonType="primary"
                  shape="circle"
                  icon={<EditOutlined />}
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
                    disabledDate={(current) => current && current > moment().endOf("day")} // Chặn ngày trong tương lai
                    showToday={true}
                    inputReadOnly={true} // Không cho phép nhập bằng tay
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
