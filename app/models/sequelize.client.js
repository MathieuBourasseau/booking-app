// Sequelize = ORM avec express
import { Sequelize } from "sequelize";
import "dotenv/config";

console.log("RAILWAY ENV → DATABASE_URL =", process.env.DATABASE_URL);


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
