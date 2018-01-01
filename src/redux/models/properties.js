import axios from "axios";

const getProperties = () => axios.get("/api/properties/visible");

const getProperty = id => axios.get(`/api/properties/${id}`);

const getPropertyMedia = id => axios.get(`/api/properties/${id}/media`);

const deleteProperty = id => axios.delete(`/api/properties/${id}`);

const addProperty = property => axios.post("/api/properties", property);

export {
  getProperties,
  getProperty,
  getPropertyMedia,
  deleteProperty,
  addProperty
};
