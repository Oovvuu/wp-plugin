/**
 * PubSub for listen-for and dispatch events.
 *
 * @type {Object}
 */
const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e));
  },
  dispatch(event, data = {}) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
