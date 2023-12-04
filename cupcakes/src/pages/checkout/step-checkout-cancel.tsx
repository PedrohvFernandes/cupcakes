import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { ConfigRoutes } from '@config/index'

export function CheckoutCancel() {
  const { toast } = useToast()

  const navigate = useNavigate()

  useEffect(() => {
    toast({
      title: 'Sua compra foi cancelada',
      description: `Compra cancelada`,
      variant: 'destructive',
      duration: 5000
    })
  }, [])
  return (
    <>
      <Toaster />
      <div className="container flex flex-col items-center justify-center min-h-[34rem] gap-2">
        <h1 className='text-lg md:text-2xl font-bold text-center'>
          Você cancelou o pedido, mas não se preocupe volte para a loja que você
          vera seus itens no carrinho
        </h1>
        <ButtonDefaultOutline
          onClick={() => navigate(ConfigRoutes.cupcakes.default.source.path)}
          variantBgOutline={'success'}
          className='md:h-16 w-52'
        >
          Voltar para loja
        </ButtonDefaultOutline>
      </div>
    </>
  )
}
