const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

module.exports = async function () {
  const envPath = path.resolve(__dirname, "../.env.test");

  fs.writeFileSync(
    envPath,
    'DATABASE_URL="file:./prisma/dev.test.db"\nJWT_SECRET="test-secret"\n'
  );

  console.log("Generating Prisma client...");
  execSync("npx prisma generate", {
    stdio: "inherit",
    env: { ...process.env, DOTENV_CONFIG_PATH: envPath },
  });

  console.log("Resetting test database...");
  execSync(`npx prisma migrate reset --force --skip-seed`, {
    stdio: "inherit",
    env: { ...process.env, DOTENV_CONFIG_PATH: envPath },
  });

  console.log("Test DB prepared (prisma/dev.test.db)");
};