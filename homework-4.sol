// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Store {

    struct admin {
        bool flag;
        address admin;
    }

    struct payments {
        bool valid;
        uint amount;
        address sender;
        uint8 paymentType;
        uint finalAmount;
        address receiver;
        uint initialAmount;
        bool checked;
    }
    uint8 index;
    uint public number;
    mapping (address=>uint) balances;
    admin[] admins;
    payments[] topPayments;


    function setNumber(uint newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
