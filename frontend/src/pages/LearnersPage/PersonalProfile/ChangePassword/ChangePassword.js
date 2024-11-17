import React, { useState } from "react";
import { Form, Input, notification } from "antd";
import CardCustom from "../../../../components/Card/CardCustom";
import ButtonCustom from "../../../../components/Button/ButtonCustom";
import Sidebar from "../../../../components/Sidebar/LearnerSideBar/SideBarCustom";
import { changePassword } from "../../../../services/GuestService";
import { PASSWORD_REGEX } from "../../../../constants";

export default function ChangePassword() {
  const [form] = Form.useForm();
  const handleChangePassword = async (values) => {
    try {
      const updatedPassword = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        newConfirmationPassword: values.newConfirmationPassword
      }
      console.log('Sending data to backend:', updatedPassword);
      const res = await changePassword(updatedPassword)
      notification.success({
        message: "Cập nhật mật khẩu thành công!",
        description: "Cập nhật mật khẩu thành công"
      })
    } catch (error) {
      notification.error({
        message: "Cập nhật mật khẩu thất bại!"
      })
    }
    //Send a request to your backend to change the password
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "30px", backgroundColor: "#f0f2f5" }}>
        <CardCustom title="ĐỔI MẬT KHẨU" style={{ backgroundColor: "white" }}>
          <Form form={form} layout="vertical" onFinish={handleChangePassword}>
            <Form.Item name="oldPassword" label="Mật khẩu hiện tại" >
              <Input.Password placeholder="Mật khẩu hiện tại" />
            </Form.Item>
            <Form.Item name="newPassword" label="Mật khẩu mới" rules={[
                {
                  pattern: PASSWORD_REGEX,
                  message: "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
                },
              ]}>
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item
              name="newConfirmationPassword"
              label="Nhập lại mật khẩu mới"
              dependencies={["newPassword"]}
              rules={[
                {
                  pattern: PASSWORD_REGEX,
                  message: "Mật khẩu phải có ít nhất 8 kí tự trong đó ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 kí tự đặc biệt",
                },
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
