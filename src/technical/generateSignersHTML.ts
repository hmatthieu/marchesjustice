import { ExternalData } from "./external-provider/content";

export function generateSignersHTML(signers: ExternalData["signers"]) {
  return `
    <ul style="list-style: none; padding-inline-start: 0;">
        ${signers.map(signer => `<li>${signer}</li>`).join("")}
    </ul>
  `;
}
