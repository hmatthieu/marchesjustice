import { ExternalData } from "./external-provider/content";

export function generateSignersHTML(signers: ExternalData["signers"]) {
  return `
    <ul class="flex flex-col" style="list-style: none; padding-inline-start: 0;">
        ${signers
          .map(
            signer =>
              `<li>${signer.name}${
                signer.comment ? `<i>${signer.comment}</i>` : ""
              }</li>`
          )
          .join("")}
    </ul>
  `;
}
