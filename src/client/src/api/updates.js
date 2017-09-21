import axios from 'axios';

const get = () => {
    return axios('http://localhost:4000/api/updates');
};

export { get };
