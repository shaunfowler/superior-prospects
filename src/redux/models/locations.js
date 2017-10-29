import { locations as mock } from "../mock";

const getLocations = () => {
  return new Promise(resolve => {
    resolve({
      data: mock
    });
  });
};

const deleteLocation = () => {
  return new Promise(resolve => resolve());
};

const addLocation = location => {
  return new Promise(resolve => {
    const createdEntity = Object.assign({}, location);
    createdEntity._id = 9; // TODO - generate on server
    resolve({
      data: createdEntity
    });
  });
};

export { getLocations, deleteLocation, addLocation };
