import React from 'react';
import LoadingSpinner from 'components/shared/loading/spinner';
import getOrganizationMetrics from 'services/getOrganizationMetrics';


/**
 * The Analytics container.
 */
const AnalyticsWrapper = () => {
  const { i18n: { __ } } = wp;
  const [metrics, setMetrics] = React.useState(null);
  const [isLoading, setIsloading] = React.useState(false);

  /**
   * Gets the organization metrics.
   */
  const getMetrics = async () => {
    setIsloading(true);

    const orgMetrics = await getOrganizationMetrics();

    setIsloading(false);

    if (!orgMetrics.hasError) {
      const metricsData = orgMetrics?.data || {};
      const parsedMetricsData = {
        videoStreamsActiveCount: metricsData?.videoStreamsActiveCount || 0,
        videoStreamsGoalCountTodayPortion: metricsData?.videoStreamsGoalCountTodayPortion || 0,
        embedsCreatedCount: metricsData?.embedsCreatedCount || 0,
        videoStreamsCount: metricsData?.videoStreamsCount || 0,
      };

      // Set the metrics.
      setMetrics({ ...parsedMetricsData });
    } else {
      // @todo perform error handling.
    }
  };

  /**
   * Populate the analytics data.
   */
  React.useEffect(() => {
    getMetrics();
  }, []);

  /**
   * Renders the analtyics data or loading state.
   *
   * @return {element} A react element.
   */
  const analyticsRender = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    return metrics !== null ? (
      <div>
        <ul>
          <li>
            <span>{metrics.videoStreamsActiveCount}</span>
            <span>{__('Watching Now', 'oovvuu')}</span>
          </li>
          <li>
            <span>{metrics.videoStreamsGoalCountTodayPortion}</span>
            <span>{__('Tracking To Target', 'oovvuu')}</span>
          </li>
          <li>
            <span>{metrics.embedsCreatedCount}</span>
            <span>{__('Videos Embedded', 'oovvuu')}</span>
          </li>
          <li>
            <span>{metrics.videoStreamsCount}</span>
            <span>{__('Videos Added Today', 'oovvuu')}</span>
          </li>
        </ul>
      </div>
    ) : '';
  };

  return analyticsRender();
};

export default AnalyticsWrapper;
