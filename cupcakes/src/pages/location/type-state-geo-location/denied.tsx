import { ButtonDefaultOutline } from "@components/buttons/button-default-outline"
import { NavTutorialBlock } from "../tutorial/nav-tutorial-block"

export function Denied() {
  return (
    <>
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
