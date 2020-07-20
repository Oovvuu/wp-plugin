import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * The Analytics List Item container.
 */
const AnalyticsListItemWrapper = (props) => {
  const {
    data,
    title,
  } = props;

  /**
   * Check whether a value is negative for styling purposes.
   *
   * @return {boolean} Whether the value is negative.
   */
  const valueIsNegative = () => {
    if (typeof data === 'string') {
      const temp = Number(data.replace(/[^-\d]+/, ''));
      return temp < 0;
    }

    return data < 0;
  };

  /**
   * Wrap numbers with a sign or percentage in spans for styling.
   *
   * @return {mixed} A JSX component or raw input.
   */
  const RenderData = () => {
    const pattern = /(-)?(\d+)(%)?/;

    if (pattern.test(data)) {
      const [, sign, count, percent] = String(data).match(pattern);
      return (
        <>
          {sign && <span>{sign}</span> }
          {count}
          {percent && <span>{percent}</span>}
        </>
      );
    }

    return data;
  };

  return (
    <>
      <dt className={styles.term}>{title}</dt>

      <dd
        className={classnames(styles.count, { [styles.isNegative]: valueIsNegative() })}
      >
        <RenderData />
      </dd>
    </>
  );
};

AnalyticsListItemWrapper.propTypes = {
  data: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default AnalyticsListItemWrapper;
