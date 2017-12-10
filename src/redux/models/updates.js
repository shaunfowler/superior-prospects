import axios from "axios";

const getUpdates = () => axios.get("http://localhost:8888/api/updates");

const deleteUpdate = (id) => axios.delete(`http://localhost:8888/api/updates/${id}`);

const addUpdate = update => axios.post('http://localhost:8888/api/updates', update);

export { getUpdates, deleteUpdate, addUpdate };
