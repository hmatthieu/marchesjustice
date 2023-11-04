import { Airtable } from './Airtable';

export interface Signer {
  id: string;
  name: string;
  comment: string;
  category: string;
}

function fetchSignersView() {
  return Airtable.base("appNaCFXQSciFES5k")("tblGenCN7zfDAFN77").select({
    view: "viw4poDIYsrZEqbQd",
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
            category: record.get("Nature de l'organisation") || "",
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
