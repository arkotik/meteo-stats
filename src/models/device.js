import { modelOptions }     from '../../lib/defaults';

export default function (sequelize, DataTypes) {
  const Device = sequelize.define('Device', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    api_token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_enabled: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    last_activity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    ...modelOptions,
    tableName: 'device',
  });
  Device.associate = function (models) {
    // associations can be defined here
  };
  return Device;
};
