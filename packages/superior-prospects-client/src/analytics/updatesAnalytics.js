import ReactGA from "react-ga4";

export const trackOpenCreateUpdateModal = () => {
  ReactGA.modalview("/updates-create");
  ReactGA.event({
    category: "Updates",
    action: "Add update button click (modal open)"
  });
};

export const trackPerformCreateUpdate = () => {
  ReactGA.event({
    category: "Updates",
    action: "Create update"
  });
};

export const trackPerformDeleteUpdate = () => {
  ReactGA.event({
    category: "Updates",
    action: "Delete update"
  });
};
