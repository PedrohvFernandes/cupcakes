import { TutorialBlocked } from './tutorial-blocked'
import { TutorialForcedBlock } from './tutorial-forced-blocked'
import { TutorialLinks } from './tutorial-links'

export function NavTutorialBlock() {
  return (
    <>
      {/* fazer o componente Navigation Menu do shadcn/ui para essas opções e mostrar o tutorial */}
      <h2>
        Tutorial caso tenha bloqueado/negado a permissão, mas reiniciou a pagina
      </h2>
      <TutorialBlocked />

      <h2>
        Tutorial caso tenha reiniciando a pagina varias vezes quando estava
        dando a chance de permitir e agora não aparece mais a opção de permitir
        e nem de "limpar esta configuração" ou "Repor autorização"
      </h2>
      <TutorialForcedBlock />

      {/* Colocar aqui links de ajuda, usar o Scroll Area */}
      <TutorialLinks />
    </>
  )
}
