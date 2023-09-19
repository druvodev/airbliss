import React, { useEffect } from "react";

const useScrollTop = (path) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);
};

export default useScrollTop;
