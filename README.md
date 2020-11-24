# sb-data-kondoumh
![Build and publish](https://github.com/kondoumh/sb-data-kondoumh/workflows/Build%20and%20publish/badge.svg)

A PWA for visualizing Scrapbox projects.

- List pages
- Visualize the graph structure between pages

The sample site is hosted at the following URL.

https://sb-data-kondoumh.netlify.app/

This sample site uses the data of the following projects.

- https://scrapbox.io/kondoumh/
- https://scrapbox.io/help-jp/

You can get the JSON format file from

- https://sb-data-kondoumh.netlify.app/data/kondoumh.json
- https://sb-data-kondoumh.netlify.app/data/help-jp.json

To run it in a local environment, create a `data` directly in the project directory, place the above JSON file, and start PWA.

The above JSON files were obtained by sbgraph.

https://github.com/mamezou-tech/sbgraph

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
