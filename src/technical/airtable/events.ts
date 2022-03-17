import { Airtable } from "./";

export interface EventMap {
  id: string;
  city: string;
  postalCode: string;
  URL: string;
  position: [number, number];
}

function fetchEventsView() {
  return Airtable.base("app28NDeZpIAu6yWe")("tblTQEeoIXksGnFgO").select({
    view: "viwzW5r1AgliIg2gk",
  });
}

export function fetchEvents() {
  return new Promise<EventMap[]>((resolve, reject) => {
    const events: EventMap[] = [];
    fetchEventsView().eachPage(
      (records, fetchNextPage) => {
        events.push(
          ...records
            .map(record => {
              const position = [
                parseFloat(record.get("Latitude")),
                parseFloat(record.get("Longitude")),
              ] as [number, number];

              if (position.some(p => isNaN(p))) {
                console.warn(
                  `${record.get(
                    "Ville"
                  )} as some invalid position: [${record.get(
                    "Latitude"
                  )}, ${record.get("Longitude")}]`
                );
                return null;
              }

              return {
                id: record.id,
                city: record.get("Ville"),
                postalCode: record.get("Code postal"),
                URL: record.get("URL"),
                position,
              };
            })
            .filter(r => !!r)
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
