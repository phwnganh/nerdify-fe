import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Typography, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LogoutOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo1.png";
import logoMini from "../../../assets/logomini.png";
import STORAGE, { clearStorage, getStorage } from "../../../library/storage";
import { BASE_SERVER } from "../../../constants";

import { logout } from "../../../services/GuestService";
import { signout } from "../../../hooks/auth/reducers";

const { Sider } = Layout;
const { Text } = Typography;

// Styled components
const CustomSider = styled(Sider)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white !important;
  color: black;
  box-shadow: none;
`;

const LogoContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const CustomMenu = styled(Menu)`
  flex-grow: 1;
  .ant-menu-item-selected {
    font-weight: bold;
    color: black;
    background-color: #f78f2e !important;
  }
`;

const FooterSection = styled.div`
  padding: 15px 20px;
  text-align: center;
  flex-shrink: 0;
`;

const UserInfoContainer = styled.div`
  text-align: center;
`;

export default function SidebarCustom({ menuItems = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("/");
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleLogout = async () => {
    logout().then(() => {
      signout();
      window.location.reload();
    });
  };
  // Handle Menu Item Clicks
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      console.log("Logout action triggered");
      handleLogout();
    } else if (key === "hide-dashboard") {
      setCollapsed(!collapsed);
    } else {
      setSelectedKey(key);
      navigate(key);
    }
  };

  const menuItemsList = [
    ...menuItems,
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
    {
      key: "hide-dashboard",
      icon: <EyeInvisibleOutlined />,
      label: "Thu bảng điều khiển",
    },
  ];

  return (
    <div style={{ borderRight: "1px solid #e8e8e8" }}>
      <CustomSider collapsible collapsed={collapsed} trigger={null} onCollapse={(value) => setCollapsed(value)}>
        <LogoContainer>
          <img
            src={collapsed ? logoMini : logo}
            alt="Deutsch Nerd"
            style={{
              width: collapsed ? "50px" : "100px",
              height: "50px",
            }}
          />
        </LogoContainer>

        <CustomMenu theme="light" selectedKeys={[selectedKey]} onClick={handleMenuClick} mode="inline" items={menuItemsList} />
      </CustomSider>
    </div>
  );
}
