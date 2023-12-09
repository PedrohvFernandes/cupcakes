import { useNavigate } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'

import { ButtonAlert } from './button-alert'

import { CornerUpLeft } from '@assets/icons'

export function ButtonKeepBuying({
  children
}: Readonly<{
  children?: React.ReactNode
}>) {
  const navigate = useNavigate()
  return (
    <ButtonAlert
      onClick={() => navigate(ConfigRoutes.cupcakes.default.source.path)}
    >
      {children ?? (
        <>
          Continuar comprando
          <CornerUpLeft />
        </>
      )}
    </ButtonAlert>
  )
}
