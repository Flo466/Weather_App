export function ajaxRequest({ url, method = 'GET', data = null, headers = {} }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        console.log("url :" + url);
        xhr.open(method, url, true);

        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`Erreur HTTP ${xhr.status}: ${xhr.statusText}`));
                }
            }
        };
        xhr.onerror = function () {
            reject(new Error('Erreur réseau'));
        };
        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}