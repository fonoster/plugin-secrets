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
const errors_1 = require("@oclif/errors");
const secrets_manager_1 = tslib_1.__importDefault(require("../../utils/secrets_manager"));
const secrets_service_client_1 = tslib_1.__importDefault(require("../../utils/implementation/secrets_service_client"));
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
            const list = result.secrets;
            pageToken = result.nextPageToken;
            const t = new Table();
            list.forEach((secret) => {
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
ListCommand.description = "list of the secrets you have access to";
ListCommand.aliases = ["secrets:ls"];
ListCommand.flags = {
    size: command_1.flags.integer({
        char: "s",
        default: 25,
        description: "secrets of result per page"
    })
};
