"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos-plugin-funcs
 *
 * This file is part of Project Fonos
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
require("./config");
const command_1 = require("@oclif/command");
const errors_1 = require("@oclif/errors");
const secrets_manager_1 = tslib_1.__importDefault(require("../../utils/secrets_manager"));
const secrets_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/secrets_service_client"));
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
