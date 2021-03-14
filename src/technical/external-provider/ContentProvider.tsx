import * as React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { ExternalContext, ExternalData, initialState } from "./content";

declare global {
  interface Window {
    __SIGNERS_CACHE__: ExternalData["signers"];
    __EVENTS_CACHE__: ExternalData["events"];
  }
}

export const ExternalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [signers, setSigners] = useState(
    (typeof window !== "undefined" && window.__SIGNERS_CACHE__) ||
      initialState.signers
  );
  const [events, setEvents] = useState(
    (typeof window !== "undefined" && window.__EVENTS_CACHE__) ||
      initialState.events
  );

  useEffect(() => {
    const fetchSigners = async () => {
      const Signers = await import("../airtable/signers");
      setSigners(await Signers.fetchSigners());
    };
    const fetchEvents = async () => {
      const Events = await import("../airtable/events");
      setEvents(await Events.fetchEvents());
    };

    Promise.all([fetchSigners(), fetchEvents()]);
  }, [setSigners, setEvents]);

  return (
    <ExternalContext.Provider
      value={{
        signers,
        events,
      }}
    >
      {children}
    </ExternalContext.Provider>
  );
};
