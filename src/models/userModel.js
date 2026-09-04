const pool = require("../configure/neon");

class UserModel {
  async createUser({ first_name, last_name, mobile_number, email, role, status }) {
    const result = await pool.query(
      `
        INSERT INTO "user"
        ("first_name", "last_name", "mobile_number", "email", "role", "status")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `,
      [first_name, last_name, mobile_number, email, role, status],
    );
    return result.rows[0];
  }

  async deleteUser(id) {
    const result = await pool.query(
      `
      DELETE FROM "user"
      WHERE "id"=$1
      RETURNING *;
      `,
      [id],
    );
    return result.rows[0];
  }

  async getUser(id) {
    const result = await pool.query(
      `
      SELECT * 
      FROM "user" 
      WHERE "id"=$1;
      `,
      [id],
    );
    return result.rows[0];
  }

  async getAllUsers() {
    const result = await pool.query(
      `
      SELECT * 
      FROM "user" 
      ORDER BY "id";
      `,
    );
    return result.rows;
  }
}

module.exports = new UserModel();
