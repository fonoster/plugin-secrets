import ISecretsService from "./interfaces/isecrets_service";
import { CreateSecretRequest, CreateSecretResponse, ListSecretRequest, GetSecretResponse, ListSecretResponse } from "./types";
export default class SecretsManager {
    _secretsService: ISecretsService;
    constructor(service: ISecretsService);
    createSecret(request: CreateSecretRequest): Promise<CreateSecretResponse>;
    listSecret(request: ListSecretRequest): Promise<ListSecretResponse>;
    getSecret(name: string): Promise<GetSecretResponse>;
    deleteSecret(name: string): Promise<void>;
}
