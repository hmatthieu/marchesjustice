import * as functions from "firebase-functions";

export const forwards = functions.https.onRequest(async (request, response) => {
  const { postalCode } = request.body;

  const positionStackCall = await fetch(
    `http://api.positionstack.com/v1/forward?access_key=${
      functions.config().position_stack.key
    }&query=${postalCode}&limit=1`
  );

  response.json(await positionStackCall.json());
});
