import {config as dotenvConfig} from "dotenv";
import { registerAs } from '@nestjs/config'
import { DataSource, DataSourceOptions } from "typeorm";


dotenvConfig({ path: '.development.env'})

const config = {
    type: 'postgres',
    database:process.env.NAME_,
    host:process.env.HOST_,
    port:process.env.PORT_,
    username:process.env.USERNAME_,
    password:process.env.PASSWORD_,
    entities:["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities: true,
    logging:true,   
    synchronize: true,
    dropSchema:true
}


export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions)