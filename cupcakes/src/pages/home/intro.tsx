import { Icon, InfoWith } from "@components/info-with-icon";

export function Intro() {
  return (
    <div>
      <section>
        <h1>Encontre o café perfeito para sua tarde</h1>
        <span>
          Com o Cupcakes você consegue encontrar os melhores café onde você
          estiver
        </span>
      </section>

      <div className="w-full grid grid-cols-1 gap-5 mt-14">
        <InfoWith text={'comprar'}>
        <Icon iconSvg />
        </InfoWith>
      </div>
    </div>
  )
}
