const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const projectTemplate = path.resolve(`src/components/StandalonePage.tsx`);

  return graphql(`
    query {
      allContentfulPage {
        nodes {
          content {
            raw
          }
          path
          title
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
  });
};
