// import { createPool } from 'mysql2/promise';

// const configCredentials = {
//   DB_URL: 'sisorgcloud-db-instance-1.cgzapfr5plxa.us-east-1.rds.amazonaws.com',
//   DB_USER: 'admin',
//   DB_PASSWORD: 'mrtvas3784',
//   DB_NAME: 'Sisorgcloud'
// };

// /** MySql DB Helper */
// export class DBHelper {
//   /** Configuration Data */
//   private config = configCredentials;

//   constructor() { }

//   /** Creates a new connection to the DB */
//   createConnection = async () => {
//     const pool = createPool({
//       connectionLimit: 10,
//       host: this.config.DB_URL,
//       user: this.config.DB_USER,
//       password: this.config.DB_PASSWORD,
//       database: this.config.DB_NAME
//     });

//     return pool.getConnection();
//   }

//   /**
//    * Generic simple query to DB
//    * @param tableName Table name
//    * @param selectFields Fields from the table to be returned
//    * @param whereClause Where filter clause
//    * @param values Values fro the where filter clause
//    * @returns `rows` from DB
//    */
//   select = async (tableName: string, selectFields: string = '*', whereClause: string = '', whereValues: any[] = []) => {
//     const db = new DBHelper();
//     try {
//       const conn = await db.createConnection();
//       const select = `select ${selectFields} from ${tableName}  ${whereClause === '' ? '' : ' where' + whereClause}`;

//       const [rows] = await conn.query(select, [...whereValues]);
//       conn.release();
//       return rows;
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    * Generic delete query
//    *
//    * @param tableName Table name
//    * @param identifierName Unique Identifier of the row to be deleted
//    * @param identifierValue Identifier value of the row to be deleted
//    * @returns `number` of affected rows
//    */
//   remove = async (tableName: string, identifierName: string, identifierValue: any) => {
//     const db = new DBHelper();
//     const conn = await db.createConnection();
//     await conn.beginTransaction();
//     try {
//       const [ResultSetHeader] = await conn.execute(`delete from ${tableName} where ${identifierName} =?`, [identifierValue]);
//       await conn.commit();
//       conn.release();
//       return ResultSetHeader['affectedRows'];
//     } catch (error) {
//       console.log('db =>', error);
//       conn.rollback();
//       throw error;
//     }
//   }

//   /**
//    * Generic simple execute query (for insert and update)
//    * @param clause Full clause to be executed
//    * @param values Values to be add to execution
//    * @returns `ResultSetHeader` results of the execution
//    */
//   execute = async (clause: string, values: any[]) => {
//     const db = new DBHelper();
//     const conn = await db.createConnection();
//     await conn.beginTransaction();
//     try {
//       const [ResultSetHeader] = await conn.execute(clause, values);
//       await conn.commit();
//       conn.release();
//       return ResultSetHeader;
//     } catch (error) {
//       console.log('db =>', error);
//       conn.rollback();
//       throw error;
//     }
//   }
// }


// /*


//   **
//    * Generic simple insert query
//    * @param insertClause Full insert clause to be executed
//    * @param insertValues Values to be inserted
//    * @returns `any` Identifier of the inserted item
//    *
//    insert = async (insertClause: string, insertValues: any[]) => {
//     const db = new DBHelper();
//     const conn = await db.createConnection();
//     await conn.beginTransaction();
//     try {
//       const [ResultSetHeader] = await conn.execute(insertClause, insertValues);
//       await conn.commit();
//       conn.release();
//       return ResultSetHeader['insertId'];
//     } catch (error) {
//       console.log('db =>', error);
//       conn.rollback();
//       throw error;
//     }
//   }
// */