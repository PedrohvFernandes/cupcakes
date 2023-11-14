import { AlertCircle, Globe, Lock, MapPin, MapPinOff } from '@assets/icons'

interface IResponseState {
  responseState: '' | 'granted' | 'prompt' | 'denied'
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

export type { IResponseState }

export { icons }
