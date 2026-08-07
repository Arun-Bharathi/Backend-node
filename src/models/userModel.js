const pool = require("../configure/neon");

class UserModel {
  async createUser({ name, age }) {
    const result = await pool.query(
      `
        INSERT INTO "user"
        ("name", "age")
        VALUES ($1, $2)
        RETURNING *;
      `,
      [name, age],
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
