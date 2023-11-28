import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadScript, Libraries } from '@react-google-maps/api'

import { ConfigAuth, ConfigRoutes } from '@config/index'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { useToast } from '@components/ui/use-toast'
import { LoaderDefault } from '@components/loaders/loader-default'
import { BottomLine } from '@components/bottom-line'
import { Toaster } from '@components/ui/toaster'

import { NavTutorialPrompt } from './type-state-geo-location/nav-tutorial-prompt'
import { NavTutorialBlock } from './type-state-geo-location/nav-tutorial-block'
import { Granted } from './type-state-geo-location/granted'

import { IGeolocationPosition } from './type-state-geo-location/typings'
import { cn } from '@lib/utils'

export function Location() {
  // Objeto criado para servir de retorno das informações de geolocalização, pois o retorno da função principal getCurrentPosition que utiliza as funções success e errors não retorna nada, com isso, foi criado um objeto para servir de retorno
  const [loadingGetLocationResponseState, setLoadingGetLocationResponseState] =
    useState<IGeolocationPosition>({
      responseDataMap: {
        center: {
          lat: 0,
          lng: 0
        },
        accuracy: 0
      },
      responseState: {
        responseState: ''
      },
      messageGeolocationNotSupportedBrowser: {
        error: ''
      },
      error: {
        code: 0,
        message: ''
      },
      watchId: null
    })

  const [isLoadedButton, setIsLoadedButton] = useState<boolean>(false)

  const { getLocation } = useGetGeolocationMaps()

  const { toast } = useToast()

  const navigate = useNavigate()

  const google = window.google
  const libraries: Libraries = ['places', 'geometry', 'routes']

  // const { isLoaded } = useJsApiLoader({
  //   id: ConfigAuth.cupcakes.google.keys.maps.id,
  //   googleMapsApiKey: ConfigAuth.cupcakes.google.keys.maps.key,
  //   libraries: ['places']
  // })

  const setIsLoadedButtonState = (isLoaded: boolean) => {
    setIsLoadedButton(isLoaded)
  }

  const stateGeoLocation = async () => {
    try {
      await getLocation(setLoadingGetLocationResponseState)
      // let state = await getLocation()
      //  await getLocation(position => setLoadingGetLocationResponseState(position))
      // return setLoadingGetLocationResponseState(state as IGeolocationPosition)
    } catch (error) {
      console.log(error)
    }
  }

  // const repeatNotification = ({
  //   func,
  //   durationRepeatFixed,
  //   durationRepeatInfinity = 40000
  // }: {
  //   func: Function
  //   durationRepeatFixed: number
  //   durationRepeatInfinity: number
  // }) => {
  //   // No caso seria 20 segundos(para tirar a notificação) + 40 segundos(Para repetir) = 60 segundos
  //   func()
  //   const interval = setInterval(
  //     func,
  //     durationRepeatFixed + durationRepeatInfinity
  //   )
  //   return () => clearInterval(interval)
  // }

  const notificationsStateAndSetIsLoadButton = () => {
    // let durationRepeatFixed = 30000
    // let durationRepeatInfinity = 40000

    let durationFixed = 60000
    if (
      loadingGetLocationResponseState.responseState?.responseState === 'denied'
    ) {
      // const toasts = () => {
      //   toast({
      //     title: 'Você bloqueou a permissão de localização! 🤨',
      //     description:
      //       'Por favor faça o tutorial em tela para que possamos te mostrar as cafeterias mais próximas de você!',
      //     // duration: Infinity,
      //     duration: durationRepeatFixed,
      //     variant: 'destructive'
      //   })
      // }
      // repeatNotification({
      //   func: toasts,
      //   durationRepeatFixed,
      //   durationRepeatInfinity
      // })
      setIsLoadedButton(true)

      toast({
        title: 'Você bloqueou a permissão de localização! 🤨',
        description:
          'Por favor faça o tutorial em tela para que possamos te mostrar as cafeterias mais próximas de você!',
        // duration: Infinity,
        duration: durationFixed,
        variant: 'destructive'
      })
    }

    if (
      loadingGetLocationResponseState.responseState?.responseState === 'prompt'
    ) {
      setIsLoadedButton(true)

      toast({
        title:
          'Você ainda não aceitou a permissão de localização ou bloqueou/aceitou temporariamente(Depende do navegador)!',
        description:
          'Por favor permita sua localização para que possamos te mostrar as cafeterias mais próximas de você! Se sentir inseguro(a) em permitir, por favor faça o tutorial em tela! 😊',
        duration: durationFixed,
        variant: 'alert'
      })
    }

    if (
      loadingGetLocationResponseState.messageGeolocationNotSupportedBrowser
        ?.error === 'A geolocalização não é suportada por este navegador.'
    ) {
      toast({
        title: 'Infelizmente seu navegador não suporta a geolocalização!',
        description:
          'Caso queira utilizar essa funcionalidade, por favor utilize o Google Chrome ou o Mozilla Firefox! Ou algum outro navegador que suporte a geolocalização!',
        duration: durationFixed,
        variant: 'destructive'
      })
    }
  }

  const switchStateGeoLocation = useCallback(() => {
    if (
      loadingGetLocationResponseState.responseState?.responseState === 'prompt'
    ) {
      return <NavTutorialPrompt />
    }
    if (
      loadingGetLocationResponseState.responseState?.responseState === 'denied'
    ) {
      return <NavTutorialBlock />
    }
    if (
      loadingGetLocationResponseState.responseState?.responseState === 'granted'
    ) {
      return (
        <>
          {/* Caso ja tenha carregado todo script da google, não precise carregar novamente, dessa forma evitamos erro e pegamos somente o maps */}
          {google === undefined ? (
            // O load script carrega todo script do google  maps, e as api que você deseja utilizar, no caso, estamos utilizando a api de places, geometry e routes. Lembrando que para usar tem ativar elas no console da google cloud usando a mesma chave api e no mesmo projeto
            <LoadScript
              googleMapsApiKey={ConfigAuth.cupcakes.google.keys.maps.key}
              libraries={libraries}
              loadingElement={
                <LoaderDefault>Carregando o mapa...</LoaderDefault>
              }
            >
              {/* {isLoaded && ( */}

              <Granted
                responseState={loadingGetLocationResponseState}
                setIsLoadedButtonState={setIsLoadedButtonState}
              />
              {/* )} */}
            </LoadScript>
          ) : (
            <Granted
              responseState={loadingGetLocationResponseState}
              setIsLoadedButtonState={setIsLoadedButtonState}
            />
          )}
        </>
      )
    }
    if (
      loadingGetLocationResponseState.messageGeolocationNotSupportedBrowser
        ?.error === 'A geolocalização não é suportada por este navegador.'
    ) {
      return (
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
    }
  }, [loadingGetLocationResponseState.responseState?.responseState])

  useEffect(() => {
    stateGeoLocation()

    // const timer = setTimeout(() => {
    //   setIsLoadedButton(prevState => !prevState)
    // }, 10000)

    // return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    switchStateGeoLocation()
    notificationsStateAndSetIsLoadButton()
    // getLocation().responseState?.then(response => {
    //   setLoadingGetLocationResponseState({
    //     responseState: response.responseState
    //   })
    // })

    // Aqui estamos removendo o watchPosition, pois ele fica enviando as coordenadas, e quando o usuário sai da tela de localização, ele continua enviando as coordenadas, e isso pode gerar um gasto de bateria desnecessário, por isso, estamos removendo ele ao sair da tela de localização, ou seja ao destruir o componente
    // destruir o watchPosition apos fechar o componente, porque se não ao sair dele e voltar sem destruir o watchPosition acaba que ele não consegue pesquisar novamente, o que não acontecia com o getCurrentPosition porque ele so pega a atual posição e não fica enviando as coords
    // Retorna uma função que será executada quando o componente for desmontado
    return () => {
      // Limpa a assinatura do watchPosition quando o componente é desmontado
      if (loadingGetLocationResponseState.watchId !== null) {
        navigator.geolocation.clearWatch(
          loadingGetLocationResponseState.watchId as number
        )
        console.log('watchPosition destruido')
      }
    }
  }, [loadingGetLocationResponseState.responseState?.responseState])

  return (
    <>
      <Toaster />
      <section className="container flex items-center justify-center min-h-screen mx-auto">
        {/* {isLoaded && loadingGetLocationResponseState.responseState !== '' ? ( */}
        {loadingGetLocationResponseState.responseState?.responseState !== '' ? (
          <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
            {switchStateGeoLocation()}
            {isLoadedButton && (
              <ButtonDefaultOutline
                size={'xl'}
                onClick={() => {
                  window.location.reload()
                }}
                className={cn(
                  loadingGetLocationResponseState.responseState
                    ?.responseState === 'granted' && 'w-full',
                  loadingGetLocationResponseState.responseState
                    ?.responseState !== 'granted' && 'w-1/2'
                )}
              >
                Recarregar
              </ButtonDefaultOutline>
            )}
          </div>
        ) : (
          <LoaderDefault>Carregando seus dados de localização...</LoaderDefault>
        )}
      </section>
    </>
  )
}
