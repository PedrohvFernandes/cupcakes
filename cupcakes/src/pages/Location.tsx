import { useEffect, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

import { ConfigAuth } from '@config/index'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { LoaderSpin } from '@components/components-svg/loader-spin'

import { UserProfileIconUrl } from '@assets/icons'

interface IResponseState {
  responseState: '' | 'granted' | 'prompt' | 'denied'
}

export function Location() {
  const [loadingGetLocationResponseState, setLoadingGetLocationResponseState] =
    useState<IResponseState>({
      responseState: ''
    })
  const { OPTIONS_MAP, getLocation } = useGetGeolocationMaps()

  const { isLoaded } = useJsApiLoader({
    id: ConfigAuth.cupcakes.google.keys.maps.id,
    googleMapsApiKey: ConfigAuth.cupcakes.google.keys.maps.key
  })

  // Evitar memory leak, olhar video do dev junior
  useEffect(() => {
    // const state = async () => {
    //   const state = await getLocation().responseState?.then(response => {
    //     return response.responseState
    //   })

    //   if (state !== loadingGetLocationResponseState.responseState) {
    //     setLoadingGetLocationResponseState({
    //       responseState: state as IResponseState['responseState']
    //     })
    //   }
    // }

    // state()

    getLocation().responseState?.then(response => {
      setLoadingGetLocationResponseState({
        responseState: response.responseState
      })
    })
  }, [loadingGetLocationResponseState.responseState])

  let stateGeoLocation: JSX.Element

  switch (loadingGetLocationResponseState.responseState) {
    case 'prompt':
      stateGeoLocation = (
        <>
          {/* 2 slides */}
          {/* Colocar um slide de imagens com  tutorial para ativar a localização e pedir para o usuario recarregar a pagina apos aceitar  clicando no botão abaixo e ja deixar o tutorial caso ele bloquear: no caso clicar novamente no icone do maps e limpar e pedir para recarregar para ter novamente as opções de permissão */}
          {/* Deixar um link de ajuda da google para ativar */}
          {/* Deixar uma notificação toda hora aparecendo na tela de 30 em 30 segundos pedindo para ativar e fazer um baraulho de alert */}
        </>
      )
      break
    case 'granted':
      stateGeoLocation = (
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
        </>
      )
      break
    case 'denied':
      stateGeoLocation = (
        <>
          {/* 1 slide */}
          {/* Colocar um slide de imagens com  tutorial ensinando a limpar as permissões apos ele bloquear e recerregar a pagina:  no caso ele vai ter negado e recarregou a pagina, dessa forma vai vim denied, e explicar que ele deve clicar novamente no icone do maps e limpar e pedir para recarregar para ter novamente as opções de permissão, e pedir para recarregar a pagina  para ter novamente as opções de permissão*/}
          {/* Deixar um link de ajuda da google para ativar */}
          {/* Deixar uma notificação toda hora aparecendo na tela de 30 em 30 segundos em vermelho dizendo que ele negou e tem que ativar */}
        </>
      )
      break
    case '':
      stateGeoLocation = <></>
      break
    default:
      return null
  }

  return (
    <section className="flex items-center justify-center min-h-screen mx-auto py-2">
      {isLoaded && loadingGetLocationResponseState.responseState !== '' ? (
        // O 'denied' irá renderizar um alert com a msg de erro e cod vindo da funçao errors(Ficar repetindo esse alert a cada 30 segundos)  e dizendo que ele negou aceitar o rastreio e ensinar o usuário como ativar a localização do navegador apos negar e pedir para recarregar a página com o botão que eu criar para recarregar a página do tipo "Apos realizar as alterações, clique aqui para recarregar a página! e novamente sera solicitado, dessa vez aceite(Emoji furioso)"(Deixar o tutorial na tela) e um link para o tutorial da google https://support.google.com/accounts/answer/3467281?hl=pt-BR, se for prompt colocar um alert na tela de 30 em 30 segundos tambem para avisar que o usuario tem que aceitar e  recarregar a pagina, deixar um tutorial em tela mostrando como faz para ativar sem estar negado,  fazer tambem uma comparação quando o navegador não tem suporte usando a messageGeolocationNotSupportedBrowser
        // Outra trativa é direto com a mensagem de error do errors
        // Mostrar os cafes mais proximos da localização do usuário, caso não tenha nenhum, mostrar uma mensagem de erro(NÃO ACHAMOS NEM UMA CAFETERIA PROXIMA) e um botão para recarregar a página, e se tiver, o mais proximo dele ira ficar amarelo e os demais azuis. Pode colocar lanchonete tambem
        // Mostrar a rota do usuário até a cafeteria mais proxima ou naquele que ele clicar
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          {stateGeoLocation}

          <ButtonDefaultOutline
            size={'xl'}
            onClick={() => {
              setLoadingGetLocationResponseState({
                responseState: ''
              })
            }}
          >
            RE-PESQUISAR
          </ButtonDefaultOutline>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <strong className="text-center text-2xl lg:text-5xl animate-pulse">
            Carregando o Mapa e suas informações...
          </strong>
          <LoaderSpin />
        </div>
      )}
    </section>
  )
}
