import { Avatar, Col, DatePicker, Form, Input, Radio, Row, Upload } from "antd";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function EditPersonalProfile() {
  const [form] = Form.useForm();
  const [avatarPhoto, setAvatarPhoto] = useState("");

  const handleAvatarPhotoChange = (info) => {
    if (info.file.status === "done") {
      const newAvatarPhotoUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatarPhoto(newAvatarPhotoUrl);
    }
  };
  return (
    <div style={{ padding: "30px" }}>
      <CardCustom title="Chỉnh sửa trang cá nhân">
        {/* Cover Photo with Avatar */}
        <CardCustom
          style={{
            backgroundSize: "cover",
            marginBottom: 20,
          }}
        >
          <Row gutter={16}>
            {/* Avatar Upload */}
            <Col span={24} style={{ textAlign: "center", marginBottom: 20 }}>
              {/* Placeholder for Avatar */}
              <Avatar
                size={100}
                style={{ backgroundColor: "#ffeb3b" }}
                icon={<img src={avatarPhoto || "avatar-url"} />}
              />
              <Upload
                showUploadList={false} // Hide the default upload list
                onChange={handleAvatarPhotoChange}
              >
                <ButtonCustom
                  buttonType="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  style={{
                    position: "absolute",
                    right: "calc(50% - 60px)",
                    top: "20px",
                  }}
                />
              </Upload>
            </Col>
          </Row>

          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ tên"
                  name="fullname"
                  initialValue={"Capybara"}
                >
                  <InputCustom placeholder="Họ tên"></InputCustom>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giới tính"
                  name={"gender"}
                  initialValue={"Nữ"}
                >
                  <Radio.Group>
                    <Radio value="Nam">Nam</Radio>
                    <Radio value="Nữ">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name={"dob"}>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Ngày sinh"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Điện thoại" name={"phone"}>
                  <InputCustom placeholder="Điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Mật khẩu hiện tại" name={"password"}>
                  <InputCustom placeholder="Mật khẩu hiện tại" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email hiện tại" name={"email"}>
                  <InputCustom placeholder="Email hiện tại" disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </CardCustom>

        {/* Subscription and Payment Section */}
        <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
          <div>Gói đăng ký và thanh toán</div>
          <div>Trạng thái tài khoản: Freemium</div>
          <ButtonCustom type="primary" style={{ marginTop: 10 }}>
            Nâng cấp Premium
          </ButtonCustom>
        </div>

        {/* Update and Delete Account Buttons */}
        <Row justify="center" style={{ marginTop: 20 }}>
          <ButtonCustom type="primary" style={{ marginRight: 10 }}>
            Cập nhật
          </ButtonCustom>
          <ButtonCustom type="danger">Xóa tài khoản</ButtonCustom>
        </Row>
      </CardCustom>
    </div>
  );
}
