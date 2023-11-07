import { Dialect, Sequelize } from 'sequelize';

const dbHost = process.env.RDS_HOSTNAME;
const dbPort = process.env.RDS_PORT
const dbName = process.env.RDS_DB_NAME as string;
const dbUser = process.env.RDS_USERNAME as string;

const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.RDS_PASSWORD;

function getConnection() {
       return new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        port: parseInt(dbPort || '5432'),
        dialect: 'postgres',
      });
}

const sequelizeConnection = getConnection()


export default sequelizeConnection;