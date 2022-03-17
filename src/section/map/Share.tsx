import * as React from "react";
import styled from "styled-components";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import { Button } from "../../components/Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const Container = styled.div`
  margin: 0px 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  // todo remove when map is ready
  margin-top: 24px;

  > a {
    margin: 42px 12px 0 12px;
    white-space: nowrap;
  }
`;

export const Share = () => {
  const { texts } = useContent();
  const shares = [
    texts[TextKey.MAP_SHARE_VOLUNTEER],
    texts[TextKey.MAP_SHARE_FACEBOOK],
    texts[TextKey.MAP_SHARE_TWITTER],
    texts[TextKey.MAP_SHARE_WHATSAPP],
  ];

  return (
    <Container>
      {shares.map((share, index) => (
        <Button
          {...({
            key: `${share.link}_${index}`,
            href: share.link,
            target: "_blank",
            as: "a",
            shadow: true,
            small: true,
            rel: "noopener",
          } as any)}
          className="sm:w-64 w-full"
        >
          {documentToPlainTextString(share.document)}
        </Button>
      ))}
    </Container>
  );
};
