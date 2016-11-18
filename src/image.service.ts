import { injectable } from 'inversify';
import { ConfigService } from './config.service';
import search = require('bing.search');

@injectable()
export class ImageService {
    public async getImages(query: string, size: number, offset: number): Promise<any> {
        var searchInstance = new search(process.env.SEARCH_API_KEY);
        return new Promise((resolve, reject) => {
            searchInstance.images(query, {
                top: size,
                skip: offset
            }, (err: any, results: any) => {
                if (err) reject(err);
                resolve(results.map((el: any) => {
                    return {
                        alt: el.title,
                        page: el.sourceUrl,
                        image: el.url
                    };
                }));
            });
        });
    }
}