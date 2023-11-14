import { icons } from '../type-state-geo-location/typings'

import { MapPinOff } from '@assets/icons'

import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'

export function TutorialForcedBlock() {
  const steps = [
    {
      tutorial:
        '1 - Tutorial caso tenha reiniciando a pagina varias vezes quando estava dando a chance de permitir e agora não aparece mais a opção de permitir e nem de "limpar esta configuração" ou "Repor autorização".'
    },
    {
      tutorial:
        '2- Obs: Caso tenha bloqueado normalmente por você e ficou reiniciando varias vezes ao bloquear isso não ira acontecer, basta fazer o tutorial de bloqueado no botão "Tutorial caso tenha bloqueado".'
    },
    {
      tutorial:
        '3 - Quando você fica reiniciando varias vezes com a opção de permitir disponível para tentar burlar, ele da um Timeout que não permite mais o usuário limpar ou aceitar as permissões, mas existe uma solução.'
    },
    {
      tutorial:
        '4 - Clicando no ícone no canto superior/inferior esquerdo(as vezes é um ícone de um pino ou um planeta ou uma exclamação) ou algo parecido.',
      icons
    },
    {
      tutorial: '5 - Depois clicar em "Redefinir permissão" ou algo parecido.'
    },
    {
      tutorial:
        '6 - E apos isso, reiniciar a pagina clicando no botão de recarregar no centro da pagina ou no botão de recarregar do navegador.'
    },
    {
      tutorial:
        '7 - Depois irá aparecer a opção de permitir novamente, clique em permitir e apos isso recarregue a pagina novamente.'
    }
  ]
  return (
    <ScrollArea className="h-52 w-full rounded-md border text-center">
      <div className="p-4">
        <h4 className="mb-4 text-sm text-center flex gap-2 items-center justify-center font-medium leading-none">
          Bloqueado por reiniciar varias vezes <MapPinOff />
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
