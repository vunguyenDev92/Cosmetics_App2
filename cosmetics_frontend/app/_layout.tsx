import React, { useState, useEffect } from "react";
import { Slot } from "expo-router";
import Splash from "../app/splash"; // Path to your SplashScreen component
import { Provider } from "react-redux";
import { store } from "../redux/store";

const _layout = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        // Simulate splash screen for 3 seconds
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    // If splash screen is still visible, render the SplashScreen component
    if (isSplashVisible) {
        return <Splash />;
    }

    // After the splash screen, render child components using <Slot />
    return (
        <Provider store={store}>
            <Slot />
        </Provider>
    );
};

export default _layout;