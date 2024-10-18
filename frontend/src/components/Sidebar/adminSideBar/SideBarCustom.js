import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo1.png";
import logoMini from "../../assets/logomini.png";

import styled from "styled-components";
import { LogoutOutlined } from "@ant-design/icons";

const { Sider } = Layout;



export default function SidebarCustom({ menuItems = [] }) { // Đặt giá trị mặc định là mảng rỗng
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
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" style={{ padding: "20px", textAlign: "center" }}>
      <img 
      src={collapsed ? logoMini : logo} 
      alt="Deustch Nerd" 
      style={{ width: collapsed ? "50px" : "100px", height: collapsed ? "50px" : "50px" }} 
    />
      </div>
      <Menu
        theme="light"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        style={{ border: "1px", display: "flex", flexDirection: "column", height: "100%" }}
      >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={"onLogout"}>
          Đăng Xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );

}