import { ConfigBases } from '@config/index'

import useGetDateFormatted from '@hooks/get-date-formatted'

import { IconCoffee, GithubIcon } from '@assets/icons'

export function Footer() {
  const { formattedCurrentYear } = useGetDateFormatted()

  return (
    // <footer className="absolute bottom-0 w-full bg-primary-foreground px-2 py-2">
    <footer className="w-full bg-primary-foreground px-2 py-2">
      <div className="container flex items-center justify-between w-full">
        <div className="flex items-center opacity-70 gap-2">
          <IconCoffee />
          <span className="font-bold">
            © {formattedCurrentYear().year} Cupcakes Inc.
          </span>
        </div>
        <span className="opacity-70 hover:opacity-100 transition-all duration-500 ease-in-out before:content-[''] before:w-0 before:h-[3px] before:bg-primary before:relative before:-bottom-6 before:-left-0 before:block before:transition-width before:duration-500 before:ease-in-out before:hover:w-full">
          <a
            className="flex items-center gap-2"
            target={ConfigBases.cupcakes.gitHub.target.blank}
            href={ConfigBases.cupcakes.gitHub.baseUrls.perfil}
          >
            <GithubIcon />
            <span>Meu Github</span>
          </a>
        </span>
      </div>
    </footer>
  )
}
