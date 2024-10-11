import React from "react";
import { Spin } from "antd";

export default function SpinCustom(props) {
  const { children } = props;

  return <Spin {...props}>{children}</Spin>;
}
