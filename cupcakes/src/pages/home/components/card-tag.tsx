import {
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut
} from '@components/ui/menubar'

interface ICardTag extends React.HTMLAttributes<HTMLDivElement> {
  coffeeTag: {
    text: string
    shortcut: string
    id: string
  }
}

export function CardTag({ coffeeTag, ...rest }: Readonly<ICardTag>) {
  return (
    <div {...rest}>
      <MenubarItem className="flex gap-2 items-center justify-center cursor-pointer">
        <span>{coffeeTag.text}</span>
        <MenubarShortcut>{coffeeTag.shortcut}</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
    </div>
  )
}
