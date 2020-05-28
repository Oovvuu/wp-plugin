/**
 * Maps positionEmptyReason codes to human readable, FE-friendly values.
 *
 * @param  {string}  positionEmptyReason Position empty reason code from API response.
 * @returns {string} Human readable position empty reason.
 */
const getHumanReadableEmptyReason = (positionEmptyReason) => {
  const { i18n: { __ } } = wp;
  let humanReadable = '';
  const reasons = {
    NoRelevantVideos: __('No relevant videos were found for this position.', 'oovvuu'),
  };

  if (positionEmptyReason in reasons) {
    humanReadable = reasons[positionEmptyReason];
  }

  return humanReadable;
};

export default getHumanReadableEmptyReason;
