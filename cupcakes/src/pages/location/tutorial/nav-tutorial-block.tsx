import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@components/ui/navigation-menu'

import { TutorialBlocked } from './tutorial-blocked'
import { TutorialForcedBlock } from './tutorial-forced-blocked'
import { TutorialLinks } from './tutorial-links'

export function NavTutorialBlock() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-col md:flex-row gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-accent text-xs md:text-sm font-bold">
            Tutorial caso tenha bloqueado
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TutorialBlocked />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-accent text-xs md:text-sm font-bold py-6">
            <div className="flex flex-col">
              <span>Não aparece as opções permitir e</span>
              <span>"limpar esta configuração" ?</span>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <TutorialForcedBlock />
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
