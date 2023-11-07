import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface OrderItemAttributes {
  id: number;
  bill_id: number;
  item_id: number;
  quantity: number;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface OrderItemInput extends Optional<OrderItemAttributes, "id"> {}

export interface OrderItemOutput extends Required<OrderItemAttributes> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemInput> implements OrderItemAttributes {
  public id!: number;
  public bill_id!: number;
  public item_id!: number;
  public quantity!:number

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}
OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    bill_id: {
      type: DataTypes.INTEGER,
    },
    item_id: {
      type: DataTypes.INTEGER,
    },
    quantity:{
      type: DataTypes.INTEGER,

    }
  },

  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default OrderItem;
