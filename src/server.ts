import * as express from 'express';
import * as path from 'path';
import container from './inversify.config';
import { ObjectID } from 'mongodb';
import { MongoService, ConfigService, ImageService } from './services';

var configService = container.get(ConfigService);
var mongoService = container.get(MongoService);

function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500)
        .render('error', {
            message: err.message,
            error: err
        });
};

var app = express();

app.use(errorHandler);

app.get('/api/search/:search', async (req, res, next) => {
    try {
        let term = <string>req.params.search;
        var searches = await mongoService.getSearchesCollection();
        searches.insert({ term: term, when: new Date() });

        let imageService = container.get(ImageService);
        res.json(await imageService.getImages(term, 10, req.query.offset || 0));
    }
    catch (err) {
        return next(err);
    }
});

app.get('/api/latest/imagesearch/', async (req, res, next) => {
    try {
        let mongoService = container.get(MongoService);
        let searches = await mongoService.getSearchesCollection();
        return res.json(await searches.find().limit(10).sort({ when: -1 }).toArray());
    }
    catch (err) {
        return next(err);
    }
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(configService.port);