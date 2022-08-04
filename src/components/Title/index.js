import React from "react";
import { Typography } from "antd";

const { Title: AntTitle } = Typography;

export default function Title({ children, ...props }) {
  return <AntTitle {...props}>{children}</AntTitle>;
}
