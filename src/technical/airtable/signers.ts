import { base } from "./";

export interface Signer {
  id: string;
  name: string;
  comment: string;
}

function fetchSignersView() {
  return base("tbl63aU5tgD0076N5").select({ view: "viwbPO6Nhn5x8SCuO" });
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
