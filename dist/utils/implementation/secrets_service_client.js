"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const secrets_1 = tslib_1.__importDefault(require("@fonos/secrets"));
class SecretService {
    constructor() {
        this._service = new secrets_1.default();
    }
    async create(request) {
        const result = await this._service.createSecret(request);
        return result;
    }
    async get(name) {
        const result = await this._service.getSecret(name);
        return result;
    }
    async list(request) {
        const result = await this._service.listSecret(request);
        return {
            nextPageToken: result.nextPageToken,
            secrets: result.secrets
        };
    }
    async delete(name) {
        return await this._service.deleteSecret(name);
    }
}
exports.default = SecretService;
