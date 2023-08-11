const mongoose = require("mongoose");
const APIError = require("./../../utils/errorHandler");

function staticsHelper(schema) {
  schema.statics = {
    async get(id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw APIError.databaseError("provided ID is not valid");
      }
      return this.findById(id).exec();
    },

    async findOneOrCreate(condition, data) {
      try {
        const result = await this.findOne(condition);
        return result || (await this.create(data));
      } catch (err) {
        throw APIError.databaseError(err);
      }
    },

    async removeById(id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw APIError.databaseError("provided ID is not valid");
      }
      return this.findByIdAndRemove(mongoose.Types.ObjectId(id)).exec();
    },

    async list(filter, { skip = 0, limit = 15 } = {}) {
      return this.find(filter)
        .skip(+skip)
        .limit(+limit)
        .exec();
    },

    async listAll(filter, { skip = 0, limit = 15 } = {}) {
      return limit === 0
        ? this.find(filter)
          .skip(+skip)
          .exec()
        : this.find(filter)
          .skip(+skip)
          .limit(+limit)
          .exec();
    },

    async listAllSorting(
      filter,
      sort = "-_id",
      { skip = 0, limit = 15 } = {}
    ) {
      return limit === 0
        ? this.find(filter)
          .skip(+skip)
          .sort(sort)
          .exec()
        : this.find(filter)
          .skip(+skip)
          .limit(+limit)
          .sort(sort)
          .exec();
    },

    async update(filter, data) {
      return this.findOneAndUpdate(filter, data, {
        new: true
      }).exec();
    }
  };
}

module.exports = staticsHelper;