import loadEnvironment from './loadEnviroment';

const env = {
  API_URL: loadEnvironment('API_URL'),
};

export default env;
