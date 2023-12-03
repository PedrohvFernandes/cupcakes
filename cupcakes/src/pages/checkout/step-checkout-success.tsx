import { useEffect } from 'react'

import { useCart } from '@hooks/push-item-cart'

import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'

export function CheckoutSuccess() {
  const { cleanCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'Sua compra foi realizada com sucesso',
      description: `Compra realizada com sucesso`,
      variant: 'success',
      duration: 5000
    })
    cleanCart()
  }, [])

  return (
    <>
      <Toaster />
      <div className="container">
        {/* Quando o cliente finalizou o pedido, e aqui agradecemos pela compra */}
        {/* Informamos que o pedido foi levado para o email e nessa mesma tela mostramos os dados do pedido capturado pelo id do pedido do stripe */}
        {/* E um botão para voltar para home  */}
        <h1>Success</h1>
      </div>
    </>
  )
}
