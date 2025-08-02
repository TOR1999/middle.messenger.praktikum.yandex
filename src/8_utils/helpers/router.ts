import { URL_NAMES } from "../constants/type";
import { Block } from "./block";
import { Route } from "./route";

type PopStateEventTarget = EventTarget & { location: Location };

class Router {
  routes: Array<Route> = [];
  history: History = window.history;
  _currentRoute: Route | null = null;
  static __instance: Router | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  use(pathname: string, block: Block): Router {
    const route = new Route(pathname, block);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as PopStateEventTarget;
      this._onRoute(target?.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go(URL_NAMES.NOT_FOUND);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router();
