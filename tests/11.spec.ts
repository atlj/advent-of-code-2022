// define a data structure for monkey
type Monkey = {
  items: number[]
  operation: "*" | "+",
  /* If this is 0, operand is itself */
  by: number,
  testDivide: number,
  onTestSuccess: number;
  onTestFail: number;
  itemInspectCount: number
}

function deepCopy<T>(item: T): T {
  return JSON.parse(JSON.stringify(item))
}

function calculateMonkeyTurn(monkeys: Monkey[], monkeyIndex: number, divisor: number): Monkey[] {
  const result = deepCopy(monkeys)
  const monkey = monkeys[monkeyIndex]

  monkey.items.forEach((item, itemIndex) => {
    let resultItem = item

    if (monkey.operation === "*") {
      resultItem = monkey.by === 0 ? item * item : item * monkey.by
    } else {
      resultItem = monkey.by + item
    }
    resultItem = resultItem % divisor
    if ((resultItem % monkey.testDivide) === 0) {
      result[monkey.onTestSuccess].items = [...result[monkey.onTestSuccess].items, resultItem]
    } else {
      result[monkey.onTestFail].items = [...result[monkey.onTestFail].items, resultItem]
    }

    result[monkeyIndex].items.splice(itemIndex)

    result[monkeyIndex].itemInspectCount++
  })

  return result
}

function forwardRound(monkeys: Monkey[], divisor: number): Monkey[] {
  let result = [...monkeys]

  monkeys.forEach((_, monkeyIndex) => {
    result = calculateMonkeyTurn(result, monkeyIndex, divisor)
  })

  return result
}

function solve1(monkeys: Monkey[]) {
  let result = [...monkeys]

  const divisor = monkeys.reduce((acc, curr) => acc * curr.testDivide, 1)

  for (let currentTour = 1; currentTour <= 10000; currentTour++) {
    result = forwardRound(result, divisor)
  }

  result.sort((a, b) => b.itemInspectCount - a.itemInspectCount)

  return (result[0].itemInspectCount * result[1].itemInspectCount)
}

describe("11th day", () => {
  it.skip("should solve 1st test", () => {
    expect(solve1(testInput)).toStrictEqual(10605)
  })

  it("should solve 1st final", () => {
    expect(solve1(finalInput)).toStrictEqual(119715)
  })
})

const testInput: Monkey[] = [
  {
    items: [79, 98],
    operation: "*",
    by: 19,
    testDivide: 23,
    onTestSuccess: 2,
    onTestFail: 3,
    itemInspectCount: 0
  },
  {
    items: [54, 65, 75, 74],
    operation: "+",
    by: 6,
    testDivide: 19,
    onTestSuccess: 2,
    onTestFail: 0,
    itemInspectCount: 0
  },
  {
    items: [79, 60, 97],
    operation: "*",
    by: 0,
    testDivide: 13,
    onTestSuccess: 1,
    onTestFail: 3,
    itemInspectCount: 0
  },
  {
    items: [74],
    operation: "+",
    by: 3,
    testDivide: 17,
    onTestSuccess: 0,
    onTestFail: 1,
    itemInspectCount: 0
  }
]

const finalInput: Monkey[] = [
  {
    items: [89, 73, 66, 57, 64, 80],
    operation: "*",
    by: 3,
    testDivide: 13,
    onTestSuccess: 6,
    onTestFail: 2,
    itemInspectCount: 0
  },
  {
    items: [83, 78, 81, 55, 81, 59, 69],
    operation: "+",
    by: 1,
    testDivide: 3,
    onTestSuccess: 7,
    onTestFail: 4,
    itemInspectCount: 0
  },
  {
    items: [76, 91, 58, 85],
    operation: "*",
    by: 13,
    testDivide: 7,
    onTestSuccess: 1,
    onTestFail: 4,
    itemInspectCount: 0
  },
  {
    items: [71, 72, 74, 76, 68],
    operation: "*",
    by: 0,
    testDivide: 2,
    onTestSuccess: 6,
    onTestFail: 0,
    itemInspectCount: 0
  },
  {
    items: [98, 85, 84],
    operation: "+",
    by: 7,
    testDivide: 19,
    onTestSuccess: 5,
    onTestFail: 7,
    itemInspectCount: 0
  },
  {
    items: [78],
    operation: "+",
    by: 8,
    testDivide: 5,
    onTestSuccess: 3,
    onTestFail: 0,
    itemInspectCount: 0
  },
  {
    items: [86, 70, 60, 88, 88, 78, 74, 83],
    operation: "+",
    by: 4,
    testDivide: 11,
    onTestSuccess: 1,
    onTestFail: 2,
    itemInspectCount: 0
  },
  {
    items: [81, 58],
    operation: "+",
    by: 5,
    testDivide: 17,
    onTestSuccess: 3,
    onTestFail: 5,
    itemInspectCount: 0
  }
]
