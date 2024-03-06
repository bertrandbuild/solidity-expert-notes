// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Homework6 {

    // function get_passed_eth_1() public payable returns(uint) {
    //     assembly {
    //         // get eth amount
    //         let passed_eth := mload(0)
    //         mstore(0x40, passed_eth)
    //         return (0x40, 32)
    //     }
    // }
    
    function get_passed_eth_2() public payable returns(uint) {
        uint passed_eth;
        assembly {
            passed_eth := callvalue()
        }
        return passed_eth;
    }
}
