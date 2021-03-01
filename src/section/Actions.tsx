import * as React from "react";
import { useContent } from "../technical/contentful/content";
import { TitleContainer } from "../components/TitleContainer";
import { TextKey } from "../technical/contentful/text";
import styled from "styled-components";
import { PRIMARY } from "../constant/Colors";
import { Ratio } from "../components/Ratio";
import { KAWARU } from "../constant/Fonts";

const data = [
  {
    Nom: "Greenlobby",
    Description:
      "Les lobbies pollueurs influencent nos élu·es et sapent notre démocratie ? Votre voix est indispensable pour inverser le rapport de force !",
    Image:
      "https://dl.airtable.com/.attachmentThumbnails/29a0e7dc430aff252fb8f0288edba73e/6692c0a6",
    Tag: "Démocratie",
  },
];

const actions = [...data, ...data, ...data, ...data, ...data, ...data].map(
  ({ Nom, Description, Image, Tag }): Action => ({
    title: Nom,
    description: Description,
    img: Image,
    tag: Tag,
  })
);

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

interface Action {
  title: string;
  description: string;
  img: string;
  tag: string;
}

const ItemBackground = styled.div<{ backgroundImg: string }>`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 41.15%, #000000 100%), url('${({
    backgroundImg,
  }) => backgroundImg}');
    background-size: cover;
    background-position: center;
  width: 380px;
  max-width: 90vw;
  margin: 0 10px;
  margin-bottom: 50px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px 40px;
  color: white;
  width: 100%;
  height: 100%;
`;

const ItemTag = styled.mark`
  background-color: transparent;
  color: ${PRIMARY};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
`;

const ItemTitle = styled.h4`
  font-family: ${KAWARU};
  font-size: 18px;
  text-transform: uppercase;
`;

const ItemText = styled.p`
  font-weight: 500;
  font-size: 18px;
`;

const Item = ({ action }: { action: Action }) => (
  <ItemBackground backgroundImg={action.img}>
    <Ratio ratio={1}>
      <ItemContent>
        <ItemTag>{action.tag}</ItemTag>
        <ItemTitle>{action.title}</ItemTitle>
        <ItemText>{action.description}</ItemText>
      </ItemContent>
    </Ratio>
  </ItemBackground>
);

export const Actions = () => {
  const { texts } = useContent();

  return (
    <section>
      <TitleContainer document={texts[TextKey.ACTIONS_HEADER].document} />
      <Flex>
        {actions.map((action, index) => (
          <Item key={`${action.title}_${index}`} action={action} />
        ))}
      </Flex>
    </section>
  );
};
