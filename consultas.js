const { Pool } = require("pg");
const config = {
    user: "postgres",
    host: "localhost",
    database: "softlife",
    password: "postgres",
    port: 5432,
};
const pool = new Pool(config);

const insertar = async(datos) => {
    console.log(" datos ", datos);
    const sqlInsert = {
        text: "INSERT INTO usuarios values ($1, $2) RETURNING *;",
        values: datos,
    };
    try {
        const resultado = await pool.query(sqlInsert);
        return resultado.rows;
    } catch (e) {
        console.log(e.code);
        return e;
    }
};

const consultarUsuarios = async() => {
    const sqlSelect = {
        text: "SELECT * FROM usuarios",
    };
    try {
        const resultado = await pool.query(sqlSelect);
        return resultado.rows;
    } catch (e) {
        console.log(e.code);
        return e;
    }
};

const consultarUser = async(datos) => {
    console.log(datos);
    const sqlSelectUser = {
        text: "SELECT * FROM usuarios WHERE email = $1 AND password = $2",
        values: datos,
    };
    try {
        const resultado = await pool.query(sqlSelectUser);
        return resultado;
    } catch (e) {
        console.log(e.code);
        return e;
    }
};

module.exports = { insertar, consultarUsuarios, consultarUser };