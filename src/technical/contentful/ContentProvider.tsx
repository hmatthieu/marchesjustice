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
          href
        }
      }
      allContentfulLogo(limit: 1) {
        nodes {
          img {
            fixed(width: 250, height: 200, resizingBehavior: PAD) {
              srcWebp
              src
              height
              width
            }
            file {
              contentType
              url
            }
            title
            contentful_id
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
        [node.key]: {
          document: JSON.parse(node.value.raw),
          href: node.href,
        },
      }),
      {}
    ),
    logo: {
      fields: {
        fixed: data.allContentfulLogo.nodes[0].img.fixed,
        title: data.allContentfulLogo.nodes[0].img.title,
        file: data.allContentfulLogo.nodes[0].img.file,
      },
      sys: {
        id: data.allContentfulLogo.nodes[0].img.contentful_id,
      },
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
