const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectTemplate = path.resolve(`src/components/StandalonePage.tsx`);
  const embedTemplate = path.resolve("src/components/StandaloneEmbedPage.tsx");

  return graphql(`
    query {
      allContentfulPage(filter: { enabled: { eq: true } }) {
        nodes {
          logo {
            fixed(width: 500, height: 400, resizingBehavior: PAD) {
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
          content {
            raw
          }
          path
          title
          description
          bottomActionText
          bottomActionLink
          image {
            fixed {
              src
            }
          }
        }
      }
      allContentfulPageEmbed(filter: { enabled: { eq: true } }) {
        nodes {
          embedUrl
          path
          title
          description
          image {
            fixed {
              src
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const pages = result.data.allContentfulPage.nodes.map(node => ({
      fields: {
        ...node,
        logo: node.logo
          ? {
              fields: {
                fixed: node.logo.fixed,
                title: node.logo.title,
                file: node.logo.file,
              },
              sys: {
                id: node.logo.contentful_id,
              },
            }
          : undefined,
        image: node.image ? node.image.fixed.src : undefined,
        content: JSON.parse(node.content.raw),
      },
      sys: {
        id: node.contentful_id,
      },
    }));

    pages.forEach(page => {
      createPage({
        path: page.fields.path,
        component: projectTemplate,
        context: { page },
      });
    });

    const embeds = result.data.allContentfulPageEmbed.nodes.map(node => ({
      fields: {
        ...node,
        image: node.image ? node.image.fixed.src : undefined,
      },
      sys: {
        id: node.contentful_id,
      },
    }));

    embeds.forEach(page => {
      createPage({
        path: page.fields.path,
        component: embedTemplate,
        context: { page },
      });
    });
  });
};
