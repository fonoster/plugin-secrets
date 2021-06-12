import { CreateSecretRequest, CreateSecretResponse, GetSecretResponse, ListSecretRequest, ListSecretResponse } from "../types";
export default interface ISecretsService {
    create(request: CreateSecretRequest): Promise<CreateSecretResponse>;
    list(request: ListSecretRequest): Promise<ListSecretResponse>;
    get(name: string): Promise<GetSecretResponse>;
    delete(name: string): Promise<void>;
}
