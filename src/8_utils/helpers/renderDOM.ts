import { Block } from "./block";

export const renderDOM = (block: Block | null) => {
  const root = document.querySelector("#app");

  if (root) {
    root.innerHTML = "";
    const content: Node | null | undefined = block?.getContent();

    if (content) {
      root.appendChild(content);
    }
  }
};
