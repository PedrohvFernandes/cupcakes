import { Clock2, Coffee, Package, ShoppingCartIcon } from '@assets/icons'
import {
  CupcakesLogoSVGHorizontal,
  CupcakesLogoSVGHorizontalPngURL
} from '@assets/logo'
import { Icon, InfoWith } from '@components/info-with-icon'

export function Intro() {
  return (
    <div className="flex items-center justify-center min-h-[34rem]">
      <div>
        <section>
          <h1 className="leading-[130%] font-extrabold text-5xl text-primary-backgroundIcons tracking-wide">
            Encontre o café perfeito para sua tarde
          </h1>
          <span className="leading-[130%] text-lg tracking-widest">
            Com o Cupcakes você consegue encontrar os melhores café onde você
            estiver
          </span>
        </section>

        <div className="w-full grid grid-cols-2 gap-5 mt-14">
          <InfoWith text="Compra simples e segura">
            <Icon iconSvg={<ShoppingCartIcon />} className="bg-accent/50" />
          </InfoWith>
          <InfoWith text="Embalagem mantém o café intacto">
            <Icon iconSvg={<Package />} className="bg-accent/50" />
          </InfoWith>
          <InfoWith text="Entrega rápida">
            <Icon iconSvg={<Clock2 />} className="bg-accent/50" />
          </InfoWith>
          <InfoWith text="O café chega fresquinho até você">
            <Icon iconSvg={<Coffee />} className="bg-accent/50" />
          </InfoWith>
        </div>
      </div>
      <img src={CupcakesLogoSVGHorizontalPngURL} alt="Cupcakes" className="w-96" />
    </div>
  )
}
