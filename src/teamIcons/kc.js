import React from 'react';
import PropTypes from 'prop-types';

const KC = props => {
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
      id="Chiefs"
    >
      <path d="m428.591 188.096c-2.708-2.436-4.922-3.781-5.62-4.377-4.002-3.194-.649-.65-4.487-3.133-2.76-1.729-3.518-3.133-6.327-4.701-5.033-2.87-5.57-3.679-9.623-8.541-3.518-6.438-8.975-7.358-14.454-8.601-5.296-1.193-9.087-5.408-10.007-6.864-2.81-4.598-7.409-6.812-9.844-8.167-7.52-4.114-16.173-3.407-22.944-9.461-10.209-7.247-12.938-5.892-23.652-6.216-5.943-.162-13.645-3.952-16.172-6.054-2.113-1.79-4.599-2.922-6.762-3.619-7.571-2.325-12.736 1.678-23.349-3.457-3.083-1.516-5.892-3.567-8.925-5.356-1.011-.779-2.021-1.314-5.054-1.962-6.064-1.192-11.119-.434-17.183.162-4.043.263-5.054-1.414-8.086-2.982-3.032-1.455-6.064-2.536-9.097-3.184-4.953-.869-10.209-.273-15.567.808-10.612 2.113-20.215-3.244-30.524-2.273-1.719.161-5.055 2.324-6.267 4.76-1.517 3.245-1.517 5.135-1.294 8.379.325 4.377.81 4.701 1.677 7.52 1.84 6.166 2.811 9.521 4.276 13.645 1.729 4.811 1.678 10.714-2.435 12.635-1.952.92-5.246.92-7.086-.488-2.87-2.214-4.436-5.246-7.681-5.892-4.326-.865-9.521 3.567-14.151 4.811-4.598 1.193-5.195-1.294-8.379-2.759-2.113-.973-4.164.432-5.357 1.132-2.163 1.193-2.648 3.679-3.194 6.327-.377 2.113-.594 4.053-.054 6.378.757 3.355 1.89 5.357 1.951 7.681.217 5.843-.757 10.209-3.133 13.242-1.517 1.951-3.568 7.409-4.164 9.41-2.113 6.701-1.89 5.569-2.921 11.825-.541 3.194-.433 6.762-.704 9.734-.054.541.378 7.298.704 9.36.81 5.033 1.728 8.217 2.81 12.432 1.517 6.115 2.163 9.896 2.001 14.555-.162 4.812-3.194 9.36-.325 12.736 1.79 2.113 6.489 4.002 10.311 2.325 3.891-1.728 6.701-3.729 9.733-4.164 5.57-.757 9.199 1.617 11.624 1.355 2.163-.271 5.893-2.376 7.682-2.537 1.405-.108 4.488-.271 5.57.541 1.728 1.293 2.759 2.708 2.486 7.085 0 .054-1.031 4.7-1.031 4.76-1.789 5.782-3.679 11.22-4.598 15.162-.973 4.164-5.519 13.241 3.729 16.88 3.891 1.566 8.005 1.242 13.139-.055 2.598-.649 3.68-.757 6.116-1.193l3.618-.27 3.245-.162c5.732-.65 7.085-.271 12.129.432 4.761.595 9.3 1.517 14.05.973 2.376-.27 4.701-.703 6.974-1.455 6.601-2.113 9.683-4.973 17.588-6.054 6.6-.921 6.6.216 12.432-.055 6.054-.271 9.41-2.87 11.926-4.276 3.083-1.677 3.892-1.839 5.944-2.921 7.46-4.002 16.273-3.518 24.662-5.57 5.892-1.455 8.217-4.215 14.858-6.004 2.648-.703 5.519-.649 8.329-1.031 2.163-.325 5.943-2.214 8.055-4.164 3.619-3.356 3.245-3.518 6.054-5.084 4.701-2.649 10.058-2.598 14.858-4.812 4.437-2.052 8.976-3.78 12.432-7.298 5.085-5.135 13.14-6.6 19.711-8.975 3.891-1.405 9.026-3.952 13.342-11.32 4.215-7.247 7.944-8.329 15.363-10.512 4.973-1.517 7.136-2.537 11.018-6.166 3.456-3.245 4.7-5.357 6.277-7.621 1.789-2.597 5.246-6.923 1.566-10.208-1.617-1.456-3.295-4.114-6.761-6.813" />
      <path
        d="m423.548 194.363c-4.326-3.084-4.701-3.619-6.974-5.136-5.843-3.891-6.975-4.76-9.845-8.055-2.81-3.194-3.568-4.276-6.762-6.004-1.192-.703-9.248-3.457-7.782-3.194-7.358-1.294-7.621-2.87-10.512-5.57-2.436-3.517-5.296-7.732-7.783-9.36.973.595-4.487-2.971-4.436-2.87-4.164-1.456-5.62-1.082-10.917-1.294.162 0-5.732-.81-7.247-1.516-2.709-1.193-4.164-2.598-6.004-4.003-4.114-3.083-2.972-2.375-7.036-5.356-5.518-4.003-6.216-3.033-13.241-3.73-5.943-.594-10.208-2.001-14.858-5.357-8.278-6.004-16.374-3.891-21.428-4.649-7.298-1.082-12.432-4.053-15.162-5.782-5.892-3.729-4.539-2.001-10.816-4.922-7.519-3.568-14.555 2.376-23.348-.108-4.65-1.294-6.378-3.729-9.36-4.811-8.996-2.629-12.029-1.213-19.306-1.112-8.693 0-16.475-2.325-24.763-2.224-2.325 0-4.114 1.951-3.781 4.598 0 0 .108 3.194.108 3.245.433 2.649 1.405 5.458 2.214 8.379 1.031 3.568 1.567 4.761 3.032 10.411.541 4.539 0 5.782-.324 7.733-.271 1.566-1.294 4.65-2.052 5.781-.866 1.294-2.001 1.79-3.518 2.709-2.598 1.566-5.296 2.274-8.106 2.214-2.922-.108-2.163-.108-6.762-1.79-1.677-.649-5.135-2.597-8.602-1.131-6.65 2.81-7.409.487-11.017.757-1.082.054-2.163.594-3.194 1.082-1.677.703-2.436 1.789-3.518 4.002-.649 1.355-1.132 3.568-.865 5.57-.377 0 .65 3.133.65 3.245.81 4.275 1.031 7.62-.595 11.422-1.566 3.567-2.001 4.811-4.002 7.732-1.951 2.811-5.357 10.917-5.62 18.396.271-.271-.054 8.864 1.031 14.251 1.193 5.943 2.922 6.439 3.295 16.274.162 3.729-.217 6.974-.325 10.31-.054 2.163.65 5.195 3.356 4.76 3.892-.594 8.278-2.759 11.32-2.87 1.517-.055 4.115.432 5.195.757 6.167 2.163 4.115.541 13.747-1.132 3.194-.594 7.621.108 9.36 1.132 5.681 3.295 5.195 10.512 3.568 17.688-.271 1.132-1.677 8.652-2.001 9.785-.973 3.78-.865 4.002-1.355 8.055-.217 1.951-.108 3.457.973 5.246.92 1.456 1.951 2.487 3.356 2.487 6.277.162 9.734 0 16.173-1.132 8.329-1.517 12.533-1.517 18.294-.973 5.893.54 14.252.377 17.688-.92 3.133-1.132 7.298-3.568 10.613-4.276 10.917-2.325 11.32-1.243 20.216-2.376 7.085-.92 10.714-4.488 14.353-6.378 4.973-2.648 9.36-3.567 15.061-3.567 3.355 0 8.167-1.132 10.512-2.214 9.41-4.276 5.892-4.003 19.001-6.439 6.651-1.243 11.423-6.54 15.567-8.814 2.648-1.516 4.973-2.708 7.944-3.618 4.002-1.193 8.491-1.84 12.331-3.133 6.166-2.163 8.056-4.276 11.422-7.298 2.811-2.537 3.73-2.487 6.864-4.437 3.194-2.001 7.843-3.457 9.623-4.002 4.053-1.243 10.006-8.056 15.566-13.645 6.539-6.702 12.635-5.57 19.912-9.461 4.436-2.325 7.298-3.891 5.246-8.106-.811-1.678-3.032-3.73-4.812-4.974"
        fill="#fff"
      />
      <path
        d="m276.078 227.718c-13.747-10.714-9.845-20.317-4.053-24.764l1.728 1.891-2.921 3.083.217 11.118h39.622l5.084-4.872v-12.13h-3.032l-13.747-14.757c26.381-5.619 39.318 5.893 47.102 18.599h10.31l5.246-5.085v-29.312h-11.017l-6.601 4.054c-23.248-11.321-41.442-10.108-59.635-4.145l-2.971-3.032 16.779-10.006 10.107-.054 4.973-4.701v-9.946h-40.43l-4.276 4.377v6.813l-37.904 21.731v-16.678l6.115-6.166v-10.058h-39.723l-5.408 6.327v7.945h6.489v42.957h-2.001s-5.296 6.004-5.033 6.115v11.118h41.846l4.164-3.891v-13.342h-6.166v-3.407l23.045-13.241 1.951 2.001c-5.135 3.618-9.198 7.035-12.23 12.432-4.539 7.52-6.166 17.992-3.518 26.381 1.728 5.619 3.891 9.026 7.682 12.937 3.618 3.73 6.701 5.893 12.635 8.703 4.872 2.436 16.273 5.892 25.168 6.813 8.601.649 19.406.54 26.481-.378 7.783-.81 15.869-3.619 20.72-5.62 3.892-1.89 8.218-3.618 11.523-6.216 8.33-6.004 17.183-15.06 17.285-26.381h-15.566c-4.873 17.386-51.954 25.269-70.854 11.826"
        stroke="#000"
        strokeWidth="1.012"
      />
      <path
        d="m312.128 146.392-37.428.054v6.491h4.38l-49.49 28.233v-28.181l6.165-.054v-6.491h-36.292v6.491h6.165v51.871h-6.165v7.464h36.292v-7.464h-5.894v-8.762l28.125-16.12 23.313 24.829-5.194-.056v7.572h37.646v-7.516h-1.19l-34.13-36.834 25.367-14.93 8.33-.108zm.202 23.352c-11.757-.079-20.117 2.739-24.164 4.017l9.684 10.601c20.823-4.976 43.158.217 52.948 14.981l9.415-.105.106-26.018h-8.653l-6.165 4.058c-12.826-5.656-24.026-7.471-33.172-7.533v-.001zm38.47 29.598-.214.002h.216zm-91.295-10.383c-8.654 5.896-11.574 11.412-13.467 16.767-1.461 4.435-3.517 13.469.648 21.906 5.084 8.762 13.306 13.848 18.824 15.848 9.033 3.786 23.634 7.247 40.186 6.598 11.846-.27 22.178-2.434 32.13-7.41 5.787-3.084 6.978-3.786 12.765-9.14 4.327-4.976 7.841-8.058 9.301-15.74h-9.952c-4.003 6.599-9.519 11.844-22.176 15.576l.108.056c-24.449 7.248-47.978 3.625-58.417-9.249-8.654-9.952-4.598-18.716.919-23.475l-10.88-11.728.009-.009z"
        fill="#e31837"
        stroke="#e31837"
        strokeWidth=".53689"
      />
    </svg>
  );
};

KC.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

KC.defaultProps = {
  size: '100'
};

export default KC;
