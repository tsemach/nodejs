import { Config } from '../config/config'
import { Sequelize } from 'sequelize';

/**
 export interface PgConfigType {
    dbname: string;
    host: string;
    port: number;
    username: string;
    password: string;
    dbInstanceIdentifier?: string;
    engine?: string;
    resourceId?: string;
    logging?: boolean;
  }
 */
export class Postgres {    
  private _sequelize: Sequelize
  
  constructor() {
  }
  
  connect() {
    const database = Config.pg.database
    const host = Config.pg.host
    const port = Config.pg.port    
    
    const dbUri = `postgres://${host}:${port}/${database}`;    
    console.log('going to connect to postgres:', dbUri)    

    this._sequelize = new Sequelize(database, Config.pg.username, Config.pg.password, {
      host,
      port,
      dialect: 'postgres'
    })
    // this._sequelize = new Sequelize(dbUri, {
    //   username: Config.db.dbUserName, 
    //   password: Config.db.dbPassword, 
    //   logging: false,
    //   define: {
    //     underscored: true,
    //   },
    //   pool: {
    //     max: 1,
    //     min: 1,
    //     acquire: 30000,
    //     idle: 300,
    //   }
    // });

    return this;
  }

  get sequelize() {
    return this._sequelize
  }
}
 
