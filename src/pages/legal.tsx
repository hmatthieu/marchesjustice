import * as React from "react";
import { ContentProvider } from "../technical/contentful/ContentProvider";
import { useContent } from "../technical/contentful/content";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { TextKey } from "../technical/contentful/text";

export const Legals = () => {
  const { texts } = useContent();

  return (
    <article>
      <div
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.LEGALS].document),
        }}
      />
    </article>
  );
};

export default () => (
  <ContentProvider>
    <Legals />
  </ContentProvider>
);
