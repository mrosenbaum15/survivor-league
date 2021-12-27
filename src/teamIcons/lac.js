import React from 'react';
import PropTypes from 'prop-types';

const LAC = props => {
  const { size } = props;
  return (
    <svg
      width={40}
      height={40}
      preserveAspectRatio="xMidYMid slice"
      clipRule="evenodd"
      fillRule="evenodd"
      viewBox="0 0 560 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m429.928 181.384c26.193 33.597 32.23 78.731 29.456 115.975-13.572-32.99-41.498-75.939-73.158-101.151 3.209 6.607 5.575 13.554 8.25 22.967-51.165-31.366-110.503-50.318-175.883-45.789 0 0 7.933 8.571 10.436 13.286-35.665 14.929-84.664 33.226-126.961 110.681-11.173-53.921 26.017-106.806 37.819-119.46-6.286-.258-7.652.109-14.517-.14 38.869-54.387 112.757-65.438 151.966-62.297l-10.128-12.594c54.409-2.285 80.162 13.717 90.657 17.921 42.168 20.812 63.066 47.503 72.058 60.599"
        fill="#001532"
      />
      <path
        d="m284.227 109.231-4.15.082s5.82 8.327 8.422 12.047c-19.821-1.62-95.992-4.091-147.109 46.839l-3.625 3.62s13.142.425 14.658.461c-1.258 1.561-2.534 3.132-2.534 3.132-15.355 18.613-36.38 44.109-43.612 93.372l-1.389 9.535 5.421-7.969c27.619-40.58 63.415-69.124 106.428-84.83l2.742-1-1.706-2.372c-4.493-6.24-8.87-10.246-12.871-13.672 75.306-7.616 129.788 12.807 173.167 34.045l5.268 2.589-2.254-5.417c-4.195-10.132-8.019-16.961-12.006-23.329 32.565 19.314 55.436 47.707 78.961 84.084l4.847 7.458-.778-8.865c-8.526-98.459-104.677-151.084-167.891-149.813"
        fill="#0080c5"
      />
      <path
        d="m294.886 122.784s-3.729-5.362-6.291-9.015c30.578.588 66.846 13.92 95.809 35.52 24.75 18.45 54.853 50.667 62.208 100.997-24.012-36.045-48.092-64.019-83.357-82.428l-7.58-3.955 4.734 7.182c4.987 7.558 9.408 14.473 14.169 24.903-41.919-19.984-98.998-40.394-175.38-31.438l-5.06.597 6.055 5.132c3.756 3.172 7.956 6.82 12.223 12.232-39.833 15.183-73.454 41.331-100.163 77.713 8.173-42.078 27.03-64.977 41.068-81.984l8.218-10.119-4.539-.109s-8.277-.267-8.562-.28c57.41-52.871 143.424-41.616 144.287-41.489l5.118.778-2.96-4.231"
        fill="#eead1e"
      />
    </svg>
  );
};

LAC.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

LAC.defaultProps = {
  size: '100'
};

export default LAC;
