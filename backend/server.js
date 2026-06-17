const app = require("./src/app");
const { env } = require("./src/config/env");

app.listen(env.port, () => {
  console.log(`SRMS backend running on port ${env.port}`);
});
