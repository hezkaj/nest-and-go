import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import env = require('../env_config') ;
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
async function start() {
  const port=env.SERVER_PORT || 5000
  const app = await NestFactory.create(AppModule)
  const config= new DocumentBuilder()
    .setTitle('To Do')
    .setVersion('1.0.0')
    .addTag('Main-service')
    .build()
  const document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls:['amqp://myrabbit:5672'],
      queue: 'auth_queue',
      queueOptions: {
        durable: false
      }
    }
  })

  await app.startAllMicroservices()
  
  await app.listen(port, ()=>{console.log(`Server run on port ${port}`)})
}
start()