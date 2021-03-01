import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Image } from "../technical/contentful/image";
import styled from "styled-components";
import { Entry } from "../technical/contentful/entry";

interface Props {
  image: Entry<Image>;
  className?: string;
}

const Img = styled.img<{
  lowSrc: string | boolean;
  height: number;
  width: number;
}>`
  ${({ lowSrc, height, width }) => `
    ${lowSrc && `background-image: url("${lowSrc}");`}
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    height: ${height}px;
    width: ${width}px;
  `}
`;

export const ContentfulImage = ({ image, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [setLoaded]);

  if (!image.fields.fixed) {
    return (
      <img {...props} src={image.fields.file.url} alt={image.fields.title} />
    );
  }

  return (
    <picture>
      <source srcSet={image.fields.fixed.srcWebp} type="image/webp" />
      <Img
        src={image.fields.fixed.src}
        alt={image.fields.title}
        lowSrc={!loaded && image.fields.fixed.tracedSVG}
        height={image.fields.fixed.height}
        width={image.fields.fixed.width}
        {...props}
        onLoad={handleLoad}
        loading="lazy"
      />
    </picture>
  );
};
