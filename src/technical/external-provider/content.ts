import { createContext, useContext } from "react";
import { Signer } from "../airtable/signers";
import { EventMap } from "../airtable/events";

export interface ExternalData {
  signers: Signer[];
  events: EventMap[];
}

export const initialState: ExternalData = {
  signers: [],
  events: [],
};

export const ExternalContext = createContext<ExternalData>(initialState);

export const useExternal = () => useContext(ExternalContext);
