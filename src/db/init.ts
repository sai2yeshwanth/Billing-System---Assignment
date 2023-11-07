import Bill from "./models/Bill";
import Item from "./models/Item";
import OrderItem from "./models/OrderItem";

const isDev = true;
const dbInit = async () => {
  Item.sync({ alter: isDev });
  Bill.sync({ alter: isDev });
  OrderItem.sync({ alter: isDev });
};
export default dbInit;
