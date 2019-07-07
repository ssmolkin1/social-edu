const Web3 = require("web3");
const contestArtifact = require("../../build/contracts/Contest.json");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("http://localhost:8545")
);

let contest;
let accounts;

async function init() {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contestArtifact.networks[networkId];
  contest = new web3.eth.Contract(contestArtifact.abi, deployedNetwork.address);

  accounts = await web3.eth.getAccounts();
}

function getAddress() {
  return contest.address;
}

async function getReward() {
  return await contest.methods.getReward().call();
}

async function deposit(amount) {
  return await contest.methods
    .deposit()
    .send({ from: accounts[0], value: amount });
}

// distributions: Object { address, shares }[]
async function distributeRewards(distributions) {
  const payees = distributions.map(x => x.address);
  const shares = distributions.map(x => x.shares);
  return await contest.methods
    .distributeRewards(payees, shares)
    .send({ from: accounts[0] });
}

module.exports = { init, getAddress, getReward, deposit, distributeRewards };
