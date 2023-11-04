import * as React from "react";
import styled from "styled-components";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import { Button } from "../../components/Button";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const Container = styled.div`
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 900px;

  > a {
    margin: 42px 12px 0 12px;
    white-space: nowrap;
  }
`;

const COLORS = {
  [TextKey.MAP_SHARE_FACEBOOK]: '#1877F2',
  [TextKey.MAP_SHARE_MESSENGER]: '#1877F2',
  [TextKey.MAP_SHARE_WHATSAPP]: '#25D366',
  [TextKey.MAP_SHARE_TWITTER]: '#1DA1F2',
  [TextKey.MAP_SHARE_TELEGRAM]: '#0088CC',
}

export const Share = () => {
  const { texts } = useContent();
  const shares = [
    TextKey.MAP_SHARE_VOLUNTEER,
    TextKey.MAP_SHARE_WHATSAPP,
    TextKey.MAP_SHARE_MESSENGER,
    TextKey.MAP_SHARE_TELEGRAM,
    TextKey.MAP_SHARE_FACEBOOK,
    TextKey.MAP_SHARE_TWITTER,
    TextKey.MAP_SHARE_LEGALS,
  ];

  return (
    <Container>
      {shares.map((share, index) => (
        <Button
          {...({
            key: `${texts[share].link}_${index}`,
            href: texts[share].link,
            target: "_blank",
            as: "a",
            shadow: true,
            small: true,
            rel: "noopener",
            backgroundColor: COLORS[share]
          } as any)}
          className="sm:w-80 w-full"
        >
          {documentToPlainTextString(texts[share].document)}
        </Button>
      ))}
    </Container>
  );
};
