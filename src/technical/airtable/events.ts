import { Airtable } from './Airtable';

export interface EventMap {
  id: string;
  city: string;
  postalCode: string;
  date: string;
  where: string;
  when: string;
  subject?: string;
  URL?: string;
  position: [number, number];
}

function fetchEventsView() {
  return Airtable.base("apprRq5jn6atYUvi2")("tblsLmTYS3EfEOqwm").select({
    view: "viwSVI5iKwD1VFpZI",
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
                when: record.get("Lieu de rendez-vous") || "",
                date: record.get('Date') || '',
                where: record.get("Heure de départ") || "",
                postalCode: record.get("Code postal"),
                subject: record.get("Sujet"),
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
