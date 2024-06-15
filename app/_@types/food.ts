import { Nullable, isNotNullOrUndefined } from "./NullableType";
import { Coordinates } from "./coordinates";
import { Snake } from "./snake";

interface FoodOptions {
  value?: number;
  position: Coordinates;
  futurePositions?: Coordinates[];
}

export class Food {
  protected value: number;
  protected position: Nullable<Coordinates>;
  protected futurePositions: Coordinates[];

  constructor({ value = 1, position, futurePositions = [] }: FoodOptions) {
    this.value = value;
    this.position = position;
    this.futurePositions = futurePositions;
  }

  public applyEffects(snake: Snake): void {
    snake.grow(this.value);
    this.next();
  }

  private next(): void {
    const nextPosition = this.futurePositions.shift();

    if (isNotNullOrUndefined(nextPosition)) {
      this.move(nextPosition);
    } else {
      this.position = null;
    }
  }

  private move(position: Coordinates): void {
    this.position = position;
  }
}
