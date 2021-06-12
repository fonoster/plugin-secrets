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
import {Command} from "@oclif/command";
import {cli} from "cli-ux";
import SecretsManager from "../../utils/secrets_manager";
import SecretService from "../../utils/implementation/secrets_service_client";
export default class DeleteCommand extends Command {
  static description = "remove secret from fonos.";
  static aliases = ["secrets:del", "secrets:rm"];
  static args = [{name: "name"}];

  async run() {
    const {args} = this.parse(DeleteCommand);
    const _secretsManager = new SecretsManager(new SecretService());
    try {
      cli.action.start("removing the secret");
      await _secretsManager.deleteSecret(args.name);
      await cli.wait(1000);
      cli.action.stop("Done");
    } catch (e) {
      console.log("Unable to remove!");
    }
  }
}
