import { Globe } from '@assets/icons'

import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'

export function TutorialPrompt() {
  const steps = [
    {
      tutorial: '1 - Se tiver uma opção de "Memorizar decisão" ou "Sempre permitir" clicar nela e depois clicar no botão Permitir do navegador.'
    },
    {
      tutorial:
        '2 - Clicar no botão Recarregar que esta no centro da pagina ou no botão de recarregar do navegador'
    },
    {
      tutorial:
        '3 - Caso você tenha apertado no X reinicie a pagina clicando no botão de recarregar no centro da pagina ou no botão de recarregar do navegador para aparecer a opção de permitir novamente.'
    },
    {
      tutorial:
        '4 - Caso bloqueie a localização clique no botão "Tutorial caso tenha bloqueado".'
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
            <p className="text-sm">
              {step.tutorial}
            </p>
            <Separator className="my-2"/>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
