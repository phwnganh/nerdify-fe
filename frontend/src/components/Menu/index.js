import React, { useState } from "react";
import { Menu } from "antd";
import styled from "styled-components";

const StyledMenuItem = styled(Menu)`
  .ant-menu-item-selected {
    color: #ffa751 !important;
    border-bottom-color: #ffa751 !important;
  }
  .ant-menu-item-selected::after {
    border-bottom-color: #ffa751 !important;
  }
  .ant-menu-item:hover {
    border-bottom-color: #ffa751 !important;
  }
  .ant-menu-item-active::after {
    border-bottom: 2px solid #ffa751 !important;
  }
`;
export default function MenuBar(props) {
  const { children, selectedKey, onClick } = props;
  return (
    <StyledMenuItem {...props} selectedKeys={[selectedKey]} onClick={onClick}>
      {children}
    </StyledMenuItem>
  );
}
