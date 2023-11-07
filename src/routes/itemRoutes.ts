import { Router, Request, Response } from "express";
import Item from "../db/models/Item";
import OrderItem from "../db/models/OrderItem";
import sequelize from "sequelize";

const itemRoutes = Router();

//creating items end point
itemRoutes.post("/", async (req: Request, res: Response) => {
  try {
    //take data from req.body
    const reqBody = req.body;
    //validate data
    const name = reqBody.name ? reqBody.name.toLowerCase() : "";
    if (name.length === 0)
      return res.status(400).send({
        message: "Please enter a name",
      });
    const price = reqBody.price ? reqBody.price : 0;
    if (price === 0)
      return res.status(400).send({
        message: "Please enter a price",
      });

    // check the item if item exist update
    const checkItemRecord = await Item.findOne({
      where: { name: name },
    });
    if (checkItemRecord) {
      //update qurey
      const updateRecord = await Item.update(
        { price: price },
        { where: { id: checkItemRecord.id } }
      );

      return res
        .status(201)
        .send({ message: "successfully update a item", updateRecord });
    }
    // query for creating item record
    const createItemRecord = await Item.create({
      name: name,
      price: price,
    });
    return res
      .status(201)
      .send({ message: "successfully created a item", data: createItemRecord });
  } catch (error) {
    return res.status(500).send({ message: `error in itemRoutes: ${error}` });
  }
});
//end point get all items
itemRoutes.get("/", async (req: Request, res: Response) => {
  try {
    //get all items query
    const getAllItems = await Item.findAll();

    const soldData = await OrderItem.findAll({
      attributes: [
        "item_id",
        [sequelize.fn("sum", sequelize.col("quantity")), "quantity"],
      ],
      group: ["item_id"],
    });
    //hashmap soldData
    const hashmapSoldData = new Map(
      soldData.map((item: any) => [item.item_id, item])
    );
    const modfiedGetAllData = getAllItems.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        sold: hashmapSoldData.has(item.id)
          ? parseInt(hashmapSoldData.get(item.id).quantity)
          : 0,
      };
    });
    return res.status(200).send({
      message: "successfully get all items",
      data: modfiedGetAllData,
    });
  } catch (error) {
    return res.status(500).send({ message: `error in itemRoutes: ${error}` });
  }
});
export default itemRoutes;
