import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function globalSetup() {
  const envPath = path.resolve(__dirname, "../.env.test");

  fs.writeFileSync(
    envPath,
    'DATABASE_URL="file:./prisma/dev.test.db"\nJWT_SECRET="test-secret"\n'
  );

  console.log("⚙️  Generating Prisma client...");
  execSync("npx prisma generate", {
    stdio: "inherit",
    env: { ...process.env, DOTENV_CONFIG_PATH: envPath },
  });

  console.log("🧹 Resetting test database...");
  execSync(`npx prisma migrate reset --force --skip-seed`, {
    stdio: "inherit",
    env: { ...process.env, DOTENV_CONFIG_PATH: envPath },
  });

  console.log("✅ Test DB prepared (prisma/dev.test.db)");
}
