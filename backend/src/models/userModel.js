const { query } = require("../config/database");

function findByEmail(email) {
  return query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]).then((rows) => rows[0]);
}

function findById(id) {
  return query("SELECT id, username, email, role, created_at FROM users WHERE id = ? LIMIT 1", [id]).then(
    (rows) => rows[0],
  );
}

function createUser(connection, { username, email, passwordHash, role }) {
  return connection.execute(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, passwordHash, role],
  );
}

function updateUser(connection, { id, username, email, passwordHash }) {
  if (passwordHash) {
    return connection.execute(
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
      [username, email, passwordHash, id],
    );
  }

  return connection.execute("UPDATE users SET username = ?, email = ? WHERE id = ?", [username, email, id]);
}

function deleteUser(connection, id) {
  return connection.execute("DELETE FROM users WHERE id = ?", [id]);
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateUser,
  deleteUser,
};
