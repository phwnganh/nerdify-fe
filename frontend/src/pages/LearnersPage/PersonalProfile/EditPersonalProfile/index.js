import { Avatar, Col, DatePicker, Form, Input, Radio, Row, Upload } from "antd";
import CardCustom from "../../../../components/Card";
import InputCustom from "../../../../components/Input";
import ButtonCustom from "../../../../components/Button";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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
          dob: res.dob ? moment(res.dob) : null,
          phone: res.phone,
          password: res.password,
          email: res.email,
        });
      })
      .catch((err) => console.log(err));
    // const fetchCurrentUser = async () => {
    //   try {
    //     const getData = await getCurrentUser();
    //     const res = getData?.data?.user;
    //     setUser(res);
    //     form.setFieldsValue({
    //       fullname: res?.fullName,
    //       gender: res?.gender,
    //       dob: res?.dateOfBirth,
    //       phone: res?.phone,
    //       email: res?.email,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchCurrentUser();
  }, []);



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
          dob: res.dob ? moment(res.dob) : null,
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

          <Form
            form={form}
            layout="vertical"
            onFinish={handleChangeInformation}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Họ tên" name="fullname">
                  <InputCustom placeholder="Họ tên"></InputCustom>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giới tính" name={"gender"}>
                  <Radio.Group>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
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
                <Form.Item label="Email hiện tại" name={"email"}>
                  <InputCustom placeholder="Email hiện tại" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 20 }}>
              <ButtonCustom
                type="primary"
                style={{ marginRight: 10 }}
                htmlType="submit"
              >
                Cập nhật
              </ButtonCustom>
              <ButtonCustom type="danger">Xóa tài khoản</ButtonCustom>
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
      </CardCustom>
    </div>
  );
}
