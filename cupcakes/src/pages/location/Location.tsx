import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

import { ConfigAuth, ConfigRoutes } from '@config/index'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { useToast } from '@components/ui/use-toast'
import { LoaderDefault } from '@components/loaders/loader-default'

import { UserProfileIconUrl } from '@assets/icons'
import { BottomLine } from '@components/bottom-line'
import { TutorialPrompt } from './tutorial-prompt'
import { TutorialBlocked } from './tutorial-blocked'
import { TutorialForcedBlock } from './tutorial-forced-blocked'
import { TutorialLinks } from './tutorial-links'

interface IResponseState {
  responseState: '' | 'granted' | 'prompt' | 'denied'
}

export function Location() {
  const [loadingGetLocationResponseState, setLoadingGetLocationResponseState] =
    useState<IResponseState>({
      responseState: ''
    })
  const { OPTIONS_MAP, getLocation } = useGetGeolocationMaps()

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
        console.log(loadingGetLocationResponseState)
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

  // Tentar separar os cases em componentes isolados, talvez o maps eu nao consiga, mas o prompt e o denied sim
  switch (
    loadingGetLocationResponseState.responseState ||
    getLocation().messageGeolocationNotSupportedBrowser?.error
  ) {
    case 'prompt':
      stateGeoLocationComponent = (
        <>
          {/* 2 slides */}
          {/* Colocar um slide de imagens com  tutorial para ativar a localização e pedir para o usuario recarregar a pagina apos aceitar  clicando no botão abaixo e ja deixar o tutorial caso ele bloquear/clicar no x: no caso clicar novamente no icone do maps e limpar e pedir para recarregar para ter novamente as opções de permissão */}
          {/* Deixar um link de ajuda da google para ativar */}
          {/* Deixar uma notificação toda hora aparecendo na tela de 30 em 30 segundos pedindo para ativar e fazer um baraulho de alert, a notificação é amarela */}

          {/* fazer o componente Navigation Menu do shadcn/ui para essas opções e mostrar o tutorial */}
          <h2>Tutorial para permitir</h2>
          <TutorialPrompt />

          <h2>
            Tutorial caso tenha bloqueado/negado a permissão, mas não reiniciou
            a pagina
          </h2>
          <TutorialBlocked />

          {/* Colocar aqui links de ajuda, usar o Scroll Area */}
          <TutorialLinks />

          <ButtonDefaultOutline
            size={'xl'}
            onClick={() => {
              window.location.reload()
            }}
          >
            Recarregar
          </ButtonDefaultOutline>
        </>
      )
      break
    case 'granted':
      stateGeoLocationComponent = (
        <>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={OPTIONS_MAP.CONTAINER_STYLE}
              center={
                getLocation().responseDataMap
                  ?.center as google.maps.LatLngLiteral
              }
              zoom={15}
              clickableIcons={true}
            >
              {/* Child components, such as markers, info windows, etc. */}

              <MarkerF
                position={
                  getLocation().responseDataMap
                    ?.center as google.maps.LatLngLiteral
                }
                options={{
                  label: {
                    text: 'Localização mais proxima!',
                    color: '#fff',
                    className:
                      'text-1xl font-bold mt-16 bg-background p-2 rounded-lg text-center'
                  },
                  icon: {
                    url: `${UserProfileIconUrl}`,
                    scaledSize: new google.maps.Size(40, 40)
                  }
                }}
                // icon={{
                //   url: `${UserProfileIconUrl}`,
                //   scaledSize: new google.maps.Size(35, 35)
                // }}
                animation={google.maps.Animation.BOUNCE}
              />
            </GoogleMap>
          )}

          <ButtonDefaultOutline
            size={'xl'}
            onClick={() => {
              setLoadingGetLocationResponseState({
                responseState: ''
              })
              toast({
                title: 'Recarregando o mapa...',
                duration: 2000
              })
            }}
          >
            Recarregar o mapa
          </ButtonDefaultOutline>
        </>
      )
      break
    case 'denied':
      stateGeoLocationComponent = (
        <>
          {/* 2 slide */}
          {/* Colocar um slide de imagens com  tutorial ensinando a limpar as permissões apos ele bloquear/clicar no X e recerregar a pagina:  no caso ele vai ter negado e recarregou a pagina, dessa forma vai vim denied, e explicar que ele deve clicar novamente no icone do maps e limpar e pedir para recarregar para ter novamente as opções de permissão, e pedir para recarregar a pagina  para ter novamente as opções de permissão*/}
          {/* Deixar um link de ajuda da google para ativar */}
          {/* Deixar uma notificação toda hora aparecendo na tela de 30 em 30 segundos em vermelho dizendo que ele negou e tem que ativar */}

          {/* fazer o componente Navigation Menu do shadcn/ui para essas opções e mostrar o tutorial */}
          <h2>
            Tutorial caso tenha bloqueado/negado a permissão, mas reiniciou a
            pagina
          </h2>
          <TutorialBlocked />

          <h2>
            Tutorial caso tenha reiniciando a pagina varias vezes quando estava
            dando a chance de permitir e agora não aparece mais a opção de
            permitir e nem de "limpar esta configuração" ou "Repor autorização"
          </h2>
          <TutorialForcedBlock />

          {/* Colocar aqui links de ajuda, usar o Scroll Area */}
          <TutorialLinks />

          <ButtonDefaultOutline
            size={'xl'}
            onClick={() => {
              window.location.reload()
            }}
          >
            Recarregar
          </ButtonDefaultOutline>
        </>
      )
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
    case '':
      stateGeoLocationComponent = <></>
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
