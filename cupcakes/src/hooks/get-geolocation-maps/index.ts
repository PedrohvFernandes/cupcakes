// Infos da geolocalização
interface IGeolocationPosition {
  center: {
    lat: number
    lng: number
  }
  accuracy: number
  error?: {
    code: string
    message: string
  }
}

const OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

// Objeto criado para servir de retorno das informações de geolocalização, pois o retorno da função principal getCurrentPosition que utiliza as funções success e errors não retorna nada, com isso, foi criado um objeto para servir de retorno
let responseDataMap: IGeolocationPosition = {
  center: {
    lat: 0,
    lng: 0
  },
  accuracy: 0,
  error: {
    code: '',
    message: ''
  }
}

let messageGeolocationNotSupportedBrowser = {
  error: ''
}

const success = (pos: GeolocationPosition): IGeolocationPosition => {
  // O CRD é um objeto que contém informações de localização
  let coords = pos.coords
  // console.log('Your current position is:')
  // console.log(`Latitude : ${coords.latitude}`)
  // console.log(`Longitude: ${coords.longitude}`)
  // console.log(`More or less ${coords.accuracy} meters.`)

  // return <IGeolocationPosition> {
  //   lat: coords.latitude,
  //   lng: coords.longitude,
  //   marker: {
  //     lat: coords.latitude,
  //     lng: coords.longitude
  //   },
  //   accuracy: coords.accuracy
  // }

  responseDataMap = {
    center: {
      lat: coords.latitude,
      lng: coords.longitude
    },
    accuracy: coords.accuracy
  }

  return responseDataMap
}

const errors = (err: GeolocationPositionError): IGeolocationPosition => {
  console.warn(`ERROR(${err.code}): ${err.message}`)

  responseDataMap = {
    center: {
      lat: 0,
      lng: 0
    },
    accuracy: 0,
    error: {
      code: `ERROR_CODE: (${err.code})`,
      message: `Mensagem de erro: ${err.message}`
    }
  }

  return responseDataMap
}

// Info do maps
const OPTIONS_MAP = {
  CONTAINER_STYLE: {
    width: '100%',
    height: '600px',
    borderRadius: '10px',
  }
}

// Função principal para pegar a geolocalização, que usa as funções success e errors
const getLocation = () => {
  // Verifica se o navegador tem suporte a geolocalização
  if (navigator.geolocation) {
    // Verifica se a permissão já foi dada para o navegador sobre a geolocalização: 'granted' = concedido, 'prompt' = solicitado, 'denied' = negado
    const responseState = navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (response) {
        //Se concedido, você pode chamar diretamente sua função aqui 'granted'  e  Se solicitado, o usuário será solicitado a dar permissão  'prompt' e Se negado, você deverá mostrar instruções para ativar a localização no navegador 'denied'
        navigator.geolocation.getCurrentPosition(success, errors, OPTIONS)
        return {
          responseState: response.state
        }
      })

    // Apos a execução da função getCurrentPosition, se tudo der certo dentro de success ele irá setar os valores de responseDataMap, com isso, podemos retornar o objeto responseDataMap ou se der erro, ele irá setar os valores de responseDataMap com os valores de errors, com isso, podemos retornar o objeto responseDataMap
    // E por fim retornamos o objeto responseState que é uma promise e o objeto responseDataMap que contém os valores de geolocalização
    return {
      responseDataMap,
      responseState
    }
  } else {
    // Se não for suportado, você pode mostrar uma mensagem para o usuário
    messageGeolocationNotSupportedBrowser = {
      error: 'A geolocalização não é suportada por este navegador.'
    }
    return {
      messageGeolocationNotSupportedBrowser
    }
  }
}

const useGetGeolocationMaps = () => {
  return {
    OPTIONS_MAP,
    // success,
    // errors,
    getLocation
  }
}

export default useGetGeolocationMaps
