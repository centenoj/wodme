import Configurations from './configurations';
import Request from './request';

export default class Controller {
    private configs = new Configurations();
    private _endpoint: string = this.configs.get('endpoint');
    private request = new Request(this._endpoint);

    constructor() {}

    loadData(callback: any) {
        this.request.get(callback);
    }
}