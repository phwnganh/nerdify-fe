import React, { useState } from "react";
import { Col, Layout, Row, Tabs } from "antd";
// import { Header } from "antd/es/layout/layout";
import MenuBar from "../Menu";
import InputCustom from "../Input";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCustom from "../Button";
import MenuItem from "../Menu/MenuItem";
import logo from "../assets/logo.png";
const { Header } = Layout;
export default function Navbar() {
  const [selectedKey, setSelectedKey] = useState("home");
  const [searchVisible, setSearchVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
            <MenuItem key="home">TRANG CHỦ</MenuItem>
            <MenuItem key="courses">KHÓA HỌC</MenuItem>
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
            
            style={{ display: "flex", alignItems: "center", paddingRight: '10px' }}
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
          <ButtonCustom buttonType="primary" style={{ marginRight: "10px" }}>
            ĐĂNG NHẬP
          </ButtonCustom>
          <ButtonCustom buttonType="secondary">ĐĂNG KÝ</ButtonCustom>
        </Col>
      </Row>
    </Header>
  );
}
