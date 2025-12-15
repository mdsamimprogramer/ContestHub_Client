// src/components/ThemeToggle.jsx
import React from "react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            className="btn btn-sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? "Dark" : "Light"}
        </button>
    );
}
