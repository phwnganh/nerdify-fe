import React from "react";
import { Button, Dropdown } from "antd";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { useNavigate } from "react-router-dom";

export default function FlashCard() {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>
          Tạo folder mới
        </div>
      ),
      icon: <FolderOutlined />,
    },
    {
      key: "2",
      label: (
        <div onClick={() => navigate(CLIENT_URI.CREATE_FLASH_CARD)}>
          Tạo học phần mới
        </div>
      ),
      icon: <FileOutlined />,
    },
  ];
  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={"click"}
      >
        <Button
          style={{
            background: "rgb(13 164 184 / 87%)",
            color: "white",
            width: "200px",
            margin: "20px",
          }}
        >
          Tạo bộ flashcard mới
        </Button>
      </Dropdown>

      <Button
        style={{
          background: "#088d2b",
          color: "white",
          width: "200px",
          margin: "20px",
        }}
      >
        Kiểm tra
      </Button>
    </div>
  );
}
