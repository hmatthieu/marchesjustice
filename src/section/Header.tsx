import * as React from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useContent } from "../technical/contentful/content";
import { TextKey } from "../technical/contentful/text";
import { ContentfulImage } from "../components/ContentfulImage";
import { handleCMSClick } from "../technical/handleCMSClick";
import { YELLOW } from "../constant/Colors";
import storySrc from "../assets/video/story.mp4";
import storyBg from "../assets/video/story.png";

const Container = styled.header`
  max-width: 800px;
  padding: 0 24px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  text-align: center;

  p {
    margin: 2rem 0;
  }

  p:first-child {
    margin-top: 3rem;
  }

  p:last-child {
    margin-bottom: 3rem;
  }

  a {
    text-decoration: underline;
    font-weight: bold;
    color: ${YELLOW};
  }
`;

const Video = styled.video`
  background-image: url(${storyBg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto;
  width: 552px;
  height: 310px;
`;

export const Header = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { texts, logo } = useContent();
  const video = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    if (video.current) {
      video.current.play();
    }
  };

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.querySelectorAll("a").forEach(element => {
        element.target = "_blank";
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (video.current) {
      video.current.defaultMuted = true;
      video.current.volume = 0.1;
    }
  }, [video]);

  return (
    <Container>
      <ContentfulImage
        image={logo}
        className="mx-auto md:mt-56 mt-36 mb-20 w-auto md:h-44 h-36"
      />
      <Video
        ref={video}
        controlsList="nodownload"
        loop={true}
        controls={true}
        preload="metadata"
        disableRemotePlayback={true}
        playsInline={true}
        onCanPlay={playVideo}
        onLoadedMetadata={playVideo}
        muted={true}
      >
        <source src={storySrc} type="video/mp4" />
      </Video>
      <TextContainer
        ref={textContainerRef}
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(texts[TextKey.HEADER].document),
        }}
        onClick={handleCMSClick}
      />
    </Container>
  );
};
