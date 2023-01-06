## i-map

i-map is a simple React web application that allows users to create and share interactive maps. It is built using the [React](https://reactjs.org/) framework and [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/).



### Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone
cd i-map
npm install
```

Next, create a `.env` file in the root directory and add your Mapbox API key:

```bash
REACT_APP_MAPBOX_API_KEY=YOUR_MAPBOX_API_KEY
```

Finally, start the development server:

```bash
npm start
```

### Deployment

To deploy the application, run the following command:

```bash
npm run build
```

This will create a `build` directory with a production build of the app. You can then serve it with a static server:

```bash
npm install -g serve
serve -s build
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [React](https://reactjs.org/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
