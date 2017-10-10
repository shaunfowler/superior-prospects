import { updates as mock } from "../mock";

const getUpdates = () => {
  return new Promise(resolve => {
    resolve({
      data: mock
    });
  });
};

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
