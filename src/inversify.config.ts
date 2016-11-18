import "reflect-metadata";
import { Container } from 'inversify';
import { ConfigService, MongoService, ImageService } from './services';

var container = new Container();
container.bind<ConfigService>(ConfigService).toSelf().inSingletonScope();
container.bind<MongoService>(MongoService).toSelf();
container.bind<ImageService>(ImageService).toSelf();
export default container;