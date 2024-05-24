exports.up = function(knex) {
    return knex.schema.createTable('USUARIO', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.string('cpf').notNullable();
      table.string('status').notNullable();
      table.string('telefone').notNullable();
      table.string('endereco').notNullable();
      table.string('senha').notNullable();
      table.string('foto_url');
      table.timestamp('data_criacao').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('USUARIO');
  };
  