import { Airtable } from "./";

export interface Signer {
  id: string;
  name: string;
  comment: string;
  category: string;
}

function fetchSignersView() {
  return Airtable.base("app1nfAluvaaX90MT")("tblPPhRCscZNddiYv").select({
    view: "viw3krGAmvG8f9LRE",
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
