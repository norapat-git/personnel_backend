var oracledb = require("oracledb");
const dbConfig = require("../../config/db/dbconfig.js");
const dbConfigPool = require('../../config/db/dbconfigpool');

("use strict");
Error.stackTraceLimit = 50;

class Model {


    // ---- insert DbTx
    static async withTransaction(handler) {
        const pool = await dbConfigPool;
        const connection = await pool.getConnection();

        try {
            const result = await handler(connection); // ให้ controller ส่งงานเข้ามา
            await connection.commit();
            return result;
        } catch (err) {
            try { await connection.rollback(); } catch (e) { console.error("rollback error:", e); }
            throw err;
        } finally {
            try { await connection.close(); } catch (e) { console.error("close error:", e); }
        }
    }

    // ----------- execute by transaction -------------------
    static async executeMany(connection, sql, data = [], options = {}) {
        const execOptions = { autoCommit: false, ...options }; // สำคัญ
        const result = await connection.executeMany(sql, data, execOptions);
        return result;
    }

    static async executeOne(connection, sql, binds = {}, options = {}) {
        const execOptions = { autoCommit: false, ...options };
        const result = await connection.execute(sql, binds, execOptions);
        return result;
    }

};

module.exports = Model;
