const config = require("./config");

const connectionTest = () => {
  config
    .authenticate()
    .then(() => {
      console.log("Conexão feita com sucesso");
    })
    .catch((e) => {
      console.error(e, "Não foi possível conectar");
    });
};
module.exports = connectionTest;
