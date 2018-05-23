import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ToDoList from './ToDoList';
//import ToDoInput from './ToDoInput';

const GET_TODOS = gql`
  {
    todos {
      item
      _id
    }
  }
`;

const Home = props => {
  return (
    <div>
      <h1>GraphQL MERN Template Homepage</h1>

      <Query query={GET_TODOS}>
        {({ loading, error, data }) => {
          if(loading) return 'Loading...';
          if(error) return `Error! ${error.message}`;

          return <ToDoList todos={data.todos} />;
        }}
      </Query>

    </div>
  );
};

export default Home;
