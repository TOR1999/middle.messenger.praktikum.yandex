import { EventBus } from "./eventBus";

export enum StoreEvents {
  UPDATE = "update",
}

export class Store<T> extends EventBus {
  state: T | null;

  constructor(initialData: T | null = null) {
    super();
    this.state = initialData;
  }

  getState() {
    return this.state;
  }

  setState(newData: Partial<T>, action?: string) {
    this.state = { ...this.state, ...newData } as T;
    this.emit(action ? action : StoreEvents.UPDATE);
  }
}
