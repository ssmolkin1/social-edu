pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Payment is Ownable {
    using SafeMath for uint256;

    event Deposited(address indexed _depositor, uint256 _weiAmount);
    event Payed(address _recipient, address _amount);

    Escrow private escrow = new Escrow();

    function getReward() public view returns (uint256) {
        return escrow.depositOf(address(this));
    }

    function deposit() public payable {
        escrow.deposit(address(this));

        emit Deposited(msg.sender, msg.value);
    }       

    function withdraw() public onlyOwner {
        escrow.withdraw(address(this));
    }

    function Pay(address[] _recipients, address[] _payments) public onlyOwner {

        for (uint256 i = 0; i < rl; i++) {
            uint256 payment = _payments[i] < address(this).balance ? _payments[i] : address(this).balance ;
            
            _
        }
    }

    modifier validPayment(address[] _recipients, address[] _payments) {
        uint256 rl = _recipeints.length;
        require (rl > 0, "No recipients.");

        uint256 pl = _payments.length; 
        require (rl == pl, "Number of recepients and payments do not match.");

        require(sum(_payments) == address(this).balance, "Payments not equal to balance");
        _;
    }

    function sum(uint256 _array) internal return (uint256) {
        uint256 l = _array.length;
        uint256 result = 0;

        for (uint256 i = 0; i < l; i++) {
            result.add(_array[i]);
        }

        return result;
    }
}
