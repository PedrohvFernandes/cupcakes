import React from 'react'

import { useNavigate } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'

import { ButtonAlert } from './button-alert'

import { CornerUpLeft } from '@assets/icons'

interface IButtonKeepBuyingProps {
  children?: React.ReactNode
}

export const ButtonKeepBuying = React.forwardRef<
HTMLButtonElement,
IButtonKeepBuyingProps
>(
  ({ children, ...rest }, ref) => {
  const navigate = useNavigate()

    return (
      <ButtonAlert
        onClick={() => navigate(ConfigRoutes.cupcakes.default.source.path)}
        {...rest}
        ref={ref}
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
)
