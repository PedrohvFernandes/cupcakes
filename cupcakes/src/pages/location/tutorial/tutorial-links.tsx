import { Link } from '@assets/icons'

import { BottomLine } from '@components/bottom-line'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'
import { ConfigBases } from '@config/index'

export function TutorialLinks() {
  // const tags = Array.from({ length: 50 }).map(
  //   (_, i, a) => `v1.2.0-beta.${a.length - i}`
  // )

  const links = [
    {
      id: 1,
      title: 'Como ativar a localização no Android',
      link: ConfigBases.cupcakes.google.baseUrls.androidDeviceLocationSettings
    },
    {
      id: 2,
      title: 'Como ativar a localização no Apple',
      link: ConfigBases.cupcakes.google.baseUrls.appleDeviceLocationSettings
    },
    {
      id: 3,
      title: 'Como ativar a localização no PC/Android/Apple',
      link: ConfigBases.cupcakes.google.baseUrls.pcLocationSettings
    },
    {
      id: 4,
      title: 'Passo a passo para ativar a localização',
      link: ConfigBases.cupcakes.google.baseUrls.stepByStepToEnableLocation
    },
    {
      id: 5,
      title: 'Como limpar o cache/cookies do navegador pc/android/apple Chrome',
      link: ConfigBases.cupcakes.google.baseUrls.clearCacheCookiesChrome
    },
    {
      id: 6,
      title: 'Como limpar o cache/cookies do navegador pc Mozilla Firefox',
      link: ConfigBases.cupcakes.google.baseUrls.clearCacheCookiesFirefox
    },
    {
      id: 7,
      title: 'Como limpar o cache/cookies do navegador android Mozilla Firefox',
      link: ConfigBases.cupcakes.google.baseUrls.clearCacheCookiesFirefoxAndroid
    },
    {
      id: 8,
      title: 'Como limpar o cache do navegador Mozilla Firefox',
      link: ConfigBases.cupcakes.google.baseUrls.clearCacheFirefox
    }
  ]

  return (
    <ScrollArea className="h-52 w-full rounded-md border text-center">
      <div className="p-4">
        <h4 className="mb-4 text-sm text-center flex gap-2 items-center justify-center font-medium leading-none">
          Tutoriais de ativação da localização <Link />
        </h4>
        {links.map(link => (
          <BottomLine key={link.id}>
            <a
              href={link.link}
              target={ConfigBases.cupcakes.google.target.blank}
              className="text-sm"
            >
              {link.title}
            </a>

            <Separator className="my-2" />
          </BottomLine>
        ))}
      </div>
    </ScrollArea>
  )
}
