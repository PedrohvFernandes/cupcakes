import { useEffect } from 'react'

import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'
import { Intro } from './intro'
import { OurCoffees } from './our-coffees'

export function Home() {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'Bem vindo ao nosso site!',
      description:
        'Aqui você encontra os melhores cafés para animar o seu dia!',
      duration: 5000,
      variant: 'success'
    })
  }, [])

  return (
    <>
      <Toaster />

      <section className="container flex flex-col gap-4">
        <Intro />

        <OurCoffees />

        {/* Posteriormente criar uma tela para cada produto para ter uma descrição mais ampla e com o seus subtipos(small, medium...) como esta no figma */}
      </section>
    </>
  )
}
