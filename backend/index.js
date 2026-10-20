require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const cors = require("cors");




const { HoldingsModel } = require("./model/HoldingsModels");
const {PositionsModel} = require ("./model/PositionsModel");
const{OrdersModel} =  require("./model/OrdersModel");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const requireAuth = require("./middleware/requireAuth");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://tradesphere-frontend-one.vercel.app",
     "https://tradesphere-dashboard-three.vercel.app",
    ],
    credentials: true,
  })
);

app.use(bodyParse.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Register authentication routes
app.use("/api/auth", authRoutes);




// app.get("/addHoldings", async (requestAnimationFrame, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((iteam) => {
//     let newHolding = new HoldingsModel({
//       name: iteam.name,
//       qty: iteam.qty,
//       avg: iteam.avg,
//       price: iteam.price,
//       net: iteam.net,
//       day: iteam.day,
//     });
//     newHolding.save();
//   });
//   res.send("Done!")
// });

// app.get("/addPosition", async (req, res) => {
//     try {
//         const tempPositions = [
//             {
//                 product: "CNC",
//                 name: "EVEREADY",
//                 qty: 2,
//                 avg: 316.27,
//                 price: 312.35,
//                 net: "+0.58%",
//                 day: "-1.24%",
//                 isLoss: true,
//             },
//             {
//                 product: "CNC",
//                 name: "JUBLFOOD",
//                 qty: 1,
//                 avg: 3124.75,
//                 price: 3082.65,
//                 net: "+10.04%",
//                 day: "-1.35%",
//                 isLoss: true,
//             },
//         ];

//         await PositionsModel.insertMany(tempPositions);

//         res.send("Positions added successfully!");
//     } catch (error) {
//         console.error("Error adding positions:", error);
//         res.status(500).send("Failed to add positions");
//     }
// });

// GET ALL HOLDINGS — Login required
app.get("/allHoldings", requireAuth, async (req, res) => {
    try {
        const allHoldings = await HoldingsModel.find({
            userId: req.session.userId
        });

        res.json(allHoldings);
    } catch (error) {
        console.error("Error fetching holdings:", error);
        res.status(500).json({
            message: "Failed to fetch holdings"
        });
    }
});




// GET ALL POSITIONS — Login required
app.get("/allPositions", requireAuth, async (req, res) => {
    try {
        const allPositions = await PositionsModel.find({
            userId: req.session.userId
        });

        res.json(allPositions);
    } catch (error) {
        console.error("Error fetching positions:", error);
        res.status(500).json({
            message: "Failed to fetch positions"
        });
    }
});




// GET ALL ORDERS — Login required
app.get("/allOrders", requireAuth, async (req, res) => {
    try {
        const allOrders = await OrdersModel.find({
            userId: req.session.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json(allOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);

        return res.status(500).json({
            message: "Failed to fetch order history.",
        });
    }
});






// BUY AND SELL STOCKS — Login required
app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { name, qty, price, mode } = req.body;

    // 1. Validate request
    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(Number(qty)) ||
      Number(qty) <= 0 ||
      !Number.isFinite(Number(price)) ||
      Number(price) <= 0 ||
      !["BUY", "SELL"].includes(mode)
    ) {
      return res.status(400).json({
        message: "Please provide a valid stock name, quantity, price, and order mode.",
      });
    }

    const stockName = name.trim().toUpperCase();
    const quantity = Number(qty);
    const stockPrice = Number(price);

    // 2. Find existing holding and position
    let holding = await HoldingsModel.findOne({
      userId,
      name: stockName,
    });

    let position = await PositionsModel.findOne({
      userId,
      name: stockName,
    });

    // 3. BUY
    if (mode === "BUY") {
      // Update or create holding
      if (holding) {
        const totalQty = holding.qty + quantity;

        const newAverage =
          (holding.avg * holding.qty + stockPrice * quantity) / totalQty;

        holding.qty = totalQty;
        holding.avg = Number(newAverage.toFixed(2));
        holding.price = stockPrice;

        await holding.save();
      } else {
        holding = await HoldingsModel.create({
          userId,
          name: stockName,
          qty: quantity,
          avg: stockPrice,
          price: stockPrice,
          net: "0%",
          day: "0%",
        });
      }

      // Update or create position
      if (position) {
        const totalQty = position.qty + quantity;

        const newAverage =
          (position.avg * position.qty + stockPrice * quantity) / totalQty;

        position.qty = totalQty;
        position.avg = Number(newAverage.toFixed(2));
        position.price = stockPrice;

        await position.save();
      } else {
        await PositionsModel.create({
          userId,
          product: "CNC",
          name: stockName,
          qty: quantity,
          avg: stockPrice,
          price: stockPrice,
          net: "0%",
          day: "0%",
          isLoss: false,
        });
      }
    }

    // 4. SELL
    if (mode === "SELL") {
      // Validate available quantity before modifying data
      if (!holding || holding.qty < quantity) {
        return res.status(400).json({
          message: !holding
            ? "You do not own this stock."
            : "You cannot sell more shares than you own.",
        });
      }

      // Update holding
      if (holding.qty === quantity) {
        await HoldingsModel.deleteOne({
          _id: holding._id,
          userId,
        });
      } else {
        holding.qty -= quantity;
        holding.price = stockPrice;
        await holding.save();
      }

      // Update position
      if (position) {
        if (position.qty <= quantity) {
          await PositionsModel.deleteOne({
            _id: position._id,
            userId,
          });
        } else {
          position.qty -= quantity;
          position.price = stockPrice;
          await position.save();
        }
      }
    }

    // 5. Save order history
    const newOrder = await OrdersModel.create({
      userId,
      name: stockName,
      qty: quantity,
      price: stockPrice,
      mode,
    });

    return res.status(201).json({
      message:
        mode === "BUY"
          ? "Stock purchased successfully!"
          : "Stock sold successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error processing stock order:", error);

    return res.status(500).json({
      message: "Failed to process the stock order.",
    });
  }
});





mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });