export enum DevType {
    debug = "debug",
    release = "release",
}


/**
 * API WS 
 */
export class APIHttpController {
    private static _instance: APIHttpController | null = null;

    private _domain: string = "skillstorm.directsense.tw";
    private _ip: string = "localhost";
    private _port: string = "80";
    private _webSocketDebugPort: string = "123";
    private _webSocketReleasePort: string = "4433";
    private _wsBranchUrl: string = "ws";

    static shareDomain: string = "";
    static databaseDomainStr: string = "";
    static prefixUrl: string = "";
    static domainUrl: string = "";
    static wsPreFixUrl: string = "";

    private constructor() { }

    static getInstance(): APIHttpController {
        if (APIHttpController._instance === null) {
            APIHttpController._instance = new APIHttpController();
        }
        return APIHttpController._instance;
    }

    async init(devType: DevType): Promise<void> {
        switch (devType) {
            case DevType.debug:
                APIHttpController.prefixUrl = "http";
                APIHttpController.domainUrl = `${this._ip}:${this._port}`;
                APIHttpController.wsPreFixUrl = `ws://${this._ip}:${this._webSocketDebugPort}/${this._wsBranchUrl}`;
                APIHttpController.databaseDomainStr = `\$ip:\$port`;
                APIHttpController.shareDomain = "cant_use";
                break;
            case DevType.release:
                APIHttpController.prefixUrl = "https";
                APIHttpController.domainUrl = this._domain;
                APIHttpController.wsPreFixUrl = `wss://${this._domain}:${this._webSocketReleasePort}/${this._wsBranchUrl}`;
                APIHttpController.databaseDomainStr = `\$domain`;
                APIHttpController.shareDomain = this._domain;
                break;
        }
    }
}

