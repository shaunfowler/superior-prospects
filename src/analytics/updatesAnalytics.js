import ReactGA from "react-ga";

export const trackOpenCreateUpdateModal = () => {
  ReactGA.modalview("/updates-create");
  ReactGA.event({
    category: "Updates",
    action: "Add button click (modal open)"
  });
};

export const trackPerformCreateUpdate = () => {
  ReactGA.event({
    category: "Updates",
    action: "Create"
  });
};

export const trackPerformDeleteUpdate = () => {
  ReactGA.event({
    category: "Updates",
    action: "Delete"
  });
};
