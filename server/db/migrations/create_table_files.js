exports.up = function (knex) {
    return knex.schema.createTable('files', function (table) {
      table.increments();
table.string('title').nullable();
table.string('description').nullable();
table.string('path').nullable();
table.text('content').nullable();
table.string('content_type').nullable();

    });
  };exports.down = function (knex) {
    return knex.schema.dropTable('files');
  };
  