import path from 'node:path';
import express, { Application, Router, json, urlencoded } from "express";
import cors from 'cors';

interface ServerOptions {
  port: number;
  publicPath: string;
  appRoutes: Router;
}

export class Server {

  public readonly app: Application;
  public readonly port: number;
  public readonly publicPath: string;
  public readonly appRoutes: Router;

  constructor ({port, publicPath, appRoutes}: ServerOptions) {
    this.app = express();
    this.port = port;
    this.publicPath = publicPath;
    this.appRoutes = appRoutes;
  }

  public startServer(): void {
    
    // Settings
    this.app.set('PORT', this.port);

    // Middlewares
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({extended: true}));

    // Routes
    this.app.use('/api', this.appRoutes);

    // SPA
    this.app.get('**', (_, res) => {
      const indexPath = path.join(__dirname + '../../../' + this.publicPath + '/index.html');
      res.sendFile(indexPath);
    });

    // Start Server
    this.app.listen(this.app.get('PORT'), () => {
      console.log(`NodeJS Server started on port ${this.app.get('PORT')}`);
    });
  }
}