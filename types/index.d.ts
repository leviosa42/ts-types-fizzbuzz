declare type Assert<L, R> = L extends R ? "pass" : "fail";

declare type Cast<V, T> = V extends T ? V : never;


declare type Nat = unknown[];

declare type NumberToNat<N extends number, Acc extends Nat = []> =
  Acc['length'] extends N
    ? Acc
  : NumberToNat<N, [...Acc, unknown]
>

declare type NatToNumber<N extends Nat> = N['length'] & number;

declare type Add<A extends number, B extends number> = NatToNumber<[
  ...NumberToNat<A>,
  ...NumberToNat<B>
]>;

declare type Sub<A extends number, B extends number> = NatToNumber<
  A extends [...NumberToNat<B>, ...infer Rest]
    ? Rest
  : []
>;

declare type Mul<A extends number, B extends number, Acc extends number = 0> =
  B extends 0
    ? 0
  : Mul<A, Sub<B, 1>, Add<A, Acc>>;

type A = Assert<Add<1, 2>, 3>;