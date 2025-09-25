import { sequelize } from "../app/models/index.js";

console.log('Création des tables...🚧')
await sequelize.sync( { alter: true} ); // On crée les tables à partir des models
console.log('Tables créées ✅');

await sequelize.close();