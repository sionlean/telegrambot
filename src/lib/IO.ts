const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class IO {
  static ask = async (text: string): Promise<string> => {
    return new Promise<string>(resolve => {
      readline.question(text, (answer: string) => {
        resolve(answer);
      });
    });
  };
}
