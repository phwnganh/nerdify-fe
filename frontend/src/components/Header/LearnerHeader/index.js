import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Menu } from "antd";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
  const [selectedKey, setSelectedKey] = useState("course");
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleMenuClick = (e) => setSelectedKey(e.key);
  const handleSearchClick = () => setSearchVisible(true);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleLogout = () => {
    logout().then(() => {
      signout();
      window.location.reload();
    });
  };

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

  const headerStyle = {
    background: "#fff",
    position: "fixed",
    width: "100%",
    zIndex: 1000,
    top: 0,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    height: "100px",
    display: "flex",
    alignItems: "center",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  };

  const logoStyle = {
    width: "150px",
    height: "auto",
  };

  const menuStyle = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  };

  const searchContainerStyle = {
    display: "flex",
    alignItems: "center",
    paddingRight: "10px",
  };

  const buttonGroupStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <Header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100px" }}>
            <img src={logo} alt="Deutsch Nerd" style={logoStyle} />
          </div>

          {/* Menu */}
          <div style={menuStyle}>
            <MenuBar
              mode="horizontal"
              selectedKey={selectedKey}
              onClick={handleMenuClick}
              style={{
                lineHeight: "64px",
                borderBottom: "none",
              }}
            >
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
          </div>

          {/* Search and User Actions */}
          <div style={buttonGroupStyle}>
            <div className="search-container" onClick={handleSearchClick} style={searchContainerStyle}>
              <SearchOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
              {searchVisible && <InputCustom placeholder="Tìm kiếm" onChange={handleInputChange} value={inputValue} style={{ width: "180px", marginLeft: "10px" }} />}
            </div>

            <BellOutlined style={{ fontSize: "25px", cursor: "pointer", marginRight: "20px" }} />

            <Dropdown overlay={userMenu} trigger={["click"]}>
              <UserOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
}
