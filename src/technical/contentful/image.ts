export interface Image {
  title: string;
  fixed?: {
    srcWebp: string;
    src: string;
    tracedSVG?: string;
    height: number;
    width: number;
  };
  file: {
    contentType: string;
    url: string;
  };
}
