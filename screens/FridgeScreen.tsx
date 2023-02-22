import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Pressable } from "native-base";

type ItemData = {
  id: string;
  title: string;
  expirationDate: string;
  level: number;
};

const DATA: ItemData[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    expirationDate: "02.03.2023",
    level: 1,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    expirationDate: "02.03.2023",
    level: 1,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    expirationDate: "03.03.2023",
    level: 1,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd9321aa97f63",
    title: "Fourth Item",
    expirationDate: "04.03.2023",
    level: 1,
  },
  {
    id: "58694a0f-3da1-471f-bd96-1455as71e29d72",
    title: "Fifth Item",
    expirationDate: "05.03.2023",
    level: 1,
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad553abb28ba",
    title: "Sixth Item",
    expirationDate: "06.03.2023",
    level: 1,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd941aa97f63",
    title: "Seventh Item",
    expirationDate: "07.03.2023",
    level: 2,
  },
  {
    id: "58694a0f-3da1-471f-bd96-1453571e29d72",
    title: "Eight Item",
    expirationDate: "08.03.2023",
    level: 2,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd29321aa97f63",
    title: "Ninth Item",
    expirationDate: "09.03.2023",
    level: 3,
  },
  {
    id: "58694a0f-3da1-471f-bd96-14515as71e29d72",
    title: "Tenth Item",
    expirationDate: "10.03.2023",
    level: 3,
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  textColor: string;
};

const Item = ({ item, onPress, textColor }: ItemProps) => {
  let style = {
    borderColor: "#B91C1C",
  };

  let icon = { name: "exclamation-circle" };

  if (item.level == 2) {
    style.borderColor = "#FF9900";
    icon.name = "warning";
  } else if (item.level == 3) {
    style.borderColor = "#15803D";
    icon.name = "check-square-o";
  }

  return (
    <Swipeable
      renderRightActions={() => (
        <Pressable
          px={3}
          onPress={() => {
            // TODO: Delete item
          }}
          justifyContent={"center"}
          bg={"red.500"}
          borderRadius={4}
          my={1}
          ml={2}
        >
          <Text lightColor="white" darkColor="white">
            Delete
          </Text>
        </Pressable>
      )}
    >
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <FontAwesome
          name={icon.name as any}
          size={25}
          color="black"
          style={{ marginRight: 15 }}
        />
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.expDate, { color: textColor }]}>
          {item.expirationDate}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default function FridgeScreen({
  navigation,
}: RootTabScreenProps<"Fridge">) {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "grey" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  item: {
    borderWidth: 1,
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 4,
    flex: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expDate: {
    alignContent: "flex-end",
  },
});