"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SecretsManager {
    constructor(service) {
        this._secretsService = service;
    }
    async createSecret(request) {
        return this._secretsService.create(request);
    }
    async listSecret(request) {
        return await this._secretsService.list(request);
    }
    async getSecret(name) {
        return await this._secretsService.get(name);
    }
    async deleteSecret(name) {
        return await this._secretsService.delete(name);
    }
}
exports.default = SecretsManager;
