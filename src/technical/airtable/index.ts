import "./build";

interface Airtable {
  configure({ apiKey }: { apiKey: string }): void;
  base(b: string): any;
}

declare global {
  interface Window {
    Airtable: Airtable;
  }
}

const Airtable = window.Airtable;

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

export const base = Airtable.base("app31UIgzQFhXAiAh");
export const EVENTS = "tbltXHT4rI1vSThaM";
export const EVENTS_PUBLIC = "viwaiN7FXfV2ZKJdi";
