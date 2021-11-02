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
import "../../config";
import {Command, flags} from "@oclif/command";
import {CLIError} from "@oclif/errors";
import SecretsManager from "../../utils/secrets_manager";
import SecretService from "../../utils/implementation/secrets_service_client";
import {CreateSecretRequest} from "../../utils/types";
const getStdin = require("get-stdin-with-tty");

export default class CreateCommand extends Command {
  static description = "create a Fonoster secret.";

  static args = [{name: "name"}];
  static flags = {
    help: flags.help({char: "h"}),
    "from-literal": flags.string({char: "l", description: "pass from literal"}),
    "from-stdin": flags.boolean({char: "s", description: "pass from stdin"})
  };

  async run() {
    const {args, flags} = this.parse(CreateCommand);
    const _secretsManager = new SecretsManager(new SecretService());
    let secret;
    if (flags["from-stdin"]) {
      secret = await getStdin();
    } else {
      secret = flags["from-literal"];
    }

    if (!args.name || !secret) {
      throw new CLIError(
        "Cant create a secret without a name or a secret-value. Type [secrets:create --help] for more information"
      );
    }

    const request: CreateSecretRequest = {
      name: args.name,
      secret
    };
    
    try {
      const result = await _secretsManager.createSecret(request);
      console.log(result.name);
    } catch (e) {
      throw new CLIError(e);
    }
  }
}
