const express = require("express")
const dotenv = require("dotenv")
const connectDatabase = require("./config/Database")

const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
const {notFound, errorHandler} = require("./middleware/Error")
const userRouter = require("./routes/userRoute")
const cors = require("cors")
app.use(cors())
dotenv.config()
connectDatabase()

const app = express()
app.use(express.json())
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
// API


app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

//ERROR HANDLER
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 1000
app.listen(PORT, console.log(`server running on port ${PORT}`))
