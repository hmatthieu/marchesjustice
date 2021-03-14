import { useEffect } from "react";
import { navigate } from "gatsby";

export function useCMSLink() {
  useEffect(() => {
    const listener = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      const hostPosition = link
        ? link.href.search(window.document.location.host)
        : -1;
      if (hostPosition >= 0 && hostPosition < 10) {
        e.preventDefault();
        return navigate(link.href);
      }
    };
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);
}
