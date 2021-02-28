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
      allContentfulText {
        nodes {
          key
          value {
            raw
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
    texts: data.allContentfulText.nodes.reduce(
      (acc, node) => ({
        ...acc,
        [node.key]: JSON.parse(node.value.raw),
      }),
      {}
    ),
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
