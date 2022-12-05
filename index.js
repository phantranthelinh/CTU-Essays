const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./config/Database")
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
const reviewRouter = require("./routes/reviewRoute")
const importRouter = require("./routes/importRoute")
const {notFound, errorHandler} = require("./middleware/error")
const userRouter = require("./routes/userRoute")
var cors = require("cors")

dotenv.config()
connectDatabase()

const app = express()
app.use(cors()) 
app.use(express.json())
const bodyParser = require("body-parser")
const morgan = require("morgan")
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ limit: "100mb" , extended: true }));

// API

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)

// IMPORT DATA API 
app.use("/api/import", importRouter)

//ERROR HANDLER
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`server running on port ${PORT}`))
