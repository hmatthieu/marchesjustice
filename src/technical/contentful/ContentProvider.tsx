import * as React from "react";
import { PropsWithChildren } from "react";
import { ContentContext, initialState } from "./content";
import { graphql, useStaticQuery } from "gatsby";

export const ContentProvider = ({ children }: PropsWithChildren<{}>) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSeo(limit: 1) {
        nodes {
          description
          title
          image {
            fixed {
              src
            }
          }
        }
      }
    }
  `);

  const rawData = {
    seo: {
      ...data.allContentfulSeo.nodes[0],
      image: data.allContentfulSeo.nodes[0].image.fixed.src,
    },
  };

  return (
    <ContentContext.Provider
      value={{
        ...initialState,
        ...rawData,
        fetching: false,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
