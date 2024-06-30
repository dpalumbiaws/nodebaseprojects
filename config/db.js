// config/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baseprojectdb', 'admin', '16944615', {
  host: 'baseproject.cosaovxh7key.us-east-2.rds.amazonaws.com',
  dialect: 'mysql'
});

export default sequelize;
