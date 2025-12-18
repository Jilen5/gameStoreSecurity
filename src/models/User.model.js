import pool from "../config/db.postgres.js";
import { encrypt, decrypt, hashEmail } from "../utils/crypto.js";

class User{

    static displayWithoutCrypto(user) {
        return {
            id: user.id_user,
            username: user.username,
            email: user.email,
            role: user.rolename
        };
    }

    static displayManyWithoutCrypto(users) {
        return users.map(User.displayWithoutCrypto);
    }

    static async findAll(){
        const result = await pool.query(`
                                        SELECT u.*, r.name AS rolename
                                        FROM users u
                                        JOIN roles r ON u.id_role = r.id_role
                                        `);
        
        return result.rows.map((row) => ({
            ...row,
            username: decrypt(row.username),
            email: decrypt(row.email_enc),
        }));
    }

    static async findById(id) {
        const result = await pool.query(`SELECT u.*, r.name AS rolename
                                         FROM users AS u 
                                         INNER JOIN roles AS r 
                                         ON u.id_role = r.id_role 
                                         WHERE id_user = $1`, 
                                         [id]);
        
        const row = result.rows[0];
        if (!row) return null;

        row.username = decrypt(row.username);
        row.email = decrypt(row.email_enc);

        return row;
    }

    static async findByEmail(email) {
        const emailHash = hashEmail(email);

        const result = await pool.query(`SELECT u.*, r.name AS rolename
                                         FROM users u
                                         JOIN roles r ON u.id_role = r.id_role
                                         WHERE u.email_hash = $1`,
                                         [emailHash]);
        
        const row = result.rows[0];
        if (!row) return null;

        row.username = decrypt(row.username);
        row.email = decrypt(row.email_enc);

        return row;
    }

    static async create( username, email, password, id_role ){
        const encUsername = encrypt(username);
        const encEmail = encrypt(email);
        const emailHash = hashEmail(email);

        const result = await pool.query(
          "INSERT INTO users(username, email_enc, email_hash, password, id_role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [encUsername, encEmail, emailHash, password, id_role]
        );

        const user = result.rows[0];

        const roleRes = await pool.query("SELECT name FROM roles WHERE id_role = $1", [user.id_role]);
        
        user.rolename = roleRes.rows[0].name;
        user.username = decrypt(user.username);
        user.email = decrypt(user.email_enc);

        return user;
    }

    static async update(id, { username, email, password }) {
        const fields = [];
        const values = [];
        let idx = 1;

        if (username) {
            fields.push(`username = $${idx++}`);
            values.push(encrypt(username));
        }

        if (email) {
            fields.push(`email_enc = $${idx++}`);
            values.push(encrypt(email));

            fields.push(`email_hash = $${idx++}`);
            values.push(hashEmail(email));
        }

        if (password) {
            fields.push(`password = $${idx++}`);
            values.push(password);
        }

        if (!fields.length) return this.findById(id);

        const sql = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id_user = $${idx}
            RETURNING *
        `;
        values.push(id);

        const result = await pool.query(sql, values);
        const row = result.rows[0];

        row.username = decrypt(row.username);
        row.email = decrypt(row.email_enc);

        return row;
    }

    static async delete(id) {
        const result = await pool.query("DELETE FROM users WHERE id_user = $1", [id]);
        return result.rowCount;
    }
}

export default User;