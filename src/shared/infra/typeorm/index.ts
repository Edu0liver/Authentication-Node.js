import { Connection, createConnection } from 'typeorm';

const connection: Connection = await createConnection()

export { connection }