interface IGeolocationPosition {
  lat: number
  lng: number
  marker: {
    lat: number
    lng: number
  }
  accuracy: number
  error?: {
    code: string
    message: string
  }
}

const OPTIONS_MAP = {
  OPTIONS: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },
  CONTAINERSTYLE: {
    width: '400px',
    height: '400px'
  }
}

const success = (pos: GeolocationPosition) => {
  // O CRD é um objeto que contém informações de localização
  let coords = pos.coords
  // console.log('Your current position is:')
  // console.log(`Latitude : ${coords.latitude}`)
  // console.log(`Longitude: ${coords.longitude}`)
  // console.log(`More or less ${coords.accuracy} meters.`)

  return <IGeolocationPosition>{
    lat: coords.latitude,
    lng: coords.longitude,
    marker: {
      lat: coords.latitude,
      lng: coords.longitude
    },
    accuracy: coords.accuracy
  }
}

const errors = (err: GeolocationPositionError) => {
  console.warn(`ERROR(${err.code}): ${err.message}`)

  return <IGeolocationPosition>{
    lat: 0,
    lng: 0,
    marker: {
      lat: 0,
      lng: 0
    },
    accuracy: 0,
    error: {
      code: `ERROR_CODE: (${err.code})`,
      message: `Erro: ${err.message}`
    }
  }
}

const getLocation = () => {
  // Verifica se o navegador tem suporte a geolocalização
  if (navigator.geolocation) {
    // Verifica se a permissão já foi dada para o navegador sobre a geolocalização
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (response) {
        if (response.state === 'granted' || response.state === 'prompt') {
          //Se concedido, você pode chamar diretamente sua função aqui
         navigator.geolocation.getCurrentPosition(
            success,
            errors,
            OPTIONS_MAP.OPTIONS
          )
        } else {
          //Se negado, você deverá mostrar instruções para ativar a localização
        }
      })
  } else {
    // Se não for suportado, você pode mostrar uma mensagem para o usuário
    console.log('A geolocalização não é suportada por este navegador.')
    return <IGeolocationPosition>{
      lat: 0,
      lng: 0,
      marker: {
        lat: 0,
        lng: 0
      },
      accuracy: 0,
      error: {
        code: 'ERROR_CODE: (0)',
        message: 'A geolocalização não é suportada por este navegador.'
      }
    }
  }
}

const useGetGeolocationMaps = () => {
  return {
    OPTIONS_MAP,
    success,
    errors,
    getLocation
  }
}

export default useGetGeolocationMaps