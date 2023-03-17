const {expect} = require("chai");

describe("Score", function () {
    let testing;

    let signers;
    let owner;
    let others;
    let Teacher;
    let Score;
    let teacher;

    before(async () => {
        signers = await ethers.getSigners();
        [owner, others] = signers;
        Teacher = await ethers.getContractFactory("Teacher", owner);
        Score = await ethers.getContractFactory("Score", owner);
    });

    beforeEach(async () => {
        teacher = await Teacher.deploy();
        testing = await Score.deploy(teacher.address);
        await teacher.setScoreContract(testing.address);
    });

    describe("setScore()", function () {
        it("revert if not teacher contract invoke the setScore", async function () {
            await expect(testing.connect(others).setScore(others.address, 101)).to.be.revertedWithCustomError(
                testing,
                "NotTeacher"
            );
        });

        it("revert if score > 100", async function () {
            await expect(teacher.setScore(others.address, 101)).to.be.revertedWithCustomError(
                testing,
                "InvalidScore"
            );
            // await expect(teacher.setScore(others.address, 101)).to.be.revertedWith(`InvalidScore`);
        });
    });
});
