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

  > a {
    margin: 42px 21px 0 21px;
    white-space: nowrap;
    width: 270px;
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
      {shares.map(share => (
        <Button
          {...({
            href: share.href,
            target: "_blank",
            as: "a",
            shadow: true,
          } as any)}
        >
          {documentToPlainTextString(share.document)}
        </Button>
      ))}
    </Container>
  );
};
