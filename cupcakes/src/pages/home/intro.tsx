import { useEffect, useState } from 'react'

import { Clock2, Coffee, Package, ShoppingCartIcon } from '@assets/icons'
import { CupcakesLogoSVGHorizontalPngURL } from '@assets/logo'
import { Icon, InfoWith } from '@components/info-with-icon'

export function Intro() {
  const [highlighted, setHighlighted] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // O prev é o valor anterior, o highlighted é o valor atual
      // A cada 8 segundos ele vai incrementar o valor atual e vai fazer o modulo do tamanho do array, para que ele não passe do tamanho do array
      // https://chat.openai.com/c/34592a05-92c7-46a0-b0df-995e6f0dbed4
      setHighlighted(
        prevHighlighted => (prevHighlighted + 1) % infoWithItems.length
      )
    }, 8000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const infoWithItems = [
    {
      text: 'Compra simples e segura',
      icon: <ShoppingCartIcon />
      // className: ''
    },
    {
      text: 'Embalagem mantém o café intacto',
      icon: <Package />
      // className: ''
    },
    {
      text: 'Entrega rápida',
      icon: <Clock2 />
      // className: ''
    },
    {
      text: 'O café chega fresquinho até você',
      icon: <Coffee />
      // className: ''
    }
  ]
  return (
    <div className="flex items-center justify-center gap-4 min-h-[34rem]">
      <div>
        <section className="flex flex-col gap-2">
          <h1 className="leading-[130%] font-extrabold text-5xl text-primary-backgroundIcons tracking-wide bg-accent p-2 rounded">
            Encontre o café perfeito para sua tarde 🌞
          </h1>
          <span className="leading-[130%] text-lg tracking-widest bg-accent/50 text-foreground/80 p-2 rounded">
            Com o Cupcakes você consegue encontrar os melhores cafés onde você
            estiver
          </span>
        </section>

        <div className="w-full grid grid-cols-2 gap-5 mt-14">
          {/* <InfoWith text="Compra simples e segura">
            <Icon iconSvg={<ShoppingCartIcon />} className="" />
          </InfoWith>
          <InfoWith text="Embalagem mantém o café intacto">
            <Icon iconSvg={<Package />} className="" />
          </InfoWith>
          <InfoWith text="Entrega rápida">
            <Icon iconSvg={<Clock2 />} className="" />
          </InfoWith>
          <InfoWith text="O café chega fresquinho até você" classNameP="">
            <Icon iconSvg={<Coffee />} className="" />
          </InfoWith> */}

          {infoWithItems.map((item, index) => (
            <InfoWith
              key={item.text}
              text={item.text}
              highlighted={highlighted}
              // className='
              // classNameP=''
              index={index}
            >
              <Icon
                iconSvg={item.icon}
                // className=""
                highlighted={highlighted}
                index={index}
              />
            </InfoWith>
          ))}
        </div>
      </div>
      <img
        src={CupcakesLogoSVGHorizontalPngURL}
        alt="Cupcakes"
        className="w-[25rem]"
      />
    </div>
  )
}
