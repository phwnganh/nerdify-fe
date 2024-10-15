// ModalCreateAccount/index.js
import React, { useState } from "react";
import { Modal, Input, Select, Button, Form, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import DialogCreateAccount from "../DialogCreateAccount"; // Import the dialog component

const { Option } = Select;

const ModalCreateAccount = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const dialog = DialogCreateAccount({
    onConfirm: () => {
      console.log("Account creation confirmed");
      form.resetFields();
      onClose();
    },
    onCancel: () => {
      console.log("Account creation canceled");
    },
  });

  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        dialog.showDialog();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal title="Thêm mới tài khoản" open={isVisible} onCancel={onClose} footer={null} closeIcon={<CloseOutlined />}>
      <Form form={form} layout="vertical" initialValues={{ status: "active" }}>
        <Form.Item name="username" label="Tên người dùng tài khoản" rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}>
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Định dạng email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
          <Input placeholder="Nhập số điện thoại liên lạc" />
        </Form.Item>

        <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}>
          <Select placeholder="Chọn vai trò">
            <Option value="admin">Quản trị viên</Option>
            <Option value="user">Người dùng</Option>
            <Option value="guest">Khách</Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Trạng thái">
          <Tag color="green">Đang hoạt động</Tag>
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button style={{ color: "#fff", backgroundColor: "#ffa751" }} onClick={handleConfirm}>
            Xác nhận
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalCreateAccount;

//======================how to use===================================
// ParentComponent.js
// import React, { useState } from 'react';
// import { Button } from 'antd';
// import ModalCreateAccount from './ModalCreateAccount';

// const ParentComponent = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleClose = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={showModal}>
//         Thêm mới tài khoản
//       </Button>
//       <ModalCreateAccount isVisible={isModalVisible} onClose={handleClose} />
//     </div>
//   );
// };

// export default ParentComponent;
