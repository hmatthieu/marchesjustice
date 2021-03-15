import { navigate } from "gatsby";
import { SyntheticEvent } from "react";

export function handleCMSClick(e: SyntheticEvent<HTMLElement>) {
  const target = e.target as HTMLElement;
  const link = target.closest("a");
  const hostPosition = link
    ? link.href.search(window.document.location.host)
    : -1;
  if (hostPosition >= 0 && hostPosition < 10) {
    e.preventDefault();
    return navigate(link.href);
  }
}
