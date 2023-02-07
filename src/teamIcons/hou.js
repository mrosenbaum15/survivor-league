import React from 'react';
import PropTypes from 'prop-types';

const HOU = props => {

  return (
    <svg
      width={40}
      height={40}
      preserveAspectRatio="xMidYMid slice"
      clipRule="evenodd"
      fillRule="evenodd"
      viewBox="0 0 560 400"
      xmlns="http://www.w3.org/2000/svg"
      id="Texans"
    >
      <path
        d="m344.21 118.791c57.775 43.967 13.808 50.549-31.313 56.97 0 0-19.038-5.251-52.031-21.642-74.825-37.162-51.27-54.674 7.54-65.271-94.122-41.005-172.568 30.388-86.028 99.808l-23.748 16.975c19.507 11.958 59.922 37.043 54.051 75.456l-20.059 14.337 61.261 27.759 48.34-21.904c.351-21.274 38.374-32.325 54.735-75.598 90.059-20.661 67.12-99.881-12.747-106.893"
        fill="#fff"
      />
      <path
        d="m274.546 250.137-17.367-19.752-19.939 2.973 9.216-15.183-17.364-19.767 23.066 10.381 9.195-15.187 5.03 21.592 23.062 10.363-19.948 2.982 5.05 21.598zm28.489-70.312c-113.048-43.66-120.534-79.483-49.971-91.863-88.249-23.979-139.726 39.98-52.408 100.971l-23.427 16.747c24.877 16.621 51.243 41.24 42.298 79.98l-11.804 8.427 45.342 20.556c42.198-46.218 64.268-91.124 49.973-134.82"
        fill="#03202f"
      />
      <path
        d="m360.437 125.666c38.798 30.374 11.86 49.781-35.442 55.053 11.967 50.444-24.726 96.644-63.573 132.421l35.618-16.136c2.634-20.502 38.774-31.163 55.898-76.657 80.433-17.944 67.305-75.668 7.499-94.683"
        fill="#a71930"
      />
    </svg>
  );
};

HOU.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

HOU.defaultProps = {
  size: '100'
};

export default HOU;
