import React from 'react';
import { Layout } from 'antd'; 
import { AdminContentSidebar } from '../components/SidebarAdmin/SidebarItems';

const { Content } = Layout;

export const AdminContentLayout = ({ children }) => {
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh', 
    },
    content: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <AdminContentSidebar />
      <Content style={styles.content}>
        {children}
      </Content>
    </div>
  );
};

export default AdminContentLayout;
