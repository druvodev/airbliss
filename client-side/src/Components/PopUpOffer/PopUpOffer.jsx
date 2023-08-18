import React, { useEffect, useState } from "react";
import "./PopUpOffer.css";
import LoginSignupModal from "../../LogIn/LoginSignupModal";
import { FaTimesCircle } from "react-icons/fa";

const PopUpOffer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoginSignupModalOpen, setIsLoginSignupModalOpen] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
    clearTimeout(timeout);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // 60000 milliseconds = 1 minute

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <img
              src="https://i.ibb.co/mJszpX0/Add.jpg"
              alt="Special Offer"
              className="popup-image object-cover"
            />
            <button onClick={closePopup} className="popup-close-btn">
              <FaTimesCircle />
            </button>
            <button
              onClick={() => setIsLoginSignupModalOpen(true)}
              className="get-discount"
            >
              Get Discount
            </button>
          </div>
          {isLoginSignupModalOpen && (
            <LoginSignupModal
              onClose={() => setIsLoginSignupModalOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PopUpOffer;
