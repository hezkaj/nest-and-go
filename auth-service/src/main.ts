import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env = require('../env-config') ;
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const port=env.MAIN_PORT
  const app = await NestFactory.create(AppModule)
  const config= new DocumentBuilder()
    .setTitle('To Do')
    .setDescription('Auth-service')
    .setVersion('1.0.0')
    .build()
  const document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(port, ()=>{console.log(`Server run on port ${port}`)})
}
start()
