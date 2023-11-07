import Item from "./models/Item"


const isDev = true
const dbInit = async() => {
    Item.sync({alter:isDev})
}
export default dbInit