
interface ConfigInterface {
    API_DOMAIN_URL: string;
  }
  
  class Config implements ConfigInterface{
      API_DOMAIN_URL: string = "";
      constructor (){
  
      }
  
  }
  let config:Config = new Config();
  config.API_DOMAIN_URL = "http://localhost:3000";
  
  export default config;