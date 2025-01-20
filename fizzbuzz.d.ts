

// type A = Assert<[unknown, unknown], N2T<2>>
// type B = Assert<2, T2N<[unknown, unknown]>>
// type C = Assert<2, Inc<1>>
// type D = Assert<2, Dec<3>>
// type E = Assert<2, Add<1, 1>>
// type F = Assert<2, Sub<3, 1>>
// type G = Assert<6, Mul<2, 3>>
// type H = Assert<2, Div<6, 3>>
// type I = Assert<2, Mod<6, 4>>

  
type Range<F extends number, T extends number, _A extends number[] = []> =
  F extends T
    ? _A
    : Range<Incr<F>, T, [..._A, F]>

type FizzBuzz<N extends number> = 
  Mod<N, 15> extends 0
    ? "FizzBuzz"
      : Mod<N, 3> extends 0
        ? "Fizz"
      : Mod<N, 5> extends 0
        ? "Buzz"
    : N;

type Main<Ns extends number[], A extends (string | number)[] = []> =
    Ns extends [infer N extends number, ...infer T extends number[]]
        ? Main<T, [...A, FizzBuzz<N>]>
        : A

type B = Main<Range<1, 101>>