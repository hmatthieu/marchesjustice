import { createContext, useContext } from "react";
import { SEO } from "./SEO";
import { Document } from "@contentful/rich-text-types";

interface ContentfulData {
  seo: Partial<SEO>;
  texts: {
    [key: string]: {
      document: Document;
      href?: string;
    };
  };
}

export interface ContextData extends ContentfulData {
  rawData?: ContentfulData;
}

export interface Context extends ContextData {
  fetching: boolean;
}

export const initialState: ContextData = {
  seo: {},
  texts: {},
};

export const ContentContext = createContext<Context>({
  ...initialState,
  fetching: false,
});

export const useContent = () => useContext(ContentContext);
