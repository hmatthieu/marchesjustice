import { createContext, useContext } from "react";

export interface ExternalData {
  signers: string[];
}

export const initialState: ExternalData = {
  signers: [],
};

export const ExternalContext = createContext<ExternalData>(initialState);

export const useExternal = () => useContext(ExternalContext);
