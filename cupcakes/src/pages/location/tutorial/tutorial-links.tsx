import { Link } from '@assets/icons'

import { BottomLine } from '@components/bottom-line'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'
import { ConfigBases } from '@config/index'

export function TutorialLinks() {
  // const tags = Array.from({ length: 50 }).map(
  //   (_, i, a) => `v1.2.0-beta.${a.length - i}`
  // )

  const tags = [
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
    }
  ]

  return (
    <ScrollArea className="h-52 w-full rounded-md border text-center">
      <div className="p-4">
        <h4 className="mb-4 text-sm text-center flex gap-2 items-center justify-center font-medium leading-none">
          Tutoriais de ativação da localização <Link />
        </h4>
        {tags.map(tag => (
          <BottomLine key={tag.id}>
            <a
              href={tag.link}
              target={ConfigBases.cupcakes.google.target.blank}
              className="text-sm"
            >
              {tag.title}
            </a>

            <Separator className="my-2" />
          </BottomLine>
        ))}
      </div>
    </ScrollArea>
  )
}
