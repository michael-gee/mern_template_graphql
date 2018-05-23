const mongoose = require('mongoose'); 
const ToDo = require('../db/models/ToDo'); 

module.exports = {
  Query: {
    todos: () => ToDo.find({}),
    todo: (root, { _id }) => ToDo.findById(_id),
  },

  Mutation: {
    addToDo: (root, { item }) => {
      const todo = new ToDo({ item });
      return todo.save();
    },
  },
};
