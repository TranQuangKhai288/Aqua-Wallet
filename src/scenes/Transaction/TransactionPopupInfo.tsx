import React, { useState } from "react";
import "./Transaction.css";

interface TransactionPopupInfoProps {
  isOpen: boolean;
  togglePopup: () => void;
}

const TransactionPopupInfo: React.FC<TransactionPopupInfoProps> = ({
  isOpen,
  togglePopup,
}) => {
  return (
    <div>
      <button onClick={togglePopup}>Show Popup</button>
      {isOpen && (
        <div className="transaction-info-popup">
          <div className="transaction-info-popup-inner">
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>
            <h2>Popup Title</h2>
            <p>
              This is the popup content. This is the popup content.This is the
              popup content.This is the popup content.This is the popup
              content.This is the popup content.This is the popup content.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPopupInfo;
