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
}

module.exports = new UserModel();
