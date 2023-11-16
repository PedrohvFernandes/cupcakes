import { Globe } from '@assets/icons'

import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'

import { icons } from '../type-state-geo-location/typings'

export function TutorialPrompt() {
  const steps = [
    {
      tutorial:
        '1 - Se tiver uma opção de "Memorizar decisão" ou "Sempre permitir" clicar nela obrigatoriamente, se não, não vai funcionar a localização, por exemplo no navegador Firefox é dessa forma. Depois é so clicar no botão Permitir do navegador. Caso tenha a opção "Memorizar decisão" ou "Sempre permitir" e ter permitido duas vezes sem clicar na opção a opção "Memorizar decisão" ou "Sempre permitir", reinicie a pagina clicando no botão de recarregar do navegador ou no botão Recarregar que esta no centro da pagina.'
    },
    {
      tutorial:
        '2 - Ao permitir a localização, a pagina sera recarregada automaticamente e você vai ver as cafeterias mais próximas de você! e não vai aparecer mais esse tutorial!'
    },
    {
      tutorial:
        '3 - Caso você tenha apertado no X, clique no ícone no canto superior/inferior esquerdo/direito do navegador(as vezes é um ícone de um pino ou um planeta ou uma exclamação) ou algo parecido. Apos clicar no ícone, devera ter alguma dessas opções: "limpar esta configuração" ou "Redefinir permissão" ou "Repor autorização" ou algum X para limpar ou algo parecido, você deverá clicar em uma dessas opções, e por fim reiniciar a pagina clicando no botão de recarregar do navegador ou no botão Recarregar que esta no centro da pagina.',
      icons
    },
    {
      tutorial:
        '4 - Caso você bloqueie o acesso a sua localização e o seu navegador possui a opção de "Memorizar decisão" ou "Sempre permitir" e você não a marcou clique no botão "Bloqueado temporariamente".'
    }
  ]
  return (
    <ScrollArea className="h-52 w-full rounded-md border text-center">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium flex gap-2 items-center justify-center leading-none">
          Tutorial para permitir <Globe size={20} />
        </h4>
        {steps.map(step => (
          <div key={step.tutorial}>
            <p className="text-sm">{step.tutorial}</p>
            <div className="flex gap-2 items-center justify-center">
              {step.icons?.map(icon => (
                <span key={icon.title}>{<icon.icon />}</span>
              ))}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
