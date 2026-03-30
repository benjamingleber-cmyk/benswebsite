import express from "express";
import { createServer } from "http";
import { createBareServer } from "@tomphttp/bare-server-node";
import { createWispServer } from "wisp-server-node";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

const app = express();
const bare = createBareServer("/bare/");

// Serve static files from /public
app.use(express.static(join(__dirname, "public")));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else if (req.url.startsWith("/wisp/")) {
    createWispServer({ server }).handleRequest(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(PORT, () => {
  console.log(`Ben's Website running on port ${PORT}`);
});
