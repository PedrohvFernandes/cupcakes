import { MapPinOff } from '@assets/icons'


import { icons } from '../type-state-geo-location/typings'

import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'

export function TutorialBlocked() {
  const steps = [
    {
      tutorial:
        '1 - Clique no ícone no canto superior/inferior esquerdo/direito do navegador(as vezes é um ícone de um pino ou um planeta ou uma exclamação) ou algo parecido.',
        icons
    },
    {
      tutorial:
        '2 - Apos clicar no ícone, devera ter alguma dessas opções: "limpar esta configuração" ou "Redefinir permissão" ou "Repor autorização" ou algum X para limpar ou algo parecido, você deverá clicar em uma delas.'
    },
    {
      tutorial:
        '3 - Depois clique no botão de recarregar no centro da página e apos isso sera disponibilizado a opção de permitir.'
    },
    {
      tutorial:
        '4 - Ao clicar em permitir o proximo passo é recarregar a pagina clicando no botão recarregar no centro da pagina ou no botão de recarregar do navegador.'
    }
  ]
  return (
    <ScrollArea className="h-52 w-full rounded-md border text-center">
      <div className="p-4">
        <h4 className="mb-4 text-sm text-center flex gap-2 items-center justify-center font-medium leading-none">
          Tutorial para permitir caso tenha bloqueado <MapPinOff />
        </h4>
        {steps.map(step => (
          <div
            key={step.tutorial}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <p className="text-sm">{step.tutorial}</p>
            <div className="flex gap-2 items-center justify-center">
              {step.icons?.map(icon => (
                <span key={icon.title}>{<icon.icon/>}</span>
              ))}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
