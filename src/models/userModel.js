const pool = require("../configure/neon");

class UserModel {
  async createUser({
    first_name,
    last_name,
    mobile_number,
    email,
    role,
    status,
  }) {
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

  async updateUser({
    id,
    first_name,
    last_name,
    mobile_number,
    email,
    role,
    status,
  }) {
    const result = await pool.query(
      `
      UPDATE "user"
      SET "first_name" = $2,
          "last_name" = $3,
          "mobile_number" = $4,
          "email" = $5,
          "role" = $6,
          "status" = $7
      WHERE "id" = $1
      RETURNING *;
      `,
      [id, first_name, last_name, mobile_number, email, role, status],
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

  async getAllUsers({ input = "", page = 1, size = 10 }) {
    const offset = (page - 1) * size;
    const result = await pool.query(
      `
      SELECT * 
      FROM "user" 
      WHERE "first_name" ILIKE $1
        OR "last_name" ILIKE $1
      ORDER BY "id"
      LIMIT $2
      OFFSET $3;
      `,
      [`%${input}%`,size, offset],
    );
    return result.rows;
  }
}

module.exports = new UserModel();
