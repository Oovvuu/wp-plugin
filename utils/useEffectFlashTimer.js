/**
 * Set and clear a duplicate keyword item timer.
 *
 * @param {number} duplicateIndex The duplicate keyword index.
 * @param {function} setDuplicateIndex The setter for duplicateIndex.
 */
export default function useEffectFlashTimer(duplicateIndex, setDuplicateIndex) {
  let timer = null;

  if (duplicateIndex > -1) {
    timer = setTimeout(() => {
      setDuplicateIndex(-1);
    }, 300);
  }

  return () => clearTimeout(timer);
}
