import http from 'node:http'
import url from 'node:url'

let listSales = [];

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/api/lista':
                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(listSales));

                case '/api/lista/pendientes':
                    const pendientes = listSales.filter(item => !item.esCompletado);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(pendientes));

                case '/api/lista/completados':
                    const completados = listSales.filter(item => item.esCompletado);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(completados));

                default:
                    res.writeHead(503, { "content-type": "application/json" });
                    return res.end(JSON.stringify({ message: "endpoint not found" }));

            }
        
        case 'POST':
            switch (url) {
                case 'api/lista':
                    let body = "";
                    req.on("data", (chunk) => {
                            body += chunk.toString();
                    });
            
                    return req.on("end", () => {
                        const { name, description, date, esCompletado  } = JSON.parse(body);
            
                        if (!name || !description || !date || !esCompletado) {
                            res.writeHead(400, { "content-type": "apllication/json" });
                            return res.end(JSON.stringify({ message: "faltan campos" }));
                        }
            
                        listSales.push(data);
            
                        res.writeHead(201, { "content-type": "application/json" });
                        return res.end(JSON.stringify(listSales));
                    });
                
                default:
                    res.writeHead(503, { "content-type": "application/json" });
                    return res.end(JSON.stringify({ message: "endpoint not found" }));
            }
        
        default:
            res.writeHead(503, { "content-type": "application/json" });
            return res.end(JSON.stringify({ message: "endpoint not found" }));
    }
}

const server = http.createServer(processRequest);
 
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});