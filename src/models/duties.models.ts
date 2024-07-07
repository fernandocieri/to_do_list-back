export default class Duty {
  readonly id: string;
  name: string;
  done: boolean;

  constructor(id: string, name: string, done: boolean) {
    this.id = id;
    this.name = name;
    this.done = done;
  }
}
