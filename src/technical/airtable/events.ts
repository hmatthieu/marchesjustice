import { base } from "./";

export interface EventMap {
  id: string;
  city: string;
  postalCode: string;
  URL: string;
  position: [number, number];
}

function fetchEventsView() {
  return base("tblBTmyNUHsRgKOex").select({ view: "viwdI87HSJgNlpNsf" });
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
              parseInt(record.get("Latitude"), 10),
              parseInt(record.get("Longitude"), 10),
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
