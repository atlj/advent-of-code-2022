type Stack = string[]
type Instruction = {
  times: number, fromIndex: number, toIndex: number
}

function parseStacks(all: string): { stacks: string[][], instructions: Instruction[] } {
  const [stacksRawStr, instrucionsRawStr] = all.split("\n\n")
  const stacksRaw = stacksRawStr.split("\n")
  const instructionsRaw = instrucionsRawStr.split("\n")


  const stacks: string[][] = []

  const labelsRow = stacksRaw[stacksRaw.length - 1]

  const rowCount = stacksRaw.length - 1 // minus the labels row
  const colCount = labelsRow.split("").filter(char => char !== " ").length

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let i = 0; i < colCount; i++) {
      const crate = stacksRaw[rowIndex][i * 4 + 1]
      if (crate !== " ") {
        if (stacks[i] === undefined) {
          stacks[i] = [crate]
        } else {
          stacks[i].push(crate)
        }
      }
    }
  }

  const instructions: Instruction[] = []

  const instructionCount = instructionsRaw.length

  for (let i = 0; i < instructionCount; i++) {
    const instructionRow = instructionsRaw[i]
    //move 11 from 1 to 7
    const timesStr = instructionRow.split(" from")[0].split("move ")[1]
    const fromStr = instructionRow.split(" to ")[0].split("from ")[1]
    const toStr = instructionRow.split(" ")[instructionRow.split(" ").length - 1]

    instructions.push({ times: parseInt(timesStr, 10), fromIndex: parseInt(fromStr, 10) - 1, toIndex: parseInt(toStr, 10) - 1 })
  }


  return {
    stacks, instructions
  }

}

function moveMutable(from: string[], to: string[]) {
  const crate = from.shift() as string
  to.unshift(crate)
}

function moveTimes(times: number, from: string[], to: string[]) {
  const fromCopy = [...from]
  const toCopy = [...to]
  for (let i = 0; i < times; i++) {
    moveMutable(fromCopy, toCopy)
  }
  return [fromCopy, toCopy]
}

function solve(input: string) {
  const { stacks, instructions } = parseStacks(input)

  console.log(stacks)
  console.log(instructions)

  instructions.forEach(instruction => {
    const [newFrom, newTo] = moveTimes(instruction.times, stacks[instruction.fromIndex], stacks[instruction.toIndex])
    stacks[instruction.fromIndex] = newFrom
    stacks[instruction.toIndex] = newTo
  })

  return stacks.reduce((acc, curr) => acc + curr[0], "")
}

describe("5th day part 2", () => {
  // it("should move times", () => {
  //   const from = ["A", "B", "C"]
  //   const to = ["D"]
  //   moveTimes(2, from, to)
  //   expect(moveTimes(2, from, to)).toStrictEqual([["C"], ["B", "A", "D"]])
  // })

  // it("should parse the stacks", () => {
  //   expect(parseStacks(testInput)).toStrictEqual({})
  // })

  it("should solve test input correctly", () => {
    expect(solve(finalInput)).toStrictEqual([])
  })
})

const finalInput = `            [M] [S] [S]            
        [M] [N] [L] [T] [Q]        
[G]     [P] [C] [F] [G] [T]        
[B]     [J] [D] [P] [V] [F] [F]    
[D]     [D] [G] [C] [Z] [H] [B] [G]
[C] [G] [Q] [L] [N] [D] [M] [D] [Q]
[P] [V] [S] [S] [B] [B] [Z] [M] [C]
[R] [H] [N] [P] [J] [Q] [B] [C] [F]
 1   2   3   4   5   6   7   8   9 

move 1 from 7 to 4
move 3 from 4 to 7
move 4 from 3 to 4
move 5 from 6 to 9
move 1 from 8 to 1
move 2 from 3 to 2
move 3 from 4 to 6
move 1 from 3 to 6
move 9 from 7 to 1
move 1 from 2 to 4
move 3 from 4 to 9
move 4 from 9 to 8
move 6 from 8 to 2
move 1 from 8 to 6
move 1 from 4 to 1
move 11 from 1 to 7
move 1 from 4 to 7
move 7 from 2 to 5
move 5 from 6 to 3
move 2 from 4 to 3
move 2 from 5 to 9
move 1 from 8 to 6
move 3 from 1 to 5
move 2 from 6 to 9
move 1 from 4 to 8
move 2 from 2 to 1
move 7 from 5 to 9
move 6 from 3 to 6
move 1 from 2 to 5
move 1 from 3 to 8
move 12 from 7 to 3
move 1 from 1 to 8
move 2 from 1 to 9
move 20 from 9 to 5
move 1 from 1 to 7
move 5 from 5 to 3
move 1 from 8 to 7
move 2 from 8 to 3
move 2 from 6 to 5
move 1 from 6 to 4
move 18 from 3 to 2
move 1 from 4 to 2
move 1 from 7 to 9
move 1 from 1 to 9
move 1 from 6 to 1
move 8 from 5 to 2
move 1 from 1 to 6
move 19 from 5 to 2
move 5 from 2 to 6
move 2 from 9 to 7
move 20 from 2 to 1
move 1 from 9 to 4
move 8 from 6 to 2
move 5 from 1 to 3
move 27 from 2 to 1
move 34 from 1 to 7
move 1 from 2 to 6
move 2 from 3 to 1
move 1 from 4 to 9
move 1 from 2 to 6
move 2 from 1 to 7
move 1 from 6 to 7
move 1 from 9 to 3
move 2 from 6 to 3
move 1 from 6 to 4
move 5 from 3 to 4
move 5 from 4 to 2
move 4 from 1 to 4
move 4 from 1 to 4
move 2 from 3 to 6
move 1 from 6 to 9
move 25 from 7 to 5
move 1 from 6 to 4
move 17 from 5 to 2
move 14 from 7 to 6
move 1 from 7 to 3
move 1 from 9 to 3
move 10 from 2 to 3
move 2 from 2 to 9
move 12 from 3 to 5
move 18 from 5 to 8
move 1 from 4 to 2
move 5 from 2 to 1
move 1 from 5 to 3
move 3 from 2 to 1
move 1 from 2 to 7
move 2 from 2 to 6
move 9 from 6 to 7
move 16 from 8 to 2
move 6 from 7 to 3
move 2 from 8 to 9
move 1 from 1 to 8
move 16 from 2 to 6
move 1 from 8 to 3
move 2 from 1 to 2
move 1 from 9 to 3
move 7 from 4 to 1
move 7 from 3 to 7
move 9 from 7 to 8
move 1 from 5 to 6
move 2 from 9 to 7
move 1 from 9 to 5
move 11 from 6 to 8
move 1 from 3 to 1
move 1 from 4 to 2
move 2 from 8 to 5
move 3 from 5 to 8
move 2 from 1 to 9
move 5 from 1 to 4
move 3 from 4 to 1
move 1 from 3 to 2
move 3 from 2 to 1
move 1 from 9 to 1
move 1 from 2 to 5
move 2 from 4 to 7
move 20 from 8 to 5
move 1 from 9 to 7
move 11 from 6 to 1
move 17 from 1 to 5
move 1 from 8 to 2
move 7 from 5 to 8
move 1 from 4 to 5
move 2 from 1 to 2
move 2 from 8 to 4
move 4 from 7 to 6
move 2 from 6 to 8
move 2 from 1 to 2
move 1 from 1 to 4
move 4 from 8 to 9
move 2 from 1 to 9
move 3 from 8 to 1
move 25 from 5 to 2
move 23 from 2 to 1
move 1 from 7 to 1
move 6 from 9 to 8
move 6 from 8 to 3
move 3 from 6 to 2
move 10 from 1 to 2
move 1 from 6 to 3
move 2 from 3 to 6
move 2 from 3 to 2
move 2 from 6 to 8
move 1 from 4 to 6
move 14 from 1 to 9
move 2 from 3 to 4
move 14 from 2 to 4
move 1 from 6 to 9
move 17 from 4 to 3
move 1 from 8 to 6
move 2 from 7 to 2
move 1 from 4 to 2
move 1 from 5 to 9
move 9 from 2 to 4
move 17 from 3 to 7
move 3 from 4 to 2
move 1 from 8 to 3
move 4 from 5 to 7
move 1 from 3 to 6
move 1 from 4 to 5
move 14 from 7 to 9
move 2 from 1 to 9
move 3 from 2 to 1
move 1 from 2 to 5
move 1 from 3 to 7
move 4 from 1 to 2
move 2 from 6 to 7
move 3 from 9 to 8
move 4 from 2 to 4
move 17 from 9 to 7
move 1 from 2 to 8
move 8 from 9 to 6
move 1 from 8 to 2
move 19 from 7 to 9
move 9 from 4 to 2
move 5 from 7 to 3
move 3 from 5 to 9
move 6 from 2 to 5
move 1 from 9 to 4
move 3 from 2 to 9
move 25 from 9 to 5
move 1 from 3 to 6
move 2 from 5 to 8
move 6 from 6 to 7
move 1 from 3 to 4
move 2 from 3 to 4
move 1 from 8 to 2
move 2 from 2 to 9
move 2 from 8 to 3
move 5 from 7 to 6
move 3 from 7 to 9
move 7 from 5 to 8
move 2 from 3 to 5
move 1 from 3 to 5
move 1 from 6 to 2
move 6 from 9 to 5
move 1 from 9 to 2
move 1 from 6 to 9
move 2 from 5 to 6
move 2 from 9 to 8
move 11 from 8 to 1
move 2 from 5 to 9
move 3 from 6 to 5
move 1 from 4 to 7
move 5 from 5 to 7
move 1 from 4 to 8
move 7 from 7 to 2
move 12 from 5 to 2
move 10 from 1 to 8
move 1 from 9 to 6
move 3 from 8 to 1
move 1 from 1 to 6
move 10 from 2 to 3
move 8 from 8 to 7
move 1 from 9 to 8
move 2 from 3 to 5
move 14 from 5 to 8
move 1 from 3 to 2
move 3 from 8 to 1
move 3 from 8 to 4
move 3 from 2 to 4
move 5 from 6 to 4
move 8 from 7 to 9
move 6 from 8 to 7
move 1 from 5 to 7
move 6 from 2 to 9
move 4 from 4 to 6
move 4 from 4 to 9
move 3 from 9 to 3
move 1 from 8 to 6
move 1 from 5 to 6
move 2 from 7 to 2
move 1 from 3 to 4
move 3 from 4 to 1
move 3 from 4 to 3
move 5 from 6 to 4
move 4 from 3 to 8
move 1 from 6 to 4
move 8 from 3 to 2
move 2 from 8 to 5
move 11 from 9 to 7
move 9 from 1 to 9
move 2 from 7 to 3
move 1 from 6 to 8
move 1 from 6 to 5
move 5 from 9 to 8
move 3 from 9 to 7
move 2 from 9 to 1
move 2 from 3 to 7
move 12 from 7 to 1
move 2 from 8 to 9
move 5 from 4 to 5
move 4 from 9 to 4
move 1 from 1 to 3
move 7 from 1 to 3
move 7 from 5 to 6
move 1 from 9 to 1
move 1 from 5 to 1
move 5 from 7 to 8
move 4 from 6 to 7
move 5 from 1 to 8
move 1 from 4 to 3
move 12 from 8 to 7
move 2 from 2 to 4
move 2 from 8 to 9
move 3 from 8 to 2
move 2 from 6 to 7
move 4 from 7 to 8
move 1 from 6 to 8
move 4 from 3 to 2
move 15 from 7 to 8
move 1 from 7 to 6
move 3 from 3 to 5
move 2 from 3 to 4
move 5 from 2 to 5
move 3 from 1 to 5
move 4 from 5 to 6
move 4 from 5 to 9
move 1 from 5 to 7
move 4 from 9 to 4
move 2 from 2 to 9
move 2 from 5 to 2
move 2 from 2 to 1
move 3 from 4 to 9
move 2 from 9 to 4
move 2 from 8 to 5
move 2 from 5 to 2
move 8 from 2 to 4
move 2 from 1 to 3
move 2 from 3 to 5
move 3 from 6 to 9
move 2 from 6 to 1
move 2 from 1 to 4
move 1 from 2 to 4
move 1 from 5 to 7
move 2 from 2 to 7
move 18 from 4 to 2
move 1 from 5 to 9
move 2 from 7 to 9
move 18 from 8 to 4
move 1 from 7 to 8
move 22 from 4 to 8
move 6 from 2 to 6
move 3 from 6 to 8
move 3 from 6 to 4
move 3 from 4 to 7
move 3 from 7 to 1
move 14 from 2 to 3
move 10 from 3 to 2
move 27 from 8 to 1
move 1 from 7 to 6
move 1 from 3 to 7
move 2 from 2 to 8
move 2 from 9 to 8
move 18 from 1 to 4
move 6 from 1 to 5
move 10 from 4 to 7
move 1 from 3 to 7
move 4 from 7 to 2
move 3 from 9 to 7
move 1 from 6 to 5
move 1 from 2 to 7
move 2 from 5 to 6
move 2 from 6 to 5
move 3 from 5 to 1
move 6 from 1 to 3
move 4 from 5 to 9
move 11 from 2 to 9
move 2 from 1 to 6
move 3 from 4 to 6
move 5 from 7 to 3
move 2 from 6 to 1
move 2 from 1 to 5
move 1 from 8 to 2
move 1 from 1 to 8
move 1 from 6 to 4
move 2 from 4 to 5
move 4 from 5 to 9
move 11 from 3 to 6
move 1 from 3 to 6
move 8 from 6 to 5
move 1 from 3 to 5
move 4 from 4 to 8
move 21 from 9 to 6
move 2 from 9 to 5
move 1 from 9 to 3
move 1 from 2 to 6
move 7 from 8 to 6
move 12 from 6 to 5
move 1 from 8 to 2
move 10 from 6 to 7
move 15 from 7 to 2
move 2 from 7 to 3
move 13 from 6 to 8
move 9 from 5 to 1
move 12 from 5 to 3
move 1 from 2 to 3
move 1 from 9 to 7
move 9 from 3 to 4
move 3 from 4 to 6
move 1 from 7 to 6
move 6 from 4 to 1
move 2 from 5 to 2
move 6 from 1 to 8
move 9 from 8 to 6
move 7 from 3 to 2
move 1 from 2 to 9
move 9 from 6 to 1
move 13 from 1 to 7
move 4 from 8 to 5
move 2 from 7 to 1
move 3 from 6 to 4
move 3 from 5 to 8
move 3 from 2 to 6
move 1 from 5 to 3
move 1 from 3 to 4
move 1 from 9 to 8
move 3 from 8 to 7
move 12 from 2 to 9
move 10 from 7 to 4
move 5 from 8 to 4
move 1 from 8 to 5
move 11 from 4 to 7
move 8 from 9 to 7
move 1 from 6 to 2
move 8 from 2 to 6
move 1 from 5 to 8
move 4 from 1 to 5
move 4 from 9 to 6
move 3 from 1 to 3
move 2 from 8 to 4
move 1 from 7 to 6
move 1 from 2 to 7
move 2 from 3 to 7
move 4 from 4 to 9
move 11 from 6 to 9
move 10 from 7 to 8
move 1 from 3 to 4
move 1 from 6 to 4
move 4 from 5 to 7
move 6 from 7 to 4
move 1 from 8 to 7
move 4 from 6 to 7
move 12 from 4 to 8
move 12 from 8 to 1
move 1 from 8 to 2
move 10 from 1 to 7
move 2 from 4 to 1
move 8 from 8 to 3
move 4 from 1 to 6
move 8 from 7 to 6
move 2 from 6 to 5
move 2 from 5 to 2
move 13 from 9 to 3
move 3 from 2 to 5
move 8 from 3 to 4
move 7 from 6 to 7
move 1 from 9 to 2
move 1 from 9 to 1
move 2 from 6 to 4
move 3 from 4 to 8
move 1 from 1 to 7
move 4 from 4 to 6
move 3 from 8 to 7
move 1 from 2 to 9
move 1 from 5 to 2
move 1 from 2 to 5
move 2 from 4 to 5
move 1 from 7 to 2
move 13 from 3 to 4
move 7 from 4 to 3
move 4 from 5 to 9
move 1 from 4 to 7
move 5 from 6 to 3
move 3 from 9 to 7
move 10 from 7 to 8
move 3 from 4 to 8
move 1 from 5 to 4
move 2 from 3 to 1
move 3 from 7 to 4
move 4 from 8 to 6
move 2 from 9 to 3
move 2 from 4 to 5
move 4 from 4 to 3
move 8 from 8 to 3
move 3 from 6 to 8
move 1 from 2 to 6
move 5 from 7 to 9
move 1 from 4 to 3
move 3 from 7 to 5
move 3 from 8 to 4
move 7 from 7 to 5
move 3 from 7 to 8
move 1 from 9 to 8
move 3 from 4 to 1
move 1 from 5 to 8
move 3 from 7 to 1
move 6 from 8 to 3
move 3 from 9 to 5
move 2 from 6 to 5
move 2 from 1 to 6
move 16 from 3 to 8
move 4 from 5 to 8
move 4 from 3 to 8
move 1 from 9 to 5
move 1 from 6 to 5
move 3 from 3 to 7
move 6 from 1 to 6
move 1 from 5 to 4
move 3 from 5 to 2
move 2 from 7 to 4
move 1 from 2 to 8
move 6 from 8 to 1
move 2 from 4 to 5
move 2 from 2 to 3
move 7 from 8 to 7
move 1 from 4 to 6
move 3 from 6 to 4
move 3 from 4 to 9
move 3 from 6 to 3
move 11 from 8 to 6
move 12 from 5 to 4
move 5 from 6 to 1
move 9 from 3 to 2
move 7 from 6 to 1
move 7 from 7 to 8
move 5 from 8 to 3
move 2 from 3 to 6
move 2 from 8 to 1
move 1 from 7 to 2
move 7 from 3 to 8
move 1 from 9 to 1
move 14 from 1 to 3
move 9 from 2 to 8
move 11 from 3 to 4
move 22 from 4 to 1
move 2 from 3 to 1
move 16 from 8 to 4
move 1 from 9 to 2
move 3 from 6 to 9
move 3 from 9 to 5
move 1 from 2 to 6
move 1 from 5 to 7`

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
