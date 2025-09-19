import { sequelize } from "../app/models/sequelize.client.js";

console.log('Création des tables...🚧')
await sequelize.sync( { force: true} ); // On crée les tables à partir des models
console.log('Tables créées ✅');

await sequelize.close();