import { Sequelize, Model, DataTypes } from "sequelize";

export class Appointments extends Model {
  static initModel(sequelize: Sequelize) {
    Appointments.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        time: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        link: {
          type: DataTypes.STRING,
        },
        scheduled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        user_email: {
          type: DataTypes.STRING,
        },
        user_phone: {
          type: DataTypes.BIGINT,
        },
        dateid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      { sequelize, tableName: "appointments" },
    );
  }

  static associate(models: any) {
    Appointments.belongsTo(models.Dates, {
      foreignKey: "dateid",
      as: "date",
    });
  }
}
