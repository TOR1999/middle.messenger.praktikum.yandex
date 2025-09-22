export const getMessageFromResponse = (errText: string) => {
  try {
    return Object.values(JSON.parse(errText))[0];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return "";
  }
};
