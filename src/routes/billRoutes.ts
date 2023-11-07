import { Router, Request, Response } from "express";
import Bill from "../db/models/Bill";
import OrderItem from "../db/models/OrderItem";
import { Op, QueryTypes } from "sequelize";
import sequelizeConnection from "../db/config";

const billRoutes = Router();

//function for generate bill id
const getBillId = (min = 0, max = 500000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return `BILL${num.toString().padStart(6, "0")}`;
};

//creating new Bills endpoint
billRoutes.post("/", async (req: Request, res: Response) => {
  try {
    //take data from req.body
    const reqBody = req.body;
    const orderItemData = reqBody.orderItemData ? reqBody.orderItemData : [];
    const amount = reqBody.amount ? reqBody.amount : 0;

    if (orderItemData.length === 0)
      return res.status(401).send({ message: "no items in bill card" });

    if (amount == 0) {
      return res.status(401).send({ message: "error in amount bill" });
    }
    const record = {
      bill_number: await getBillId(),
      amount: amount,
    };
    // create bill id record
    const createBill = await Bill.create(record);

    const modfiedOrderItemData = orderItemData.map((item: any) => {
      return {
        bill_id: createBill.id,
        item_id: item.item_id,
        quantity: item.quantity,
      };
    });
    //query for bulk orderitem
    const createOrderItemRecord = OrderItem.bulkCreate(modfiedOrderItemData);
    return res.status(200).send({
      message: "successfully creata bills",
      data: createBill,
      modfiedOrderItemData,
    });
  } catch (error) {
    return res.status(500).send({ message: `error in billRoutes: ${error}` });
  }
});
//endpoint for my bills routes
billRoutes.get("/my", async (req: Request, res: Response) => {
  try {
    //get all bill
    const getBillsRecords = await Bill.findAll();
    return res.status(200).send({
      message: "Scccessfully get all my bills",
      data: getBillsRecords,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `error in my billRoutes: ${error}` });
  }
});

//endpoint for sales
billRoutes.get("/sales", async (req: Request, res: Response) => {
  try {
    // today sale
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();
    const today = await Bill.sum("amount", {
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
    });
    //month sale
    const month:any = await sequelizeConnection.query(
      `select sum(amount) as amount from public."Bills" where ("createdAt" between (CURRENT_TIMESTAMP - INTERVAL '1 month') and "createdAt");`,
      { type: QueryTypes.SELECT }
    );
    //year sale
    const year :any= await sequelizeConnection.query(
      `select sum(amount) as amount from public."Bills" where ("createdAt" between (CURRENT_TIMESTAMP - INTERVAL '1 year') and "createdAt");`,
      { type: QueryTypes.SELECT }
    );
    const salesData = {
      today : today,
      month : parseInt(month[0]?.amount),
      year : parseInt(year[0]?.amount),
    }
    return res
      .status(200)
      .send({ message: "Successfully get sale", data: salesData });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `error in sales billRoutes: ${error}` });
  }
});

export default billRoutes;
