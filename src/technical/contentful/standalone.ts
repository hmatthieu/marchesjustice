import { SEO } from "./SEO";
import { Document } from "@contentful/rich-text-types";

export interface Standalone extends Partial<SEO> {
  path: string;
  title: SEO["title"];
  content: Document;
  bottomActionText?: string;
  bottomActionLink?: string;
}
