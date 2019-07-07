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

  it("Should be able to distribute rewards equal to total deposits", async () => {
    const deposits = 2;
    const depositsInWei = web3.utils.toWei(deposits.toString(), "ether");

    await contest.deposit({ from: accounts[0], value: depositsInWei });

    const bBefore1 = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]));
    const bBefore2 = web3.utils.fromWei(await web3.eth.getBalance(accounts[2]));

    await contest.distributeRewards([accounts[1], accounts[2]], [50, 50]);

    const bAfter1 = web3.utils.fromWei(await web3.eth.getBalance(accounts[1]));
    const bAfter2 = web3.utils.fromWei(await web3.eth.getBalance(accounts[2]));

    const diff1 = parseInt(bAfter1) - parseInt(bBefore1);
    const diff2 = parseInt(bAfter2) - parseInt(bBefore2);

    assert.strictEqual(diff1, deposits / 2);
    assert.strictEqual(diff2, deposits / 2);
  });
});
