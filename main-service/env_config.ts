import {load} from 'ts-dotenv';

const env = load({
    SERVER_PORT:Number,
    DATA_HOST:String,
    DATA_PORT:Number,
    DATA_USER:String,
    DATA_PASSWORD:String,
    DATA_NAME:String,
    JWT_SECRET:String
})
export = env;