import React from 'react';
import LoadingSpinner from 'components/shared/loading/spinner';
import getOrganizationMetrics from 'services/getOrganizationMetrics';
import uuid from 'react-uuid';
import { usePageVisibility } from 'utils/usePageVisibility';
import AnalyticsListItemWrapper from './analyticsListItem';
import styles from './analytics.scss';

/**
 * The Analytics container.
 */
const AnalyticsWrapper = () => {
  const { i18n: { __ } } = wp;
  const [metrics, setMetrics] = React.useState(null);
  const [isLoading, setIsloading] = React.useState(false);
  const isVisible = usePageVisibility();

  /**
   * Gets the organization metrics.
   */
  const getMetrics = async () => {
    // Start loading.
    setIsloading(true);

    const orgMetrics = await getOrganizationMetrics();

    if (!orgMetrics.hasError) {
      const metricsData = orgMetrics?.data || {};

      const {
        videoStreamsCount = 0,
        videoStreamsActiveCount = 0,
        videoStreamsGoalCountTodayPortion = 0,
        embedsCreatedCount = 0,
        totalCount = 0,
      } = metricsData;

      let trackingToTarget = 0;
      if (videoStreamsGoalCountTodayPortion !== 0) {
        trackingToTarget = (videoStreamsCount - videoStreamsGoalCountTodayPortion)
            / videoStreamsGoalCountTodayPortion;
      }

      const parsedMetricsData = [
        {
          data: videoStreamsActiveCount,
          title: __('Watching Now', 'oovvuu'),
        },
        {
          data: `${trackingToTarget}%`,
          title: __('Tracking To Target', 'oovvuu'),
        },
        {
          data: embedsCreatedCount,
          title: __('Videos Embedded', 'oovvuu'),
        },
        {
          data: totalCount,
          title: __('Videos Added Today', 'oovvuu'),
          href: 'https://compass.oovvuu.media/source/videos',
        },
      ];

      // Set the metrics.
      setMetrics(parsedMetricsData);
    } else {
      setMetrics({
        error: true,
        message: orgMetrics?.message || __('There was an error loading metrics', 'oovvuu'),
      });
    }

    // Stop loading.
    setIsloading(false);
  };

  /**
   * Populate the analytics data.
   */
  React.useEffect(() => {
    let timer = null;

    if (isVisible) {
      timer = setInterval(() => getMetrics(), 60000);
    }

    return () => clearInterval(timer);
  }, [isVisible]);

  /**
   * Renders the analtyics data or loading state.
   *
   * @return {element} A react element.
   */
  const analyticsRender = () => {
    // Metrics are being loaded.
    if (isLoading) {
      return <LoadingSpinner />;
    }

    // Metrics are set, but there is an error.
    if (metrics !== null && metrics.error) {
      return (
        <p>{metrics.message}</p>
      );
    }

    // Metrics have not been set yet.
    if (metrics === null) {
      return '';
    }

    return (
      <section>
        <h3
          className="screen-reader-only"
          id="analytics-heading"
        >
          {__('Network Analytics', 'oovvuu')}
        </h3>

        <dl
          className={styles.list}
          aria-labelledby="analytics-heading"
        >
          {metrics.map((value) => (
            <AnalyticsListItemWrapper
              key={uuid()}
              data={value.data}
              title={value.title}
              href={value.href}
            />
          ))}
        </dl>
      </section>
    );
  };

  return analyticsRender();
};

export default AnalyticsWrapper;
