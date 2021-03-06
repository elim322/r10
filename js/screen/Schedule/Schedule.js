import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  SectionList,
  StatusBar,
  TouchableHighlight,
  Platform
} from "react-native";
import styles from "./styles";
import moment from "moment";
import PropTypes from "prop-types";

const iconName = Platform.select({
  ios: "ios-heart",
  android: "md-heart"
});

const Schedule = ({ sessions, navigation, faveIds }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SectionList
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Session", { id: item.id });
            }}
            underlayColor="#e6e6e6"
            activeOpacity={0.7}
          >
            <View style={styles.separator}>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
                {faveIds.includes(item.id) && (
                  <Ionicons
                    style={styles.heart}
                    name={iconName}
                    size={"horizontal" ? 15 : 15}
                    color="red"
                  />
                )}
              </View>
            </View>
          </TouchableHighlight>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>
            {moment(section.title).format("LT")}
          </Text>
        )}
        sections={sessions}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

// Schedule.propTypes = {
//   id: PropTypes.string.isRequired,

//   location: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired
// };

export default Schedule;
