export type UnionBy<
  Key extends string,
  Value extends string,
  Map extends Record<Value, object | null>
> = {
  [TValue in keyof Map]: {
    [key in Key]: TValue;
  } & (Map[TValue] extends null ? object : Map[TValue]);
}[keyof Map & Value];
