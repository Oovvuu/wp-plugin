/**
 * Unwraps embed response data for use in this app.
 * @param responseJSON object JSON object with embed data.
 */
const transformEmbed = (responseJSON) => {
  const { hero, positionTwo } = responseJSON;

  /**
   * Unwraps buried data in embed for a single position.
   * @param embed object Embed data.
   * @returns {*}
   */
  const exractEmbedDataFor = (embed) => {
    const { id: embedId, snippet } = embed?.data?.createEmbed ?? {};

    return embedId && snippet ? { id: embedId, snippet } : null;
  };

  return {
    hero: exractEmbedDataFor(hero),
    positionTwo: exractEmbedDataFor(positionTwo),
  };
};

export default transformEmbed;
