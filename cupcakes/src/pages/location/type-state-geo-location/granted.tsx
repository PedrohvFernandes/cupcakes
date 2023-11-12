import { GoogleMap, MarkerF } from '@react-google-maps/api'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { useToast } from '@components/ui/use-toast'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { UserProfileIconUrl } from '@assets/icons'

import { IResponseState } from './typings'

interface IResponseStateGranted {
  setResponseState: (state: IResponseState) => void
  responseState: IResponseState
}

export function Granted({
  setResponseState,
  responseState
}: Readonly<IResponseStateGranted>) {
  const { toast } = useToast()

  const { OPTIONS_MAP, getLocation } = useGetGeolocationMaps()

  return (
    <>
      <GoogleMap
        mapContainerStyle={OPTIONS_MAP.CONTAINER_STYLE}
        center={
          getLocation().responseDataMap?.center as google.maps.LatLngLiteral
        }
        zoom={15}
        clickableIcons={true}
      >
        {/* Child components, such as markers, info windows, etc. */}

        <MarkerF
          position={
            getLocation().responseDataMap?.center as google.maps.LatLngLiteral
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

      <ButtonDefaultOutline
        size={'xl'}
        onClick={() => {
          setResponseState({
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
}
