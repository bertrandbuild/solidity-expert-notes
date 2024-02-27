// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Homework1 {
    uint[] public array_of_datas = [1, 2, 3, 4, 5];

    event Delete(uint index, uint when);

    function delete_at_index(uint index, bool keep_order) public {
        require(index < array_of_datas.length, "Index out of bounds");

        if (keep_order) {
            // we need to shift elements
            for (uint i = index; i < array_of_datas.length-1; i++) {
                array_of_datas[i] = array_of_datas[i+1];
            }
        } else {
            // we can directly replace since we don't need to keep order
            array_of_datas[index] = array_of_datas[array_of_datas.length-1];
        }
        
        array_of_datas.pop();
        emit Delete(index, block.timestamp);
    }

    function getLength() public view returns(uint){
        return array_of_datas.length;
    }

    function compareArrays(uint256[] memory array1, uint256[] memory array2) public pure returns (bool) {
        if (array1.length != array2.length) {
            return false;
        }

        for (uint256 i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }

        return true;
    }
}
