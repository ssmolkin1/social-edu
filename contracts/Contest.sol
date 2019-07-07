pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "openzeppelin-solidity/contracts/payment/PaymentSplitter.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Contest is Ownable {

    Escrow private escrow = new Escrow();

    function getReward() public view returns (uint256) {
        return escrow.depositsOf(address(this));
    }

    function deposit() public payable {
        escrow.deposit.value(msg.value)(address(this));
    }

    function DistributeRewards(address[] memory _payees, uint256[] memory _payments) public onlyOwner {
        escrow.withdraw(address(this));

        PaymentSplitter splitter = (new PaymentSplitter).value(address(this).balance)(_payees, _payments);

        for (uint256 i = 0; i < _payees.length; i++) {
            splitter.release(address(uint160(_payees[i])));
        }
    }

    function() external payable {
        require(msg.data.length == 0, "Method does not exist.");
    }
}
