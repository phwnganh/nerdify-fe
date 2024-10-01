import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function LoadingSpin() {
  <Spin indicator={<LoadingOutlined spin />} style={{ fontSize: 48, color: "orange" }}></Spin>;
}
