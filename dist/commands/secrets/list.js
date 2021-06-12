"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const errors_1 = require("@oclif/errors");
const secrets_manager_1 = require("../../utils/secrets_manager");
const secrets_service_client_1 = require("../../utils/implementation/secrets_service_client");
// Using import will cause: Error: easy_table_1.default is not a constructor
const Table = require("easy-table");
class ListCommand extends command_1.Command {
    async run() {
        const { flags } = this.parse(ListCommand);
        const _secretsManager = new secrets_manager_1.default(new secrets_service_client_1.default());
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
            l.forEach((secret) => {
                t.cell("Name", secret.name);
                t.newRow();
            });
            if (list.length > 0)
                console.log(t.toString());
        }
        catch (e) {
            throw new errors_1.CLIError(e);
        }
    }
}
exports.default = ListCommand;
ListCommand.description = "get a list of fonos secrets";
ListCommand.aliases = ["secrets:ls"];
ListCommand.flags = {
    size: command_1.flags.integer({
        char: "s",
        default: 25,
        description: "secrets of result per page"
    })
};
