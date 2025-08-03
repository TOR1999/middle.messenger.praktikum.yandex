import { EVENTS, TBlockProps } from "../constants/type";
import { EventBus } from "./eventBus";
import Handlebars from "handlebars";
import { getUUID } from "./getUUID";

//используется any так как пропсы children не совпадают с проспсами текущего компонента
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Block<T = any> {
  static EVENTS = EVENTS;

  _id: string = "";
  _element: HTMLElement | null = null;
  _meta: {
    tagName: string;
    props: TBlockProps & T;
  } | null = null;
  children: { [key: string]: Block };
  props: TBlockProps & T;
  eventBus;

  constructor(tagName: string = "div", propsAndChildren: TBlockProps = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._id = getUUID();
    this.children = children;
    this._meta = {
      tagName,
      props: props as TBlockProps & T,
    };

    this.props = this._makePropsProxy(props) as TBlockProps & T;

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: TBlockProps) {
    const children: { [key: string]: Block } = {};
    const props: TBlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _createResources() {
    if (this._meta === null) return;
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: (TBlockProps & Partial<T>) | null) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _addEvents() {
    if (this._meta?.props?.onClick) {
      this._element?.children[0]?.addEventListener(
        "click",
        this._meta.props.onClick as EventListenerOrEventListenerObject,
      );
    }

    if (this._meta?.props?.onBlur) {
      this._element?.children[0]?.addEventListener(
        "blur",
        this._meta.props.onBlur as EventListenerOrEventListenerObject,
      );
    }
  }

  _removeEvents() {
    if (this._meta?.props?.onClick) {
      this._element?.children[0]?.removeEventListener(
        "click",
        this._meta.props.onClick as EventListenerOrEventListenerObject,
      );
    }

    if (this._meta?.props?.onBlur) {
      this._element?.children[0]?.removeEventListener(
        "blur",
        this._meta.props.onBlur as EventListenerOrEventListenerObject,
      );
    }
  }

  compile(template: string, props: { [key: string]: unknown }) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template",
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub) {
        const content: Node | null = child.getContent();
        if (content) {
          stub.replaceWith(content);
        }
      }
    });

    return fragment.content; // Извлечение HTML-содержимого
  }

  _render(): void {
    const block = this.render();

    this._removeEvents();
    if (!this._element) return;
    this._element.innerHTML = ""; // удаляем предыдущее содержимое

    this._element.appendChild(block);

    this.addAttribute();
    this._addEvents();
  }

  render() {
    return this.compile("", {});
  }

  addAttribute() {
    const { attr = {} } = this.props;

    Object.keys(attr).forEach((key) => {
      const value = attr[key];
      this._element?.setAttribute(key, value);
    });
  }

  getContent() {
    return this._element;
  }

  _makePropsProxy(props: TBlockProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[String(prop)];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[String(prop)] = value;
        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  show() {
    const element = this.getContent();
    if (element === null) return;
    element.style.display = "flex";
  }

  hide() {
    const element = this.getContent();
    if (element === null) return;
    element.style.display = "none";
  }
}
