import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();

/*
app.get('/airportSearch/', function(req,res,next){

amadeus.referenceData.locations.get({
  keyword: req.query.term,
  subType: 'AIRPORT,CITY'
}).then(function(response){
  res.json(response.data);
  console.log(response.data);
}).catch(function(error){
  console.log("error");
  console.log(error.response);
});
});


*/
