import { AlertCircle, Globe, Lock, MapPin, MapPinOff } from '@assets/icons'

interface IResponseState {
  responseState: '' | 'granted'| 'prompt' | 'denied'
}

interface IGeolocationPosition {
  responseDataMap?: {
    center: {
      lat: number
      lng: number
    }
    accuracy: number
  }
  error?: {
    code: number
    message: string
  }
  messageGeolocationNotSupportedBrowser?: {
    error: string
  }
  responseState?: IResponseState,
  watchId?: number | null
}

const icons = [
  {
    title: 'Pino do mapa cortado',
    icon: MapPinOff
  },
  {
    title: 'Pino do mapa',
    icon: MapPin
  },
  {
    title: 'Circulo com um alerta(Exclamação)',
    icon: AlertCircle
  },
  {
    title: 'Planeta',
    icon: Globe
  },
  {
    title: 'Cadeado',
    icon: Lock
  }
]

export type {
  IResponseState,
  IGeolocationPosition,
}

export { icons }
