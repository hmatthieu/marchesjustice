import * as React from "react";
import { EventForm } from "./Form";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useContent } from "../../technical/contentful/content";
import { TextKey } from "../../technical/contentful/text";
import styled from "styled-components";
import { PRIMARY } from "../../constant/Colors";
import { Fonts } from "../../assets/fonts";

const HeaderContainer = styled.div`
  color: ${PRIMARY};
  font-family: ${Fonts.KAWARU};
  font-size: 28px;
  text-align: center;
  margin-bottom: 64px;
`;

export const Map = () => {
  const { texts } = useContent();

  return (
    <section>
      <HeaderContainer
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.MAP_HEADER]),
        }}
      />
      <EventForm />
    </section>
  );
};
