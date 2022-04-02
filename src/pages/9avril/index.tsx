import { useEffect } from "react";

export default () => {
  useEffect(() => {
    document.location = "/";
  }, []);

  return null;
};
