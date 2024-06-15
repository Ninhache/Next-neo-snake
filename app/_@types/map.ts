interface SnakeMapOptions {
  size: number;
}

class Scenario {
  size: number;
  constructor({ size }: SnakeMapOptions) {
    this.size = size;
  }
}

class SnakeMap {
  private scenario: Scenario;
  constructor(scenario: Scenario) {
    this.scenario = scenario;
  }
}
