const getUpdates = () => {
  return new Promise(resolve => {
    resolve({
      data: [
        { id: 1, date: new Date(), text: "abc" },
        { id: 2, date: new Date(), text: "def" },
        { id: 3, date: new Date(), text: "ghi" }
      ]
    });
  });
};

const deleteUpdate = () => {
  return new Promise(resolve => resolve());
};

const addUpdate = () => {
  return new Promise(resolve => resolve());
};

export { getUpdates, deleteUpdate, addUpdate };
