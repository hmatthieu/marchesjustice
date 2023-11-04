import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
if (!AIRTABLE_API_KEY) {
  throw new Error("Missing env AIRTABLE_API_KEY");
}

Airtable.configure({
  apiKey: 'pat0zBxRfCb6PV0TJ.217af136bbd3782906387ed33c71ffba4bc2b7e24785a79cf1e23f113ce26364'
});

export { Airtable }
