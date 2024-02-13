// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';



const config = {
    //entry: './src/main.mjs',
    entry: {
        main: {
            import: './src/main.mjs',
            dependOn: 'shared',
        },
        GameObject: {
            import: './src/GameObject.mjs',
            dependOn: 'shared',
        },
        MainMenu: {
            import: './src/screens/MainMenu.mjs',
            dependOn: 'shared',
        },
        PlayScreen: {
            import: './src/screens/PlayScreen.mjs',
            dependOn: 'shared',
        },
        WinScreen: {
            import: './src/screens/WinScreen.mjs',
            dependOn: 'shared',
        },
        LoseScreen: {
            import: './src/screens/LoseScreen.mjs',
            dependOn: 'shared',
        },
        Assets: {
            import: './src/Assets.mjs',
            dependOn: 'shared',
        },
        Asteroid: {
            import: './src/Asteroid.mjs',
            dependOn: 'shared',
        },
        OxygenMeter: {
            import: './src/OxygenMeter.mjs',
            dependOn: 'shared',
        },
        ParallaxLayers: {
            import: './src/ParallaxLayers.mjs',
            dependOn: 'shared',
        },
        Particles: {
            import: './src/Particles.mjs',
            dependOn: 'shared',
        },
        shared: 'pixi.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    optimization: {

        runtimeChunk: 'single',

    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
