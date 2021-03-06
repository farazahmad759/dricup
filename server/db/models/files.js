const { Model } = require("objection");
const knex = require("knex");
const knexFile = require("../../../knexfile");

Model.knex(knex(knexFile.knexConfig.development));
class File extends Model {
  static get tableName() {
    return "files";
  }
}
module.exports = File;
