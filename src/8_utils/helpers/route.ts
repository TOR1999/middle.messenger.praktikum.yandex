import { Block } from "./block";
import { renderDOM } from "./renderDOM";

export class Route {
  _pathname: string = "";
  _blockClass: Block;
  _block: Block | null = null;
  getIsPageAvaible: () => boolean;

  constructor(pathname: string, view: Block, getIsPageAvaible?: () => boolean) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this.getIsPageAvaible = getIsPageAvaible ?? (() => true);
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    const newBlock = this._blockClass;
    this._block = newBlock;

    renderDOM(this._block);
    this._block.show();
  }
}
