"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/plugin-funcs
 *
 * This file is part of Fonoster
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
require("../../config");
const command_1 = require("@oclif/command");
const cli_ux_1 = require("cli-ux");
const secrets_manager_1 = tslib_1.__importDefault(require("../../utils/secrets_manager"));
const secrets_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/secrets_service_client"));
class DeleteCommand extends command_1.Command {
    async run() {
        const { args } = this.parse(DeleteCommand);
        const _secretsManager = new secrets_manager_1.default(new secrets_service_client_1.default());
        try {
            cli_ux_1.cli.action.start("removing the secret");
            await _secretsManager.deleteSecret(args.name);
            await cli_ux_1.cli.wait(1000);
            cli_ux_1.cli.action.stop("Done");
        }
        catch (e) {
            console.log("Unable to remove!");
        }
    }
}
exports.default = DeleteCommand;
DeleteCommand.description = "remove secret from Fonoster.";
DeleteCommand.aliases = ["secrets:del", "secrets:rm"];
DeleteCommand.args = [{ name: "name" }];
