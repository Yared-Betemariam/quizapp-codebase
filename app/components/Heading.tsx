import { View, Text } from "react-native";
import React from "react";

const Heading = ({
  mainLabel,
  subLabel,
  size,
}: {
  mainLabel: string;
  subLabel?: string;
  size?: "small" | "large";
}) => {
  return (
    <View className="flex flex-col gap-2 border-b py-6 border-gray-100 px-6">
      {(!size || size == "small") && (
        <>
          <Text className="text-xl font-hankenGrotesk opacity-75">
            {mainLabel}
          </Text>
          {subLabel && (
            <Text className="text-teal-700 text-3xl font-hankenGrotesk-extrabold">
              {subLabel}
            </Text>
          )}
        </>
      )}
      {size == "large" && (
        <>
          <Text className="text-xl font-hankenGrotesk-medium">{mainLabel}</Text>
          <Text className="text-teal-700 text-4xl font-hankenGrotesk-extrabold">
            {subLabel}
          </Text>
        </>
      )}
    </View>
  );
};
export default Heading;
