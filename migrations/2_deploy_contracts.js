const Contest = artifacts.require("Contest");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Contest, { from: accounts[0] });
};
