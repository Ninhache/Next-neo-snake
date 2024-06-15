export type X = number & { __name?: "x" };
export type Y = number & { __name?: "y" };

export type Coordinates = {
  x: X;
  y: Y;
};
