import { properties, media, propertyBodies } from "../mock";

const getProperties = () => {
  return new Promise(resolve => {
    resolve({
      data: properties
    });
  });
};

const getPropertyBody = id => {
  return Promise.resolve({ data: propertyBodies[id] });
};

const getPropertyMedia = propertyId => {
  return Promise.resolve({
    data: media.filter(m => m.propertyRefId === propertyId)
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

export {
  getProperties,
  getPropertyBody,
  getPropertyMedia,
  deleteProperty,
  addProperty
};
