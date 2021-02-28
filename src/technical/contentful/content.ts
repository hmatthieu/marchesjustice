import { createContext, useContext } from "react";
import { SEO } from "./SEO";

interface ContentfulData {
  seo: Partial<SEO>;
}

export interface ContextData extends ContentfulData {
  rawData?: ContentfulData;
}

export interface Context extends ContextData {
  fetching: boolean;
}

export const initialState: ContextData = {
  seo: {},
};

export const ContentContext = createContext<Context>({
  ...initialState,
  fetching: false,
});

export const useContent = () => useContext(ContentContext);
