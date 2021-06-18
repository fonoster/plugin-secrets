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
import "../../config";
import {Secret} from "../../utils/types";
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
      const list = result.secrets;
      pageToken = result.nextPageToken;

      const t = new Table();
      list.forEach((secret: Secret) => {
        t.cell("Name", secret.name);
        t.newRow();
      });
      if (list.length > 0) console.log(t.toString());
    } catch (e) {
      throw new CLIError(e);
    }
  }
}
