import Heading from "@/components/Heading";
import { subjects } from "@/constants/data";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { Image } from "react-native";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={subjects}
        renderItem={({ item }) => (
          <View className="px-6">
            <Subject title={item.title} id={item.id} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-4"
        ListHeaderComponent={
          <View className="flex flex-col">
            <Heading
              mainLabel="Welcome to"
              subLabel="Highq quiz app"
              size="large"
            />
            <View className="px-6 py-2">
              <Text className="text-lg font-hankenGrotesk text-gray-500">
                Here you can select a subject and grade level of your choice and
                take quizes to advance your understandings.
              </Text>
              <Text className="font-hankenGrotesk-semibold text-2xl mt-4">
                Subjects list
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const Subject = ({ title, id }: { title: string; id: number }) => {
  const handlePress = () => {
    router.push(`/(root)/subject/${id}`);
  };
  return (
    <Pressable
      onPress={handlePress}
      className="bg-gray-200/50 pt-20 rounded-lg p-6"
    >
      <Text className="bg-teal-600/15 absolute top-4 right-4 w-fit px-4 text-teal700/75 rounded-lg py-1 font-hankenGrotesk-medium">
        9-10 Grade levels
      </Text>
      <Text className="opacity-50 font-hankenGrotesk-medium">Subject</Text>
      <Text className="text-3xl font-hankenGrotesk-extrabold text-teal-700">
        {title}
      </Text>
      <Image
        source={icons.backArrow}
        className={"size-8 opacity-25 absolute rotate-180 bottom-4 right-4"}
      />
    </Pressable>
  );
};
export default Index;
