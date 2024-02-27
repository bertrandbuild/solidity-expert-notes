import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Array check", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function fixtureBeforeAll() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Homework1 = await ethers.getContractFactory("Homework1");
    const homework = await Homework1.deploy();
    await homework.deployed();

    return { Homework1, homework, owner, otherAccount };
  }

  describe("Homework1", function () {
    it("The array length should be 5", async function () {
      const ARRAY_BEFORE_TEST = [1, 2, 3, 4, 5];
      const { homework } = await loadFixture(fixtureBeforeAll);

      const value0 = await homework.callStatic.array_of_datas(0);
      const value1 = await homework.callStatic.array_of_datas(1);
      const value2 = await homework.callStatic.array_of_datas(2);
      const value3 = await homework.callStatic.array_of_datas(3);
      const value4 = await homework.callStatic.array_of_datas(4);
      const length = await homework.getLength();

      console.log("value0 : ", value0);
      console.log("value1 : ", value1);
      console.log("value2 : ", value2);
      console.log("value3 : ", value3);
      console.log("value4 : ", value4);
      console.log("length : ", length);

      expect(length).to.equal(5);
    });
    
    it("Can delete at index without keeping order", async function () {
      const ARRAY_BEFORE_TEST = [1, 2, 3, 4, 5];
      const { homework } = await loadFixture(fixtureBeforeAll);
      const length = await homework.getLength();
      console.log("length : ", length);
      console.log("index 1 : ", await homework.callStatic.array_of_datas(1));
      await homework.delete_at_index(1, false);
      const new_length = await homework.getLength();
      console.log("new_length : ", new_length);
      console.log("new index 1 : ", await homework.callStatic.array_of_datas(1));
      expect(new_length).to.equal(4);
    });
    it("Can delete at index without keeping order (gas efficient)", async function () {
      const ARRAY_BEFORE_TEST = [1, 2, 3, 4, 5];
      const { homework } = await loadFixture(fixtureBeforeAll);
      const length = await homework.getLength();
      console.log("length : ", length);
      console.log("index 1 : ", await homework.callStatic.array_of_datas(1));
      await homework.delete_at_index(1, false);
      const new_length = await homework.getLength();
      const new_index_elmt = await homework.callStatic.array_of_datas(1);
      // new_index_elmt should be 5 because it's the last element and we just replace
      expect(new_index_elmt).to.equal(5);
      expect(new_length).to.equal(4);
    });
    
    it("Can delete at index and keep order (gas intensive)", async function () {
      const ARRAY_BEFORE_TEST = [1, 2, 3, 4, 5];
      const { homework } = await loadFixture(fixtureBeforeAll);
      const length = await homework.getLength();
      console.log("length : ", length);
      console.log("index 1 : ", await homework.callStatic.array_of_datas(1));
      await homework.delete_at_index(1, true);
      const new_length = await homework.getLength();
      const new_index_elmt = await homework.callStatic.array_of_datas(1);
      // new_index_elmt should be 3 because we have to keep the order
      expect(new_index_elmt).to.equal(3);
      expect(new_length).to.equal(4);
    });
  });
});
