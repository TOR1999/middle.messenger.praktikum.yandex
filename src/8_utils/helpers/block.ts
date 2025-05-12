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

  get element() {
    return this._element;
  }

  // compile(template: string, props: { [key: string]: any }): string {
  //   const propsAndStubs = { ...props };

  //   Object.entries(this.children).forEach(([key, child]) => {
  //     propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
  //   });

  //   const fragment = this._createDocumentElement("template");
  //   console.log("1fragment:", fragment);

  //   fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
  //   console.log("2fragment:", fragment);

  //   Object.values(this.children).forEach((child) => {
  //     const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

  //     stub.replaceWith(child.getContent());
  //   });

  //   return fragment.content;

  //   // return Handlebars.compile(template)(propsAndStubs);
  // }

  _addEvents() {
    if (this._meta?.props?.onClick) {
      this._element?.addEventListener(
        "click",
        this._meta.props.onClick as EventListenerOrEventListenerObject,
      );
    }

    if (this._meta?.props?.onBlur) {
      console.log("on blur", this._element);
      this._element?.addEventListener(
        "blur",
        this._meta.props.onBlur as EventListenerOrEventListenerObject,
      );
    }
  }

  _removeEvents() {
    if (this._meta?.props?.onClick) {
      this._element?.removeEventListener(
        "click",
        this._meta.props.onClick as EventListenerOrEventListenerObject,
      );
    }

    if (this._meta?.props?.onBlur) {
      this._element?.removeEventListener(
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

    // const tempDiv = document.createElement("div");
    // tempDiv.appendChild(fragment.content);
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

    // console.log("block:", block);
    // console.log("this._element", this._element);
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    // if (this._element === null) return;
    // // this._element.innerHTML = String(block);
    // // this._element.innerHTML = Handlebars.compile(block)(this.props);
    // this._element.innerHTML = this.compile(String(block), this.props);
  }

  render() {
    return this.compile("", {});
  }

  getContent() {
    return this.element;
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
