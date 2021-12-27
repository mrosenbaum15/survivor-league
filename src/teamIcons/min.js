import React from 'react';
import PropTypes from 'prop-types';

const MIN = props => {
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
        d="m379.245 238.944c-.538-3.255-3.486-6.1-5.785-6.612l-.607-.136c.598-2.154.888-3.872 1.033-5.077 1.325-.607 2.873-1.239 3.538-1.503l2.266-.913-.454-2.394c-.932-4.941-3.519-9.025-5-11.041.531-1.682.846-2.776.846-3.706 0-1.898-1.52-3.839-4.51-5.76-.239-.153-.512-.59-.512-2.65 0-.034-.036-1.963-.54-3.929 1.623-1.102 3.658-2.915 4.657-5.735 1-2.837 1.375-5.348 1.52-6.81.078-.794-.034-2.7-.034-2.7l-.307-3.673s-1.846 1.468-2.871 2.255c-.275.204-.479.359-.592.426-.145.111-.307.214-.46.309-.754.451-1.59.811-1.949 1-.804.435-2.024.897-3.366 1.273-1.932-9.989-9.006-27.462-26.114-42.877-20.574-18.542-54.556-21.977-55.995-22.122l-3.185-.298s-.069 4.775-.37 6.134l-.034.155c-.109.657-.239 1.281-.393 1.863-3.87-2.419-6.57-4.872-7.879-7.188-2.417-4.271-3.202-8.194-3.956-11.98-.529-2.686-1.044-5.231-2.085-7.692-2.751-6.459-6.707-11.971-11.757-16.371-.913-.785-1.846-1.606-3.28-1.606-.573 0-1.428.145-2.291.838-.615.504-2.461 2.367-.401 5.416.034.052 3.393 6.197 4.649 14.997.418 2.896.504 6.468.596 10.245.189 7.648.412 16.303 3.435 22.865 1.333 2.879 3.051 5.468 4.844 7.715.181.223.863.941.983 1.086.309.359.624.718.932 1.06-3.307-.283-6.144-1.155-8.964-2.736l-.12-.067c-8.681-4.374-15.346-14.611-16.576-25.48l-.164-1.417c-.229-1.923-.248-3.87-.273-5.93-.008-1.172-.025-2.375-.076-3.589-.139-3.043-.47-6.127-1.01-9.17-.22-1.281-.493-2.572-.794-3.836l-.025-.094c-.162-.93-.42-1.81-.632-2.52-.153-.538-.325-1.069-.504-1.598-.445-1.333-1.035-2.606-1.77-3.794-.974-1.579-1.896-2.818-2.896-3.904-.785-.855-1.556-1.548-2.341-2.102l-.12-.078c-.334-.223-1.239-.718-2.367-.718-.598 0-1.17.139-1.692.412l-.334.204c-1.306.924-2.094 2.948-.913 5.376l.111.206.162.332c.069.164.136.359.206.573.059.187.103.401.153.691.393 2.112.76 7.144-1.153 17.244l-.103.521c-.214 1.795-.401 3.154-.615 4.418-.821 4.836-1.684 10.604-1.829 16.774l.017.905.008.292c-.042 4.084.582 39.484 35.521 51.766l.027.008-.111.042c-1.59 10.176-1.701 16.448-1.598 19.508-7.58 2.973-15.039 6.545-22.156 10.621-11.144 6.1-21.482 13.697-30.736 22.567-1.871 1.802-3.666 3.605-5.479 5.521-.426.443-.846.888-1.212 1.291l-.12.126c-4.584 4.933-8.719 10.073-12.299 15.287-.111.16-.437.682-.565.991-.409.939-.846 2.742.008 3.692.512.569 1.52 1.058 3.427.246.094-.025.462-.172.598-.248.367-.206.913-.548 1.094-.685 11.568-8.851 38.142-13.739 45.901-14.193 6.501-.384 12.954-1.333 15.346-1.707 1.298.615 3.836 1.684 6.699 2.314 1.214.265 2.52.403 3.897.403 1.195 0 2.314-.103 3.272-.239 1.982 6.262 5.93 10.56 7.982 12.484-.128 3.776.512 10.86 3.341 15.457 2.306 3.767 5.605 6.648 7.442 8.084 0 1.802.153 4.699 1.058 7.15.804 2.196 2.163 4.187 3.171 5.493-.393 1.052-.785 2.446-.88 4.009-.111 1.76.298 3.179.813 4.238-.445.804-.863 1.77-1.027 2.734-.22 1.325.052 2.77.359 3.828-.307.676-.632 1.539-.813 2.358-.237 1.18-.042 2.36.206 3.24-.913 2.656-1.915 7.946 1.478 10.808 1.027.863 2.257 1.317 3.555 1.317 2.606 0 4.725-1.854 5.743-2.931 1.512-.71 3.322-2.094 4.349-3.683.777-1.205 1.153-2.367 1.342-3.246.682-.685 1.554-1.726 2.339-3.221.668-1.264.966-2.35 1.094-3.171 1.478-1.768 4.752-6.108 6.169-11.518l.334-1.495c.034-.178.069-.367.092-.565.779-4.905.147-9.483-.254-11.621 1.153-2.068 3.416-6.776 3.692-12.236 2.503-1.665 6.869-4.357 12.2-6.776.206 3.265.267 6.623-.727 11.715-1.22 6.22-5.758 11.364-8.04 13.62-.794.779-2.751 3.001-2.751 3.001s-.752.632-.605 1.921c.006.078.067.3.126.462.025.059.162.256.223.307 1.086 1.052 4.067.668 4.067.668 12.843-1.375 21.54-12.169 25.24-21.08 2.308-5.554 4.393-12.962 5.63-17.483 7.444-1.35 14.329-2.024 19.004-2.484 2.085-.206 3.736-.37 4.819-.54 2.845-.42 8.143-1.214 8.477-6.239.111-1.598-.128-4.04-.735-7.69"
        fill="#fff"
      />
      <path d="m376.312 239.345c-.34-2.094-2.442-3.965-3.494-4.196-1.05-.231-3.734-.93-3.734-.93 1.982-5.596 1.982-9.101 1.982-9.101 1.751-.932 5.245-2.333 5.245-2.333-1.161-6.186-5.365-10.972-5.365-10.972.351-1.281 1.17-3.494 1.17-4.315 0-.819-1.52-2.213-3.152-3.263-1.632-1.052-1.863-2.915-1.863-5.136 0-2.213-.932-5.014-1.281-5.134-.351-.111 4.16-1.539 5.563-5.512 1.401-3.965 1.434-7.186 1.434-7.186-1.863 2.717-9.16 3.836-9.16 3.836-.582-6.184-5.546-26.135-25.61-44.217-20.062-18.08-54.248-21.351-54.248-21.351.05 1.008-.078 2.205-.376 3.519-.281 1.701-.777 3.708-1.64 5.334l-.189.323c-4.716-2.556-9.672-5.989-11.946-10.006-4.399-7.776-3.853-14.466-6.186-19.951-3.82-8.981-9.33-13.859-10.972-15.287-.939-.821-1.256-1.094-1.743-.701-.479.384-.162.941.231 1.522.367.546 3.803 7.169 5.084 16.156 1.283 8.981-.418 23.155 3.786 32.256 2.614 5.665 6.938 10.151 9.836 12.731l.298.267.941.93c-5.999.565-11.579.351-17.509-2.982-9.535-4.802-16.851-15.969-18.191-27.787l-.162-1.42c-.378-3.24-.225-6.478-.37-9.724-.128-2.948-.451-5.888-.966-8.792-.22-1.281-.487-2.545-.794-3.811l-.008-.042c-.128-.769-.351-1.529-.573-2.283-.145-.496-.307-.991-.47-1.495-.376-1.102-.861-2.161-1.487-3.169-.752-1.214-1.579-2.394-2.545-3.444-.573-.624-1.189-1.214-1.879-1.701 0 0-.643-.401-1.077-.17 0 0-.573.401.034 1.648 0 0 .153.248.334.676.103.237.214.538.315.88.094.307.172.64.231 1 .479 2.564.821 8.082-1.203 18.617l-.019.036c-.178 1.529-.376 3.059-.64 4.58-.838 4.93-1.648 10.527-1.785 16.337 0 .256.034 1.008.025 1.161-.059 5.17.932 39.057 35.973 49.733-.162.724-.317 1.426-.426 2.102-2.369 14.943-1.497 21.242-1.497 21.242l.019.153c-7.171 2.7-15.279 6.339-23.823 11.228-9.563 5.237-19.936 12.364-30.087 22.088-1.907 1.837-3.692 3.639-5.384 5.434-.409.426-.821.863-1.231 1.3l-.078.084c-5.357 5.768-9.399 11.083-12.328 15.407 15.833-11.434 40.569-14.861 48.133-15.306 7.929-.46 15.961-1.818 15.961-1.818s3.135 1.676 6.877 2.495c4.248.941 8.691-.409 8.691-.409 1.598 8.219 7.373 13.5 8.887 14.686-.395 2.472.008 10.623 2.784 15.15 2.99 4.88 7.929 8.168 7.929 8.168s-.34 4.418.821 7.58c1.161 3.16 3.862 6.041 3.862 6.041s-1.231 2.068-1.392 4.664c-.162 2.598 1.392 4.042 1.392 4.042s-1.409 1.812-1.648 3.221c-.231 1.42.64 3.547.64 3.547s-.855 1.556-1.102 2.751c-.256 1.205.462 2.684.462 2.684-.573 1.119-2.272 6.375.231 8.486 2.495 2.11 5.605-1.829 5.605-1.829.958-.281 2.759-1.47 3.614-2.803 1.052-1.632 1.052-3.152 1.052-3.152s1.342-.874 2.503-3.093c.958-1.804.821-2.99.821-2.99s5.426-5.701 6.554-12.818c.964-6.066-.462-11.665-.462-11.665s4.076-6.203 3.889-13.294c2.776-1.94 9.475-6.289 17.815-9.535.239 4.783.991 8.929-.504 16.618-1.871 9.571-10.39 16.57-10.39 16.57 11.902-1.283 19.839-11.784 22.985-19.371 2.572-6.188 4.912-14.936 5.997-18.903 11.612-2.255 22.217-2.854 25.736-3.381 4.666-.703 5.838-1.745 5.949-3.496.12-1.751-.351-4.905-.703-7.007l.002-.004z" />
      <path
        d="m259.687 100.199c.905 4.068 1.128 10.624 1.128 10.624-.267-2.308-1.268-5.909-2.031-8.425.275 1.821.496 3.53.67 4.931.601 4.868-.563 13.568 2.888 22.691 2.232 5.899 7.081 10.225 9.988 12.407 2.407-3.394 5.491-7.755 7.579-10.964-11.752-7.258-14.673-14.15-16.451-24.022-.284-1.59-.668-3.1-1.094-4.536.33 3.74.036 7.243.036 7.243-.454-3.614-2.711-9.946-2.711-9.946v-.002zm-30.631.645c.023.775-.015 1.552-.048 2.325-.088 2.016-.54 4.412-.739 6.42-.197 2.016-.54 4.003-.84 6.004-.082.554-.21 1.657-.227 1.478l-.008-.12c-.107-1.231-.418-5.187-.393-9.679l-.013-.928-.086.529c-.735 4.324-1.607 10.336-1.69 16.829l.013 1.016c-.04 2.018.038 10.41 3.646 19.671 5.487 14.087 16.13 23.43 31.624 27.772 7.676 2.18 16.315 3.807 22.325 5.624l.008-.021s6.649 1.947 10.662 5.042c0 0-4.362-.884-8.812-1.441 3.198 4.763 8.625 7.9 14.795 7.9 4.673 0 8.914-1.81 12.096-4.75-.764.533-1.478.941-2.043 1.214-1.523.737-3.02.991-4.15 1.071-2.547.811-5.101.458-5.76.34l.162-.036c7.661-1.323 14.807-7.182 14.003-16.115-.349-3.814-1.514-7.888-3.919-10.46 3.003 2.558 5.046 6.214 5.426 10.422.191 2.079-.048 4.097-.63 5.977.972-2.098 1.541-4.418 1.575-6.875.565 2.623.357 4.872-.263 6.793.76-1.896 1.199-3.956 1.231-6.115.055.25.076.489.118.733l.004-.044c0-1.292-.136-2.549-.401-3.761l-.004-.176c-1.018-6.67-5.903-13.012-12.13-15.807-1.865-.968-7.535-3.06-13.669-3.614-2.783-.315-5.764-.279-9.41.107-1.627.17-3.213.374-4.765.573-8.329 1.067-16.191 2.077-24.618-2.65-10.441-5.261-18.171-17.012-19.639-29.908l-.16-1.407c-.21-1.777-.288-3.658-.391-5.475-.149-1.606-.445-2.482-.479-2.281-.021.118.017.267.017.386.008 1.373-.33 2.738-.538 4.085-.248 1.602-.578 4.641-.599 4.536l-.084-.372c-.071-.447-.084-.884-.088-1.334-.013-.901-.029-1.802-.076-2.703-.113-2.255-.493-8.843-.672-9.681-.046-.212-.139-.962-.361-1.094v-.002z"
        fill="#fff"
      />
      <path
        d="m337.979 186.398c-1.094.019-5.038.502-6.149.567-.015.063-.416.126-1.029.191l.004.361s-1.655 12.713-7.678 21.008c1.577.876 5.554 2.066 6.959 3.347 2.604 2.375 2.749 5.809 2.621 7.165-.12 1.361-.321 3.784-1.571 8.589 0 0-.304-6.909-.922-8.946-.615-2.035-2.929-3.916-5.151-4.593-1.008-.309-2.858-.802-4.914-1.26-3.969 4.544-7.974 7.686-11.735 11.029.399.617.962 1.138 1.756 1.346 2.262.588 5.12-.76 5.12-.76s-1.817 8.408 3.009 15.574c3.599 5.345 10.55 3.975 10.55 3.975s1.493-10.563 8.083-19.024c6.075-7.802 13.48-11.84 18.65-13.362-.185-.958-.502-2.942-.134-3.904.491-1.296 1.913-2.47 3.641-2.47s3.7.926 3.7.926c-.924-.185-3.331-.307-4.565.985-.947.998-.51 3.011-.258 3.893 4.757-.876 9.137-.281 9.975-.076.899.225 1.72.074 2.022-1.05.3-1.121.298-2.467-.304-2.915-.601-.456-1.573-.605-2.547-1.352-.974-.748-1.793-2.547-1.72-5.168.076-2.621-1.493-6.208-1.497-6.214-3.595 1.422-11.985-1.126-17.226-1.501-5.244-.374-8.917 2.096-8.917 2.096-1.424-3.595.227-8.461.227-8.461v.002zm13.967 8.117c2.402.052 4.03.678 4.03.678-2.528.124-4.318 1.107-4.318 1.107.62.741 1.726 2.344 1.787 2.9.008.069.002.223-.013.426l-.01.147v.021c-.078.853-.493 4.824-1.407 5.93-.136.221-.286.435-.477.628-1.05.983-2.888 1.917-6.357 4.324-3.826 2.654-6.85 8.079-6.85 8.079s1.09-5.128 3.455-8.06c2.929-3.629 6.749-6.029 9.103-7.283l1.058-4.729c-.811-.542-1.829-1.096-2.816-1.273-2.05-.361-5.5-.315-7.613-1.004l.023-.042c2.53-.309 4.011-1.05 7.774-1.67.939-.153 1.827-.197 2.629-.181zm15.782 32.374s-13.961 6.021-17.966 17.1c0 0 8.379.216 13.068.771 4.689.557 7.738.577 8.786.64 1.048.059 3.205.183 2.526-3.643-.678-3.824-1.728-4.504-3.576-5.246-1.852-.739-4.996-.552-4.996-.552s2.404-5.863 2.157-9.07zm-62.664.128c-.309.313-.619.619-.926.947 0 0 2.799 3.889 4.511 11.201 1.302 5.567-2.178 14.622-2.178 14.622s1.806 4.547 2.604 10.078l.328-.202s9.704-5.143 14.918-7.321c.823-.346 1.863-.72 3.026-1.109.109-2.176.323-5.17.764-7.953-1.004.027-1.928.038-2.703.038-5.368 0-8.711-3.11-11.201-6.768h.004c-2.489-3.652-4.206-10.968-4.206-10.968s-3.106-.067-4.941-2.566zm42.922 19.778-.082.004c-.645 1.012-1.163 2.09-1.722 3.602 1.8-.355 3.539-.666 5.13-.903 8.793-1.323 16.023-1.554 17.191-1.709 1.165-.158 3.268-.08 4.042-.701 0 0-2.432.197-5.078.118-2.646-.076-13.026-.41-19.482-.41z"
        fill="#e9bf9b"
      />
      <path
        d="m286.249 123.016s-.26 3.076-2.117 7.01c-.659 1.394-1.518 2.896-2.642 4.41-1.613 2.169-4.845 6.634-7.816 11.126-.099.153-.653.863-.653.863 1.105-.13 2.224-.269 3.368-.416 1.573-.199 3.177-.407 4.828-.582 3.849-.407 7.02-.445 9.975-.107 5.84.525 11.439 2.388 14.095 3.627 7.4 3.127 13.23 10.662 14.261 18.543h-.01l.118.655.038.248c.042.279.078.563.107.848l.004.008c1.833-.218 11.483-1.31 19.53-1.256 7.178.048 13.549.802 16.613 1.3-3.146-7.014-8.012-15.244-15.368-22.214-16.628-15.75-37.178-23.276-54.329-24.064h-.002zm-25.25 52.151c-.076.349-.143.695-.206 1.037-.202 1.237-.372 2.497-.512 3.753 3.167-.821 6.911-1.701 10.517-2.337l.25-.042-.176-.044-1.869-.472c-1.258-.315-2.528-.611-3.799-.905-1.409-.328-2.818-.651-4.204-.989zm109.257 9.893s-1.609.741-5.185 1.541c-3.578.802-10.794-.307-12.957-.552-2.157-.246-8.635-.741-10.487.491-1.848 1.233-1.417 4.935-1.417 4.935s1.483-1.539 5.122-2.465c3.639-.924 8.453-.246 8.453-.246-2.776.552-4.318 1.48-4.318 1.48 5.181.678 6.105 2.344 13.014 1.85 6.909-.496 7.776-7.035 7.776-7.035zm-42.808 2.707c-1.89.168-3.692.395-5.5.575l-.042.191c-1.823 6.096-5.349 10.481-10.949 13.043-7.314 7.459-18.228 12.644-24.318 16.546-10.744 6.888-12.506 20.471-12.506 20.471 1.18-20.847 13.959-23.537 27.928-33.785.292-.212.995-.613 1.279-.827l-.435.181c-1.745 0-5.313-.328-6.957-.714-1.527 1.05-3.014 1.974-4.387 2.724-7.31 3.986-12.379 10.496-12.379 10.496 1.976-6.6 6.6-9.381 13.53-14.261-2.589-1.067-5.489-2.875-7.493-4.849-4.082 2.108-13.108 7.589-19.116 13.268-4.807 4.544-13.719 10.987-24.257 15.956 8.28-5.479 22.247-17.787 27.149-22.455 0 0-18.367 10.607-23.625 14.167 0 0 6.833-7.541 15.286-12.193 0 0-18.688 7.657-29.442 14.998-5.563 3.799-14.087 11.542-19.011 16.808 2.022-.439 9.7-1.989 11.747-2.199 13.82-1.42 28.927-.347 42.164-16.283l.632-.745c-1.153 3.94-1.648 9.463-1.424 15.618.481 13.308 10.815 18.562 14.816 21.353-.101-1.636-.349-3.27 1.115-9.02 1.611-6.334 5.974-11.472 7.006-12.287 0 0-6.777 9.041-4.819 23.255 0 0 1.869-11.644 10.647-23.075 8.78-11.428 17.214-16.775 24.198-25.311 3.883-4.748 6.086-9.305 7.396-13.396 1.071-3.06 1.55-6.046 1.768-8.249zm-45.301 5.788c-1.901.384-27.411 3.736-58.269 24.473-10.223 6.871-22.762 19.066-28.951 25.87 2.652-1.159 8.366-3.555 12.888-4.952 4.618-4.742 12.199-12.424 19.146-17.291 16.099-11.273 43.632-22.934 56.553-26.46-.277-.376-.548-.756-.804-1.151l-.563-.487zm82.167 19.188c-2.682.006-6.397.483-10.529 2.367-8.268 3.761-16.145 11.271-19.538 19.043-3.391 7.774-3.662 15.996-4.032 22.042-.367 6.048.643 15.082-1.73 23.22 0 0 3.896-5.762 5.311-22.046 1.281-14.765 4.937-24.925 11.722-29.675 0 0-5.431 7.526-7.281 19.864-1.85 12.34-1.48 17.155-3.761 27.395l-.565 1.919s5.431-7.27 8.375-26.221c2.577-16.569 7.426-24.003 14.089-27.89 0 0-8.917 9.691-10.96 23.568 0 0 5.055-12.501 13.014-17.747 7.959-5.242 14.845-6.993 14.845-6.993s-.271-4.301-4.626-8.387c0 0-1.651-.462-4.332-.456v-.002zm-100.911 13.047s-6.17 7.384-12.997 9.093l-.267.027s3.921 2.052 7.169 2.052c3.249 0 5.914-1.05 5.914-1.05s-.542-7.627.181-10.122zm37.815 4.269s-7.955 8.698-11.073 15.79c-2.78 6.327-3.755 11.422-3.906 14.131 3.326 2.068 7.348 4.576 9.566 6.336.538-1.292 1.119-2.577 1.73-3.784 3.555-7.012 7.043-9.509 8.425-16.813 1.38-7.308-2.094-12.915-4.742-15.66zm-27.01 25.368s-.036 7.058 3.421 12.447c2.577 4.017 9.603 7.68 14.183 10.427.397-1.491 1.462-5.323 3.003-9.458-1.854-1.407-7.213-5.397-10.494-7.218-4.017-2.228-8.402-4.685-10.114-6.197zm30.015 2.201c-.59.947-1.529 2.409-2.079 3.15-1.739 2.352-6.029 11.697-7.858 19.02.546.34 1.042.661 1.46.951 2.014 1.409 3.207 2.541 3.885 3.295.876-1.56 2.596-3.148 3.28-4.389 2.518-4.574 4.448-9.975 3.822-14.893-.428-3.379-1.945-6.067-2.51-7.134zm-18.39 20.729c-.017 1.497.172 5.279 2.306 8.36 2.722 3.927 6.615 5.947 6.615 5.947s1.747-3.064 3.683-6.497c-1.218-1.035-2.858-2.272-4.878-3.524-1.838-1.14-4.983-2.705-7.726-4.286zm16.89 5.412s-3.182 4.29-5.414 8.31c-1.556 2.803-2.955 6.487-3.654 8.457l.418.258c1.464.987 3.335 3.614 3.335 3.614s4.007-4.467 5.634-9.523c1.63-5.059-.319-11.115-.319-11.115zm-12.657 8.005c-.697.905-1.926 1.951-1.109 4.7.502 1.688 1.758 2.556 2.995 3.205.798-2.531 1.829-5.332 1.829-5.332-1.888-.962-3.715-2.573-3.715-2.573zm-1.023 7.93s-1.195 1.615-.754 3.526c.441 1.915 2.22 2.743 4.11 3.704 1.892.962 2.604 2.879 2.604 2.879 1.344-.945 2.01-2.388 1.268-3.959-.745-1.571-2.176-2.904-4.177-3.86-1.999-.955-3.051-2.291-3.051-2.291zm-.697 6.319c-1.949 3.354-1.006 4.131 1.682 6.124 1.84 1.361 1.489 3.137 1.489 3.137s2.522-1.277 2.354-2.898c-.111-1.075-1.659-3.282-3.121-4.271-1.464-.987-2.405-2.092-2.405-2.092zm-.475 6.363c-1.1 1.363-1.6 4.11-.903 4.929.695.821 1.665.724 2.268.038.605-.683.783-1.762-.057-2.9-.678-.922-1.308-2.066-1.308-2.066z"
        fill="#ffc62f"
      />
      <path
        d="m357.327 172.038c-2.211-.412-9.256-1.476-18-1.535-7.948-.052-17.532.941-19.422 1.151l-.002.034c-.01 11.822-10.186 20.262-19.663 20.402-14.313.212-19.581-11.322-19.69-12.003-1.021-.298-2.11-.594-3.24-.897-1.9.231-3.933.523-6.066.899-3.944.695-8.019 1.667-11.333 2.53-.16 1.751-.412 4.567-.422 4.809-.472 9.953.155 9.258.155 9.258 2.887-1.128 13.534-3.86 13.534-3.86 3.118-.724 6.82-1.503 11.154-2.304 3.049 6.142 9.378 10.365 16.698 10.365 9.143 0 16.738-6.583 18.33-15.262 19.98-2.169 29.425-2.232 41.764-.59-1.294-6.877-3.797-12.998-3.797-12.998"
        fill="#4f2683"
        stroke="#000"
        strokeWidth=".336"
      />
    </svg>
  );
};

MIN.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

MIN.defaultProps = {
  size: '100'
};

export default MIN;
