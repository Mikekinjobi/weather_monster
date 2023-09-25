'use strict';
import { DataTypes, Model } from "sequelize";
import sequelize from "../dbConfig";

  class Temperature extends Model {
  }
  Temperature.init({
    city_id: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    min: DataTypes.INTEGER,
    timestamp: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Temperature',
  });

export default Temperature;