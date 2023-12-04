import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useCart } from '@hooks/push-item-cart'

import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'

export function CheckoutSuccess() {
  const { cleanCart } = useCart()
  const { toast } = useToast()

  // https://cursos.alura.com.br/forum/topico-duvida-como-passar-e-capturar-mais-de-um-parametro-com-o-hook-useparams-270322
  const [
    searchParams
    // setSearchParams
  ] = useSearchParams()

  const idSessionCheckout = searchParams.get('session_id')

  useEffect(() => {
    if (idSessionCheckout !== null) {
      toast({
        title: 'Sua compra foi finalizada',
        description: `Compra finalizada com sucesso`,
        variant: 'success',
        duration: 5000
      })
      cleanCart()
    }
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
