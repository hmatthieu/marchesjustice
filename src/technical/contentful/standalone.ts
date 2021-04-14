import { SEO } from "./SEO";
import { Document } from "@contentful/rich-text-types";
import { Entry } from "./entry";
import { Image } from "./image";

export interface Standalone extends Partial<SEO> {
  path: string;
  title: SEO["title"];
  logo?: Entry<Image>;
  content: Document;
  bottomActionText?: string;
  bottomActionLink?: string;
}

export interface StandaloneEmbed extends Partial<SEO> {
  path: string;
  title: SEO["title"];
  embedUrl: string;
}
