import { useNavigate } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center lg:flex-row flex-col gap-16">
      <div className="animate-pulse w-52 lg:w-96">
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
      </div>
      <div className="xl:pt-24 w-full xl:w-1/2  pb-12 lg:pb-0">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="my-2 text-foreground font-bold text-2xl">
            Oops! Página não encontrada
          </h1>
          <p className="my-2 text-foreground">
            Parece que você encontrou a porta para o grande nada
          </p>
          <div className="flex flex-col items-center">
            <ButtonDefaultOutline
              onClick={() => navigate(ConfigRoutes.cupcakes.default.source)}
            >
              Voltar para a página inicial
            </ButtonDefaultOutline>
            <p className="my-2 text-foreground font-bold text-2xl">ou</p>
            <ButtonDefaultOutline onClick={() => navigate(-1)}>
              Voltar para a página anterior
            </ButtonDefaultOutline>
          </div>
        </div>
      </div>
    </div>
  )
}
