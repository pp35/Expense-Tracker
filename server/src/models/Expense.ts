import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Expense extends Model {
  public id!: number;
  public userId!: number;
  public category!: string;
  public amount!: number;
  public description!: string;
  public date!: Date;
}

Expense.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Expense',
});

export default Expense;
