const assert = require("chai").assert;
const app = require("../src/app.js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("app", () => {
  it("deploys a Contest contract", async () => {
    await app.init();
    assert.exists(app.getAddress());
  });

  it("can get the reward", async () => {
    const reward = await app.getReward();
    assert.exists(reward);
  });

  it("can accept deposits", async () => {
    const amount = 100;
    const rBefore = await app.getReward();
    app.deposit(amount.toString());
    await sleep(500);
    const rAfter = await app.getReward();
    const diff = rAfter.toNumber() - rBefore.toNumber();
    assert.strictEqual(diff, amount);
  });

  it("can add payees", async () => {
    const acc1 = app.getAccounts()[1];
    const acc2 = app.getAccounts()[2];
    await app.addPayee(acc1, 50);
    await app.addPayee(acc2, 50);
  });

  it("can distribute rewards", async () => {
    await app.distributeRewards();
    // await sleep(500);

    const rAfter = await app.getReward();

    assert.strictEqual(rAfter.toNumber(), 0);
  });
});
