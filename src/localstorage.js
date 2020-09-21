export const loadCounters = () => {
  try {
    const serializedCounters = localStorage.getItem("counters");
    if (serializedCounters === null) {
      return [];
    }
    return JSON.parse(serializedCounters);
  } catch (error) {
    return undefined;
  }
};

export const saveCounters = (state) => {
  try {
    const serializableCounters = JSON.stringify(state);
    localStorage.setItem("counters", serializableCounters);
  } catch (error) {}
};
