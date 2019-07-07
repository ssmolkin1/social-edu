const assert = require("chai").assert;
const app = require("../src/app.js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

acc1 = "0x90ab726706a2f42e310ce0667f820122332f94ff";
acc2 = "0xbb8b41097bf18965274619b2b422229717ed1b11";

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

  it("can distribute rewards", async () => {
    const rBefore = await app.getReward();

    const distributions = [
      {
        address: acc1,
        shares: "50",
      },
      {
        address: acc2,
        shares: "50",
      },
    ];

    app.distributeRewards(distributions);
    await sleep(500);

    const rAfter = await app.getReward();

    assert.strictEqual(rAfter.toNumber(), 0);
  });
});
