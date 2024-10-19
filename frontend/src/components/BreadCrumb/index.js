import React from "react";
import { Breadcrumb } from "antd";
import styled from "styled-components";

const StyledBreadCumbItem = styled(Breadcrumb)`
.active a {
      font-weight: bold;
      color: #ff855d;
    }
`
export function BreadCrumbCustom(props){
      const {children} = props;
      return <StyledBreadCumbItem {...props}>{children}</StyledBreadCumbItem>
}

export function BreadCrumbItem(props){
      const {children} = props;
      return <Breadcrumb.Item {...props}>{children}</Breadcrumb.Item>
}