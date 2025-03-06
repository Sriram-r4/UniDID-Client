import React, { useState, useEffect, useRef } from "react";

const PasswordCell = ({ value, enhancedPrivacy }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const handleToggle = () => {
    if (!visible) {
      if (enhancedPrivacy) {
        const pin = window.prompt(
          "Enter a 4-digit PIN to reveal the password:"
        );
        if (pin !== "1234") {
          alert("Incorrect PIN");
          return;
        }
      }
      setVisible(true);

      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 5000);
    } else {
      setVisible(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="cursor-pointer" onClick={handleToggle}>
      {visible ? value : "••••••••"}
    </div>
  );
};

export default PasswordCell;
