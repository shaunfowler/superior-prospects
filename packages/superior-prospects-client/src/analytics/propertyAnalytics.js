import ReactGA from "react-ga4";

export const trackSaveProperty = safeName => {
  ReactGA.event({
    category: "Property (CM)",
    action: "Save property button click",
    label: safeName
  });
};

export const trackEditButtonClick = safeName => {
  ReactGA.event({
    category: "Property (CM)",
    action: "Edit property button click (toggle edit mode)",
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
    action: "Delete property",
    label: safeName
  });
};

export const trackOpenDeletePropertyModal = safeName => {
  ReactGA.modalview(`/property-edit/${safeName}`);
  ReactGA.event({
    category: "Property (CM)",
    action: "Delete property button click (modal open)",
    label: safeName
  });
};
