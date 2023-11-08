import { Button, ButtonProps } from '@components/ui/button'

export function ButtonDefault({ ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      variant={'outline'}
      className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
    />
  )
}
