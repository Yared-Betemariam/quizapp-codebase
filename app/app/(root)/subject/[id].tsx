import BackButton from "@/components/BackButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Heading from "@/components/Heading";
import { chapters, subjects } from "@/constants/data";
import icons from "@/constants/icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  const { id } = useLocalSearchParams();
  const subject = subjects.find((item) => item.id == Number(id));

  if (!subject) {
    return <Redirect href={"/(root)/(tabs)"} />;
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={subject.grades}
        renderItem={({ item }) => (
          <View className="px-6">
            <Grade
              title={item.title}
              parentId={Number(id)}
              id={item.id}
              completed={!!item.completed}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View className="flex flex-col">
            <BackButton />
            <Heading mainLabel={`Subject`} subLabel={subject.title} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const Grade = ({
  title,
  id,
  parentId,
  completed,
}: {
  title: string;
  id: number;
  parentId: number;
  completed: boolean;
}) => {
  const [gradeChapters, setGradeChapters] = useState<
    {
      id: string;
      number: number;
      title: string;
    }[]
  >([]);
  const [showChapters, setShowChapters] = useState(false);
  const chapId = `${parentId},${id}`;
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }),
    overflow: "hidden",
  }));

  const handlePress = () => {
    if (completed) {
      if (showChapters) {
        setShowChapters(false);
        height.value = 0; // Collapse animation
      } else {
        const filteredChapters = chapters.filter((item) => item.id === chapId);

        setGradeChapters(filteredChapters);
        setShowChapters(true);
        height.value = filteredChapters.length * 80; // Expand animation (adjust based on item height)
      }
    }
  };

  return (
    <View className="flex flex-col">
      <Pressable
        className="bg-teal-700/ flex flex-row items-center border-b border-teal-900/10 gap-4 h-20"
        onPress={handlePress}
      >
        <Image
          source={icons.rightArrow}
          tintColor={"black"}
          className="size-4 rotate-0 text-teal-700"
          style={{
            opacity: !completed ? 0.5 : 1,
            transform: showChapters ? "rotate(90deg)" : "none",
          }}
        />
        <Text
          style={{
            opacity: !completed ? 0.5 : 1,
          }}
          className="text-xl font-hankenGrotesk-medium"
        >
          {title}
        </Text>
        {!completed && (
          <Text className="uppercase text-sm border border-teal-700/20 px-1 font-hankenGrotesk-light text-teal-700/50 ml-auto rounded-md">
            coming soon
          </Text>
        )}
      </Pressable>
      <Animated.View style={animatedStyle}>
        {gradeChapters.length > 0 && (
          <FlatList
            data={gradeChapters}
            renderItem={({ item }) => (
              <Chapter
                title={item.title}
                number={item.number}
                chapId={chapId}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            className="px-2"
          />
        )}
      </Animated.View>
    </View>
  );
};
const Chapter = ({
  title,
  number,
  chapId,
}: {
  number: number;
  title: string;
  chapId: string;
}) => {
  const handlePress = () => {
    const info = chapId + "," + number;
    router.push(`/(root)/quiz/${info}`);
  };
  return (
    <View className="bg-teal-700/ flex flex-row items-center border-b border-l border-b-teal-900/5 h-20 pl-8 gap-4 border-l-teal-700">
      <View>
        <Text className="text-base font-hankenGrotesk-medium text-gray-500">
          Chapter 1
        </Text>
        <Text className="text-xl font-hankenGrotesk-medium text-teal-700">
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        className="flex flex-row bg-teal-700 rounded-full gap-1 items-center ml-auto px-3 h-8"
      >
        <Text className="text-white font-hankenGrotesk">Start</Text>
        <Image
          source={icons.rightArrow}
          tintColor={"white"}
          className="size-4 rotate-0"
        />
      </TouchableOpacity>
    </View>
  );
};
export default Property;
