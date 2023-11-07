import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface BillAttributes {
  id: number;
  bill_number: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface billInput extends Optional<BillAttributes, "id"> {}

export interface billOutput extends Required<BillAttributes> {}

class Bill extends Model<BillAttributes, billInput> implements BillAttributes {
  public id!: number;
  public bill_number!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}
Bill.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    bill_number: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Bill;
