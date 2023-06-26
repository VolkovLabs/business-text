import { Configuration, ProvidePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import grafanaConfig from './.config/webpack/webpack.config';

/**
 * Configuration
 */
const config = async (env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);

  /**
   * Merge
   */
  return merge(baseConfig, {
    resolve: {
      alias: {
        handlebars: 'handlebars/dist/handlebars.js',
      },
      fallback: {
        fs: false,
        util: false,
      },
    },
  });
};

export default config;
