import React from "react";
import { Card } from "antd";

export default function CardCustom(props) {
  const { children } = props;
  return <Card {...props}>{children}</Card>;
}
