import React from 'react';
import PropTypes from 'prop-types';

const NE = props => {
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
        d="m455.386 134.235c-45.299 10.698-47.279-15.538-115.406-20.349-91.702-6.476-168.761 33.479-230.344 38.597-13.378 1.114-11.643 12.248-2.03 14.139 23.212 5.416 47.161 4.726 69.083 1.787-.735 1.769-1.474 4.488.975 6.575 8.682 7.38 43.584 8.011 58.905 7.131 5.202-.297 16.308-1.347 16.308-1.347-3.167.299-8.115 9.952 2.348 12.669 64.67 18.107 95.098 47.345 130.028 93.393 14.195-1.813 27.559-18.893 21.863-31.93l2.831-6.996 10.456-4.842-2.995-23.353 15.938-7.505s24.823-66.712 26.276-71.57-1.557-7.029-4.232-6.398"
        fill="#fff"
      />
      <path
        d="m283.432 169.347c18.177-1.952 34.207-1.333 51.68 9.321-36.444-3.954-54.287 6.226-77.003 8.489 80.248 21.057 109.63 66.057 129.528 90.995 13.91-5.911 14.662-17.996 11.12-22.31l3.579-7.677.165-4.931 9.589-4.484-3.033-23.89 17.954-7.354 23.789-65.12c-40.306 8.362-53.364-17.702-110.71-21.258-23.358-1.451-44.397-.377-64.145 2.216l3.221 19.932c13.197-.454 25.621 1.225 37.412 6.587-12.961-.803-24.623.273-36.002 2.383z"
        fill="#024"
      />
      <path
        d="m272.27 123.852c-56.458 7.996-102.746 28.079-163.463 36.275 68.506 11.295 122.307-14.047 167.147-16.696l-3.683-19.579zm5.469 28.978c-29.481 5.886-56.262 17.864-92.045 18.836 41.512 7.824 70.288.885 95.091-2.038z"
        fill="#c60c30"
      />
      <path
        d="m345.319 224.286c21.691 15.189 32.832 32.019 44.135 46.749 5.748-2.39 7.554-9.062 5.661-11.419l-5.475-6.737 6.226.365 2.856-4.964-7.738-.459-8.72 1.575 8.843-6.057 6.733.396.25-3.834-6.879-3.294 2.364-2.583 12.721.794-3.657-28.332c-5.028-.615-9.257 2.02-11.082 9.295l-22.55-1.328c3.172-7.194 8.115-10.43 17.497-9.236-5.263-7.368-30.906-8.051-34.527 3.511l19.908 16.315 2.574 14.911-8.179-11.871c-7.354-6.368-15.078-10.83-20.961-3.798"
        fill="#b0b7bc"
      />
      <path
        d="m412.056 151.238 1.601 14.228 16.018 6.012-15.024 3.763 1.481 19.185-12.992-16.211-19.428 4.578 12.003-13.983-9.898-13.117 16.583 5.694 9.655-10.15"
        fill="#fff"
      />
    </svg>
  );
};

NE.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

NE.defaultProps = {
  size: '100'
};

export default NE;
