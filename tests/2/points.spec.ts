// First column is what opponent going to play
// A = rock B = Paper C = Scissors
// Second column is unknown
// X = rock Y = paper Z = Scissors
//
// Score = shape you selected ( 1 for rock, 2 for paper, 3 for scissors ) + outcome ( 0 if you lost, 3 if draw, 6 if you win)
//

export enum opponentPick {
  rock = "A",
  paper = "B",
  scissors = "C"
}

export enum myPick {
  rock = "X",
  paper = "Y",
  scissors = "Z"
}

export enum outcome {
  lose = "X",
  draw = "Y",
  win = "Z"
}

const opponentPickToMyPick: Record<opponentPick, myPick> = {
  "A": myPick.rock,
  "B": myPick.paper,
  "C": myPick.scissors
}

const shapePointTable: Record<myPick, number> = {
  "X": 1,
  "Y": 2,
  "Z": 3
}

const beatsTable: Record<myPick, myPick> = {
  [myPick.scissors]: myPick.paper,
  [myPick.paper]: myPick.rock,
  [myPick.rock]: myPick.scissors
}

const losesTable: Record<myPick, myPick> = {
  [myPick.rock]: myPick.paper,
  [myPick.paper]: myPick.scissors,
  [myPick.scissors]: myPick.rock
}


export function guessMyPick(opponent: opponentPick, out: outcome): myPick {
  const op = opponentPickToMyPick[opponent]
  switch (out) {
    case outcome.draw:
      return op
    case outcome.lose:
      return beatsTable[op]
    default:
      return losesTable[op]
  }
}

function convertOpponentPickToMyPick(opponentPick: opponentPick) {
  return opponentPickToMyPick[opponentPick]
}

function calculateWinPoint(opponentPick: opponentPick, myPick: myPick) {
  const opponent = convertOpponentPickToMyPick(opponentPick)

  if (opponent === myPick) {
    return 3
  }

  // I lost
  if (beatsTable[opponent] === myPick) {
    return 0
  }

  return 6
}

export function calculateOutcome(opponentPick: opponentPick, myPick: myPick): number {
  const shapePoint = shapePointTable[myPick]

  return shapePoint + calculateWinPoint(opponentPick, myPick)
}


describe("2nd day solution", () => {
  it("should convert opponent pick to my pick", () => {
    expect(convertOpponentPickToMyPick(opponentPick.paper)).toStrictEqual(myPick.paper)
  })

  it("should calculate win point correctly", () => {
    expect(calculateWinPoint(opponentPick.scissors, myPick.paper)).toStrictEqual(0)
    expect(calculateWinPoint(opponentPick.paper, myPick.paper)).toStrictEqual(3)
    expect(calculateWinPoint(opponentPick.rock, myPick.paper)).toStrictEqual(6)
  })

  it("should calculate outcome correctly", () => {
    expect(calculateOutcome(opponentPick.paper, myPick.paper)).toStrictEqual(5)
    expect(calculateOutcome(opponentPick.paper, myPick.rock)).toStrictEqual(1)
  })

  it("should guess my pick correctly", () => {
    expect(guessMyPick(opponentPick.rock, outcome.draw)).toStrictEqual(myPick.rock)
    expect(guessMyPick(opponentPick.paper, outcome.lose)).toStrictEqual(myPick.rock)
    expect(guessMyPick(opponentPick.scissors, outcome.win)).toStrictEqual(myPick.rock)
  })
})

