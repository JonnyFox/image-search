import { injectable } from "inversify";

@injectable()
export class ConfigService {
    public applicationHost = 'https://fcc-bcknd-image-search.herokuapp.com';
    public connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/local';
    public port = process.env.PORT || 8999;
    public searchesCollectionName = 'searches';
}