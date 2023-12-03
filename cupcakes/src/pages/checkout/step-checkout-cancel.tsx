import { useEffect } from 'react'

import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'

export function CheckoutCancel() {
  const { toast } = useToast()

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
      <div className="container">
        {/* Quando o cliente finalizou o pedido, e aqui agradecemos pela compra */}
        {/* Informamos que o pedido foi levado para o email e nessa mesma tela mostramos os dados do pedido capturado pelo id do pedido do stripe */}
        {/* E um botão para voltar para home  */}
        <h1>Cancel</h1>
      </div>
    </>
  )
}
