import { sequelize } from "./index.js";
import { DataTypes, Model } from "sequelize";

// Création du modèle Session
export class Session extends Model {}

Session.init(
  {
    sid: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    sess: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user_sessions",
  }
);

