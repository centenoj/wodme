export default class Request {
    constructor(private url: string) {}

    private send(callback: any, method: any, data?: any, options?: any) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    callback(xhttp.responseText);
                } else {
                    callback({ error: true });
                }
            }
        };

        xhttp.open(method, this.url + '?' + new Date().getTime(), true);

        xhttp.send(data);
    }

    get(callback: any) {
        this.send(callback, 'GET');
    }

    post(body: any, options: any, callback: any) {
        this.send(callback, 'POST', body, options);
    }
}
