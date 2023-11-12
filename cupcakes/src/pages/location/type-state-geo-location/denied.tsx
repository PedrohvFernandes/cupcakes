import { ButtonDefaultOutline } from "@components/buttons/button-default-outline"
import { NavTutorialBlock } from "../tutorial/nav-tutorial-block"

export function Denied() {
  return (
    <>
      {/* 2 slide */}
      {/* Colocar um slide de imagens com  tutorial ensinando a limpar as permissões apos ele bloquear/clicar no X e recerregar a pagina:  no caso ele vai ter negado e recarregou a pagina, dessa forma vai vim denied, e explicar que ele deve clicar novamente no icone do maps e limpar e pedir para recarregar para ter novamente as opções de permissão, e pedir para recarregar a pagina  para ter novamente as opções de permissão*/}
      {/* Deixar um link de ajuda da google para ativar */}
      {/* Deixar uma notificação toda hora aparecendo na tela de 30 em 30 segundos em vermelho dizendo que ele negou e tem que ativar */}

      <NavTutorialBlock />

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
