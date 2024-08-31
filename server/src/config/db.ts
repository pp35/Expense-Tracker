import { Sequelize } from 'sequelize';

// Use environment variable for database URL or fallback to hardcoded URL
const databaseUrl = process.env.DATABASE_URL || 'postgres://Poornima:poornimap45@localhost:7652/expensetracker';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export default sequelize;
