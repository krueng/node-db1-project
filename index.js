require('dotenv').config();
const server = require("./api/server.js");

const PORT = process.env.PORT || 5005; //Mac OS Monterey is using port 5000

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
