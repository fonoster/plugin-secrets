import {Command, flags} from "@oclif/command";
import {CLIError} from "@oclif/errors";
import SecretsManager from "../../utils/secrets_manager";
import SecretService from "../../utils/implementation/secrets_service_client";
import {CreateSecretRequest} from "../../utils/types";
const getStdin = require("get-stdin-with-tty");

export default class CreateCommand extends Command {
  static description = "this command create a secret in fonos.";

  static args = [{name: "name"}];
  static flags = {
    help: flags.help({char: "h"}),
    "from-literal": flags.string({char: "l", description: "pass from literal"}),
    "from-stdin": flags.boolean({char: "s", description: "pass from stdin"})
  };

  async run() {
    const {args, flags} = this.parse(CreateCommand);
    const _secretsManager = new SecretsManager(new SecretService());
    const request: CreateSecretRequest = {
      name: args.name,
      secret: flags["from-literal"] ?? (await getStdin())
    };

    try {
      const result = await _secretsManager.createSecret(request);
      console.log(result.name);
    } catch (e) {
      throw new CLIError(e);
    }
  }
}
