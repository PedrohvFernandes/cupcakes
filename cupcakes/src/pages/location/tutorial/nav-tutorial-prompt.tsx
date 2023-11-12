import { TutorialBlocked } from "./tutorial-blocked";
import { TutorialLinks } from "./tutorial-links";
import { TutorialPrompt } from "./tutorial-prompt";

export function NavTutorialPrompt() {
  return (
    <>
      {/* fazer o componente Navigation Menu do shadcn/ui para essas opções e mostrar o tutorial */}
      <h2>Tutorial para permitir</h2>
      <TutorialPrompt />
      <h2>
        Tutorial caso tenha bloqueado/negado a permissão, mas não reiniciou a
        pagina
      </h2>
      <TutorialBlocked />
      {/* Colocar aqui links de ajuda, usar o Scroll Area */}
      <TutorialLinks />
    </>
  )
}
