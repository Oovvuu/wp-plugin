import React from 'react';
import LoadingSpinner from 'components/shared/loading/spinner';
import getOrganizationMetrics from 'services/getOrganizationMetrics';
import uuid from 'react-uuid';
import AnalyticsListItemWrapper from './analyticsListItem';


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
      const parsedMetricsData = [
        {
          data: Number(metricsData?.videoStreamsActiveCount || 0),
          title: __('Watching Now', 'oovvuu'),
        },
        {
          data: Number(metricsData?.videoStreamsGoalCountTodayPortion || 0),
          title: __('Tracking To Target', 'oovvuu'),
        },
        {
          data: Number(metricsData?.embedsCreatedCount || 0),
          title: __('Videos Embedded', 'oovvuu'),
        },
        {
          data: Number(metricsData?.videoStreamsCount || 0),
          title: __('Videos Added Today', 'oovvuu'),
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
      <div>
        <ul>
          {metrics.map((value) => (
            <AnalyticsListItemWrapper
              key={uuid()}
              data={value.data}
              title={value.title}
            />
          ))}
        </ul>
      </div>
    );
  };

  return analyticsRender();
};

export default AnalyticsWrapper;
