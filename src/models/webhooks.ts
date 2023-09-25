'use strict';
import { DataTypes, Model } from "sequelize";
import sequelize from "../dbConfig";

  class Webhooks extends Model {
  }
  Webhooks.init({
    city_id: DataTypes.INTEGER,
    callback_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Webhooks',
  });

export default Webhooks;