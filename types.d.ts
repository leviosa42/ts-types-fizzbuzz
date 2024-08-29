type Assert<L, R> = L extends R ? "pass" : "fail";

type Cast<V, T> = V extends T ? V : never;


type N2T<N extends number, A extends unknown[] = []> =
    N extends A['length'] ? A : N2T<N, [...A, unknown]>;

type T2N<T extends unknown[], A extends unknown[] = []> =
    T['length']


type Inc<N extends number> = Cast<
    [...N2T<N>, unknown]["length"],
    number
>
type Dec<N extends number> = Cast<
    N2T<N> extends [...infer H, infer T]
        ? H["length"]
        : never,
    number
>

// type Add<L extends number, R extends number> = 
//     R extends 0 ? L : Add<Inc<L>, Dec<R>>;
// type Sub<L extends number, R extends number> =
//     R extends 0 ? L : Sub<Dec<L>, Dec<R>>;
type Add<L extends number, R extends number> = Cast<
  [...N2T<L>, ...N2T<R>]["length"],
  number
>
type Sub<L extends number, R extends number> = 
  N2T<L> extends [...N2T<R>, ...infer T] ? T["length"] : never
type Mul<L extends number, R extends number, A extends number = 0> =
    R extends 0 ? A : Mul<L, Dec<R>, Add<A, L>>;
type Div<L extends number, R extends number, A extends number = 0> =
    L extends R ? Inc<A> : Div<Sub<L, R>, R, Inc<A>>;
type Mod<L extends number, R extends number> =
    Sub<L, R> extends never ? L : Mod<Sub<L, R>, R>

// type A = Assert<[unknown, unknown], N2T<2>>
// type B = Assert<2, T2N<[unknown, unknown]>>
// type C = Assert<2, Inc<1>>
// type D = Assert<2, Dec<3>>
// type E = Assert<2, Add<1, 1>>
// type F = Assert<2, Sub<3, 1>>
// type G = Assert<6, Mul<2, 3>>
// type H = Assert<2, Div<6, 3>>
// type I = Assert<2, Mod<6, 4>>

type Incr<N extends number, _A extends unknown[] = []> =
  N extends _A['length']
    ? [..._A, unknown]['length']
    : Incr<N, [..._A, unknown]>

type Decr<N extends number, _A extends unknown[] = []> =
  N extends _A['length']
    ? _A extends [infer _, ...infer Tail] ? Tail['length'] : never
    : Decr<N, [..._A, unknown]>
  
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