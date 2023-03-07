import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
app.use(cors({ origin: "*" }));
app.use(express.json());

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
  const channel = await Channel.findById(req.params.id);
  const messages = await Message.find({ channelId: req.params.id }).sort({
    createdAt: "desc",
  });

  res.send({ channel, messages });
});

app.post("/channels/:id", async (req, res) => {
  console.log(req.body);
  await Message.create({
    text: req.body.text,
    user: {
      name: req.body.username,
      image:
        "https://api.dicebear.com/5.x/adventurer/svg?seed=Mia" +
        req.body.username,
    },
    channelId: req.params.id,
  });
  res.send("ok");
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://samatar:samatar@cluster0.um40t1s.mongodb.net/?retryWrites=true&w=majority"
  );
});
