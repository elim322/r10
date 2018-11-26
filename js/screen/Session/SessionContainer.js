import React, { Component } from "react";
import Session from "./Session";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ActivityIndicator, Text } from "react-native";
import { formatSessionData } from "../../lib/dataFormatHelpers";
import FavesContext from "../../context/FavesContext/FavesProvider";

const ONE_SESSION = gql`
  query Session($id: ID!) {
    Session(id: $id) {
      startTime
      location
      title
      description
      id
      speaker {
        name
        image
        id
        url
        bio
      }
    }
  }
`;
class SessionContainer extends Component {
  static navigationOptions = {
    title: "Session"
  };
  render() {
    return (
      <Query
        query={ONE_SESSION}
        variables={{ id: this.props.navigation.getParam("id") }}
      >
        {({ loading, error, data }) => {
          if (loading) return <ActivityIndicator />;
          if (error) return <Text>error</Text>;
          if (data) {
            return (
              <FavesContext.Consumer>
                {({ faveIds, createFave, deleteFave }) => (
                  <Session
                    data={data.Session}
                    createFave={createFave}
                    deleteFave={deleteFave}
                    faveIds={faveIds}
                  />
                )}
              </FavesContext.Consumer>
            );
          }
        }}
      </Query>
    );
  }
}

export default SessionContainer;
