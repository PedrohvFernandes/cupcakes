import { ButtonDefaultOutline } from "@components/buttons/button-default-outline"
import { NavTutorialPrompt } from "../tutorial/nav-tutorial-prompt"

export function Prompt() {
  return (
    <>
      {/* 2 slides */}
      {/* Colocar um slide de imagens com  tutorial para ativar a localização e pedir para o usuario recarregar a pagina apos aceitar  clicando no botão abaixo e ja deixar o tutorial caso ele bloquear/clicar no x: no caso clicar novamente no icone do maps e limpar e pedir para recarregar para ter novamente as opções de permissão */}
      {/* Deixar um link de ajuda da google para ativar */}
      {/* Deixar uma notificação toda hora aparecendo na tela de 30 em 30 segundos pedindo para ativar e fazer um baraulho de alert, a notificação é amarela */}

      <NavTutorialPrompt />

      <ButtonDefaultOutline
        size={'xl'}
        onClick={() => {
          window.location.reload()
        }}
      >
        Recarregar
      </ButtonDefaultOutline>
    </>
  )
}
