import ReactGA from "react-ga";

export const trackOpenCreateLocationModal = () => {
  ReactGA.modalview("/location-create");
  ReactGA.event({
    category: "Properties - Location (CM)",
    action: "Create location button click (modal open)"
  });
};

export const trackCreateLocation = () => {
  ReactGA.event({
    category: "Properties - Location (CM)",
    action: "Create location"
  });
};

export const trackOpenEditLocationModal = safeName => {
  ReactGA.modalview(`/location-edit/${safeName}`);
  ReactGA.event({
    category: "Properties - Location (CM)",
    action: "Edit location button click (modal open)",
    label: safeName
  });
};

export const trackEditLocation = safeName => {
  ReactGA.event({
    category: "Properties - Location (CM)",
    action: "Edit location",
    label: safeName
  });
};

export const trackOpenCreatePropertyModal = () => {
  ReactGA.event({
    category: "Properties (CM)",
    action: "Create property button click (modal open)"
  });
};

export const trackCreateProperty = () => {
  ReactGA.event({
    category: "Properties (CM)",
    action: "Create property"
  });
};

export const trackTabIndexChange = index => {
  ReactGA.event({
    category: "Properties (CM)",
    action: "Location tab click",
    label: `Index ${index}`
  });
};
