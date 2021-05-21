import { Command, flags } from "@oclif/command";
const getStdin = require("get-stdin-with-tty");

export default class UpdateCommand extends Command {
  static description = "updates a secret at fonos.";

  static args = [{ name: "name" }];
  static flags = {
    help: flags.help({ char: "h" }),
    "from-literal": flags.string({ char: "l", description: "pass from literal" }),
    "from-stdin": flags.boolean({ char: "s", description: "pass from stdin" }),
  };

  async run() {
    const { args, flags } = this.parse(UpdateCommand);

    if (args.name && flags["from-literal"]) {
      // await secret.updateSecret({args.name, flags["from-literal"]})
    }
    if (args.name && flags["from-stdin"]) {
      const stdin = await getStdin()
      // await secret.updateSecret({args.name, stdin})
    }
  }
}
