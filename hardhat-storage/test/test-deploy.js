const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const actual = await simpleStorage.retreive()
        const expected = "0"
        assert.equal(actual.toString(), expected)
    })

    it("Should update when we call store", async function () {
        const beforeUpdate = await simpleStorage.retreive()
        const transactionResponse = await simpleStorage.store("5")
        transactionResponse.wait(1)
        const afterUpdate = await simpleStorage.retreive()
        const expected = "5"
        assert.notEqual(beforeUpdate.toString(), afterUpdate.toString())
        assert.equal(afterUpdate.toString(), expected)
    })

    it("Should add person", async function () {
        const transactionResponse = await simpleStorage.addPerson(
            "Maximus",
            "7"
        )
        transactionResponse.wait(1)
    })
})
