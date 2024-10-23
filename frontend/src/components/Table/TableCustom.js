import React from "react";
import { Table } from "antd";

export default function TableCustom(props) {
      const { children } = props;

  return <Table {...props}>{children}</Table>;
}