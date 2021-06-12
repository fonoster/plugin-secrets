import {Command, flags} from "@oclif/command";
import {CLIError} from "@oclif/errors";
import SecretsManager from "../../utils/secrets_manager";
import SecretService from "../../utils/implementation/secrets_service_client";
// Using import will cause: Error: easy_table_1.default is not a constructor
const Table = require("easy-table");

export default class ListCommand extends Command {
  static description = "get a list of fonos secrets";
  static aliases = ["secrets:ls"];
  static flags = {
    size: flags.integer({
      char: "s",
      default: 25,
      description: "secrets of result per page"
    })
  };

  async run() {
    const {flags} = this.parse(ListCommand);
    const _secretsManager = new SecretsManager(new SecretService());
    try {
      const pageSize = flags.size;
      let pageToken = "1";

      const result = await _secretsManager.listSecret({
        pageSize: pageSize,
        pageToken: pageToken
      });
      const list = result.name;
      //Fix return in API
      const l = JSON.parse(JSON.stringify(list));
      pageToken = result.nextPageToken;

      // Dont ask this if is the first time or empty data

      const t = new Table();
      l.forEach((secret: any) => {
        t.cell("Name", secret.name);
        t.newRow();
      });
      if (list.length > 0) console.log(t.toString());
    } catch (e) {
      throw new CLIError(e);
    }
  }
}
