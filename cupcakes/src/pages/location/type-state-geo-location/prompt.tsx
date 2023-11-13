import { ButtonDefaultOutline } from "@components/buttons/button-default-outline"
import { NavTutorialPrompt } from "../tutorial/nav-tutorial-prompt"

export function Prompt() {
  return (
    <>
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
