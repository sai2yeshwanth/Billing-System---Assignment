import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";




interface ItemAttributes {
    id: number,
    name: string,
    price : number,

    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export interface ItemInput extends Optional<ItemAttributes, "id"> { }

export interface ItemOutput extends Required<ItemAttributes> { }

class Item
    extends Model<ItemAttributes, ItemInput>
    implements ItemAttributes {
   


    public id!: number;
    public name!: string;
    public price!: number;



    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at!: Date;
}
Item.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        price:{
            type: DataTypes.INTEGER,
               
        }
    },

    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
    })

export default Item