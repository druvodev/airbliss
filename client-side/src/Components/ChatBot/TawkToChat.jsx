import React, { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/64ea4887a91e863a5c0ffe2b/1h8piml1v";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);

    // Clean up the script when the component unmounts
    return () => {
      s1.remove();
    };
  }, []);

  return <div id="tawk-chat-container"></div>;
};

export default TawkToChat;
