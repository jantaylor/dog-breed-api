exports.up = (knex, Promise) => {
  return knex.schema.createTable('breeds', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.text('nicknames');
    table.text('description');
    table.string('origin');
    table.string('life_span');
    table.text('temperament');
    table.text('colors');
    table.json('height');
    table.json('weight');
    table.string('coat');
    table.string('akc');
    table.text('image');
    table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
    table.timestamp('updated_at', true).defaultTo(knex.raw('now()')).notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('breeds');
};