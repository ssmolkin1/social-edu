const assert = require("chai").assert;
const app = require("../src/app.js");

describe("app", () => {
  it("deploys a Contest contract", async () => {
    await app.init();
    assert.exists(app.getAddress());
  });

  it("has an initial reward of 0", async () => {
    const reward = await app.getReward();
    assert.strictEqual(reward.toNumber(), 0);
  });
});
