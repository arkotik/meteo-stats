import { modelOptions }     from '../../lib/defaults';

export default (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    humidity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    device_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  }, {
    ...modelOptions,
    tableName: 'task',
  });
  Data.associate = function (models) {
    // associations can be defined here
  };
  return Data;
};
