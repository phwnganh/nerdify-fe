import React, { useEffect, useState } from "react";
import { Col, Dropdown, Layout, Menu, Row, Tabs } from "antd";
import MenuBar from "../../Menu";
import InputCustom from "../../Input";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import MenuItem from "../../Menu/MenuItem/index";
import logo from "../../../assets/logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CLIENT_URI } from "../../../constants/uri.constants";
import { authService } from "../../../services";
import { signout } from "../../../hooks/auth/reducers";
const { Header } = Layout;

export default function LearnerHeader() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("course");
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const { courseId } = useParams();
  const handleLogout = () => {
    authService.logout().then(() => {
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
  useEffect(() => {
    if (location.pathname === CLIENT_URI.COURSE_PAGE) {
      setSelectedKey("course");
    } else if (location.pathname === CLIENT_URI.FLASH_CARD) {
      setSelectedKey("flashcards");
    }
  }, [location.pathname]);
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log(e.key);
  };

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
              key="course"
              onClick={() => navigate(CLIENT_URI.COURSE_PAGE)}
            >
              KHÓA HỌC
            </MenuItem>
            <MenuItem
              key="flashcards"
              onClick={() => {
                  console.log("navigate to flashcard successfully");
                  
                navigate(CLIENT_URI.FLASH_CARD);
              }}
            >
              FLASHCARD
            </MenuItem>
            <MenuItem key="learning-progress">TIẾN ĐỘ HỌC TẬP</MenuItem>
            <MenuItem key="blog">BLOG HỌC TẬP</MenuItem>
            <MenuItem key="forum">DIỄN ĐÀN TRỰC TUYẾN</MenuItem>
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
          <BellOutlined
            style={{ fontSize: "25px", cursor: "pointer", marginRight: "20px" }}
          />
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <UserOutlined style={{ fontSize: "25px", cursor: "pointer" }} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
