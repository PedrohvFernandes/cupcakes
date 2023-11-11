import { useEffect, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

import { ConfigAuth } from '@config/index'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { LoaderSpin } from '@components/components-svg/loader-spin'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'

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
    getLocation().responseState?.then(response => {
      setLoadingGetLocationResponseState({
        responseState: response.responseState
      })
    })
  }, [loadingGetLocationResponseState.responseState])

  let stateGeoLocation: JSX.Element

  switch (loadingGetLocationResponseState.responseState) {
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
                    // color: '#fff',
                    // fontSize: '16px',
                    // fontWeight: 'bold'
                    className:
                      'text-1xl font-bold mt-16 bg-background p-3 rounded-lg text-center'
                  },
                  icon: {
                    url: `${UserProfileIconUrl}`
                  }
                }}
                icon={{
                  url: `${UserProfileIconUrl}`
                }}
                animation={google.maps.Animation.BOUNCE}
              />
            </GoogleMap>
          )}
        </>
      )
      break
    case 'denied':
      stateGeoLocation = <>recusado</>
      break
    case 'prompt':
      stateGeoLocation = <>aceite as infos</>
      break
    case '':
      stateGeoLocation = <></>
      break
    default:
      return null
  }

  return (
    <section className="flex items-center justify-center min-h-screen mx-auto py-2 ">
      {isLoaded && loadingGetLocationResponseState.responseState !== '' ? (
        // O 'denied' irá renderizar um alert com a msg de erro e cod vindo da funçao errors(Ficar repetindo esse alert a cada 30 segundos)  e ensinar o usuário a como ativar a localização do navegador e pedir para recarregar a página com o botão que eu criar para recarregar a página do tipo "Apos realizar as alterações, clique aqui para recarregar a página!"(Deixar o tutorial na tela), so o prompt que ao ativar a localização irá recarregar a página automaticamente, fazer tambem uma comparação quando o navegador não tem suporte usando a messageGeolocationNotSupportedBrowser
        // Outra trativa é direto com a mensagem de error do errors
        // Mostrar os cafes mais proximos da localização do usuário, caso não tenha nenhum, mostrar uma mensagem de erro(NÃO ACHAMOS NEM UMA CAFETERIA PROXIMA) e um botão para recarregar a página, e se tiver, o mais proximo dele ira ficar amarelo e os demais azuis
        // Botão para recarregar a requisição da localização ou recarregar a página
        // Mostrar a rota do usuário até a cafeteria mais proxima ou naquele que ele clicar
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          {stateGeoLocation}

          <ButtonDefaultOutline
            size={'xl'}
            onClick={() => {
              location.reload()
            }}
          >
            Refresh
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
