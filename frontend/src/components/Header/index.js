import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import MenuBar from "../Menu";
import InputCustom from "../Input";
import ButtonCustom from "../Button";
import MenuItem from "../Menu/MenuItem";
import ModalRequireToLogin from "../../pages/GuestsPage/ModalRequireToLogin";
import logo from "../../assets/logo1.png";
import { CLIENT_URI } from "../../constants/uri.constants";

const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("home");
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle setting the selected menu item based on the current route
  useEffect(() => {
    if (location.pathname === CLIENT_URI.LEVEL_DETAIL) {
      setSelectedKey("practices");
    } else if (location.pathname === CLIENT_URI.LANDING_PAGE) {
      setSelectedKey("home");
    }
  }, [location.pathname]);

  // Event Handlers
  const handleMenuClick = (e) => setSelectedKey(e.key);
  const handleSearchClick = () => setSearchVisible(true);
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleCloseModal = () => setIsModalVisible(false);

  // Styles
  const headerStyle = {
    background: "#fff",
    position: "fixed",
    width: "100%",
    zIndex: 1000,
    top: 0,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    height: "100px", // Increased header height
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
      {/* Fixed Header */}
      <Header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
            }}
          >
            <img src={logo} alt="Deutsch Nerd" style={logoStyle} />
          </div>

          {/* Menu */}
          <div style={menuStyle}>
            <MenuBar
              mode="horizontal"
              selectedKey={selectedKey}
              onClick={handleMenuClick}
              style={{
                lineHeight: "64px", // Ensures menu items are vertically centered
                borderBottom: "none", // Removes bottom border if any
              }}
            >
              <MenuItem key="home" onClick={() => navigate(CLIENT_URI.LANDING_PAGE)}>
                TRANG CHỦ
              </MenuItem>
              <MenuItem key="flashcards" onClick={() => navigate(CLIENT_URI.FLASH_CARD)}>
                FLASHCARD
              </MenuItem>
              <MenuItem key="learning-progress" onClick={() => navigate(CLIENT_URI.LEARNING_PROGRESS)}>
                TIẾN ĐỘ HỌC TẬP
              </MenuItem>
              <MenuItem key="blog">BLOG HỌC TẬP</MenuItem>
              <MenuItem key="payment" onClick={() => navigate(CLIENT_URI.PREMIUM)}>
                GÓI PREMIUM
              </MenuItem>
            </MenuBar>
          </div>

          {/* Search and Buttons */}
          <div style={buttonGroupStyle}>
            <div className="search-container" onClick={handleSearchClick} style={searchContainerStyle}>
              <SearchOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
              {searchVisible && <InputCustom placeholder="Tìm kiếm" onChange={handleInputChange} value={inputValue} style={{ width: "180px", marginLeft: "10px" }} />}
            </div>
            <ButtonCustom buttonType="primary" style={{ marginRight: "10px" }} onClick={() => navigate(CLIENT_URI.LOGIN)}>
              ĐĂNG NHẬP
            </ButtonCustom>
            <ButtonCustom buttonType="secondary" onClick={() => navigate(CLIENT_URI.REGISTER)}>
              ĐĂNG KÝ
            </ButtonCustom>
          </div>
        </div>
        {/* Modal for requiring login */}
        {isModalVisible && <ModalRequireToLogin open={isModalVisible} onClose={handleCloseModal} />}
      </Header>
    </>
  );
}