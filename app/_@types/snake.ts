type Direction = "Up" | "Down" | "Left" | "Right";
function isDirection(value: any): value is Direction {
  return ["Up", "Down", "Left", "Right"].includes(value);
}

type X = number & { __name?: "x" };
type Y = number & { __name?: "y" };

type Coordinates = {
  x: X;
  y: Y;
};

class SnakeSegment {
  coordinates: Coordinates;

  constructor(start: Coordinates) {
    this.coordinates = start;
  }

  get x() {
    return this.coordinates.x;
  }

  get y() {
    return this.coordinates.y;
  }

  set x(x: X) {
    this.coordinates.x = x;
  }

  set y(y: Y) {
    this.coordinates.y = y;
  }
}

class Snake {
  head: SnakeSegment;
  body: SnakeSegment[];

  constructor(start: Coordinates) {
    this.head = new SnakeSegment(start);
    this.body = [];
  }
}
