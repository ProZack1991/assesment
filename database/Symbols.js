const mongoose = require("mongoose");
const staticHelpers = require("./staticsHelper");
const { Schema } = mongoose;

const SymbolsSchema = new Schema(
  {

    address: String,
    privateKey: String,
    createdAt: {type:Number , default: Date.now},
    today: {type:Number , default: Date.now},
  },
  { collection: "symbols" }
);

/**
 * Statics
 */

SymbolsSchema.plugin(staticHelpers);

const schema = mongoose.model("symbols", SymbolsSchema);

module.exports = schema;
