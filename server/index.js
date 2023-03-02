import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("hej då");
});

const channelsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("channels", channelsSchema);

app.get("/channels", async (req, res) => {
  //   await Channel.insertMany([{ name: "batch 5" }, { name: "general" }]);
  const channels = await Channel.find();
  res.send(channels);
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://samatar:samatar@cluster0.um40t1s.mongodb.net/?retryWrites=true&w=majority"
  );
});
