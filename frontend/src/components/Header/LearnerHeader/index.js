import React, { useEffect, useState } from "react";
import { Col, Dropdown, Layout, Menu, Row } from "antd";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import MenuBar from "../../Menu";
import InputCustom from "../../Input";
import MenuItem from "../../Menu/MenuItem";
import logo from "../../../assets/logo1.png";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { logout } from "../../../services/GuestService";
import { signout } from "../../../hooks/auth/reducers";

const { Header } = Layout;

export default function LearnerHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState("course");
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Handle route changes and update selected menu item
  useEffect(() => {
    if (location.pathname === CLIENT_URI.COURSE_PAGE) {
      setSelectedKey("course");
    } else if (location.pathname === CLIENT_URI.FLASH_CARD) {
      setSelectedKey("flashcards");
    }
  }, [location.pathname]);

  // Handlers
  const handleMenuClick = (e) => setSelectedKey(e.key);

  const handleSearchClick = () => setSearchVisible(true);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleLogout = () => {
    logout().then(() => {
      signout();
      window.location.reload();
    });
  };

  // User dropdown menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate(CLIENT_URI.PROFILE)}>
        Xem Trang Cá Nhân
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng Xuất
      </Menu.Item>
    </Menu>
  );

  // Styles
  const headerStyle = {
    background: "#fff",
    padding: "0 50px",
    display: "flex",
    alignItems: "center",
    position: "fixed", // Makes the header fixed
    width: "100%",
    zIndex: 1000,
    top: 0,
  };

  const logoStyle = {
    width: "100px",
    height: "50px",
    paddingTop: "15px",
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const searchContainerStyle = {
    display: "flex",
    alignItems: "center",
    paddingRight: "10px",
  };

  return (
    <Header style={headerStyle}>
      <Row align="middle" justify="space-between" style={{ width: "100%" }}>
        {/* Logo */}
        <Col flex="50px">
          <div className="logo">
            <img src={logo} alt="Deutsch Nerd" style={logoStyle} />
          </div>
        </Col>

        {/* Menu */}
        <Col flex="auto">
          <MenuBar mode="horizontal" style={{ display: "flex", justifyContent: "center" }} selectedKey={selectedKey} onClick={handleMenuClick}>
            <MenuItem key="course" onClick={() => navigate(CLIENT_URI.COURSE_PAGE)}>
              KHÓA HỌC
            </MenuItem>
            <MenuItem key="flashcards" onClick={() => navigate(CLIENT_URI.FLASH_CARD)}>
              FLASHCARD
            </MenuItem>
            <MenuItem key="learning-progress">TIẾN ĐỘ HỌC TẬP</MenuItem>
            <MenuItem key="blog">BLOG HỌC TẬP</MenuItem>
            <MenuItem key="premium" onClick={() => navigate(CLIENT_URI.PREMIUM)}>
              PREMIUM
            </MenuItem>
          </MenuBar>
        </Col>

        {/* Search and User Actions */}
        <Col flex="300px" style={buttonGroupStyle}>
          {/* Search */}
          <div className="search-container" onClick={handleSearchClick} style={searchContainerStyle}>
            <SearchOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
            {searchVisible && <InputCustom placeholder="Tìm kiếm" onChange={handleInputChange} value={inputValue} style={{ width: "180px", marginLeft: "10px" }} />}
          </div>

          {/* Notification Icon */}
          <BellOutlined style={{ fontSize: "25px", cursor: "pointer", marginRight: "20px" }} />

          {/* User Dropdown */}
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <UserOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
