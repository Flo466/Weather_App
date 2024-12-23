export function ajaxRequest({ url, method = 'GET', data = null, headers = {} }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key]);
        });
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // La requête est terminée
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText); // Parse JSON si possible
                        resolve(response);
                    } catch (error) {
                        resolve(xhr.responseText); // Retourner le texte brut si JSON invalide
                    }
                } else {
                    reject(new Error(`Erreur: ${xhr.status} ${xhr.statusText}`));
                }
            }
        };

        xhr.timeout = 10000; // 10 secondes
        xhr.ontimeout = function () {
            reject(new Error("La requête a expiré."));
        };

        xhr.onerror = function () {
            reject(new Error("Erreur réseau"));
        };

        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }        
    })
}
