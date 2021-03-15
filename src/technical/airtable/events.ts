import { Airtable } from "./";

export interface EventMap {
  id: string;
  city: string;
  postalCode: string;
  URL: string;
  position: [number, number];
}

function fetchEventsView() {
  return Airtable.base("appnUXzuFeI34zAw7")("tbluctVgUhZUmtRl5").select({ view: "viwLS4P7gvh8FUxW3" });
}

export function fetchEvents() {
  return new Promise<EventMap[]>((resolve, reject) => {
    const events: EventMap[] = [];
    fetchEventsView().eachPage(
      (records, fetchNextPage) => {
        events.push(
          ...records.map(record => ({
            id: record.id,
            city: record.get("Ville"),
            postalCode: record.get("Code postal"),
            URL: record.get("URL"),
            position: [
              parseFloat(record.get("Latitude")),
              parseFloat(record.get("Longitude")),
            ] as [number, number],
          }))
        );
        fetchNextPage();
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(events);
        }
      }
    );
  });
}
