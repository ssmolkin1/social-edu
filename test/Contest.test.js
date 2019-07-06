const Contest = artifacts.require("Contest");

contract("Contest", async accounts => {
  let contest;

  beforeEach(async () => {
    contest = await Contest.new();
  });

  it("Should deploy", async () => {
    assert.exists(contest);
  });

  it("Should have a reward equal to total deposits", async () => {
    const d1 = 100;
    const d2 = 200;
    const d3 = 300;
    const deposits = d1 + d2 + d3;

    await contest.deposit({ from: accounts[1], value: d1 });
    await contest.deposit({ from: accounts[2], value: d2 });
    await contest.deposit({ from: accounts[3], value: d3 });

    const balance = await web3.eth.getBalance(contest.address);
    assert.strictEqual(parseInt(balance), 0);

    const reward = await contest.getReward();
    assert.strictEqual(reward.toNumber(), deposits);
  });

  it("Should be able to withdraw funds from escrow", async () => {
    const reward = await contest.getReward();
    assert.strictEqual(reward.toNumber(), 0);

    const d1 = 100;
    const d2 = 200;
    const d3 = 300;
    const deposits = d1 + d2 + d3;

    await contest.deposit({ from: accounts[1], value: d1 });
    await contest.deposit({ from: accounts[2], value: d2 });
    await contest.deposit({ from: accounts[3], value: d3 });

    await contest.withdraw();

    balance = await web3.eth.getBalance(contest.address);
    assert.strictEqual(parseInt(balance), deposits);
  });

  /*   it("Should be named Content Bounty Coin", async () => {
    const name = await cbc.name();
    assert.strictEqual(name, "Content Bounty Coin");
  });

  it("Should have symbol Contest", async () => {
    const symbol = await cbc.symbol();
    assert.strictEqual(symbol, "Contest");
  });

  it("Should have 18 decimals", async () => {

    const decimals = (await cbc.decimals()).toNumber();
    assert.strictEqual(decimals, 18);
  });

  it("Should set address that deployed it as the minter", async () => {
    const isFirstAccountMinter = await cbc.isMinter(accounts[0]);
    assert.isTrue(isFirstAccountMinter);
  });

  it("Should be mintable by the minter", async () => {
    const beforeBalance0 = (await cbc.balanceOf(accounts[0])).toNumber();
    const beforeBalance1 = (await cbc.balanceOf(accounts[1])).toNumber();
    const beforeTotal = (await cbc.totalSupply()).toNumber();

    const newTokens0 = 12345;
    const newTokens1 = 67890;
    const newTokensTotal = newTokens0 + newTokens1;

    await cbc.mint(accounts[0], newTokens0, {
      from: accounts[0],
    });
    await cbc.mint(accounts[1], newTokens1, {
      from: accounts[0],
    });

    const afterBalance0 = (await cbc.balanceOf(accounts[0])).toNumber();
    const afterBalance1 = (await cbc.balanceOf(accounts[1])).toNumber();
    const afterTotal = (await cbc.totalSupply()).toNumber();

    assert.strictEqual(afterBalance0 - beforeBalance0, newTokens0);
    assert.strictEqual(afterBalance1 - beforeBalance1, newTokens1);
    assert.strictEqual(afterTotal - beforeTotal, newTokensTotal);
  }); */
});
