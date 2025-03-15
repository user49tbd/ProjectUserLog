const proxy = [
    {
      context: ["/api/"],
      target: "http://localhost:8080/",
      secure: false,
      logLevel: "debug"
    },
    {
      context: ["/login"],
      target: "http://localhost:8080",
      secure: false,
      logLevel: "debug",
      changeOrigin: true
    }
  ];
  
  module.exports = proxy;