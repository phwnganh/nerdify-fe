import React from "react";
import { Breadcrumb } from "antd";

export function BreadCrumbCustom(props){
      const {children} = props;
      return <Breadcrumb {...props}>{children}</Breadcrumb>
}

export function BreadCrumbItem(props){
      const {children} = props;
      return <Breadcrumb.Item {...props}>{children}</Breadcrumb.Item>
}