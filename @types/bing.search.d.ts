// declare namespace BingSearch {
//     class search {
//         constructor(api: string);
//         images(query: any, opts: any, allback: (err: any, res: any) => void): any;
//     }
// }

// declare module "bing.search" {
//     export = BingSearch;
// }

declare class Search {
    constructor(api: string);
    images(query: any, opts: any, allback: (err: any, res: any) => void): any;
}

declare module "bing.search" {
    export = Search;
}
