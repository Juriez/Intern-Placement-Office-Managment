import React from 'react';
import { Modal, Typography } from 'antd';

const { Text } = Typography;

const InternStatus = ({ visible, onClose, modalText }) => {
  const displayText = modalText ? `Congratulations! you're selected for ${modalText}` : 'Pending!';

  return (
    <Modal
      title="Information"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Text>{displayText}</Text>
    </Modal>
  );
};

export default InternStatus;
