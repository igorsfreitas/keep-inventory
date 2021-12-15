import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: ADD ENV VARIABLES
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'keep-inventory',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};