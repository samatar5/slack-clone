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
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
    },
    user: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("messages", messageSchema);

app.get("/channels/:id", async (req, res) => {
  await Message.insertMany([
    {
      text: "första meddelandet",
      user: {
        name: "Matheus",
        image: "https://avatars.githubusercontent.com/u/77362975?v=4",
      },
      channelId: "64007ab37ec7d1638acdfdfd",
    },
    {
      text: "andra meddelandet",
      user: {
        name: "Matheus",
        image: "https://avatars.githubusercontent.com/u/77362975?v=4",
      },
      channelId: "64007ab37ec7d1638acdfdfd",
    },
  ]);
  const messages = await Message.find();
  res.send(messages);
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://samatar:samatar@cluster0.um40t1s.mongodb.net/?retryWrites=true&w=majority"
  );
});
