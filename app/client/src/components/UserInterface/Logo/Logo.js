import React from 'react';
import classes from './Logo.module.css';

const Logo = (props) => {

    let logo = 
    // <svg className={classes.Logo} viewBox="0 0 840 230" xmlns="http://www.w3.org/2000/svg">
        // <path d="M835.983 72.502c-4.229 12.314-21.461 8.533-31.178 8.533-11.953 0-24.066 6.602-30.471 16.768-7.92 12.57-8.303 29.656-10.754 43.9-1.529 8.877-.924 24.816-12.074 27.893-9.83 2.713-12.051-6.148-10.764-13.615 3.111-18.055 6.221-36.111 9.332-54.166 2.223-12.902 9.625-23.969 20.039-31.748 11.543-8.622 24.125-9.407 37.949-9.407 7.546 0 33.216-4.116 27.921 11.842zM699.302 60.951c-30.951 1.482-57.654 23.534-63.635 54.284-2.809 14.445-.77 28.947 9.039 40.377 8.922 10.395 22.113 13.908 35.316 13.908h30.484c4.605 0 9.607.697 13.689-1.896 6.559-4.164 8.982-16.285-.617-18.416-6.279-1.395-13.793-.236-20.156-.236-7.484 0-15.248.609-22.715-.16-12.77-1.314-23.002-10.637-24.818-23.441-1.924-13.559 5.289-27.969 16.34-35.781 13.383-9.463 27.561-8.152 43.23-8.152 11.904 0 15.605 12.676 8.234 21.088-3.34 3.814-7.914 5.643-12.912 5.643h-29.236c-8.211 0-19.799 1.377-18.959 12.654.885 11.859 20.857 7.754 27.994 7.754 14.814.002 28.92 1.217 41.461-8.152 10.629-7.941 18.836-22.156 16.422-35.813-1.52-8.588-6.32-16.802-14.549-20.551-10.659-4.857-23.259-3.11-34.612-3.11zm-59.533 98.114c2.352-13.578-17.074-10.273-24.494-10.273-12.953 0-25.791-1.328-32.842-13.855-6.955-12.357-2.928-27.193 5.1-37.904 8.303-11.076 21.334-15.998 34.764-15.998 9.629 0 28.029 4.004 32.158-8.535 3.859-11.719-8.803-11.843-16.416-11.843-15.566 0-32.223-1.969-46.723 4.919-13.248 6.293-24.115 18.102-28.783 32.059-2.074 6.205-2.801 12.902-3.906 19.32-1.119 6.49-2.35 12.795-1.867 19.41.879 11.994 7.986 23.084 18.678 28.662 12.377 6.459 27.977 4.313 41.393 4.313 9.172-.002 20.397 1.178 22.938-10.275zm-87.657-44.231c1.881-15.15-.891-28.666-11.014-40.432-9.643-11.207-24.973-14.437-39.029-13.76-30.865 1.485-54.451 28.994-59.389 57.719-2.449 14.248-4.697 30.014 7.152 41.102 12.08 11.303 26.918 9.852 42.299 9.852 9.059 0 23.652 1.996 25.238-10.689 1.693-13.541-18.926-9.688-26.262-9.688-14.201 0-26.955-7.475-28.402-22.799-1.33-14.08 5.842-27.715 16.41-36.502 21.52-17.896 57.967-5.875 52.611 25.223-2.635 15.307-5.271 30.615-7.906 45.922-1.092 6.336-1.846 14.867 7.051 15.305 5.547.271 11.32-4.113 12.311-9.65 3.071-17.185 5.967-34.399 8.93-51.603zM393.593 168.95c30.766-2.865 45.545-32.057 46.734-59.924 1.328-31.094-25.367-53.626-55.99-47.372-28.48 5.816-49.082 28.399-53.961 56.722-3.256 18.91-6.514 37.822-9.771 56.734-1.645 9.553-3.291 19.105-4.936 28.66-.621 3.605-1.924 7.672-1.826 11.375.254 9.609 11.66 10.549 17.293 4.621 2.488-2.619 3.143-5.729 3.729-9.133 1.305-7.566 2.607-15.133 3.91-22.699 3.584-20.809 7.168-41.615 10.752-62.422 1.949-11.32 3.715-22.363 12.166-31.002 9.881-10.1 23.283-15.551 37.359-12.459 12.045 2.645 20.836 14.59 20.512 26.787-.354 13.371-5.666 25.754-16.922 33.488-12.641 8.688-25.824 5.215-40.141 6.434-7.516.641-16.012 9.332-10.553 16.947 4.607 6.426 16.789 3.434 23.125 3.414 6.172-.019 12.352.01 18.52-.171zm-63.676-87.274c7.82-.061 15.951-9.965 10.385-17.174-2.529-3.277-6.318-3.206-10.061-3.206h-29.053c-27.297 0-49.301 20.315-53.854 46.753-5.98 34.717-11.961 69.432-17.941 104.148-1.342 7.791 4.963 13.641 12.664 10.348 11.424-4.887 8.303-21.719 11.846-31.395 5.256-14.346 18.879-21.822 33.543-21.822 9.617 0 27.986 3.994 32.105-8.535 4.33-13.166-11.857-11.842-19.568-11.842-14.977 0-29.609-2.371-33.84-19.279-3.629-14.502 4.752-30.221 15.598-39.236 13.658-11.353 31.719-8.76 48.176-8.76zM223.011 169.42c7.531-.074 15.965-9.914 12.275-17.529-2.416-4.986-10.615-1.5-10.895-8.494-.123-3.049.943-6.389 1.455-9.359 1.434-8.332 2.869-16.666 4.305-24.998 3.764-21.848 7.527-43.697 11.291-65.547 1.277-7.417 2.557-14.835 3.834-22.252.496-2.882 1.451-6.093.611-8.987-2.68-9.232-14.813-6.255-18.682.29-1.508 2.551-1.762 5.521-2.256 8.386l-3.633 21.093c-3.758 21.82-7.518 43.639-11.275 65.459l-7.494 43.512c-.75 4.354-.652 8.713 1.945 12.492 4.407 6.413 11.611 5.934 18.519 5.934zM159.86 60.951c-30.959 1.482-57.645 23.534-63.635 54.284-2.814 14.449-.766 28.943 9.041 40.377 8.916 10.396 22.115 13.908 35.314 13.908h30.484c4.6 0 9.611.699 13.689-1.896 6.549-4.168 8.99-16.283-.615-18.416-6.279-1.395-13.793-.236-20.158-.236-7.484 0-15.25.609-22.717-.16-12.773-1.316-22.992-10.639-24.816-23.441-1.932-13.553 5.291-27.973 16.338-35.781 13.383-9.463 27.563-8.152 43.232-8.152 11.879 0 15.641 12.688 8.234 21.088-3.357 3.807-7.9 5.643-12.91 5.643h-29.236c-8.246 0-19.754 1.373-18.961 12.654.836 11.859 20.908 7.754 27.994 7.754 14.828.002 28.904 1.209 41.461-8.152 10.637-7.93 18.834-22.164 16.42-35.813-1.52-8.586-6.314-16.804-14.545-20.551-10.662-4.855-23.258-3.11-34.614-3.11zM25.188 40.848c.502 13.162 20.088 10.928 20.42-1.496.364-13.623-20.443-11.638-20.42 1.496zm78.02 20.679c.49 13.163 20.088 10.931 20.42-1.496.363-13.619-20.44-11.637-20.42 1.496zM30.474 88.584c4.324-14.369 21.084-13.15 33.098-14.393 9.578-.992 31.275 1.332 33.578-12.085 2.074-12.085-11.219-10.632-18.76-10.036-14.357 1.133-32.746-.213-46.074 6.397C7.817 70.621-.81 108.561 23.532 125.77c11.775 8.326 27.225 3.498 38.559 11.768 4.898 3.574 8.566 9.213 9.506 15.238 1.096 7.031-1.41 14-.779 20.971.805 8.871 11.656 12.313 17.645 5.666 3.725-4.133 3.117-10.76 3.525-15.891.611-7.66 1.801-15.439.848-23.105-1.59-12.77-12.125-24.588-24.615-27.66-11.641-2.863-30.977 1.258-37.107-11.959-1.855-3.993-1.607-7.997-.64-12.214zm-25.34 79.872c1.725 12.045 19.258 6.504 26.563 5.697 7.986-.879 16.191-1.291 24.111-2.656 5.229-.898 9.355-3.742 10.617-9.135 2.779-11.889-9.791-11.154-17.355-10.32-10.102 1.111-20.201 2.225-30.303 3.338-4.371.48-8.645 1.271-11.398 5.092-1.62 2.249-2.448 5.228-2.235 7.984z"/>
    // </svg>
    <svg className={classes.toolbarLogo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 230">
        <g stroke="#B0F235" strokeMiterlimit="10">
        <path className={classes.subPart} fill="#F20505" d="M103.208 61.527c.49 13.163 20.088 10.931 20.42-1.496.363-13.619-20.44-11.637-20.42 1.496z"/>
        <path className={classes.subPart} fill="#3726A6" d="M835.983 72.502c-4.229 12.314-21.461 8.533-31.178 8.533-11.953 0-24.066 6.602-30.471 16.768-7.92 12.57-8.303 29.656-10.754 43.9-1.529 8.877-.924 24.816-12.074 27.893-9.83 2.713-12.051-6.148-10.764-13.615 3.111-18.055 6.221-36.111 9.332-54.166 2.223-12.902 9.625-23.969 20.039-31.748 11.543-8.622 24.125-9.407 37.949-9.407 7.546 0 33.216-4.116 27.921 11.842zM699.302 60.951c-30.951 1.482-57.654 23.534-63.635 54.284-2.809 14.445-.77 28.947 9.039 40.377 8.922 10.395 22.113 13.908 35.316 13.908h30.484c4.605 0 9.607.697 13.689-1.896 6.559-4.164 8.982-16.285-.617-18.416-6.279-1.395-13.793-.236-20.156-.236-7.484 0-15.248.609-22.715-.16-12.77-1.314-23.002-10.637-24.818-23.441-1.924-13.559 5.289-27.969 16.34-35.781 13.383-9.463 27.561-8.152 43.23-8.152 11.904 0 15.605 12.676 8.234 21.088-3.34 3.814-7.914 5.643-12.912 5.643h-29.236c-8.211 0-19.799 1.377-18.959 12.654.885 11.859 20.857 7.754 27.994 7.754 14.814.002 28.92 1.217 41.461-8.152 10.629-7.941 18.836-22.156 16.422-35.813-1.52-8.588-6.32-16.802-14.549-20.551-10.659-4.857-23.259-3.11-34.612-3.11zm-59.533 98.114c2.352-13.578-17.074-10.273-24.494-10.273-12.953 0-25.791-1.328-32.842-13.855-6.955-12.357-2.928-27.193 5.1-37.904 8.303-11.076 21.334-15.998 34.764-15.998 9.629 0 28.029 4.004 32.158-8.535 3.859-11.719-8.803-11.843-16.416-11.843-15.566 0-32.223-1.969-46.723 4.919-13.248 6.293-24.115 18.102-28.783 32.059-2.074 6.205-2.801 12.902-3.906 19.32-1.119 6.49-2.35 12.795-1.867 19.41.879 11.994 7.986 23.084 18.678 28.662 12.377 6.459 27.977 4.313 41.393 4.313 9.172-.002 20.397 1.178 22.938-10.275zm-87.657-44.231c1.881-15.15-.891-28.666-11.014-40.432-9.643-11.207-24.973-14.437-39.029-13.76-30.865 1.485-54.451 28.994-59.389 57.719-2.449 14.248-4.697 30.014 7.152 41.102 12.08 11.303 26.918 9.852 42.299 9.852 9.059 0 23.652 1.996 25.238-10.689 1.693-13.541-18.926-9.688-26.262-9.688-14.201 0-26.955-7.475-28.402-22.799-1.33-14.08 5.842-27.715 16.41-36.502 21.52-17.896 57.967-5.875 52.611 25.223-2.635 15.307-5.271 30.615-7.906 45.922-1.092 6.336-1.846 14.867 7.051 15.305 5.547.271 11.32-4.113 12.311-9.65 3.071-17.185 5.967-34.399 8.93-51.603zM393.593 168.95c30.766-2.865 45.545-32.057 46.734-59.924 1.328-31.094-25.367-53.626-55.99-47.372-28.48 5.816-49.082 28.399-53.961 56.722-3.256 18.91-6.514 37.822-9.771 56.734-1.645 9.553-3.291 19.105-4.936 28.66-.621 3.605-1.924 7.672-1.826 11.375.254 9.609 11.66 10.549 17.293 4.621 2.488-2.619 3.143-5.729 3.729-9.133 1.305-7.566 2.607-15.133 3.91-22.699 3.584-20.809 7.168-41.615 10.752-62.422 1.949-11.32 3.715-22.363 12.166-31.002 9.881-10.1 23.283-15.551 37.359-12.459 12.045 2.645 20.836 14.59 20.512 26.787-.354 13.371-5.666 25.754-16.922 33.488-12.641 8.688-25.824 5.215-40.141 6.434-7.516.641-16.012 9.332-10.553 16.947 4.607 6.426 16.789 3.434 23.125 3.414 6.172-.019 12.352.01 18.52-.171zm-63.676-87.274c7.82-.061 15.951-9.965 10.385-17.174-2.529-3.277-6.318-3.206-10.061-3.206h-29.053c-27.297 0-49.301 20.315-53.854 46.753-5.98 34.717-11.961 69.432-17.941 104.148-1.342 7.791 4.963 13.641 12.664 10.348 11.424-4.887 8.303-21.719 11.846-31.395 5.256-14.346 18.879-21.822 33.543-21.822 9.617 0 27.986 3.994 32.105-8.535 4.33-13.166-11.857-11.842-19.568-11.842-14.977 0-29.609-2.371-33.84-19.279-3.629-14.502 4.752-30.221 15.598-39.236 13.658-11.353 31.719-8.76 48.176-8.76zM223.011 169.42c7.531-.074 15.965-9.914 12.275-17.529-2.416-4.986-10.615-1.5-10.895-8.494-.123-3.049.943-6.389 1.455-9.359 1.434-8.332 2.869-16.666 4.305-24.998 3.764-21.848 7.527-43.697 11.291-65.547 1.277-7.417 2.557-14.835 3.834-22.252.496-2.882 1.451-6.093.611-8.987-2.68-9.232-14.813-6.255-18.682.29-1.508 2.551-1.762 5.521-2.256 8.386l-3.633 21.093c-3.758 21.82-7.518 43.639-11.275 65.459l-7.494 43.512c-.75 4.354-.652 8.713 1.945 12.492 4.407 6.413 11.611 5.934 18.519 5.934zM159.86 60.951c-30.959 1.482-57.645 23.534-63.635 54.284-2.814 14.449-.766 28.943 9.041 40.377 8.916 10.396 22.115 13.908 35.314 13.908h30.484c4.6 0 9.611.699 13.689-1.896 6.549-4.168 8.99-16.283-.615-18.416-6.279-1.395-13.793-.236-20.158-.236-7.484 0-15.25.609-22.717-.16-12.773-1.316-22.992-10.639-24.816-23.441-1.932-13.553 5.291-27.973 16.338-35.781 13.383-9.463 27.563-8.152 43.232-8.152 11.879 0 15.641 12.688 8.234 21.088-3.357 3.807-7.9 5.643-12.91 5.643h-29.236c-8.246 0-19.754 1.373-18.961 12.654.836 11.859 20.908 7.754 27.994 7.754 14.828.002 28.904 1.209 41.461-8.152 10.637-7.93 18.834-22.164 16.42-35.813-1.52-8.586-6.314-16.804-14.545-20.551-10.662-4.855-23.258-3.11-34.614-3.11zM25.188 40.848c.502 13.162 20.088 10.928 20.42-1.496.364-13.623-20.443-11.638-20.42 1.496zm5.286 47.736c4.324-14.369 21.084-13.15 33.098-14.393 9.578-.992 31.275 1.332 33.578-12.085 2.074-12.085-11.219-10.632-18.76-10.036-14.357 1.133-32.746-.213-46.074 6.397C7.817 70.621-.81 108.561 23.532 125.77c11.775 8.326 27.225 3.498 38.559 11.768 4.898 3.574 8.566 9.213 9.506 15.238 1.096 7.031-1.41 14-.779 20.971.805 8.871 11.656 12.313 17.645 5.666 3.725-4.133 3.117-10.76 3.525-15.891.611-7.66 1.801-15.439.848-23.105-1.59-12.77-12.125-24.588-24.615-27.66-11.641-2.863-30.977 1.258-37.107-11.959-1.855-3.993-1.607-7.997-.64-12.214zm-25.34 79.872c1.725 12.045 19.258 6.504 26.563 5.697 7.986-.879 16.191-1.291 24.111-2.656 5.229-.898 9.355-3.742 10.617-9.135 2.779-11.889-9.791-11.154-17.355-10.32-10.102 1.111-20.201 2.225-30.303 3.338-4.371.48-8.645 1.271-11.398 5.092-1.62 2.249-2.448 5.228-2.235 7.984z"/>
        </g>
    </svg>

    if (props.isSidedrawer) {
        logo = 
        <svg className={classes.SideDrawerLogo} viewBox="0 0 840 230" xmlns="http://www.w3.org/2000/svg">
            <path d="M835.983 72.502c-4.229 12.314-21.461 8.533-31.178 8.533-11.953 0-24.066 6.602-30.471 16.768-7.92 12.57-8.303 29.656-10.754 43.9-1.529 8.877-.924 24.816-12.074 27.893-9.83 2.713-12.051-6.148-10.764-13.615 3.111-18.055 6.221-36.111 9.332-54.166 2.223-12.902 9.625-23.969 20.039-31.748 11.543-8.622 24.125-9.407 37.949-9.407 7.546 0 33.216-4.116 27.921 11.842zM699.302 60.951c-30.951 1.482-57.654 23.534-63.635 54.284-2.809 14.445-.77 28.947 9.039 40.377 8.922 10.395 22.113 13.908 35.316 13.908h30.484c4.605 0 9.607.697 13.689-1.896 6.559-4.164 8.982-16.285-.617-18.416-6.279-1.395-13.793-.236-20.156-.236-7.484 0-15.248.609-22.715-.16-12.77-1.314-23.002-10.637-24.818-23.441-1.924-13.559 5.289-27.969 16.34-35.781 13.383-9.463 27.561-8.152 43.23-8.152 11.904 0 15.605 12.676 8.234 21.088-3.34 3.814-7.914 5.643-12.912 5.643h-29.236c-8.211 0-19.799 1.377-18.959 12.654.885 11.859 20.857 7.754 27.994 7.754 14.814.002 28.92 1.217 41.461-8.152 10.629-7.941 18.836-22.156 16.422-35.813-1.52-8.588-6.32-16.802-14.549-20.551-10.659-4.857-23.259-3.11-34.612-3.11zm-59.533 98.114c2.352-13.578-17.074-10.273-24.494-10.273-12.953 0-25.791-1.328-32.842-13.855-6.955-12.357-2.928-27.193 5.1-37.904 8.303-11.076 21.334-15.998 34.764-15.998 9.629 0 28.029 4.004 32.158-8.535 3.859-11.719-8.803-11.843-16.416-11.843-15.566 0-32.223-1.969-46.723 4.919-13.248 6.293-24.115 18.102-28.783 32.059-2.074 6.205-2.801 12.902-3.906 19.32-1.119 6.49-2.35 12.795-1.867 19.41.879 11.994 7.986 23.084 18.678 28.662 12.377 6.459 27.977 4.313 41.393 4.313 9.172-.002 20.397 1.178 22.938-10.275zm-87.657-44.231c1.881-15.15-.891-28.666-11.014-40.432-9.643-11.207-24.973-14.437-39.029-13.76-30.865 1.485-54.451 28.994-59.389 57.719-2.449 14.248-4.697 30.014 7.152 41.102 12.08 11.303 26.918 9.852 42.299 9.852 9.059 0 23.652 1.996 25.238-10.689 1.693-13.541-18.926-9.688-26.262-9.688-14.201 0-26.955-7.475-28.402-22.799-1.33-14.08 5.842-27.715 16.41-36.502 21.52-17.896 57.967-5.875 52.611 25.223-2.635 15.307-5.271 30.615-7.906 45.922-1.092 6.336-1.846 14.867 7.051 15.305 5.547.271 11.32-4.113 12.311-9.65 3.071-17.185 5.967-34.399 8.93-51.603zM393.593 168.95c30.766-2.865 45.545-32.057 46.734-59.924 1.328-31.094-25.367-53.626-55.99-47.372-28.48 5.816-49.082 28.399-53.961 56.722-3.256 18.91-6.514 37.822-9.771 56.734-1.645 9.553-3.291 19.105-4.936 28.66-.621 3.605-1.924 7.672-1.826 11.375.254 9.609 11.66 10.549 17.293 4.621 2.488-2.619 3.143-5.729 3.729-9.133 1.305-7.566 2.607-15.133 3.91-22.699 3.584-20.809 7.168-41.615 10.752-62.422 1.949-11.32 3.715-22.363 12.166-31.002 9.881-10.1 23.283-15.551 37.359-12.459 12.045 2.645 20.836 14.59 20.512 26.787-.354 13.371-5.666 25.754-16.922 33.488-12.641 8.688-25.824 5.215-40.141 6.434-7.516.641-16.012 9.332-10.553 16.947 4.607 6.426 16.789 3.434 23.125 3.414 6.172-.019 12.352.01 18.52-.171zm-63.676-87.274c7.82-.061 15.951-9.965 10.385-17.174-2.529-3.277-6.318-3.206-10.061-3.206h-29.053c-27.297 0-49.301 20.315-53.854 46.753-5.98 34.717-11.961 69.432-17.941 104.148-1.342 7.791 4.963 13.641 12.664 10.348 11.424-4.887 8.303-21.719 11.846-31.395 5.256-14.346 18.879-21.822 33.543-21.822 9.617 0 27.986 3.994 32.105-8.535 4.33-13.166-11.857-11.842-19.568-11.842-14.977 0-29.609-2.371-33.84-19.279-3.629-14.502 4.752-30.221 15.598-39.236 13.658-11.353 31.719-8.76 48.176-8.76zM223.011 169.42c7.531-.074 15.965-9.914 12.275-17.529-2.416-4.986-10.615-1.5-10.895-8.494-.123-3.049.943-6.389 1.455-9.359 1.434-8.332 2.869-16.666 4.305-24.998 3.764-21.848 7.527-43.697 11.291-65.547 1.277-7.417 2.557-14.835 3.834-22.252.496-2.882 1.451-6.093.611-8.987-2.68-9.232-14.813-6.255-18.682.29-1.508 2.551-1.762 5.521-2.256 8.386l-3.633 21.093c-3.758 21.82-7.518 43.639-11.275 65.459l-7.494 43.512c-.75 4.354-.652 8.713 1.945 12.492 4.407 6.413 11.611 5.934 18.519 5.934zM159.86 60.951c-30.959 1.482-57.645 23.534-63.635 54.284-2.814 14.449-.766 28.943 9.041 40.377 8.916 10.396 22.115 13.908 35.314 13.908h30.484c4.6 0 9.611.699 13.689-1.896 6.549-4.168 8.99-16.283-.615-18.416-6.279-1.395-13.793-.236-20.158-.236-7.484 0-15.25.609-22.717-.16-12.773-1.316-22.992-10.639-24.816-23.441-1.932-13.553 5.291-27.973 16.338-35.781 13.383-9.463 27.563-8.152 43.232-8.152 11.879 0 15.641 12.688 8.234 21.088-3.357 3.807-7.9 5.643-12.91 5.643h-29.236c-8.246 0-19.754 1.373-18.961 12.654.836 11.859 20.908 7.754 27.994 7.754 14.828.002 28.904 1.209 41.461-8.152 10.637-7.93 18.834-22.164 16.42-35.813-1.52-8.586-6.314-16.804-14.545-20.551-10.662-4.855-23.258-3.11-34.614-3.11zM25.188 40.848c.502 13.162 20.088 10.928 20.42-1.496.364-13.623-20.443-11.638-20.42 1.496zm78.02 20.679c.49 13.163 20.088 10.931 20.42-1.496.363-13.619-20.44-11.637-20.42 1.496zM30.474 88.584c4.324-14.369 21.084-13.15 33.098-14.393 9.578-.992 31.275 1.332 33.578-12.085 2.074-12.085-11.219-10.632-18.76-10.036-14.357 1.133-32.746-.213-46.074 6.397C7.817 70.621-.81 108.561 23.532 125.77c11.775 8.326 27.225 3.498 38.559 11.768 4.898 3.574 8.566 9.213 9.506 15.238 1.096 7.031-1.41 14-.779 20.971.805 8.871 11.656 12.313 17.645 5.666 3.725-4.133 3.117-10.76 3.525-15.891.611-7.66 1.801-15.439.848-23.105-1.59-12.77-12.125-24.588-24.615-27.66-11.641-2.863-30.977 1.258-37.107-11.959-1.855-3.993-1.607-7.997-.64-12.214zm-25.34 79.872c1.725 12.045 19.258 6.504 26.563 5.697 7.986-.879 16.191-1.291 24.111-2.656 5.229-.898 9.355-3.742 10.617-9.135 2.779-11.889-9.791-11.154-17.355-10.32-10.102 1.111-20.201 2.225-30.303 3.338-4.371.48-8.645 1.271-11.398 5.092-1.62 2.249-2.448 5.228-2.235 7.984z"/>
        </svg>
    }

    if (props.isAuth) {
        logo = 
        <svg className={classes.AuthLogo} viewBox="0 0 840 230" xmlns="http://www.w3.org/2000/svg">
            <path d="M835.983 72.502c-4.229 12.314-21.461 8.533-31.178 8.533-11.953 0-24.066 6.602-30.471 16.768-7.92 12.57-8.303 29.656-10.754 43.9-1.529 8.877-.924 24.816-12.074 27.893-9.83 2.713-12.051-6.148-10.764-13.615 3.111-18.055 6.221-36.111 9.332-54.166 2.223-12.902 9.625-23.969 20.039-31.748 11.543-8.622 24.125-9.407 37.949-9.407 7.546 0 33.216-4.116 27.921 11.842zM699.302 60.951c-30.951 1.482-57.654 23.534-63.635 54.284-2.809 14.445-.77 28.947 9.039 40.377 8.922 10.395 22.113 13.908 35.316 13.908h30.484c4.605 0 9.607.697 13.689-1.896 6.559-4.164 8.982-16.285-.617-18.416-6.279-1.395-13.793-.236-20.156-.236-7.484 0-15.248.609-22.715-.16-12.77-1.314-23.002-10.637-24.818-23.441-1.924-13.559 5.289-27.969 16.34-35.781 13.383-9.463 27.561-8.152 43.23-8.152 11.904 0 15.605 12.676 8.234 21.088-3.34 3.814-7.914 5.643-12.912 5.643h-29.236c-8.211 0-19.799 1.377-18.959 12.654.885 11.859 20.857 7.754 27.994 7.754 14.814.002 28.92 1.217 41.461-8.152 10.629-7.941 18.836-22.156 16.422-35.813-1.52-8.588-6.32-16.802-14.549-20.551-10.659-4.857-23.259-3.11-34.612-3.11zm-59.533 98.114c2.352-13.578-17.074-10.273-24.494-10.273-12.953 0-25.791-1.328-32.842-13.855-6.955-12.357-2.928-27.193 5.1-37.904 8.303-11.076 21.334-15.998 34.764-15.998 9.629 0 28.029 4.004 32.158-8.535 3.859-11.719-8.803-11.843-16.416-11.843-15.566 0-32.223-1.969-46.723 4.919-13.248 6.293-24.115 18.102-28.783 32.059-2.074 6.205-2.801 12.902-3.906 19.32-1.119 6.49-2.35 12.795-1.867 19.41.879 11.994 7.986 23.084 18.678 28.662 12.377 6.459 27.977 4.313 41.393 4.313 9.172-.002 20.397 1.178 22.938-10.275zm-87.657-44.231c1.881-15.15-.891-28.666-11.014-40.432-9.643-11.207-24.973-14.437-39.029-13.76-30.865 1.485-54.451 28.994-59.389 57.719-2.449 14.248-4.697 30.014 7.152 41.102 12.08 11.303 26.918 9.852 42.299 9.852 9.059 0 23.652 1.996 25.238-10.689 1.693-13.541-18.926-9.688-26.262-9.688-14.201 0-26.955-7.475-28.402-22.799-1.33-14.08 5.842-27.715 16.41-36.502 21.52-17.896 57.967-5.875 52.611 25.223-2.635 15.307-5.271 30.615-7.906 45.922-1.092 6.336-1.846 14.867 7.051 15.305 5.547.271 11.32-4.113 12.311-9.65 3.071-17.185 5.967-34.399 8.93-51.603zM393.593 168.95c30.766-2.865 45.545-32.057 46.734-59.924 1.328-31.094-25.367-53.626-55.99-47.372-28.48 5.816-49.082 28.399-53.961 56.722-3.256 18.91-6.514 37.822-9.771 56.734-1.645 9.553-3.291 19.105-4.936 28.66-.621 3.605-1.924 7.672-1.826 11.375.254 9.609 11.66 10.549 17.293 4.621 2.488-2.619 3.143-5.729 3.729-9.133 1.305-7.566 2.607-15.133 3.91-22.699 3.584-20.809 7.168-41.615 10.752-62.422 1.949-11.32 3.715-22.363 12.166-31.002 9.881-10.1 23.283-15.551 37.359-12.459 12.045 2.645 20.836 14.59 20.512 26.787-.354 13.371-5.666 25.754-16.922 33.488-12.641 8.688-25.824 5.215-40.141 6.434-7.516.641-16.012 9.332-10.553 16.947 4.607 6.426 16.789 3.434 23.125 3.414 6.172-.019 12.352.01 18.52-.171zm-63.676-87.274c7.82-.061 15.951-9.965 10.385-17.174-2.529-3.277-6.318-3.206-10.061-3.206h-29.053c-27.297 0-49.301 20.315-53.854 46.753-5.98 34.717-11.961 69.432-17.941 104.148-1.342 7.791 4.963 13.641 12.664 10.348 11.424-4.887 8.303-21.719 11.846-31.395 5.256-14.346 18.879-21.822 33.543-21.822 9.617 0 27.986 3.994 32.105-8.535 4.33-13.166-11.857-11.842-19.568-11.842-14.977 0-29.609-2.371-33.84-19.279-3.629-14.502 4.752-30.221 15.598-39.236 13.658-11.353 31.719-8.76 48.176-8.76zM223.011 169.42c7.531-.074 15.965-9.914 12.275-17.529-2.416-4.986-10.615-1.5-10.895-8.494-.123-3.049.943-6.389 1.455-9.359 1.434-8.332 2.869-16.666 4.305-24.998 3.764-21.848 7.527-43.697 11.291-65.547 1.277-7.417 2.557-14.835 3.834-22.252.496-2.882 1.451-6.093.611-8.987-2.68-9.232-14.813-6.255-18.682.29-1.508 2.551-1.762 5.521-2.256 8.386l-3.633 21.093c-3.758 21.82-7.518 43.639-11.275 65.459l-7.494 43.512c-.75 4.354-.652 8.713 1.945 12.492 4.407 6.413 11.611 5.934 18.519 5.934zM159.86 60.951c-30.959 1.482-57.645 23.534-63.635 54.284-2.814 14.449-.766 28.943 9.041 40.377 8.916 10.396 22.115 13.908 35.314 13.908h30.484c4.6 0 9.611.699 13.689-1.896 6.549-4.168 8.99-16.283-.615-18.416-6.279-1.395-13.793-.236-20.158-.236-7.484 0-15.25.609-22.717-.16-12.773-1.316-22.992-10.639-24.816-23.441-1.932-13.553 5.291-27.973 16.338-35.781 13.383-9.463 27.563-8.152 43.232-8.152 11.879 0 15.641 12.688 8.234 21.088-3.357 3.807-7.9 5.643-12.91 5.643h-29.236c-8.246 0-19.754 1.373-18.961 12.654.836 11.859 20.908 7.754 27.994 7.754 14.828.002 28.904 1.209 41.461-8.152 10.637-7.93 18.834-22.164 16.42-35.813-1.52-8.586-6.314-16.804-14.545-20.551-10.662-4.855-23.258-3.11-34.614-3.11zM25.188 40.848c.502 13.162 20.088 10.928 20.42-1.496.364-13.623-20.443-11.638-20.42 1.496zm78.02 20.679c.49 13.163 20.088 10.931 20.42-1.496.363-13.619-20.44-11.637-20.42 1.496zM30.474 88.584c4.324-14.369 21.084-13.15 33.098-14.393 9.578-.992 31.275 1.332 33.578-12.085 2.074-12.085-11.219-10.632-18.76-10.036-14.357 1.133-32.746-.213-46.074 6.397C7.817 70.621-.81 108.561 23.532 125.77c11.775 8.326 27.225 3.498 38.559 11.768 4.898 3.574 8.566 9.213 9.506 15.238 1.096 7.031-1.41 14-.779 20.971.805 8.871 11.656 12.313 17.645 5.666 3.725-4.133 3.117-10.76 3.525-15.891.611-7.66 1.801-15.439.848-23.105-1.59-12.77-12.125-24.588-24.615-27.66-11.641-2.863-30.977 1.258-37.107-11.959-1.855-3.993-1.607-7.997-.64-12.214zm-25.34 79.872c1.725 12.045 19.258 6.504 26.563 5.697 7.986-.879 16.191-1.291 24.111-2.656 5.229-.898 9.355-3.742 10.617-9.135 2.779-11.889-9.791-11.154-17.355-10.32-10.102 1.111-20.201 2.225-30.303 3.338-4.371.48-8.645 1.271-11.398 5.092-1.62 2.249-2.448 5.228-2.235 7.984z"/>
        </svg>
    }

    if (props.isBlog) {
        logo = 
        <svg className={classes.BlogLogo} viewBox="0 0 840 230" xmlns="http://www.w3.org/2000/svg">
            <path d="M835.983 72.502c-4.229 12.314-21.461 8.533-31.178 8.533-11.953 0-24.066 6.602-30.471 16.768-7.92 12.57-8.303 29.656-10.754 43.9-1.529 8.877-.924 24.816-12.074 27.893-9.83 2.713-12.051-6.148-10.764-13.615 3.111-18.055 6.221-36.111 9.332-54.166 2.223-12.902 9.625-23.969 20.039-31.748 11.543-8.622 24.125-9.407 37.949-9.407 7.546 0 33.216-4.116 27.921 11.842zM699.302 60.951c-30.951 1.482-57.654 23.534-63.635 54.284-2.809 14.445-.77 28.947 9.039 40.377 8.922 10.395 22.113 13.908 35.316 13.908h30.484c4.605 0 9.607.697 13.689-1.896 6.559-4.164 8.982-16.285-.617-18.416-6.279-1.395-13.793-.236-20.156-.236-7.484 0-15.248.609-22.715-.16-12.77-1.314-23.002-10.637-24.818-23.441-1.924-13.559 5.289-27.969 16.34-35.781 13.383-9.463 27.561-8.152 43.23-8.152 11.904 0 15.605 12.676 8.234 21.088-3.34 3.814-7.914 5.643-12.912 5.643h-29.236c-8.211 0-19.799 1.377-18.959 12.654.885 11.859 20.857 7.754 27.994 7.754 14.814.002 28.92 1.217 41.461-8.152 10.629-7.941 18.836-22.156 16.422-35.813-1.52-8.588-6.32-16.802-14.549-20.551-10.659-4.857-23.259-3.11-34.612-3.11zm-59.533 98.114c2.352-13.578-17.074-10.273-24.494-10.273-12.953 0-25.791-1.328-32.842-13.855-6.955-12.357-2.928-27.193 5.1-37.904 8.303-11.076 21.334-15.998 34.764-15.998 9.629 0 28.029 4.004 32.158-8.535 3.859-11.719-8.803-11.843-16.416-11.843-15.566 0-32.223-1.969-46.723 4.919-13.248 6.293-24.115 18.102-28.783 32.059-2.074 6.205-2.801 12.902-3.906 19.32-1.119 6.49-2.35 12.795-1.867 19.41.879 11.994 7.986 23.084 18.678 28.662 12.377 6.459 27.977 4.313 41.393 4.313 9.172-.002 20.397 1.178 22.938-10.275zm-87.657-44.231c1.881-15.15-.891-28.666-11.014-40.432-9.643-11.207-24.973-14.437-39.029-13.76-30.865 1.485-54.451 28.994-59.389 57.719-2.449 14.248-4.697 30.014 7.152 41.102 12.08 11.303 26.918 9.852 42.299 9.852 9.059 0 23.652 1.996 25.238-10.689 1.693-13.541-18.926-9.688-26.262-9.688-14.201 0-26.955-7.475-28.402-22.799-1.33-14.08 5.842-27.715 16.41-36.502 21.52-17.896 57.967-5.875 52.611 25.223-2.635 15.307-5.271 30.615-7.906 45.922-1.092 6.336-1.846 14.867 7.051 15.305 5.547.271 11.32-4.113 12.311-9.65 3.071-17.185 5.967-34.399 8.93-51.603zM393.593 168.95c30.766-2.865 45.545-32.057 46.734-59.924 1.328-31.094-25.367-53.626-55.99-47.372-28.48 5.816-49.082 28.399-53.961 56.722-3.256 18.91-6.514 37.822-9.771 56.734-1.645 9.553-3.291 19.105-4.936 28.66-.621 3.605-1.924 7.672-1.826 11.375.254 9.609 11.66 10.549 17.293 4.621 2.488-2.619 3.143-5.729 3.729-9.133 1.305-7.566 2.607-15.133 3.91-22.699 3.584-20.809 7.168-41.615 10.752-62.422 1.949-11.32 3.715-22.363 12.166-31.002 9.881-10.1 23.283-15.551 37.359-12.459 12.045 2.645 20.836 14.59 20.512 26.787-.354 13.371-5.666 25.754-16.922 33.488-12.641 8.688-25.824 5.215-40.141 6.434-7.516.641-16.012 9.332-10.553 16.947 4.607 6.426 16.789 3.434 23.125 3.414 6.172-.019 12.352.01 18.52-.171zm-63.676-87.274c7.82-.061 15.951-9.965 10.385-17.174-2.529-3.277-6.318-3.206-10.061-3.206h-29.053c-27.297 0-49.301 20.315-53.854 46.753-5.98 34.717-11.961 69.432-17.941 104.148-1.342 7.791 4.963 13.641 12.664 10.348 11.424-4.887 8.303-21.719 11.846-31.395 5.256-14.346 18.879-21.822 33.543-21.822 9.617 0 27.986 3.994 32.105-8.535 4.33-13.166-11.857-11.842-19.568-11.842-14.977 0-29.609-2.371-33.84-19.279-3.629-14.502 4.752-30.221 15.598-39.236 13.658-11.353 31.719-8.76 48.176-8.76zM223.011 169.42c7.531-.074 15.965-9.914 12.275-17.529-2.416-4.986-10.615-1.5-10.895-8.494-.123-3.049.943-6.389 1.455-9.359 1.434-8.332 2.869-16.666 4.305-24.998 3.764-21.848 7.527-43.697 11.291-65.547 1.277-7.417 2.557-14.835 3.834-22.252.496-2.882 1.451-6.093.611-8.987-2.68-9.232-14.813-6.255-18.682.29-1.508 2.551-1.762 5.521-2.256 8.386l-3.633 21.093c-3.758 21.82-7.518 43.639-11.275 65.459l-7.494 43.512c-.75 4.354-.652 8.713 1.945 12.492 4.407 6.413 11.611 5.934 18.519 5.934zM159.86 60.951c-30.959 1.482-57.645 23.534-63.635 54.284-2.814 14.449-.766 28.943 9.041 40.377 8.916 10.396 22.115 13.908 35.314 13.908h30.484c4.6 0 9.611.699 13.689-1.896 6.549-4.168 8.99-16.283-.615-18.416-6.279-1.395-13.793-.236-20.158-.236-7.484 0-15.25.609-22.717-.16-12.773-1.316-22.992-10.639-24.816-23.441-1.932-13.553 5.291-27.973 16.338-35.781 13.383-9.463 27.563-8.152 43.232-8.152 11.879 0 15.641 12.688 8.234 21.088-3.357 3.807-7.9 5.643-12.91 5.643h-29.236c-8.246 0-19.754 1.373-18.961 12.654.836 11.859 20.908 7.754 27.994 7.754 14.828.002 28.904 1.209 41.461-8.152 10.637-7.93 18.834-22.164 16.42-35.813-1.52-8.586-6.314-16.804-14.545-20.551-10.662-4.855-23.258-3.11-34.614-3.11zM25.188 40.848c.502 13.162 20.088 10.928 20.42-1.496.364-13.623-20.443-11.638-20.42 1.496zm78.02 20.679c.49 13.163 20.088 10.931 20.42-1.496.363-13.619-20.44-11.637-20.42 1.496zM30.474 88.584c4.324-14.369 21.084-13.15 33.098-14.393 9.578-.992 31.275 1.332 33.578-12.085 2.074-12.085-11.219-10.632-18.76-10.036-14.357 1.133-32.746-.213-46.074 6.397C7.817 70.621-.81 108.561 23.532 125.77c11.775 8.326 27.225 3.498 38.559 11.768 4.898 3.574 8.566 9.213 9.506 15.238 1.096 7.031-1.41 14-.779 20.971.805 8.871 11.656 12.313 17.645 5.666 3.725-4.133 3.117-10.76 3.525-15.891.611-7.66 1.801-15.439.848-23.105-1.59-12.77-12.125-24.588-24.615-27.66-11.641-2.863-30.977 1.258-37.107-11.959-1.855-3.993-1.607-7.997-.64-12.214zm-25.34 79.872c1.725 12.045 19.258 6.504 26.563 5.697 7.986-.879 16.191-1.291 24.111-2.656 5.229-.898 9.355-3.742 10.617-9.135 2.779-11.889-9.791-11.154-17.355-10.32-10.102 1.111-20.201 2.225-30.303 3.338-4.371.48-8.645 1.271-11.398 5.092-1.62 2.249-2.448 5.228-2.235 7.984z"/>
        </svg>
    }

    return (logo);
}

export default Logo;