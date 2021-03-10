import "./airtable.browser";

interface Record {
  id: string;
  get(column: string): any;
}

interface Query {
  eachPage(
    page: (records: Record[], fetchNextPage: () => void) => void,
    fetchNextPage: (err?: Error) => void
  ): void;
}

interface Table {
  select(params: { view: string }): Query;
}

interface Airtable {
  configure(params: { endpointUrl: string; apiKey: string }): void;
  base(base: string): (table: string) => Table;
}

declare global {
  interface Window {
    Airtable: Airtable;
  }
}

const Airtable = window.Airtable;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
if (!AIRTABLE_API_KEY) {
  throw new Error("Missing env AIRTABLE_API_KEY");
}

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: AIRTABLE_API_KEY,
});

export const base = Airtable.base("appdSTNSo3Q4bK5Ec");
export const publicTable = base("tbl63aU5tgD0076N5");
