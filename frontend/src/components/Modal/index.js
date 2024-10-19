import React from "react";
import {Modal} from "antd";

export default function ModalCustom(props) {
  const { children } = props;

  return <Modal {...props}>{children}</Modal>;
}
