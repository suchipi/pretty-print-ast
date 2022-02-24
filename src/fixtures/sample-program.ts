console.log("Hi!");

export type Something = {
  blah(input: string): Promise<void>;
};

function withBlah(someBlah: Something["blah"]) {
  return someBlah("dsjkfdsjlfjskdf");
}

const obj = {
  one: "two",
  three: "four",
  can: "I",
  have: "a",
  little: "more",
};
