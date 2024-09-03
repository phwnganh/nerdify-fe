import React, { useEffect, useState } from "react";
import { Col, Dropdown, Layout, Menu, Row, Tabs } from "antd";
import MenuBar from "../Menu";
import InputCustom from "../Input";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import ButtonCustom from "../Button";
import MenuItem from "../Menu/MenuItem";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CLIENT_URI } from "../../constants/uri.constants";
import { useAuth } from "../../hooks";
import { ROLES } from "../../constants";
import ModalRequireToLogin from "../../pages/GuestsPage/ModalRequireToLogin";
const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("home");
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const { courseId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (location.pathname === CLIENT_URI.LEVEL_DETAIL) {
      setSelectedKey("practices");
    } else if (location.pathname === CLIENT_URI.LANDING_PAGE) {
      setSelectedKey("home");
    }
  }, [location.pathname]);
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    // console.log(e.key);
  };

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 50px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Row align="middle" justify="space-between" style={{ width: "100%" }}>
        {/* Logo */}
        <Col flex="50px">
          <div className="logo">
            <img
              src={logo}
              alt="Deustch Nerd"
              style={{ width: "100px", height: "50px", paddingTop: "15px" }}
            />
          </div>
        </Col>

        {/* Menu */}
        <Col flex="auto">
          <MenuBar
            mode="horizontal"
            style={{ display: "flex", justifyContent: "center" }}
            selectedKey={selectedKey}
            onClick={handleMenuClick}
          >
            <MenuItem
              key="home"
              onClick={() => navigate(CLIENT_URI.LANDING_PAGE)}
            >
              TRANG CHỦ
            </MenuItem>
            <MenuItem
              key="flashcards"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              FLASHCARD
            </MenuItem>
            <MenuItem key="learning-progress">TIẾN ĐỘ HỌC TẬP</MenuItem>
            <MenuItem key="blog">BLOG HỌC TẬP</MenuItem>
            <MenuItem key="forum">DIỄN ĐÀN TRỰC TUYẾN</MenuItem>
            <MenuItem
              key="premium"
              onClick={() => navigate(CLIENT_URI.PREMIUM)}
            >
              PREMIUM
            </MenuItem>
          </MenuBar>
        </Col>

        {/* Search and Buttons */}
        <Col
          flex="300px"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            className="search-container"
            onClick={handleSearchClick}
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "10px",
            }}
          >
            <SearchOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
            {searchVisible && (
              <InputCustom
                placeholder="Tìm kiếm"
                onChange={handleInputChange}
                value={inputValue}
                style={{
                  width: "180px",
                  marginLeft: "10px",
                }}
              />
            )}
          </div>

          <ButtonCustom
            buttonType="primary"
            style={{ marginRight: "10px" }}
            onClick={() => navigate(CLIENT_URI.LOGIN)}
          >
            ĐĂNG NHẬP
          </ButtonCustom>
          <ButtonCustom
            buttonType="secondary"
            onClick={() => navigate(CLIENT_URI.REGISTER)}
          >
            ĐĂNG KÝ
          </ButtonCustom>
        </Col>
      </Row>
      {isModalVisible && (
        <ModalRequireToLogin open={isModalVisible} onClose={handleCloseModal} />
      )}
    </Header>
  );
}
