import moment from 'moment';

/**
 * Format Duration from seconds to mm:ss format.
 *
 * @param duration
 * @returns {string}
 */
const formatDuration = (duration) => moment(moment.duration(duration, 'seconds').asMilliseconds()).format('mm:ss');

export default formatDuration;
