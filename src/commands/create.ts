import { Command, flags } from "@oclif/command";
const getStdin = require("get-stdin-with-tty");

export default class secret extends Command {
  static description = "this command create a secret in fonos.";

  static args = [{ name: "name" }];
  static flags = {
    help: flags.help({ char: "h" }),
    "from-literal": flags.string({ char: "l", description: "pass from literal" }),
    "from-stdin": flags.boolean({ char: "s", description: "pass from stdin" }),
  };

  async run() {
    const { args, flags } = this.parse(secret);

    if (args.name && flags["from-literal"]) {
      this.log(`your secret is ${args.name} password: ${flags["from-literal"]}`);
    }
    if (args.name && flags["from-stdin"]) {
      const stdin = await getStdin()
      this.log(`your secret is ${args.name} stdinps: ${stdin}`);
    }
  }
}
