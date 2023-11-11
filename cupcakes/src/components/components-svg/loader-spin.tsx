import { Loader } from '@assets/icons'

export function LoaderSpin() {
  return (
    <div className="animate-bounce">
      <Loader className="w-8 h-8 lg:w-16 lg:h-16 animate-spin" />
    </div>
  )
}
