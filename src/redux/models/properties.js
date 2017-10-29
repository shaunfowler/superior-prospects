import { properties as mock } from "../mock";

console.log(mock);

const getProperties = () => {
  return new Promise(resolve => {
    resolve({
      data: mock
    });
  });
};

const deleteProperty = () => {
  return new Promise(resolve => resolve());
};

const addProperty = property => {
  return new Promise(resolve => {
    const createdEntity = Object.assign({}, property);
    createdEntity._id = 9;
    resolve({
      data: createdEntity
    });
  });
};

export { getProperties, deleteProperty, addProperty };
