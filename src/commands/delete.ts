import { Command } from "@oclif/command";

export default class DeleteCommand extends Command {
  static description = "remove secret from fonos.";
  static args = [{ name: "name" }];

  async run() {
    // await super.deleteResource(new Secret(), "deleteSecret");
  }
}
