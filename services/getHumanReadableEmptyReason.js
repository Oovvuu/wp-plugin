/**
 * Maps positionEmptyReason codes to human readable, FE-friendly values.
 *
 * @param  {String}  positionEmptyReason Position empty reason code from API response.
 * @returns {String} Human readable position empty reason.
 */
const getHumanReadableEmptyReason = (positionEmptyReason) => {
  const { i18n: { __ } } = wp;
  let humanReadable = '';
  const reasons = {
    NoRelevantVideos: __('No relevant videos were found for this position.', 'oovvuu'),
  };

  if (positionEmptyReason in reasons) {
    humanReadable = reasons.positionEmptyReason;
  }

  return humanReadable;
};

export default getHumanReadableEmptyReason;
