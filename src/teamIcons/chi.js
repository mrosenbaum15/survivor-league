import React from 'react';
import PropTypes from 'prop-types';

const CHI = props => {

  return (
    <svg
      width={40}
      height={40}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 560 400"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      id="Bears"
    >
      <path
        d="M222.033 113.85c-34.222 14.158-49.786 35.638-56.798 51.153-4.509 10.083-8.935 17.647-13.931 23.821-5.121 5.331-14.482 11.21-19.952 13.283l-1.024.386-.184 3.726 1.412.28c7.088 1.41 15.915 6.735 18.779 10.385 3.679 3.699 6.243 6.256 12.697 17.704.09.137 3.305 5.227 3.305 5.227 2.093 3.522 4.256 7.166 10.051 13.582 4.458 6.262 25.806 25.959 49.037 34.433 16.321 8.09 37.758 12.089 65.364 12.164 40.543.233 71.232-8.633 99.504-28.734 11.722-9.083 15.513-12.738 25.396-24.476 6.621-7.825 13.819-21.625 14.127-36.869l.039-1.706-57.36-.063-.316 1.271c-4.662 18.72-23.519 30.393-34.343 35.689-28.25 12.011-63.829 12.158-90.554.331-24.984-12.519-38.268-29.454-37.33-47.65.953-18.549 16.745-36.281 40.229-45.165 45.424-16.647 89.089-2.334 105.579 13.152l.482.449 66.837-.063-.904-2.283c-13.748-34.843-63.466-54.485-85.39-58.535-49.082-11.238-91.468-2.977-114.746 8.504"
        fill="#0b162a"
      />
      <path
        d="M161.531 183.767c3.489-5.515 4.876-8.626 6.782-12.938l2.046-4.525c6.156-13.095 16.512-25.1 29.94-34.704 13.125-8.794 27.661-15.837 39.847-19.308 52.948-15.382 107.088-2.179 130.564 10.448 9.279 4.256 34.386 19.161 44.538 38.519h-56.556c-39.384-30.638-92.512-22.848-118.712-10.061-10.587 5.88-16.737 10.622-24.439 18.834-11.96 14.474-18.391 39.131 2.634 61.23 9.502 9.241 19.006 15.504 30.85 20.362 27.393 11.35 65.833 10.087 93.473-3.081 17.655-9.21 29.379-21.43 34.122-35.389h47.709c-1.689 12.119-5.219 24.649-23.311 42.163l-2.012 1.804c-8.761 7.908-20.768 18.747-44.22 27.306-40.003 15.521-99.831 13.729-133.4-3.979l-2.108-1.063c-7.541-3.773-17.875-8.937-30.891-21.044-9.084-8.337-15.413-16.578-23.374-30.403-8.678-15.88-19.544-21.672-25.388-24.131 5.093-2.567 15.047-8.675 21.909-20.038"
        fill="#fff"
      />
      <path
        d="M163.59 192.553c5.67-6.274 10.145-22.395 19.108-34.635 12.726-17.938 29.57-27.33 42.1-33.323 28.662-14.037 69.869-18.036 110.179-8.363 14.629 3.467 29.262 8.663 39.707 15.468 10.455 6.211 22.695 15.17 29.566 23.888h-43.061c-12.776-10.21-26.812-15.168-39.352-17.857-14.031-3.581-36.128-5.491-62.405.781-15.529 3.877-26.277 9.251-36.726 16.718-20.599 14.633-43.292 53.089-2.985 86.532 13.14 11.103 24.184 14.692 36.426 18.932 22.695 6.566 51.061 5.315 67.482.834 24.784-6.57 34.037-15.227 42.1-22.095 7.466-7.164 13.737-15.827 15.47-20.305l35.351-.061c-2.452 13.199-12.007 23.947-21.26 32.906-10.602 9.993-18.514 15.229-34.161 23.054-36.605 17.553-90.352 16.957-123.493 4.954-17.022-6.213-21.799-9.018-34.637-17.916-10.451-8.418-17.322-13.974-27.173-29.201-4.478-7.466-6.57-11.644-11.644-18.51-3.585-3.885-5.974-7.468-12.242-10.453 5.748-4.028 8.879-7.017 11.646-11.344"
        fill="#c83803"
      />
    </svg>
  );
};

CHI.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

CHI.defaultProps = {
  size: '100'
};

export default CHI;
