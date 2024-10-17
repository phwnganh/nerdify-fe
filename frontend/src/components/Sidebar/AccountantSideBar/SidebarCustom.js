// import React, { useState, useEffect } from "react";
// import { Layout, Menu, Avatar, Typography, Divider } from "antd";
// import { useNavigate, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import { LogoutOutlined, EyeInvisibleOutlined, HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
// import logo from "../../../assets/logo1.png";
// import logoMini from "../../../assets/logomini.png";

// const { Sider } = Layout;
// const { Text } = Typography;

// // Styled components
// const CustomSider = styled(Sider)`
//   .ant-layout-sider-trigger {
//     display: none; /* Disable the default collapse trigger */
//   }
// `;

// const CustomMenu = styled(Menu)`
//   .ant-menu-item-selected {
//     font-weight: bold;
//     color: black;
//     background-color: #f78f2e !important;
//   }
// `;

// const UserInfoContainer = styled.div`
//   padding: 10px 20px;
//   text-align: center;
// `;

// const FooterSection = styled.div`
//   padding: 15px 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export default function SidebarCustom({ menuItems = [] }) {
//   const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [selectedKey, setSelectedKey] = useState("/");

//   // Update the selected key when the location changes
//   useEffect(() => {
//     setSelectedKey(location.pathname);
//   }, [location.pathname]);

//   // Handle Menu Item Clicks
//   const handleMenuClick = ({ key }) => {
//     if (key === "logout") {
//       console.log("Logout action triggered"); // Replace with actual logout logic
//     } else if (key === "hide-dashboard") {
//       setCollapsed(!collapsed); // Toggle collapse state when clicked
//     } else {
//       setSelectedKey(key);
//       navigate(key);
//     }
//   };

//   return (
//     <CustomSider
//       collapsible
//       collapsed={collapsed}
//       trigger={null} // Disable the default trigger
//       onCollapse={(value) => setCollapsed(value)} // Collapse logic controlled via state
//     >
//       <div className="logo" style={{ padding: "20px", textAlign: "center" }}>
//         <img
//           src={collapsed ? logoMini : logo}
//           alt="Deutsch Nerd"
//           style={{
//             width: collapsed ? "50px" : "100px",
//             height: "50px",
//           }}
//         />
//       </div>

//       <CustomMenu
//         theme="light"
//         selectedKeys={[selectedKey]}
//         onClick={handleMenuClick}
//         style={{
//           border: "1px",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//         }}
//       >
//         {menuItems.map((item) => (
//           <Menu.Item key={item.key} icon={item.icon}>
//             {item.label}
//           </Menu.Item>
//         ))}

//         <Divider style={{ margin: "10px 0" }} />

//         {/* Two Additional Options using Menu.Item */}
//         <Menu.Item key="logout" icon={<LogoutOutlined />}>
//           Đăng xuất
//         </Menu.Item>
//         <Menu.Item key="hide-dashboard" icon={<EyeInvisibleOutlined />}>
//           Ẩn bảng điều khiển
//         </Menu.Item>
//       </CustomMenu>

//       <FooterSection>
//         <UserInfoContainer>
//           <Avatar size={64} src="https://via.placeholder.com/64" />
//           <div style={{ marginTop: 10 }}>
//             <Text strong>Nguyễn Văn A</Text>
//             <br />
//             <Text type="secondary">nhihm@fe.du.vn</Text>
//           </div>
//         </UserInfoContainer>
//       </FooterSection>
//     </CustomSider>
//   );
// }

import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Typography, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LogoutOutlined, EyeInvisibleOutlined, HomeOutlined, DollarCircleOutlined, HistoryOutlined, BarChartOutlined } from "@ant-design/icons";
import logo from "../../../assets/logo1.png";
import logoMini from "../../../assets/logomini.png";

const { Sider } = Layout;
const { Text } = Typography;

// Styled components
const CustomSider = styled(Sider)`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height */
  .ant-layout-sider-trigger {
    display: none; /* Disable the default collapse trigger */
  }
`;

const LogoContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const CustomMenu = styled(Menu)`
  flex: 1; /* Take up remaining space between the logo and footer */
  .ant-menu-item-selected {
    font-weight: bold;
    color: black;
    background-color: #f78f2e !important;
  }
`;

const UserInfoContainer = styled.div`
  padding: 10px 20px;
  text-align: center;
`;

const FooterSection = styled.div`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function SidebarCustom({ menuItems = [] }) {
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("/");

  // Update the selected key when the location changes
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  // Handle Menu Item Clicks
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      console.log("Logout action triggered"); // Replace with actual logout logic
    } else if (key === "hide-dashboard") {
      setCollapsed(!collapsed); // Toggle collapse state when clicked
    } else {
      setSelectedKey(key);
      navigate(key);
    }
  };

  return (
    <CustomSider
      collapsible
      collapsed={collapsed}
      trigger={null} // Disable the default trigger
      onCollapse={(value) => setCollapsed(value)} // Collapse logic controlled via state
    >
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

      <CustomMenu
        theme="light"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        mode="inline" // Ensure the menu stays vertical
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}

        <Divider style={{ margin: "10px 0" }} />

        {/* Two Additional Options using Menu.Item */}
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
        <Menu.Item key="hide-dashboard" icon={<EyeInvisibleOutlined />}>
          Ẩn bảng điều khiển
        </Menu.Item>
      </CustomMenu>

      <div>
        <UserInfoContainer>
          <Avatar size={64} src="https://via.placeholder.com/64" />
          <div style={{ marginTop: 10 }}>
            <Text strong>Nguyễn Văn A</Text>
            <br />
            <Text type="secondary">nhihm@fe.du.vn</Text>
          </div>
        </UserInfoContainer>
      </div>
    </CustomSider>
  );
}
