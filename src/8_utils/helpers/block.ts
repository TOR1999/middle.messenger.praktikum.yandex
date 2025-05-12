import { EVENTS, TBlockProps } from "../constants/type";
import { EventBus } from "./eventBus";
import Handlebars from "handlebars";
import { getUUID } from "./getUUID";

export class Block {
  static EVENTS = EVENTS;

  _id: string = "";
  _element: HTMLElement | null = null;
  _meta: {
    tagName: string;
    props: TBlockProps;
  } | null = null;
  children: { [key: string]: Block };
  props: TBlockProps;
  eventBus;

  constructor(tagName: string = "div", propsAndChildren: TBlockProps = {}) {
    this._id = getUUID();
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: { [key: string]: any }) {
    const children: { [key: string]: Block } = {};
    const props: { [key: string]: TBlockProps } = {};

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

  _createResources() {
    if (this._meta === null) return;
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount(this.props);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps: TBlockProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps) {
    return true;
  }

  setProps = (nextProps: TBlockProps) => {
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
      console.log("on blur", this._element);
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

  compile(template: string, props: { [key: string]: any }) {
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
    // this._element.innerHTML = block.innerHTML;
    // console.log("BLOCK", block.nodeValue);

    this._addEvents();
  }

  render() {
    return this.compile("", {});
  }

  getContent() {
    return this._element;
  }

  _makePropsProxy(props: TBlockProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
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

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    const element = this.getContent();
    if (element === null) return;
    element.style.display = "block";
  }

  hide() {
    const element = this.getContent();
    if (element === null) return;
    element.style.display = "none";
  }
}
