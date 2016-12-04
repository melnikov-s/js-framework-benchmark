module.exports = {
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: './dist'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};
