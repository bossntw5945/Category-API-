require("dotenv").config();

const express = require("express");
const productRoutes = require("./src/routes/product.route");
const categoryRoute = require("./src/routes/category.route");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is running"});
});


app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});