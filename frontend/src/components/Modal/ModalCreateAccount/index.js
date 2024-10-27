// // ModalCreateAccount/index.js
// import React, { useState } from "react";
// import { Modal, Input, Select, Button, Form, Tag } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import DialogCreateAccount from "../DialogCreateAccount"; // Import the dialog component
// import { createUser } from "../../../services/AdminService";
// const { Option } = Select;

// const ModalCreateAccount = ({ isVisible, onClose }) => {
//   const [form] = Form.useForm();
//   const dialog = DialogCreateAccount({
//     onConfirm: () => {
//       console.log("Account creation confirmed");
//       form.resetFields();
//       onClose();
//     },
//     onCancel: () => {
//       console.log("Account creation canceled");
//     },
//   });

//   const handleConfirm = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         console.log("Form Values:", values);
//         dialog.showDialog();
//       })
//       .catch((info) => {
//         console.log("Validation Failed:", info);
//       });
//   };

//   return (
//     <Modal title="Thêm mới tài khoản" open={isVisible} onCancel={onClose} footer={null} closeIcon={<CloseOutlined />}>
//       <Form form={form} layout="vertical" initialValues={{ status: "active" }}>
//         <Form.Item name="username" label="Tên người dùng tài khoản" rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}>
//           <Input placeholder="Nhập tên người dùng" />
//         </Form.Item>

//         <Form.Item
//           name="email"
//           label="Email"
//           rules={[
//             { required: true, message: "Vui lòng nhập email!" },
//             { type: "email", message: "Định dạng email không hợp lệ!" },
//           ]}
//         >
//           <Input placeholder="Nhập email" />
//         </Form.Item>

//         <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
//           <Input placeholder="Nhập số điện thoại liên lạc" />
//         </Form.Item>

//         <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}>
//           <Select placeholder="Chọn vai trò">
//             <Option value="admin">Quản trị viên</Option>
//             <Option value="user">Người dùng</Option>
//             <Option value="guest">Khách</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item name="status" label="Trạng thái">
//           <Tag color="green">Đang hoạt động</Tag>
//         </Form.Item>

//         <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
//           <Button onClick={onClose}>Hủy bỏ</Button>
//           <Button style={{ color: "#fff", backgroundColor: "#ffa751" }} onClick={handleConfirm}>
//             Xác nhận
//           </Button>
//         </div>
//       </Form>
//     </Modal>
//   );
// };

// export default ModalCreateAccount;

// //======================how to use===================================
// // ParentComponent.js
// // import React, { useState } from 'react';
// // import { Button } from 'antd';
// // import ModalCreateAccount from './ModalCreateAccount';

// // const ParentComponent = () => {
// //   const [isModalVisible, setIsModalVisible] = useState(false);

// //   const showModal = () => {
// //     setIsModalVisible(true);
// //   };

// //   const handleClose = () => {
// //     setIsModalVisible(false);
// //   };

// //   return (
// //     <div>
// //       <Button type="primary" onClick={showModal}>
// //         Thêm mới tài khoản
// //       </Button>
// //       <ModalCreateAccount isVisible={isModalVisible} onClose={handleClose} />
// //     </div>
// //   );
// // };

// // export default ParentComponent;

// src/components/ModalCreateAccount/index.js

import React from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { createUser } from "../../../services/AdminService"; // Import the createUser function

const { Option } = Select;

const ModalCreateAccount = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        // Show confirmation dialog
        Modal.confirm({
          title: "Xác nhận tạo tài khoản mới",
          icon: <ExclamationCircleOutlined />,
          content: "Bạn có muốn tạo tài khoản mới này không?",
          okText: "Xác nhận",
          cancelText: "Hủy bỏ",
          onOk: () => {
            // Call API to create user
            createUser(values)
              .then((response) => {
                console.log("User created successfully:", response);
                form.resetFields();
                onClose();
              })
              .catch((error) => {
                console.error("Error creating user:", error);
                // Handle error (e.g., show notification)
              });
          },
        });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal title="Thêm mới tài khoản" visible={isVisible} onCancel={onClose} footer={null} closeIcon={<CloseOutlined />}>
      <Form form={form} layout="vertical">
        <Form.Item name="fullName" label="Tên đầy đủ" rules={[{ required: true, message: "Vui lòng nhập tên đầy đủ!" }]}>
          <Input placeholder="Nhập tên đầy đủ" />
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
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}>
          <Select placeholder="Chọn vai trò">
            <Option value="admin">Admin</Option>
            <Option value="contentManager">Content Manager</Option>
            <Option value="accountant">Accountant</Option>
            <Option value="instructor">Instructor</Option>
          </Select>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button type="primary" style={{ backgroundColor: "#ffa751", borderColor: "#ffa751" }} onClick={handleConfirm}>
            Xác nhận
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalCreateAccount;
