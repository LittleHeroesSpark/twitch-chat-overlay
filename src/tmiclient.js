import tmi from "tmi.js";

export default new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "",
    password: "oauth:",
  },
  channels: ["littleheroesspark"],
});
