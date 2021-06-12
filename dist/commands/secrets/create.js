"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const errors_1 = require("@oclif/errors");
const secrets_manager_1 = require("../../utils/secrets_manager");
const secrets_service_client_1 = require("../../utils/implementation/secrets_service_client");
const getStdin = require("get-stdin-with-tty");
class CreateCommand extends command_1.Command {
    async run() {
        var _a;
        const { args, flags } = this.parse(CreateCommand);
        const _secretsManager = new secrets_manager_1.default(new secrets_service_client_1.default());
        const request = {
            name: args.name,
            secret: (_a = flags["from-literal"]) !== null && _a !== void 0 ? _a : (await getStdin())
        };
        try {
            const result = await _secretsManager.createSecret(request);
            console.log(result.name);
        }
        catch (e) {
            throw new errors_1.CLIError(e);
        }
    }
}
exports.default = CreateCommand;
CreateCommand.description = "this command create a secret in fonos.";
CreateCommand.args = [{ name: "name" }];
CreateCommand.flags = {
    help: command_1.flags.help({ char: "h" }),
    "from-literal": command_1.flags.string({ char: "l", description: "pass from literal" }),
    "from-stdin": command_1.flags.boolean({ char: "s", description: "pass from stdin" })
};
