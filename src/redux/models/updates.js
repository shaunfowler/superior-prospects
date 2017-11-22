import axios from "axios";
console.log("sdfs");
const getUpdates = () => axios.get("/api/updates");

const deleteUpdate = () => {
  return new Promise(resolve => resolve());
};

const addUpdate = update => {
  return new Promise(resolve => {
    const createdEntity = Object.assign({}, update);
    createdEntity._id = 9; // TODO - generate on server
    resolve({
      data: createdEntity
    });
  });
};

export { getUpdates, deleteUpdate, addUpdate };
