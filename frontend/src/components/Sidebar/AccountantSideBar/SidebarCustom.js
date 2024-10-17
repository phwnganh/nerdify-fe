import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Typography, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LogoutOutlined, EyeInvisibleOutlined, HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo1.png";
import logoMini from "../../../assets/logomini.png";
import STORAGE, { clearStorage, getStorage } from "../../../library/storage";
import { BASE_SERVER } from "../../../constants";

const { Sider } = Layout;
const { Text } = Typography;

// Styled components
const CustomSider = styled(Sider)`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Đảm bảo chiều cao của sider bằng chiều cao màn hình */
`;

const LogoContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const CustomMenu = styled(Menu)`
  flex-grow: 1; /* Đảm bảo menu chiếm toàn bộ không gian còn lại */
  .ant-menu-item-selected {
    font-weight: bold;
    color: black;
    background-color: #f78f2e !important;
  }
`;

const FooterSection = styled.div`
  padding: 15px 20px;
  text-align: center;
  flex-shrink: 0; /* Đảm bảo footer không bị co lại */
`;

const UserInfoContainer = styled.div`
  text-align: center;
`;

export default function SidebarCustom({ menuItems = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("/");
  const [user, setUser] = useState(null);
  const userId = getStorage(STORAGE.USER_ID);
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    fetch(`${BASE_SERVER}/users/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleLogout = async () => {
    // logout().then(() => {
    //   signout();
    //   window.location.reload();
    // });
    // await signout();
    clearStorage();
    window.location.reload();
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
      label: "Ẩn bảng điều khiển",
    },
  ];

  return (
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

      <FooterSection>
        <UserInfoContainer>
          <Avatar size={64} src="https://via.placeholder.com/64" />
          <div style={{ marginTop: 10 }}>
            <Text strong>{user?.fullName}</Text>
            <br />
            <Text type="secondary">{user?.email}</Text>
          </div>
        </UserInfoContainer>
      </FooterSection>
    </CustomSider>
  );
}
