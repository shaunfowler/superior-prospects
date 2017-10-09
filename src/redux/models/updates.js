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

const addUpdate = update => {
  return new Promise(resolve =>
    resolve({
      data: {
        id: 9, // generate
        text: update.text,
        date: update.date
      }
    })
  );
};

export { getUpdates, deleteUpdate, addUpdate };
