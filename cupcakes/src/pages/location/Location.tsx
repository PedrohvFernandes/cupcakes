import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

import { ConfigAuth, ConfigRoutes } from '@config/index'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { useToast } from '@components/ui/use-toast'
import { LoaderDefault } from '@components/loaders/loader-default'
import { BottomLine } from '@components/bottom-line'
import { Prompt } from './type-state-geo-location/prompt'
import { Denied } from './type-state-geo-location/denied'
import { Granted } from './type-state-geo-location/granted'

import { IResponseState } from './type-state-geo-location/typings'

export function Location() {
  const [loadingGetLocationResponseState, setLoadingGetLocationResponseState] =
    useState<IResponseState>({
      responseState: ''
    })
  const { getLocation } = useGetGeolocationMaps()

  const { toast } = useToast()

  const navigate = useNavigate()

  const { isLoaded } = useJsApiLoader({
    id: ConfigAuth.cupcakes.google.keys.maps.id,
    googleMapsApiKey: ConfigAuth.cupcakes.google.keys.maps.key
  })

  const stateGeoLocation = useCallback(async () => {
    const state = await getLocation().responseState?.then(response => {
      return response.responseState
    })

    if (state !== loadingGetLocationResponseState.responseState) {
      setLoadingGetLocationResponseState({
        responseState: state as IResponseState['responseState']
      })
    }

    return state
  }, [loadingGetLocationResponseState.responseState])

  const repeatNotification = (func: Function) => {
    func()
    const interval = setInterval(func, 3000 * 10)
    return () => clearInterval(interval)
  }

  const setLoadingGetLocationState = (
    loadingGetLocationResponseState: IResponseState
  ) => {
    setLoadingGetLocationResponseState(loadingGetLocationResponseState)
  }

  useEffect(() => {
    stateGeoLocation()
    // Ver se não tem como deixar isso isolado de acordo com cada componente
    if (loadingGetLocationResponseState.responseState === 'denied') {
      const toasts = () => {
        toast({
          title: 'Você bloqueou a permissão de localização! 🤨',
          description:
            'Por favor faça o tutorial em tela para que possamos te mostrar as cafeterias mais próximas de você!',
          duration: 20000,
          variant: 'destructive'
        })
      }
      repeatNotification(toasts)
    }

    if (loadingGetLocationResponseState.responseState === 'prompt') {
      const toasts = () => {
        toast({
          title: 'Você ainda não aceitou a permissão de localização!',
          description:
            'Por favor faça o tutorial em tela para que possamos te mostrar as cafeterias mais próximas de você! Caso você ja tenha aceitado basta reiniciar a pagina clicando no botão "RECARREGAR" 😊',
          duration: 20000,
          variant: 'alert'
        })
      }
      repeatNotification(toasts)
    }

    if (
      getLocation().messageGeolocationNotSupportedBrowser?.error ===
      'A geolocalização não é suportada por este navegador.'
    ) {
      toast({
        title: 'Infelizmente seu navegador não suporta a geolocalização!',
        description:
          'Caso queira utilizar essa funcionalidade, por favor utilize o Google Chrome ou o Mozilla Firefox! Ou algum outro navegador que suporte a geolocalização!',
        duration: 60000,
        variant: 'destructive'
      })
    }

    // getLocation().responseState?.then(response => {
    //   setLoadingGetLocationResponseState({
    //     responseState: response.responseState
    //   })
    // })
  }, [loadingGetLocationResponseState.responseState])

  useEffect(() => {
    const stateGeoLocationPromise = async () => {
      const stateGeoLocationType = await stateGeoLocation().then(response => {
        return response
      })
      if (stateGeoLocationType === 'granted') {
        toast({
          title: 'Localização encontrada!',
          description:
            'Agora você pode ver as cafeterias mais próximas de você! Talvez o mapa fique azulado por um tempo, mas logo ele ira carregar sua localização! Ou se preferir clique no botão "Recarregar o mapa" para forçar a atualização!',
          duration: 10000,
          variant: 'success'
        })
      }
    }
    stateGeoLocationPromise()
  }, [])

  let stateGeoLocationComponent: JSX.Element
  switch (
    loadingGetLocationResponseState.responseState ||
    getLocation().messageGeolocationNotSupportedBrowser?.error
  ) {
    case 'prompt':
      stateGeoLocationComponent = <Prompt />
      break
    case 'granted':
      stateGeoLocationComponent = (
        <>
          {isLoaded && (
            <Granted
              setResponseState={setLoadingGetLocationState}
              responseState={loadingGetLocationResponseState}
            />
          )}
        </>
      )
      break
    case 'denied':
      stateGeoLocationComponent = <Denied />
      break
    case 'A geolocalização não é suportada por este navegador.':
      stateGeoLocationComponent = (
        <BottomLine
          variantOpacity={'opacity100'}
          variantBottom={'bottom10'}
          variantColorBottom={'colorForeground'}
        >
          <ButtonDefaultOutline
            onClick={() => {
              navigate(ConfigRoutes.cupcakes.default.source)
            }}
          >
            Voltar para a página inicial
          </ButtonDefaultOutline>
        </BottomLine>
      )
      break
    default:
      return null
  }

  return (
    <section className="flex items-center justify-center min-h-screen mx-auto py-2">
      {isLoaded && loadingGetLocationResponseState.responseState !== '' ? (
        // Ensinar o usuário como ativar a localização do navegador apos negar e pedir para recarregar a página com o botão que eu criar para recarregar a página do tipo "Apos realizar as alterações, clique aqui para recarregar a página! e novamente sera solicitado, dessa vez aceite(Emoji furioso)"(Deixar o tutorial na tela) e um link para o tutorial da google https://support.google.com/accounts/answer/3467281?hl=pt-BR, se for prompt colocar um alert na tela de 30 em 30 segundos tambem para avisar que o usuario tem que aceitar e  recarregar a pagina, deixar um tutorial em tela mostrando como faz para ativar sem estar negado,  fazer tambem uma comparação quando o navegador não tem suporte usando a messageGeolocationNotSupportedBrowser
        // Mostrar os cafes mais proximos da localização do usuário, caso não tenha nenhum, mostrar uma mensagem de erro(NÃO ACHAMOS NEM UMA CAFETERIA PROXIMA) e um botão para recarregar a página, e se tiver, o mais proximo dele ira ficar amarelo e os demais azuis. Pode colocar lanchonete tambem
        // Mostrar a rota do usuário até a cafeteria mais proxima ou naquele que ele clicar
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          {stateGeoLocationComponent}
        </div>
      ) : (
        <LoaderDefault>Carregando o Mapa e suas informações...</LoaderDefault>
      )}
    </section>
  )
}
