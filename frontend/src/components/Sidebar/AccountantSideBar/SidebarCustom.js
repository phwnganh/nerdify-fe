import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logo1.png";
import logoMini from "../../../assets/logomini.png";
import styled from "styled-components";
import { LogoutOutlined, HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";

const { Sider } = Layout;

// Styled Component to Customize the Menu
const CustomMenu = styled(Menu)`
  .ant-menu-item-selected {
    font-weight: bold;
    color: black;
    background-color: #f78f2e !important; /* Light Yellow */
  }
`;

const CustomSider = styled(Sider)`
  .ant-layout-sider-trigger {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    width: 100%;
    text-align: center;
  }
`;

export default function SidebarCustom({ menuItems = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("/");

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

  return (
    <CustomSider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" style={{ padding: "20px", textAlign: "center" }}>
        <img
          src={collapsed ? logoMini : logo}
          alt="Deustch Nerd"
          style={{
            width: collapsed ? "50px" : "100px",
            height: "50px",
          }}
        />
      </div>
      <CustomMenu
        theme="light"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        style={{
          border: "1px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => {}}>
          Đăng Xuất
        </Menu.Item>
      </CustomMenu>
    </CustomSider>
  );
}
