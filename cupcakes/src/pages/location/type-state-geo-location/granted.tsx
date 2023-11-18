import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  MarkerF,
  StandaloneSearchBox
} from '@react-google-maps/api'

import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/use-toast'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

import {
  CoffeeBlueUrl,
  CoffeePinkUrl,
  CoffeeRedUrl,
  CoffeeYellowUrl,
  UserProfileIconUrl
} from '@assets/icons'

import { IGeolocationPosition } from './typings'

import { cn } from '@lib/utils'
import useWindowDimensions from '@hooks/get-window-dimensions'

interface IResponseStateGranted {
  responseState: IGeolocationPosition
  // setIsLoadedButtonState: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoadedButtonState: (isLoadedButtonState: boolean) => void
}

export function Granted({ responseState, setIsLoadedButtonState }: Readonly<IResponseStateGranted>) {
  // Notificação
  const { toast } = useToast()
  //Tamanho da tela 
  const { width } = useWindowDimensions();

  // StyleMap
  const { OPTIONS_MAP } = useGetGeolocationMaps()
  // StyleMarks
  const styleMarkers = (position: google.maps.Marker) => {
    return `${cn(
      `mt-16 p-2 rounded-lg text-center`,
      position.getTitle() === pointMarkerCafe?.getTitle()
        ? 'bg-background'
        : 'bg-background/60'
    )}`
  }

  // O value do input html
  const inputValueSearchBox = useRef<HTMLInputElement | undefined>(undefined)

  // Map e o SearchBox são os componentes do google maps
  const [map, setMap] = useState<google.maps.Map>()
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>()

  // O ultimo marker que o usuário pesquisou
  const [pointMarkerCafe, setPointMarkerCafe] =
    useState<google.maps.Marker | null>(null)
  const [pointMarkerDestinationCafe, setPointMarkerDestinationCafe] =
    useState<google.maps.Marker | null>(null)

  // Os markers que ele ja pesquisou
  const [markersSearchBox, setMarkersSearchBox] = useState<
    google.maps.Marker[]
  >([])
  // Cafeterias que o cliente ja clicou
  const [markersClicked, setMarkersClicked] = useState<google.maps.Marker[]>([])

  // Markers que são pesquisados automaticamente, ao iniciar o map
  const [markersCafeAutomatic, setMarkersCafeAutomatic] = useState<
    google.maps.Marker[]
  >([])

  // Marker da cafeteria mais proxima
  const [markerNearestCafe, setMarkerNearestCafe] =
    useState<google.maps.Marker>(new google.maps.Marker())

  //  limites da região do usuário
  const [userBounds, setUserBounds] = useState<google.maps.LatLngBounds | null>(
    null
  )

  // Para armazenar a resposta da matriz de distância
  const [responseMatrix, setResponseMatrix] =
    useState<google.maps.DistanceMatrixResponse | null>(null)

  // Pontos específicos no mapa, no caso estamos pegando os cafes
  const requestPointsOnTheMapRequest: google.maps.places.PlaceSearchRequest = {
    location: responseState.responseDataMap?.center, // Localização do usuário
    radius: 3000, //3000 metros ou 3km
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

  // Define os limites da região do usuário (por exemplo, uma área de 5 km ao redor da localização do usuário), ou seja ao digitar um lugar, ele vai procurar apenas na região do usuário, mas ainda ira aparecer outros lugares que não estão na região do usuário, so que ira forçar o usuário a procurar apenas na região dele
  const userBoundsFunc = () => {
    const userBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(
        (responseState.responseDataMap?.center.lat as number) - 0.045,
        (responseState.responseDataMap?.center.lng as number) - 0.045
      ),
      new window.google.maps.LatLng(
        (responseState.responseDataMap?.center.lat as number) + 0.045,
        (responseState.responseDataMap?.center.lng as number) + 0.045
      )
    )

    setUserBounds(userBounds)
  }

  // Para pegar a referencia do que foi digitado na caixa de pesquisa como autocomplete
  const onPlacesChange = () => {
    if (!searchBox || !map) return
    // Pegamos o lugar que o usuário digitou ou vários lugares, ex: se o usuário digitar "Cafeteria" ele vai retornar vários lugares que tem relação com "Cafeteria"
    const places = searchBox.getPlaces()
    // o places é um array, então pegamos o primeiro resultado gerado
    const place = places![0]
    // As coordenadas do lugar que o usuário digitou
    const location = {
      lat: place.geometry?.location?.lat() as number,
      lng: place.geometry?.location?.lng() as number
    }
    // Filtra os lugares para incluir apenas aqueles dentro dos limites da região do usuário, do tipo "cafe", e que ainda não estão no mapa
    if (
      userBounds?.contains(place.geometry!.location as google.maps.LatLng) &&
      place.types?.includes('cafe') &&
      !markersCafeAutomatic.find(marker => marker.getTitle() === place.name) &&
      !markersSearchBox.find(marker => marker.getTitle() === place.name)
    ) {
      // Ao pesquisar:
      // A gente seta o marker que o usuário pesquisou, para aparecer no mapa e ser usado na função traceRoute e no useEffect que chama a função traceRoute
      setPointMarkerCafe(
        new google.maps.Marker({
          position: location,
          icon: {
            url: `${CoffeeRedUrl}`,
            scaledSize: new google.maps.Size(40, 40)
          },
          map: map,
          title: place.name,
          animation: google.maps.Animation.DROP
        })
      )
      // Por que a rota não esta limpando ao mudar o destino: O "problema" na verdade é relacionado com o modo de desenvolvimento do react, lembra sempre de verificar e limitar as verificações da callback usada dentro do directionservice (se usar o código do video ja da certo), mas lembra de ir no arquivo index.tsx/main.tsx do react e retira o react.strictMode, esse modo é o modo de desenvolvimento e por montar e simular o desmonte da tela ta dando esse "bug" de não apagar o trajeto. Muito provavelmente já está funcionando se voce buildar para produção.
      // Aqui ele esta sendo usado para limpar o marker de destino, que é usado somente para manipular a rota, ou seja, quando o usuário pesquisar um lugar, ele limpa o marker de destino, pois o marker de destino é usado somente para manipular a rota
      setPointMarkerDestinationCafe(null)
      // Limpa a resposta da matriz de distância, ou seja a linha que liga o ponto de partida ao ponto de destino
      setResponseMatrix(null)
      // Cafes que o cliente ja pesquisou
      setMarkersSearchBox([
        ...markersSearchBox,
        new google.maps.Marker({
          position: location,
          map: map,
          title: place.name,
          icon: {
            url: `${CoffeePinkUrl}`,
            scaledSize: new google.maps.Size(40, 40)
          },
          animation: google.maps.Animation.DROP
        })
      ])
      toast({
        title: 'Cafeteria adicionada ao mapa juntamente com a rota! 🚶',
        duration: 5000,
        variant: 'success'
      })
      //Pegamos a ref do mapa e  Movemos o mapa para o lugar que o usuário digitou
      map?.panTo(location)
    } else if (!place.types?.includes('cafe')) {
      toast({
        title: 'Isso não é uma cafeteria!',
        duration: 5000,
        variant: 'alert'
      })
    } else if (
      markersCafeAutomatic.find(marker => marker.getTitle() === place.name) ||
      markersSearchBox.find(marker => marker.getTitle() === place.name)
    ) {
      toast({
        title:
          'Essa cafeteria já esta no mapa, basta clicar nela para marcar a rota!',
        duration: 5000,
        variant: 'alert'
      })
    } else {
      toast({
        title: 'Essa cafeteria não esta na região do usuário!',
        duration: 5000,
        variant: 'destructive'
      })
    }
    inputValueSearchBox.current!.value = ''
  }

  // A gente passa essa função para os onClicks dos markers, para quando o usuário clicar em um marker, ele setar o marker que o usuário clicou, para aparecer no mapa e ser usado na função traceRoute e no useEffect que chama a função traceRoute quando o pointMarkerCafe mudar. Quase a msm ideia do onPlacesChange, a diferença é que sempre aqui eu vou ter um marker, pois o usuário clicou em um marker, e no onPlacesChange eu posso não ter um marker, pois o usuário pode digitar algo que não é uma cafeteria ou que não esta na região do usuário
  const onPlacesChangeButtonMarkers = (position: google.maps.Marker) => {
    if (!map) return
    // Ao pesquisar:
    // A gente seta o marker que o usuário pesquisou, para aparecer no mapa e ser usado na função traceRoute
    setPointMarkerCafe(
      new google.maps.Marker({
        position: position.getPosition() as google.maps.LatLng,
        icon: {
          url: `${CoffeeRedUrl}`,
          scaledSize: new google.maps.Size(40, 40)
        },

        map: map,
        title: position.getTitle() as string,
        animation: google.maps.Animation.DROP
      })
    )
    // Aqui ele esta sendo usado para limpar o marker de destino, que é usado somente para manipular a rota, ou seja, quando o usuário pesquisar um lugar, ele limpa o marker de destino, pois o marker de destino é usado somente para manipular a rota

    setPointMarkerDestinationCafe(null)

    // Limpa a resposta da matriz de distância, ou seja a linha que liga o ponto de partida ao ponto de destino
    setResponseMatrix(null)

    // E por fim repassamos os markers que o usuário ja clicou, para que quando ele clicar em um outro marker, ele não perca os markers que ele ja clicou
    setMarkersClicked([...markersClicked, position])
    toast({
      title: 'Rota da cafeteria adicionada com sucesso ao mapa! 🚶',
      duration: 5000,
      variant: 'success'
    })
    map.panTo(position.getPosition() as google.maps.LatLng)
  }

  //  Ao chamar essa função apos inserir o point de destino no campo de busca/selecionar o que ja esta no mapa, ela compara se o point não é nulo, se ele for nulo mostra uma mensagem em tela, se não ele seta o point de destino que é usado para manipular as funções de rota.
  const traceRoute = () => {
    // o PointMarkerDestinationCafe é so usado para manipular as funções de  traçamento da rota, enquanto o pointMarkerCafe é usado para manipular e mostrar no mapa
    setPointMarkerDestinationCafe(pointMarkerCafe)
  }

  useEffect(() => {
    if (!pointMarkerCafe) return
    traceRoute()
  }, [pointMarkerCafe])

  // Aqui informamos qual a origem e o destino para o traçamento da rota e o tipo de viagem,  ou seja essa é a função para a api de directions do google maps
  // O uso do useMemo é para evitar que o objeto seja recriado toda vez que o componente for renderizado, ou seja, ele só vai ser criado uma vez, e quando o pointMarkerDestinationCafe mudar, ele vai ser recriado.
  const directionsServiceOptions =
    //@ts-ignore
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin: responseState.responseDataMap
          ?.center as google.maps.LatLngLiteral,
        destination:
          pointMarkerDestinationCafe?.getPosition() as google.maps.LatLng,
        // travelMode: google.maps.TravelMode.WALKING
        travelMode: 'WALKING'
      }
    }, [pointMarkerDestinationCafe])

  // Aqui recebemos a resposta da api de directions do google maps, se ela ja esta carregado, passando ela como referencia para o responseMatrix, ou seja se ja foi realizado o req da api em si
  const directionsCallback = useCallback((res: any) => {
    if (res !== null && res.status === 'OK') {
      setResponseMatrix(res)
    } else {
      toast({
        title: 'Não foi possível traçar a rota! 😢',
        duration: 5000
      })
    }
  }, [])

  // Aqui sim contem as informações da rota, ou seja, a linha que liga o ponto de partida ao ponto de destino. Ou seja a renderização da rota
  const directionsRenderOptions = useMemo<any>(() => {
    return {
      directions: responseMatrix
    }
  }, [responseMatrix])

  const requestPointClosestMarker = (
    results: google.maps.places.PlaceResult[] | null
  ) => {
    // Encontrar a cafeteria mais próxima
    // Aqui estamos usando o método reduce para encontrar o local mais próximo dentre os resultados ou seja as cafeteria que estão na região do usuário
    let closestCafe = results!.reduce((closest, current) => {
      // estamos pegando a localização do local atual e do local mais próximo da cafeteria
      const currentLocation = current.geometry?.location as google.maps.LatLng
      const closestLocation = closest.geometry?.location as google.maps.LatLng

      // aqui no caso estamos pegando o atual local do usuário + o local atual da cafeteria mais proxima e calculando a distância entre eles
      const currentDistance =
        google.maps.geometry.spherical.computeDistanceBetween(
          // From
          responseState.responseDataMap
            ?.center as unknown as google.maps.LatLng,
          // To
          currentLocation
        )
      // aqui no caso estamos pegando o atual local do usuário + o local mais próximo da cafeteria mais proxima  e calculando a distância entre eles
      const closestDistance =
        google.maps.geometry.spherical.computeDistanceBetween(
          // From
          responseState.responseDataMap
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
    setMarkerNearestCafe(closestMarker)
    //Pegamos a ref do mapa e  Movemos o mapa para o lugar
    map?.panTo(closestMarker.getPosition() as google.maps.LatLng)
  }

  const requestPointsOnTheMapAutomatic = () => {
    if (!map) return

    // Pegamos o serviço do google places e passamos o mapa como parâmetro
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
          setMarkersCafeAutomatic([
            ...markersCafeAutomatic,
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
            requestPointClosestMarker(results)
          }
        }
        if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          toast({
            title: 'Não foi possível encontrar cafeterias! 😢',
            duration: 5000
          })
        }
      }
    )
  }

  useEffect(() => {
    userBoundsFunc()
    requestPointsOnTheMapAutomatic()
    setIsLoadedButtonState(true)
  }, [map, responseState.responseDataMap?.center])

  return (
    <div className="flex flex-col w-full gap-2">
      {/* O google map carrega o mapa */}
      <StandaloneSearchBox
        onLoad={onSearchLoad}
        onPlacesChanged={onPlacesChange}
        bounds={userBounds as google.maps.LatLngBounds} // Define os limites da região do usuário (por exemplo, uma área de 5 km ao redor da localização do usuário)
      >
        <Input
          placeholder="Tem ideia de alguma cafeteria?"
          className="bg-primary-foreground text-center placeholder:text-foreground/60 placeholder:text-xs sm:placeholder:text-base text-foreground"
          onChange={e => {
            // setInputValue(e.target.value)
            inputValueSearchBox.current!.value = e.target.value
          }}
          ref={inputValueSearchBox as React.RefObject<HTMLInputElement>}
        />
      </StandaloneSearchBox>
      <GoogleMap
        onLoad={onMapLoad}
        mapContainerStyle={OPTIONS_MAP.CONTAINER_STYLE}
        center={
          responseState.responseDataMap?.center as google.maps.LatLngLiteral
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
            responseState.responseDataMap?.center as google.maps.LatLngLiteral
          }
          options={{
            label: {
              text: `${width < 768 ? 'Você esta aqui!' : 'Localização mais proxima!'}`,
              color: '#fff',
              fontSize: '12px',
              className:
                ' font-bold mt-16 bg-background p-2 rounded-lg text-center'
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

        {/* Cafes que o usuário ja pesquisou */}
        {markersSearchBox.map((position, index) => (
          <MarkerF
            key={index}
            position={{
              lat: position.getPosition()?.lat() as number,
              lng: position.getPosition()?.lng() as number
            }}
            icon={position.getIcon() as google.maps.Icon}
            options={{
              label: {
                text:
                  'Cafeteria pesquisada pelo usuário! 🤩' + position.getTitle(),
                color: '#fff',
                fontSize: '12px',
                className: styleMarkers(position)
              }
            }}
            // Ao clicar a gente tem que traçar uma rota, com isso enviamos o marker que o usuário clicou para o pointMarkerCafe e temos que chamar a função de traçar a rota: traceRoute através do useEffect toda vez que o pointMarkerCafe mudar
            onClick={() => {
              onPlacesChangeButtonMarkers(position)
            }}
          />
        ))}

        {/* Cafes achados automaticamente  */}
        {markersCafeAutomatic.map((position, index) => (
          <MarkerF
            key={index}
            position={{
              lat: position.getPosition()?.lat() as number,
              lng: position.getPosition()?.lng() as number
            }}
            icon={position.getIcon() as google.maps.Icon}
            options={{
              label: {
                text: 'Cafeterias ao redor! 🤩' + position.getTitle(),
                color: '#fff',
                fontSize: '12px',
                className: styleMarkers(position)
              }
            }}
            onClick={() => {
              onPlacesChangeButtonMarkers(position)
            }}
          />
        ))}

        {/* Cafe mais proximo */}
        {markerNearestCafe.getPosition() && (
          <MarkerF
            position={{
              lat: markerNearestCafe.getPosition()?.lat() as number,
              lng: markerNearestCafe.getPosition()?.lng() as number
            }}
            icon={markerNearestCafe.getIcon() as google.maps.Icon}
            options={{
              label: {
                text: 'Cafeteria mais próxima! ⭐',
                color: '#fff',
                fontSize: '10px',
                className:
                  'bg-accent p-2 rounded-lg text-center z-[100] absolute top-24 right-0 mt-2 mx-2 animate-bounce'
              }
            }}
            onClick={() => {
              onPlacesChangeButtonMarkers(markerNearestCafe)
            }}
          />
        )}
        {/*Atual cafe pesquisado/clicado pelo cliente*/}
        {pointMarkerCafe && (
          <MarkerF
            position={{
              lat: pointMarkerCafe.getPosition()?.lat() as number,
              lng: pointMarkerCafe.getPosition()?.lng() as number
            }}
            icon={{
              url: `${CoffeeRedUrl}`,
              scaledSize: new google.maps.Size(40, 40)
          
            }}
            options={{
              label: {
                text: 'Cafeteria em rota! 🚶',
                color: '#fff',
                fontSize: '10px',
                className:
                  'bg-accent p-2 rounded-lg text-center z-[100] absolute top-24 mt-2 mx-2 animate-bounce left-0'
              }
            }}
          />
        )}
        {/* Marcadores clicados */}
        
        {markersClicked.map((position, index) => (
          <MarkerF
            key={index}
            position={{
              lat: position.getPosition()?.lat() as number,
              lng: position.getPosition()?.lng() as number
            }}
            icon={position.getIcon() as google.maps.Icon}
            onClick={() => {
              onPlacesChangeButtonMarkers(position)
            }}
          />
        ))}


        {/* Traçamento de rotas */}

        {/* para carregar os serviços de direction, ou seja uma req da api directions */}
        {responseState.responseDataMap?.center.lat !== 0 &&
          pointMarkerDestinationCafe && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

        {/* Aqui de fato renderizamos, quando tivermos resposta da req da directions. Obs: tem que ativar ela na sua api no console da google cloud*/}
        {responseMatrix && directionsRenderOptions && (
          // Agora quem vai fazer a renderização da rota na tela
          <DirectionsRenderer options={directionsRenderOptions} />
        )}
      </GoogleMap>
    </div>
  )
}
