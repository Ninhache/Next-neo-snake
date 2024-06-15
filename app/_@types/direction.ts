export type Direction = "Up" | "Down" | "Left" | "Right";

export function isDirection(value: any): value is Direction {
  return ["Up", "Down", "Left", "Right"].includes(value);
}
