
function solve1(input: string) {
  let cycle = 1
  let X = 1
  let sum = 0

  input.split("\n").forEach(insturction => {
    const [op, val] = insturction.split(" ")
    const valInt = op === "addx" ? parseInt(val, 10) : 0

    if (op === "addx") {
      for (let cnt = 0; cnt < 2; cnt++) {
        if (cnt === 0) {
          cycle++
        } else {
          X += valInt
          cycle++
        }
        if (cycle % 40 === 20) {
          sum += X * cycle
        }
      }

    } else {
      cycle += 1
      if (cycle % 40 === 20) {
        sum += X * cycle
      }
    }
  })
  return sum
}

describe("10th day", () => {
  it("should solve test1", () => {
    expect(solve1(testInput)).toStrictEqual(13140)
  })

  it("should solve final1", () => {
    expect(solve1(finalInput)).toStrictEqual(15140)
  })
})

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

const finalInput = `noop
noop
addx 5
addx 1
addx 10
addx -4
noop
addx -1
noop
addx 5
addx -5
addx 9
addx 2
addx -15
addx 18
addx 8
addx -2
noop
addx -18
addx 21
addx 1
addx -37
addx 27
addx -24
addx 2
addx 5
addx -7
addx 26
addx -16
addx 2
addx 5
addx -15
noop
addx 20
addx 2
addx 4
addx -3
addx 2
noop
addx 3
addx 2
addx 5
addx -40
addx 2
addx 33
addx -30
addx 5
addx 5
addx 17
addx -19
addx 2
addx 5
addx 20
addx -16
addx 3
addx -2
addx 7
noop
addx -2
addx 5
addx 2
addx 3
addx -2
addx -38
addx 5
addx 2
addx 1
addx 15
addx -8
noop
addx -2
addx 4
addx 2
addx 4
addx -2
noop
addx 6
addx 2
addx -1
addx 4
noop
addx 1
addx 4
noop
noop
noop
addx -37
addx 5
addx 2
addx 22
addx -17
addx -2
noop
addx 3
addx 2
noop
addx 3
addx 2
noop
noop
noop
addx 5
addx 5
addx 2
addx 3
noop
addx 2
addx -23
addx 2
addx -14
noop
addx 29
addx -26
noop
addx 8
noop
noop
noop
addx -9
addx 11
addx 5
addx 2
noop
addx 1
noop
noop
addx 5
noop
noop
addx 2
noop
addx 3
addx 2
addx -2
noop
noop
noop`
