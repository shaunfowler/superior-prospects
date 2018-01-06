import axios from "axios";

const getUser = () => axios.get("/api/user");

export { getUser };
