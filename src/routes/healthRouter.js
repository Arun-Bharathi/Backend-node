const express = require("express");

const router = express.Router();

router.route("/health").get((req, res) => {
  res.send("healthy");
});

module.exports = router;
