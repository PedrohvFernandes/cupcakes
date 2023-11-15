import { useState } from 'react'

import { GoogleMap, MarkerF, StandaloneSearchBox } from '@react-google-maps/api'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { useToast } from '@components/ui/use-toast'
import { Input } from '@components/ui/input'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import { UserProfileIconUrl, CoffeeRedUrl } from '@assets/icons'

import { IResponseState } from './typings'

interface IResponseStateGranted {
  setResponseState: (state: IResponseState) => void
  // responseState: IResponseState
}

export function Granted({ setResponseState }: Readonly<IResponseStateGranted>) {
  const { toast } = useToast()

  const { OPTIONS_MAP, getLocation } = useGetGeolocationMaps()

  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>()
  const [map, setMap] = useState<google.maps.Map>()
  const [markersSearchBox, setMarkersSearchBox] = useState<
    google.maps.Marker[]
  >([])

  const cafesAndSnackBars = [] // Array para armazenar as coordenadas das cafeterias

  function searchCafesAndSnackBars() {
    const requestPointsOnTheMapRequest: google.maps.places.PlaceSearchRequest =
      {
        location: getLocation().responseDataMap
          ?.center as google.maps.LatLngLiteral,
        radius: 500,
        type: 'cafe'
      }
  }

  // Para pegar a referencia do mapa
  const onMapLoad = (mapRef: google.maps.Map) => {
    setMap(mapRef)
  }

  // Para pegar a referencia da caixa de pesquisa
  const onSearchLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }

  // Para pegar a referencia do que foi digitado na caixa de pesquisa ou autocomplete
  const onPlacesChange = () => {
    // Pegamos o lugar que o usuario digitou ou varios lugares, ex: se o usuario digitar "Cafeteria" ele vai retornar varios lugares que tem relação com "Cafeteria"
    const places = searchBox!.getPlaces()
    console.log(places)
    // o places é um array, então pegamos o primeiro resultado gerado
    const place = places![0]
    // As coordenadas do lugar que o usuario digitou
    const location = {
      lat: place.geometry?.location?.lat() as number,
      lng: place.geometry?.location?.lng() as number
    }

    setMarkersSearchBox([
      ...markersSearchBox,
      new google.maps.Marker({
        position: location,
        map: map,
        title: place.name,
        icon: {
          url: `${CoffeeRedUrl}`,
          scaledSize: new google.maps.Size(40, 40)
        },
        animation: google.maps.Animation.DROP
        // label: {
        //   text: 'Cafeteria pesquisada! 🤩',
        //   color: '#fff',
        //   className:
        //     'text-1xl font-bold mt-16 bg-background p-2 rounded-lg text-center'
        // }
      })
    ])
    // Movemos o mapa para o lugar que o usuario digitou
    map?.panTo(location)
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {/* O google map carrega o mapa */}
      <StandaloneSearchBox
        onLoad={onSearchLoad}
        onPlacesChanged={onPlacesChange}
      >
        <Input
          placeholder="Tem ideia de alguma cafeteria?"
          className="bg-primary-foreground text-center placeholder:text-foreground/60 placeholder:text-xs sm:placeholder:text-base text-foreground"
        />
      </StandaloneSearchBox>
      <GoogleMap
        onLoad={onMapLoad}
        mapContainerStyle={OPTIONS_MAP.CONTAINER_STYLE}
        center={
          getLocation().responseDataMap?.center as google.maps.LatLngLiteral
        }
        zoom={15}
        clickableIcons={true}
      >
        {/* <StandaloneSearchBox onLoad={onSearchLoad} onPlacesChanged={onPlacesChange}>
          <Input placeholder="Pesquisar endereço"
          className='absolute w-auto h-14 left-[50%] mt-36'
          />
        </StandaloneSearchBox> */}
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
              // path: pathProfileIcon,
              // fillColor: '#fff',
              // fillOpacity: 0.5,
              // strokeColor: '#000',
              // strokeWeight: 2,
              // scale: 2,
              // rotation: 90,

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

        {markersSearchBox.map((position, index) => (
          <MarkerF
            key={index}
            position={{
              lat: position.getPosition()?.lat() as number,
              lng: position.getPosition()?.lng() as number
            }}
            icon={{
              url: `${CoffeeRedUrl}`,
              scaledSize: new google.maps.Size(40, 40)
            }}
            options={{
              label: {
                text: 'Cafeteria pesquisada! 🤩' + position.getTitle(),
                color: '#fff',
                fontSize: '12px',
                className: 'mt-16 bg-background p-2 rounded-lg text-center'
              }
            }}
          />
        ))}
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
    </div>
  )
}
