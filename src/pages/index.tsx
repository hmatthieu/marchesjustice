import { useEffect } from "react";

export default () => {
  useEffect(() => {
    document.location = "/12mars";
  }, []);

  return null;
};
