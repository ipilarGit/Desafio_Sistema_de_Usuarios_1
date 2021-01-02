const http = require("http");
const fs = require("fs");
const { insertar, consultarUsuarios, consultarUser } = require("./consultas");

const server = http.createServer(async(req, res) => {
    if (req.url == "/" && req.method === "GET") {
        res.setHeader("content-type", "text/html");
        const html = fs.readFileSync("index.html", "utf8");
        res.end(html);
    };

    // Req.1: Disponibilizar una ruta POST /usuario que utilice una función asíncrona para
    // emitir una consulta SQL y almacenar un nuevo usuario en la tabla usuarios.
    if (req.url == "/usuario" && req.method === "POST") {
        let body = "";
        req.on("data", (datos) => {
            body += datos;
        });
        req.on("end", async() => {
            const data = JSON.parse(body);
            const datos = Object.values(data);
            const respuestaInsertar = await insertar(datos);
            res.end(JSON.stringify(respuestaInsertar));
        });
    };

    // Req.2: Disponibilizar una ruta POST /login que utilice una función
    // asíncrona para emitir una consulta SQL, valide el correo y contraseña
    // recibido en la consulta.
    if (req.url == "/login" && req.method === "POST") {
        let body = "";
        req.on("data", (datos) => {
            body += datos;
        });
        req.on("end", async() => {
            const data = JSON.parse(body);
            const datos = Object.values(data);
            const respuestaUser = await consultarUser(datos);
            console.log(" respuestaUser", respuestaUser);
            if (respuestaUser.rowCount == 0) {
                res.writeHead(404, "Usuario No Existe");
                console.log("Usuario no existe");
                res.end();
            } else {
                res.end(JSON.stringify(respuestaUser));
            }
        });
    };

    // Req.3: Disponibilizar una ruta GET /usuarios que utilice una función asíncrona
    // para emitir una consulta SQL y devolver todos los usuarios de la tabla usuarios
    if (req.url == "/usuarios" && req.method === "GET") {
        const respuestaConsulta = await consultarUsuarios();
        res.end(JSON.stringify(respuestaConsulta));
    }
});

server.listen(3000, () => console.log("Server ON"));