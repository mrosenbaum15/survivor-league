import React from 'react';
import PropTypes from 'prop-types';

const WAS = props => {

  return (
    <svg
      width={30}
      height={30}
      preserveAspectRatio="xMidYMid slice"
      clipRule="evenodd"
      fillRule="evenodd"
      viewBox="-100 -50 670 400"
      xmlns="http://www.w3.org/2000/svg"
      id="Commanders"
    >
      <path 
        id="path2" 
        d="M314.1,0l14.7,45.1l-10.9,33.5L292.3,0H177.8l-20.5,63L136.9,0H0l43,69.8l58.9,180.9h110.8
           l22.3-68.4l22.2,68.4h121.2L460,0H314.1z M58.3,62.7L30,16.7h94.7L148.5,90l-40.7,124.9L58.3,62.7z M200.5,234.4h-81.4l66.4-204.1
           l40.6,125L200.5,234.4z M198.8,16.7h81.4l29,88.9l-40.7,125.2L198.8,16.7z M366.1,234.3h-81.3l61.5-189.1l-9.3-28.5h99.8
           L366.1,234.3z"
        fill="#FFB612"
      />

      <path
        id="path4"
        d="M309.1,105.7l-40.7,125.2L198.8,16.7h81.4L309.1,105.7z M337.1,16.7l9.2,28.5l-61.5,189.1h81.3
           l70.8-217.5H337.1z M124.7,16.7H30l28.3,46l49.6,152.2L148.5,90L124.7,16.7z M119.1,234.3h81.5l25.7-79l-40.7-125L119.1,234.3z"
        fill="#5A1414st"
        />
    </svg>
  );
};

WAS.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

WAS.defaultProps = {
  size: '100'
};

export default WAS;
