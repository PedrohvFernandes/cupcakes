import { useNavigate } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'
import { ButtonDefault } from '@components/button/button-default'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Oops! Página não encontrada
              </h1>
              <p className="my-2 text-gray-800">
                Parece que você encontrou a porta para o grande nada
              </p>
              <ButtonDefault
                onClick={() => navigate(ConfigRoutes.cupcakes.default.source)}
              >
                Voltar para a página inicial
              </ButtonDefault>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  )
}
