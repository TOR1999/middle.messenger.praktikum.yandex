import { langs } from "./langs";

type Lang = string;
type Langs = { [key: string]: Lang | Langs };

const findLang = (path: string) =>
  path.split(".").reduce((acc: Langs | Lang, pathStep) => {
    if (
      typeof acc === "object" &&
      (typeof acc[pathStep] === "string" || typeof acc[pathStep] === "object")
    ) {
      return acc[pathStep];
    }
    return "Not found Langs";
  }, langs || ({} as Langs));

export const getLang = (path: string): string => {
  const lang = findLang(path);

  if (typeof lang !== "string") {
    return path;
  }

  return lang;
};
