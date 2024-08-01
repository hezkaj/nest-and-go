import {load} from 'ts-dotenv';

const env = load({
    MAIN_PORT:Number,
    DATA_HOST:String,
    DATA_PORT:Number,
    DATA_USER:String,
    DATA_PASS:String,
    DATA_NAME:String,
    JWT_SECRET:String
})
export=env