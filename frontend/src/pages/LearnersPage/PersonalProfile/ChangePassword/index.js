import React from "react";
import { Form, Input } from "antd";
import CardCustom from "../../../../components/Card";
import ButtonCustom from "../../../../components/Button";
import Sidebar from "../../../../components/Sidebar/learnerSideBar";

export default function ChangePassword() {
  const [form] = Form.useForm();

  const handleChangePassword = (values) => {
    console.log("Change password values:", values);
    //Send a request to your backend to change the password
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom title="ĐỔI MẬT KHẨU" style={{ backgroundColor: "white" }}>
          <Form form={form} layout="vertical" onFinish={handleChangePassword}>
            <Form.Item name="currentPassword" label="Mật khẩu hiện tại" rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}>
              <Input.Password placeholder="Mật khẩu hiện tại" />
            </Form.Item>
            <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}>
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Nhập lại mật khẩu mới"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 20 }}>
              <ButtonCustom type="primary" style={{ marginRight: 10, backgroundColor: "#00a2ae", borderColor: "#00a2ae" }}>
                Hủy
              </ButtonCustom>
              <ButtonCustom type="primary" htmlType="submit" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}>
                Lưu
              </ButtonCustom>
            </div>
          </Form>
        </CardCustom>
      </div>
    </div>
  );
}
