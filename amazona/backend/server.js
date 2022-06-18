const express = require("express");
const data = require('./data')
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Amazon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect database");
  })
  .catch((err) => {
    console.log("databse disconnected");
  });

app.use("/api/users", userRouter);

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(500).json({ message: "prdocut is not found" });
  }
});

app.listen(8000, () => {
  console.log("serve on running port 8000");
});
