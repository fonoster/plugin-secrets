import ISecretsService from "../interfaces/isecrets_service";
import SecretsService from "@fonos/secrets";
import { CreateSecretRequest, CreateSecretResponse, ListSecretRequest, GetSecretResponse, ListSecretResponse } from "../types";
export default class SecretService implements ISecretsService {
    _service: SecretsService;
    constructor();
    create(request: CreateSecretRequest): Promise<CreateSecretResponse>;
    get(name: string): Promise<GetSecretResponse>;
    list(request: ListSecretRequest): Promise<ListSecretResponse>;
    delete(name: string): Promise<void>;
}
