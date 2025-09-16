import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/globalProviders/ThemeProvider"

export function ModeToggle({...props}) {
  const {theme, setTheme, accent, setAccent } = useTheme()

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild {...props}>
        <Button >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90 duration-300" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 duration-300" />
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => setAccent("red")}>
          Red
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAccent("blue")}>
          Blue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAccent("orange")}>
          Orange
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAccent("green")}>
          Green
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAccent("violet")}>
          Violet
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}