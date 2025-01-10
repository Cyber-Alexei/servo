import { DataTypes, Model, Sequelize } from "sequelize";

export class Dates extends Model {
  static initModel(sequelize: Sequelize) {
    Dates.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        summary: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        timezone: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        admin_email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      { sequelize, tableName: "dates" },
    );
  }

  static associate(models: any) {
    Dates.hasMany(models.Appointments, {
      foreignKey: "dateid",
      as: "appointments",
    });
  }
}
