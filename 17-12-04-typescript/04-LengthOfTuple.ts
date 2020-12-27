type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type LengthOfTuple<T extends ReadonlyArray<any>> = T['length']

type teslaLength = LengthOfTuple<tesla>  // expected 4
type spaceXLength = LengthOfTuple<spaceX> // expected 5
