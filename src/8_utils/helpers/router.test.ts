import { Block } from "./block";
import { Router } from "./router";
import { expect } from "chai";

class Test extends Block {
  constructor() {
    super("div", {});
  }

  override render() {
    return this.compile("component test for route", this.props);
  }
}

describe("Router", () => {
  it("equal component for pathname", () => {
    const router = new Router();
    const test1 = new Test();
    const test2 = new Test();

    window.location.pathname = "/test-1";
    router.use("/test-1", test1).use("/test-2", test2).start();
    const resultTest1 = router.getRoute("/test-1")?._block;

    expect(resultTest1).to.equal(test1);
  });

  it("go to page", () => {
    const router = new Router();
    const test1 = new Test();
    const test2 = new Test();

    window.location.pathname = "/test-2";
    router.use("/test-1", test1).use("/test-2", test2).start();

    router.go("/test-2");
    expect(window.history.length).to.equal(2);
  });
});
