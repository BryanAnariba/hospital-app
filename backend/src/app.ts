import { environmentVars } from "./config"
import { MongoConnection } from "./data";
import { AppRoutes } from "./presentation/app.routes"
import { Server } from "./presentation/server"

async function main (): Promise<void> {
  const server = new Server({port: environmentVars.PORT, publicPath: environmentVars.PUBLIC_FILES, appRoutes: AppRoutes.routes});
  server.startServer();
  await MongoConnection.connectToDB({dbName: environmentVars.MONGO_DBNAME, connectionUrl: environmentVars.MONGO_URL});
}

(async () => {
  await main();
})();
