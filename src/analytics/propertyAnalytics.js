import ReactGA from "react-ga";

export const trackSaveProperty = safeName => {
  ReactGA.event({
    category: "Property (CM)",
    action: "Save button click",
    label: safeName
  });
};

export const trackEditButtonClick = safeName => {
  ReactGA.event({
    category: "Property (CM)",
    action: "Edit button click",
    label: safeName
  });
};

export const trackFileUpload = safeName => {
  ReactGA.event({
    category: "Media (CM)",
    action: "File upload request",
    label: safeName
  });
};

export const trackPropertyDelete = safeName => {
  ReactGA.event({
    category: "Property (CM)",
    action: "Delete",
    label: safeName
  });
};

export const trackOpenDeletePropertyModal = safeName => {
  ReactGA.modalview(`/property-edit/${safeName}`);
  ReactGA.event({
    category: "Property (CM)",
    action: "Delete button click (modal open)",
    label: safeName
  });
};
