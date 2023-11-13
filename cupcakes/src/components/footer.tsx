import { ConfigBases } from '@config/index'

import useGetDateFormatted from '@hooks/get-date-formatted'

import { IconCoffee, GithubIcon } from '@assets/icons'
import { BottomLine } from './bottom-line'

export function Footer() {
  const { formattedCurrentYear } = useGetDateFormatted()

  return (
    // <footer className="absolute bottom-0 w-full bg-primary-foreground px-2 py-2">
    <footer className="w-full bg-primary-foreground py-2 text-xs md:text-base">
      <div className="container flex items-center justify-between gap-2 w-full">
        <div className="flex items-center opacity-70 gap-2">
          <IconCoffee className='w-10 md:w-auto' />
          <span className="font-bold">
            © {formattedCurrentYear().year} Cupcakes Inc.
          </span>
        </div>
        <BottomLine>
          <a
            className="flex items-center gap-2"
            target={ConfigBases.cupcakes.gitHub.target.blank}
            href={ConfigBases.cupcakes.gitHub.baseUrls.perfil}
          >
            <GithubIcon/>
            <span>Meu Github</span>
          </a>
        </BottomLine>
      </div>
    </footer>
  )
}
