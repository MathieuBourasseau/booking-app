// Sequelize = ORM avec express
import { Sequelize } from "sequelize";
import "dotenv/config";

console.log("ENV DEBUG → keys contenant APP / PORT / DATA :");
console.log(
  Object.keys(process.env).filter(
    (k) => k.includes("APP") || k.includes("PORT") || k.includes("DATA")
  )
);
console.log("ENV DEBUG → APP_ENV =", process.env.APP_ENV);
console.log("ENV DEBUG → PORT =", process.env.PORT);
console.log("ENV DEBUG → DATABASE_URL =", process.env.DATABASE_URL);


const isProduction = process.env.APP_ENV === "production";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

// Test connection
try {
  await sequelize.authenticate();
  console.log("Connection to the database has been established successfully. ✅");
} catch (error) {
  console.error("Unable to connect to the database. ❌");
  console.error(error);
}
