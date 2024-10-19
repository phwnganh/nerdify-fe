import React from "react";
import { Input} from "antd";

export default function InputCustom(props) {
  const { children } = props;

  return <Input {...props}>{children}</Input>;
}
