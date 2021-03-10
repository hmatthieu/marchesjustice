import * as React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { ExternalContext, ExternalData, initialState } from "./content";

declare global {
  interface Window {
    __SIGNERS_CACHE__: ExternalData["signers"];
  }
}

export const ExternalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [signers, setSigners] = useState(
    (typeof window !== "undefined" && window.__SIGNERS_CACHE__) ||
      initialState.signers
  );

  useEffect(() => {
    import("../airtable/signers")
      .then(({ fetchSigners }) => fetchSigners())
      .then(setSigners);
  }, [setSigners]);

  return (
    <ExternalContext.Provider
      value={{
        signers: signers,
      }}
    >
      {children}
    </ExternalContext.Provider>
  );
};
