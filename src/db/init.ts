import Bill from "./models/Bill";
import Item from "./models/Item";

const isDev = true;
const dbInit = async () => {
  Item.sync({ alter: isDev });
  Bill.sync({ alter: isDev });
};
export default dbInit;
