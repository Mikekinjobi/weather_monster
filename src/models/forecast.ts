'use strict';
import { DataTypes, Model } from "sequelize";
import sequelize from "../dbConfig";

  class Forecast extends Model {
  }
  Forecast.init({
    city_id: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
    min: DataTypes.INTEGER,
    sample: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Forecast',
  });

  export default Forecast