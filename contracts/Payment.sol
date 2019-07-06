pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Payment is Ownable {
    using SafeMath for uint256;

    event Deposited(address indexed _depositor, uint256 _weiAmount);
    event Payed(address[] _recipients, address[] _payments);

    Escrow private escrow = new Escrow();

    function getReward() public view returns (uint256) {
        return escrow.depositsOf(address(this));
    }

    function deposit() public payable {
        escrow.deposit(address(this));

        emit Deposited(msg.sender, msg.value);
    }

    function withdraw() public onlyOwner {
        escrow.withdraw(address(this));
    }

    function Pay(address[] memory _recipients, address[] memory _payments) public onlyOwner validPayment(_recipients, _payments) {
        uint256 rl = _recipients.length;

        for (uint256 i = 0; i < rl; i++) {
            _recipients[i].transfer(_payments[i]);
        }

        emit Payed(_recipients, _payments);
    }

    modifier validPayment(address[] memory _recipients, address[] memory _payments) {
        uint256 rl = _recipients.length;
        require (rl > 0, "No recipients.");

        uint256 pl = _payments.length;
        require (rl == pl, "Number of recepients and payments do not match.");

        require(sum(_payments) == address(this).balance, "Payments not equal to balance");

        _;
    }

    function sum(uint256[] memory _array) internal returns (uint256) {
        uint256 l = _array.length;
        uint256 result = 0;

        for (uint256 i = 0; i < l; i++) {
            result.add(_array[i]);
        }

        return result;
    }
}
