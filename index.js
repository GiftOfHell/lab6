const express = require("express");
const bodyParser = require("body-parser");

const orderService = require("./db.js");

const app = express();

app.use(bodyParser.json());

app.post("/orders", async (req, res) => {
  try {
    const order = new orderService(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await orderService.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/orders/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const order = await orderService.findById(id);
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/orders/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const order = await orderService.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/orders/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const order = await orderService.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Starting the server on port ${PORT}`);
  });
}
