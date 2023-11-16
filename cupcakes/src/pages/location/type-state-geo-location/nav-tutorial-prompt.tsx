import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport
} from '@components/ui/navigation-menu'

import { TutorialPrompt } from '../tutorial/tutorial-prompt'
import { TutorialBlockedTemporarily } from '../tutorial/tutorial-blocked-temporarily'
import { TutorialLinks } from '../tutorial/tutorial-links'

export function NavTutorialPrompt() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col md:flex-row gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-accent text-xs md:text-sm font-bold">
            Tutorial para permitir
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TutorialPrompt />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-accent text-xs md:text-sm font-bold">
            Bloqueado temporariamente
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TutorialBlockedTemporarily />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-accent text-xs md:text-sm font-bold">
            Links de autoajuda
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TutorialLinks />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
