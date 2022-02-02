import { Airtable } from "./";

export interface Signer {
  id: string;
  name: string;
  comment: string;
  category: string;
}

function fetchSignersView() {
  return Airtable.base("app8ae8XNOjZ4waOs")("tblwZrIIFk18chNZI").select({
    view: "viwue4yZtqyOPqPR0",
  });
}

export function fetchSigners() {
  return new Promise<Signer[]>((resolve, reject) => {
    const signers: Signer[] = [];
    fetchSignersView().eachPage(
      (records, fetchNextPage) => {
        signers.push(
          ...records.map(record => ({
            id: record.id,
            name: record.get("Nom de l'organisation"),
            comment: record.get("Commentaires"),
            category: record.get("Catégorie") || "",
          }))
        );
        fetchNextPage();
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(signers);
        }
      }
    );
  });
}
