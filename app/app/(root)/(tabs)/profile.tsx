import Heading from "@/components/Heading";
import icons from "@/constants/icons";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full flex flex-col gap-6">
        <Heading mainLabel="user" subLabel="Profile" />
        <View className="px-6">
          <View className="p-6 relative rounded-[2rem] bg-teal-700 flex flex-row items-center gap-4">
            <View className="bg-white absolute size-60 rounded-full -right-20 -bottom-20 opacity-10" />
            <Image
              tintColor={"#fff"}
              source={icons.person2}
              resizeMode="contain"
              className="size-14"
            />
            <View className="flex flex-col">
              <Text className="font-hankenGrotesk opacity-75 text-white">
                Your status
              </Text>
              <Text className="text-2xl font-hankenGrotesk-extrabold uppercase text-white">
                Bronze
              </Text>
              <View className="flex flex-row items-center gap-2">
                <Image
                  tintColor={"#fff"}
                  source={icons.star}
                  resizeMode="contain"
                  className="size-4"
                />
                <Text className="text-white opacity-50 font-hankenGrotesk-medium">
                  1 star
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Heading mainLabel="Statistics" />
        <Text className="font-hankenGrotesk leading-[1.5] px-6">
          This data is taken from you day to day activity on this appication. It
          updates as you take more quizes and advance you knowleadge
        </Text>
        <View className="flex flex-col px-6 gap-2">
          <StatComponent value={12} label="Tests Taken" />
          <StatComponent value={7.1} label="Average Score" />
          <StatComponent value={3} label="Grade levels" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatComponent = ({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) => {
  return (
    <View className="flex py-1 w-full flex-row items-center justify-between">
      <Text className="text-gray-700 font-hankenGrotesk">{label}</Text>
      <Text className="text-3xl font-hankenGrotesk-extrabold">{value}</Text>
    </View>
  );
};
export default Profile;
