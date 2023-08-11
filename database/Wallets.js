const mongoose = require("mongoose");
const staticHelpers = require("./staticsHelper");
const { Schema } = mongoose;

const WalletsSchema = new Schema(
  {

    address: String,
    privateKey: String,
    createdAt: {type:Number , default: Date.now},
    today: {type:Number , default: Date.now},
  },
  { collection: "wallets" }
);

/**
 * Statics
 */

WalletsSchema.plugin(staticHelpers);

const schema = mongoose.model("wallets", WalletsSchema);

module.exports = schema;
