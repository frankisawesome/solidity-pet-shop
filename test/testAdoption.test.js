const { assert } = require("chai");

const Adoption = artifacts.require("Adoption")

contract("Adoption", (accounts) => {
    let adoption;
    let expectedAdopter;

    before(async () => {
        adoption = await Adoption.deployed();
    })

    describe("adopting a pet and retrieving account addresses", async () => {
        before("adopt a pet using accounts[0]", async () => {
            await adoption.adopt(8, { from: accounts[0] })
            expectedAdopter = accounts[0]
        })

        it("can fetch owner address based on pet id", async () => {
            const adopter = await adoption.adopters(8);
            assert.equal(adopter, expectedAdopter, "The owner of the adopter should be the first account")
        })

        it("can fetch addresses of all pet owners", async () => {
            const adopters = await adoption.getAdopters();
            assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection")
        })

        it("can return a pet based on pet id", async () => {
            await adoption.returnPet(8, { from: accounts[0] })
            const newAdopter = await adoption.adopters(8)
            assert.equal('0x0000000000000000000000000000000000000000', newAdopter, "The new ownder of adopted pet should be none")
        })
    })
})