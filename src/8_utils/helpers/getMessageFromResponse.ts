export const getMessageFromResponse = (errText: string) => {
  try {
    if (Object.values(JSON.parse(errText)).length === 0) return "";
    return Object.values(JSON.parse(errText))[0];
  } catch {
    return "";
  }
};
