import React from "react"
import { Button } from "./button"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-8 h-8 border-none bg-white/10 backdrop-blur-sm hover:bg-white/20"
    >
      {theme === "light" ? (
        <IoMoonOutline className="h-4 w-4 text-gray-700" />
      ) : (
        <IoSunnyOutline className="h-4 w-4 text-yellow-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
