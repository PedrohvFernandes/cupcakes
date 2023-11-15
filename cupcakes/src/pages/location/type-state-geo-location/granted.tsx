import { useEffect, useState } from 'react'

import { GoogleMap, MarkerF, StandaloneSearchBox } from '@react-google-maps/api'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/use-toast'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import {
  CoffeeBlueUrl,
  CoffeeRedUrl,
  CoffeeYellowUrl,
  UserProfileIconUrl
} from '@assets/icons'

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
  const [markersCafe, setMarkersCafe] = useState<google.maps.Marker[]>([])
  const [markersNearestCafe, setMarkersNearestCafe] =
    useState<google.maps.Marker>(new google.maps.Marker())
  const [userBounds, setUserBounds] = useState<google.maps.LatLngBounds | null>(
    null
  )

  const requestPointsOnTheMapRequest: google.maps.places.PlaceSearchRequest = {
    location: getLocation().responseDataMap
      ?.center as google.maps.LatLngLiteral, // Localização do usuário
    radius: 800, //1000 metros ou 1km
    type: 'cafe' // Tipo de lugar que queremos buscar, lembrando que a pessoa que criou o lugar que define o tipo, então pode ser que uma cafeteria não esteja com o tipo "cafe"
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
    if (!searchBox || !map) return
    // Pegamos o lugar que o usuario digitou ou varios lugares, ex: se o usuario digitar "Cafeteria" ele vai retornar varios lugares que tem relação com "Cafeteria"
    const places = searchBox.getPlaces()
    // o places é um array, então pegamos o primeiro resultado gerado
    const place = places![0]
    // As coordenadas do lugar que o usuario digitou
    const location = {
      lat: place.geometry?.location?.lat() as number,
      lng: place.geometry?.location?.lng() as number
    }
    // Filtra os lugares para incluir apenas aqueles dentro dos limites da região do usuário e do tipo "cafe"
    if (
      userBounds?.contains(place.geometry!.location as google.maps.LatLng) &&
      place.types?.includes('cafe') &&
      !markersCafe.find(marker => marker.getTitle() === place.name)
    ) {
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
      //Pegamos a ref do mapa e  Movemos o mapa para o lugar que o usuario digitou
      // To-do: Ele não esta movendo o mapa para o lugar que o usuario digitou
      map?.panTo(location)
    } else if (!place.types?.includes('cafe')) {
      toast({
        title: 'Isso não é uma cafeteria!',
        duration: 2000
      })
    } else if (markersCafe.find(marker => marker.getTitle() === place.name)) {
      toast({
        title: 'Essa cafeteria já esta no mapa!',
        duration: 2000
      })
    } else {
      toast({
        title: 'Essa cafeteria não esta na região do usuário!',
        duration: 2000
      })
    }
  }

  // Define os limites da região do usuário (por exemplo, uma área de 5 km ao redor da localização do usuário), ou seja ao digitar um lugar, ele vai procurar apenas na região do usuário, mas ainda ira aparecer outros lugares que não estão na região do usuário, so que ira forçar o usuario a procurar apenas na região dele
  const userBoundsFunc = () => {
    const userBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(
        (getLocation().responseDataMap?.center.lat as number) - 0.045,
        (getLocation().responseDataMap?.center.lng as number) - 0.045
      ),
      new window.google.maps.LatLng(
        (getLocation().responseDataMap?.center.lat as number) + 0.045,
        (getLocation().responseDataMap?.center.lng as number) + 0.045
      )
    )

    setUserBounds(userBounds)
  }

  const requestPointsOnTheMap = () => {
    if (!map) return

    // Pegamos o serviço do google places e passamos o mapa como parametro
    const servicePlaces = new google.maps.places.PlacesService(map)
    // Pegamos os pontos no mapa
    servicePlaces.nearbySearch(
      requestPointsOnTheMapRequest,
      (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results &&
          results.length > 0
        ) {
          setMarkersCafe([
            ...markersCafe,
            ...results.map(place => {
              return new google.maps.Marker({
                position: place.geometry?.location as google.maps.LatLng,
                map: map,
                icon: {
                  url: `${CoffeeBlueUrl}`,
                  scaledSize: new google.maps.Size(40, 40)
                },
                title: place.name,
                animation: google.maps.Animation.DROP
              })
            })
          ])
          // Certifique-se de que o módulo de geometria está carregado para usar o método computeDistanceBetween e conseguir calcular a distância entre dois pontos para saber qual é o mais próximo
          if (google.maps.geometry) {
            // Encontrar a cafeteria mais próxima
            // Aqui estamos usando o método reduce para encontrar o local mais próximo dentre os resultados ou seja as cafeteria que estão na região do usuário
            let closestCafe = results.reduce((closest, current) => {
              // estamos pegando a localização do local atual e do local mais próximo da cafeteria
              const currentLocation = current.geometry
                ?.location as google.maps.LatLng
              const closestLocation = closest.geometry
                ?.location as google.maps.LatLng

              // aqui no caso estamos pegando o atual local do usuario + o local atual da cafeteria mais proxima e calculando a distância entre eles
              const currentDistance =
                google.maps.geometry.spherical.computeDistanceBetween(
                  // From
                  getLocation().responseDataMap
                    ?.center as unknown as google.maps.LatLng,
                  // To
                  currentLocation
                )
              // aqui no caso estamos pegando o atual local do usuario + o local mais próximo da cafeteria mais proxima  e calculando a distância entre eles
              const closestDistance =
                google.maps.geometry.spherical.computeDistanceBetween(
                  // From
                  getLocation().responseDataMap
                    ?.center as unknown as google.maps.LatLng,
                  // To
                  closestLocation
                )

              // Se a distância atual for menor que a distância mais próxima, retorne o local atual, caso contrário, retorne o local mais próximo
              return currentDistance < closestDistance ? current : closest
            })

            // Adicionar marcador para a cafeteria mais próxima
            const closestMarker = new google.maps.Marker({
              position: closestCafe.geometry?.location as google.maps.LatLng,
              map: map,
              icon: {
                url: `${CoffeeYellowUrl}`,
                scaledSize: new google.maps.Size(40, 40)
              },
              title: closestCafe.name,
              animation: google.maps.Animation.DROP
            })
            setMarkersNearestCafe(closestMarker)
            //Pegamos a ref do mapa e  Movemos o mapa para o lugar que o usuario digitou
            // To-do: Ele não esta movendo o mapa para o lugar que o usuario digitou
            map?.panTo(closestMarker.getPosition() as google.maps.LatLng)
          }
        }
        if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          toast({
            title: 'Não foi possível encontrar cafeterias! 😢',
            duration: 2000
          })
        }
      }
    )
  }

  useEffect(() => {
    userBoundsFunc()
    requestPointsOnTheMap()
  }, [map])

  return (
    <div className="flex flex-col w-full gap-2">
      {/* O google map carrega o mapa */}
      <StandaloneSearchBox
        onLoad={onSearchLoad}
        onPlacesChanged={() => {
          onPlacesChange()

          // const places = searchBox?.getPlaces()
          // Filtra os lugares para incluir apenas aqueles dentro dos limites da região do usuário
          //  onPlacesChange().places?.filter(place =>
          //     userBounds?.contains(place.geometry!.location as google.maps.LatLng)
          //   )
          // Filtra os lugares para incluir apenas aqueles dentro dos limites da região do usuário e do tipo "cafe"
          // const filteredPlaces = places?.filter(
          //   place =>
          //     userBounds?.contains(place.geometry!.location as google.maps.LatLng) &&
          //     place.types?.includes('cafe')
          // )
        }}
        bounds={userBounds as google.maps.LatLngBounds} // Define os limites da região do usuário (por exemplo, uma área de 5 km ao redor da localização do usuário)
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
                text: 'Cafeteria pesquisada pelo usuario! 🤩' + position.getTitle(),
                color: '#fff',
                fontSize: '12px',
                className: 'mt-16 bg-background p-2 rounded-lg text-center'
              }
            }}
          />
        ))}

        {markersCafe.map((position, index) => (
          <MarkerF
            key={index}
            position={{
              lat: position.getPosition()?.lat() as number,
              lng: position.getPosition()?.lng() as number
            }}
            icon={{
              url: `${CoffeeBlueUrl}`,
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

        {markersNearestCafe.getPosition() && (
          <MarkerF
            position={{
              lat: markersNearestCafe.getPosition()?.lat() as number,
              lng: markersNearestCafe.getPosition()?.lng() as number
            }}
            icon={{
              url: `${CoffeeYellowUrl}`,
              scaledSize: new google.maps.Size(40, 40)
            }}
            options={{
              label: {
                text:
                  'Cafeteria mais próxima! 🤩' + markersNearestCafe.getTitle(),
                color: '#fff',
                fontSize: '12px',
                className: 'mt-16 bg-background p-2 rounded-lg text-center'
              }
            }}
          />
        )}
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
