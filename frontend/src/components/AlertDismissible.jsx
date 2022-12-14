import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function AlertDismissible({ message, variant, deleteAlert }) {
  const [show, setshow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={variant}
        onClose={() => {
          deleteAlert();
          setshow(false);
        }}
        dismissible
      >
        {message}
      </Alert>
    );
  } else {
    return null;
  }
}
