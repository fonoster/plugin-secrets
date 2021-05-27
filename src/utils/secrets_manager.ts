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
import ISecretsService from "./interfaces/isecrets_service";
import {CreateSecretRequest, CreateSecretResponse} from "./types";

export default class SecretsManager {
  _secretsService: ISecretsService;
  constructor(service: ISecretsService) {
    this._secretsService = service;
  }

  async createSecret(
    request: CreateSecretRequest
  ): Promise<CreateSecretResponse> {
    return this._secretsService.create(request);
  }
}
