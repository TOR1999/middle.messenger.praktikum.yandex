import { expect } from "chai";
import sinon from "sinon";
import { Block } from "./block";
import { EventBus } from "./eventBus";

class TestBlock extends Block {
  constructor() {
    super("div", {});
  }

  override render() {
    return this.compile("<div>Test</div>", this.props);
  }
}

describe("Block", () => {
  let block: TestBlock;
  let eventBus: sinon.SinonStubbedInstance<EventBus>;

  beforeEach(() => {
    block = new TestBlock();

    eventBus = sinon.createStubInstance(EventBus);
    sinon.stub(block, "eventBus").returns(eventBus);
  });

  afterEach(() => {
    sinon.restore;
  });

  it("should correctly set new props with setProps", () => {
    const newProps = { testProp: "newValue" };
    block.setProps(newProps);

    expect((block as any).props.testProp).to.equal("newValue");
  });

  it("should create a document element in _createDocumentElement", () => {
    const element = block["_createDocumentElement"]("div");
    expect(element.tagName.toLowerCase()).to.equal("div");
  });

  it("should remove and add events correctly", () => {
    const removeEventSpy = sinon.spy(block as any, "_removeEvents");
    const addEventSpy = sinon.spy(block as any, "_addEvents");

    block["_render"]();

    expect(removeEventSpy.calledOnce).to.be.true;
    expect(addEventSpy.calledOnce).to.be.true;
  });
});
