import axios from "axios";

const getUpdates = () => axios.get("/api/updates");

const deleteUpdate = (id) => axios.delete(`/api/updates${id}`);

const addUpdate = update => axios.post('/api/updates', update);

export { getUpdates, deleteUpdate, addUpdate };
