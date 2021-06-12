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
import ISecretsService from "../interfaces/isecrets_service";
import SecretsService from "@fonos/secrets";
import {
  CreateSecretRequest,
  CreateSecretResponse,
  ListSecretRequest,
  GetSecretResponse,
  ListSecretResponse
} from "../types";
export default class SecretService implements ISecretsService {
  _service: SecretsService;
  constructor() {
    this._service = new SecretsService();
  }

  async create(request: CreateSecretRequest): Promise<CreateSecretResponse> {
    const result = await this._service.createSecret(request);
    return result;
  }

  async get(name: string): Promise<GetSecretResponse> {
    const result = await this._service.getSecret(name);
    return result;
  }

  async list(request: ListSecretRequest): Promise<ListSecretResponse> {
    const result = await this._service.listSecret(request);
    return {
      nextPageToken: result.nextPageToken,
      name: result.name
    };
  }

  async delete(name: string): Promise<void> {
    return await this._service.deleteSecret(name);
  }
}
