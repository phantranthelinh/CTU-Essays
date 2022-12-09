const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./config/Database")
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
const reviewRouter = require("./routes/reviewRoute")
const importRouter = require("./routes/importRoute")
const staffRouter = require("./routes/staffRoute")
const staffTypeRouter = require("./routes/staffTypeRoute")
const {notFound, errorHandler} = require("./middleware/error")
const customerRouter = require("./routes/customerRoute")
var cors = require("cors")

dotenv.config()
connectDatabase()

const app = express()
app.use(cors()) 
app.use(express.json({limit: "100mb"}))
const bodyParser = require("body-parser")
const morgan = require("morgan")
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ limit: "100mb" , extended: true }));

// API
//PRODUCT ROUTE
app.use("/api/products", productRouter)
//USER ROUTE
app.use("/api/customers", customerRouter)
//ORDER ROUTE
app.use("/api/orders", orderRouter)
//REVIEWS ROUTE
app.use("/api/reviews", reviewRouter)
//STAFF ROUTE
app.use("/api/staffs", staffRouter)
//STAFF TYPE ROUTE
app.use("/api/stafftypes", staffTypeRouter)

// IMPORT DATA ROUTE 
app.use("/api/import", importRouter)

//ERROR HANDLER
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`server running on port ${PORT}`))
