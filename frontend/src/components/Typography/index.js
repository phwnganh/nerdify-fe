import React from "react";
import { Typography } from "antd";
const {Title, Text, Paragraph} = Typography;

export function TitleCustom(props){
      const {children, level, style} = props;
      return (
            <Title level={level} style={{...style}}>{children}</Title>
      )
}

export function TextCustom(props){
      const {children, style} = props;
      return(
            <Text style={{...style}}>{children}</Text>
      )
}

export function ParagraphCustom(props){
      const {children, style} = props;
      return (
            <Paragraph style={{...style}}>{children}</Paragraph>
      )
}