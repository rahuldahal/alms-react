import { Modal as AntModal } from "antd";
import React, { useEffect, useState } from "react";

export default function Modal({
  title,
  showModal,
  setShowModal,
  onOkHandler,
  children,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => console.log({ showModal }), [showModal]);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await onOkHandler();
      setShowModal(false);
      setConfirmLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShowModal(false);
  };

  return (
    <>
      <AntModal
        title={title}
        visible={showModal}
        onOk={handleOk}
        okText="Sign In"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {children}
      </AntModal>
    </>
  );
}
