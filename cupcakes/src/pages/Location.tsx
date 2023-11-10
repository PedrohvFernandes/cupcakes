import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

import { ConfigAuth } from '@config/index'

import useGetGeolocationMaps from '@hooks/get-geolocation-maps'

const containerStyle = {
  width: '400px',
  height: '400px'
}

const center = {
  lat: -3.7989,
  lng: -38.456
}

// const OPTIONS = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }

export function Location() {
  const { isLoaded } = useJsApiLoader({
    id: ConfigAuth.cupcakes.google.keys.maps.id,
    googleMapsApiKey: ConfigAuth.cupcakes.google.keys.maps.key
  })

  const {getLocation} = useGetGeolocationMaps()
  console.log(getLocation())

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.permissions
  //       .query({ name: 'geolocation' })
  //       .then(function (result) {
  //         console.log(result)
  //       })
  //   } else {
  //     console.log('Geolocation is not supported by this browser.')
  //   }
  // }, [])

  // function success(pos: GeolocationPosition) {
  //   // O CRD é um objeto que contém informações de localização
  //   let coords = pos.coords
  //   console.log('Your current position is:')
  //   console.log(`Latitude : ${coords.latitude}`)
  //   console.log(`Longitude: ${coords.longitude}`)
  //   console.log(`More or less ${coords.accuracy} meters.`)
  // }

  // function errors(err: GeolocationPositionError) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`)
  // }

  // useEffect(() => {
  //   // Verifica se o navegador tem suporte a geolocalização
  //   if (navigator.geolocation) {
  //     // Verifica se a permissão já foi dada para o navegador sobre a geolocalização
  //     navigator.permissions
  //       .query({ name: 'geolocation' })
  //       .then(function (response) {
  //         if (response.state === 'granted') {
  //           //Se concedido, você pode chamar diretamente sua função aqui
  //           navigator.geolocation.getCurrentPosition(success, errors, OPTIONS)
  //         } else if (response.state === 'prompt') {
  //           //Se solicitado, o usuário será solicitado a dar permissão
  //           navigator.geolocation.getCurrentPosition(success, errors, OPTIONS)
  //         } else if (response.state === 'denied') {
  //           //Se negado, você deverá mostrar instruções para ativar a localização
  //         }
  //       })
  //   } else {
  //     // Se não for suportado, você pode mostrar uma mensagem para o usuário
  //     console.log('Geolocation is not supported by this browser.')
  //   }
  // }, [])

  return (
    <section>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            position={center}
            options={{
              label: {
                text: 'Cupcakes',
                // color: '#fff',
                // fontSize: '16px',
                // fontWeight: 'bold'
                className: 'text-2xl text-white font-bold mb-10'
              }
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </section>
  )
}
