import React, { useEffect, useState } from "react";
import { Avatar, Col, DatePicker, Form, Input, Radio, Row, Upload } from "antd";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import Sidebar from "../../../../components/Sidebar";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";

export default function EditPersonalProfile() {
  const [form] = Form.useForm();
  const [avatarPhoto, setAvatarPhoto] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9999/users/1`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        form.setFieldsValue({
          fullname: res.fullname,
          gender: res.gender,
          dob: res.dob ? moment(res.dob, "YYYY-MM-DD") : null,
          phone: res.phone,
          email: res.email,
        });
      })
      .catch((err) => console.log(err));
  }, [form]);

  const handleChangeInformation = (values) => {
    const updatedUserData = {
      ...user,
      fullname: values.fullname,
      gender: values.gender,
      dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      phone: values.phone,
    };
    fetch("http://localhost:9999/users/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserData),
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        form.setFieldsValue({
          fullname: res.fullname,
          gender: res.gender,
          dob: res.dob ? moment(res.dob, "YYYY-MM-DD") : null,
          phone: res.phone,
          email: res.email,
        });
        console.log(res);
      });
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
                <Form.Item label="Ngày sinh" name="dob">
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày sinh"
                    format="DD/MM/YYYY"
                    disabledDate={(current) => current && current > moment().endOf("day")} // Chặn ngày trong tương lai
                    showToday={false}
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
