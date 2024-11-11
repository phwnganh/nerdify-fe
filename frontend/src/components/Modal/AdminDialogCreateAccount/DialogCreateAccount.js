// DialogCreateAccount/index.js
import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const DialogCreateAccount = ({ onConfirm, onCancel }) => {
  const showDialog = () => {
    confirm({
      title: "Xác nhận tạo tài khoản mới",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn tạo tài khoản mới này không?",
      okText: "Xác nhận",
      cancelText: "Hủy bỏ",
      onOk() {
        onConfirm();
      },
      onCancel() {
        onCancel();
      },
    });
  };

  return { showDialog };
};

export default DialogCreateAccount;
