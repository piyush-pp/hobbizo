const express = require("express");
const router = express.Router();
000
router.get("/", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome to chat router",
  });
});

var ChatControllers = require("../../controllers/app/chat/Chat");
router.route("/chat")
  .post(ChatControllers.Chat);
router.route("/chat_room")
  .post(ChatControllers.ChatRoom);
router.route("/chat_list")
  .post(ChatControllers.ChatList);

// Common Routes
router.get('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Get Request" }) });
router.post('*', (req, res) => { res.status(405).json({ status: false, message: "Invalid Post Request" }) });

module.exports = router;