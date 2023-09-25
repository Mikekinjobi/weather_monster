'use strict';
import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../dbConfig";

  class Cities extends Model {}

  Cities.init({
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'City',
  });

  export default Cities;