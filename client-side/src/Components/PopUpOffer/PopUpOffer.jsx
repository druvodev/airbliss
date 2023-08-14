import React, { useEffect, useState } from "react";
import "./PopUpOffer.css";

const PopUpOffer = () => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
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
              className="popup-image"
            />
            <button onClick={closePopup} className="popup-close-btn">
              X
            </button>
            <button className="get-discount">Get Discount</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpOffer;
