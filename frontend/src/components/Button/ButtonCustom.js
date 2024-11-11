import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const PrimaryButton = styled(Button)`
  background-color: #ffa751;
  border-color: #ffa751;
  color: white;
  border-radius: 100px;
  &: hover {
    background-color: #ff855d !important;
    border-color: #ff855d !important;
    color: white !important;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #ffe259;
  border-color: #ffe259;
  color: white;
  border-radius: 100px;
  &: hover {
    background-color: #bfb50d !important;
    border-color: #bfb50d !important;
    color: white !important;
  }
`;
export default function ButtonCustom(props) {
  const { children, buttonType } = props;
  // const styles = {
  //   primary: {
  //     backgroundColor: "#FFA751",
  //     borderColor: "#FFA751",
  //     color: "white",
  //   },
  //   secondary: {
  //     backgroundColor: "#BFC4FA",
  //     borderColor: "#BFC4FA",
  //     color: "white",
  //   },
  // };
  // const style = buttonType === "primary" ? styles.primary : styles.secondary;
  const StyledButton =
    buttonType === "primary" ? PrimaryButton : SecondaryButton;

  return <StyledButton {...props}>{children}</StyledButton>;
}
