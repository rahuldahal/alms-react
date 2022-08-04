import React from "react";

export default function Wrapper({ className, children }) {
  return (
    <div className={`wrapper ${className ? className : ""}`}>{children}</div>
  );
}
