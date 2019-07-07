pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "openzeppelin-solidity/contracts/payment/PaymentSplitter.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Contest is Ownable {

    event PayeeAdded(address _payee, uint256 _shares);
    event Deposited(address indexed _depositor, uint256 _weiAmount);

    address[] private payees;
    uint256[] private shares;
    Escrow private escrow = new Escrow();

    function getReward() public view returns (uint256) {
        return escrow.depositsOf(address(this));
    }

    function addPayee(address _payee, uint256 _shares) public onlyOwner {
        payees.push(_payee);
        shares.push(_shares);

        emit PayeeAdded(_payee, _shares);
    }

    function deposit() public payable {
        escrow.deposit.value(msg.value)(address(this));
        emit Deposited(msg.sender, msg.value);
    }

    function distributeRewards() public onlyOwner {
        escrow.withdraw(address(this));

        PaymentSplitter splitter = (new PaymentSplitter).value(address(this).balance)(payees, shares);

        for (uint256 i = 0; i < payees.length; i++) {
            splitter.release(address(uint160(payees[i])));
        }
    }

    function() external payable {
        require(msg.data.length == 0, "Method does not exist.");
    }
}
