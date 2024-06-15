import { getLogger } from "@/lib/logger";
import { isNotNullOrUndefined } from "./NullableType";
import { Coordinates, X, Y } from "./coordinates";
import { Direction } from "./direction";
import { Food } from "./food";

export class SnakeSegment {
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

  updatePosition(x: X, y: Y) {
    this.x = x;
    this.y = y;
  }
}

interface SnakeOptions {
  start: Coordinates;
  length: number;
  direction?: Direction;
}

export class Snake {
  head: SnakeSegment;
  body: SnakeSegment[];
  direction: Direction;

  constructor({ start, length, direction = "Right" }: SnakeOptions) {
    this.head = new SnakeSegment(start);
    this.body = new Array(length).map((_) => new SnakeSegment(start));
    this.direction = direction;
  }

  public eat(food: Food) {
    food.applyEffects(this);
  }

  public grow(value: number) {
    const lastIndex = this.body.length - 1;
    const lastPos = this.body.at(lastIndex)?.coordinates;

    if (isNotNullOrUndefined(lastPos)) {
      for (let i = 0; i < value; i++) {
        this.body.push(new SnakeSegment(lastPos));
      }
    } else {
      getLogger(this.constructor.name).fatal(`LastPos is ${lastPos}`);
      throw new Error(`LastPos is ${lastPos}`);
    }
  }
}
