import icons from "@/constants/icons";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

const BackButton = () => {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Image
        source={icons.rightArrow}
        tintColor={"black"}
        className="size-6 rotate-[180deg] ml-6 mt-4"
      />
    </TouchableOpacity>
  );
};

export default BackButton;
