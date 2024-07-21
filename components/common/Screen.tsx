import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
    SafeAreaProvider,
    SafeAreaView as SafeAreaContextView,
} from "react-native-safe-area-context";

interface ScreenProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    scrollView?: boolean;
    safeArea?: boolean;
    safeAreaOnlyTop?: boolean;
}

const Screen: React.FC<ScreenProps> = ({
    children,
    style,
    scrollView = false,
    safeArea = false,
    safeAreaOnlyTop = false,
    ...props
}) => {
    const screenStyle = {
        flex: 1,
    };

    return (
        <SafeAreaProvider>
            <SafeAreaContextView
                edges={["top"]}
                style={[screenStyle, style]}
                {...props}
            >
                {children}
            </SafeAreaContextView>
        </SafeAreaProvider>
    );
};

export default Screen;
