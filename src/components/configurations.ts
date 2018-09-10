import configs from '../data/configs';

export default class Configurations {
    get(key: string) {
        return configs[key] ? configs[key] : console.error('config not found');
    }
}
