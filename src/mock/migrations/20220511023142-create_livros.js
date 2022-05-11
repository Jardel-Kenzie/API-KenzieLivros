'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
   
    return queryInterface.createTable('livros', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'users', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imagem: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      ip_user: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
     
  },

  down (queryInterface, Sequelize) {
      return queryInterface.dropTable('livros'); 
  }
};
