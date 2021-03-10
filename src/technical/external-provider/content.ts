import { createContext, useContext } from "react";
import { Signer } from "../airtable/signers";

export interface ExternalData {
  signers: Signer[];
}

export const initialState: ExternalData = {
  signers: [],
};

export const ExternalContext = createContext<ExternalData>(initialState);

export const useExternal = () => useContext(ExternalContext);
