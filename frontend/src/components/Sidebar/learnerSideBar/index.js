
import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  BarChartOutlined,
  FolderOutlined,
  SettingOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';
import { useNavigate } from 'react-router-dom';
import { CLIENT_URI } from '../../../constants';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Sider width={250} style={{ background: "#f97316" }}>
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: "#fff", color: "#f97316" }} />
        <h3 style={{ color: "#fff", margin: "16px 0" }}>Lê Thùy Chi</h3>
      </div>
      <Menu mode="inline" style={{ background: "#f97316", color: "#fff" }} selectable={false}>
        <Menu.Item key="1" icon={<BarChartOutlined />}>
          Kết quả luyện tập
        </Menu.Item>
        <Menu.Item key="2" icon={<FolderOutlined />} onClick={() => navigate(CLIENT_URI.MANAGE_FOLDER)}>
          Quản lý thư mục
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />} onClick={() => navigate(CLIENT_URI.MANAGE_FLASHCARD)}>
          Quản lý bộ flashcard
        </Menu.Item>
        <SubMenu key="sub1" icon={<SettingOutlined />} title="Cài đặt">
          <Menu.Item key="4" icon={<UserOutlined />} onClick={() => navigate(CLIENT_URI.EDIT_PROFILE)}>
            Chỉnh sửa trang cá nhân
          </Menu.Item>
          <Menu.Item key="5" icon={<KeyOutlined />} onClick={() => navigate(CLIENT_URI.CHANGE_PASSWORD)}>
            Đổi mật khẩu
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
