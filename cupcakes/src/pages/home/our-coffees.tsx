import { coffees } from '../../data/coffees'

export function OurCoffees() {
  return (
    <div className="w-full">
      <h2 className="leading-[130%] font-extrabold text-center md:text-start text-2xl lg:text-4xl  tracking-wide">
        Nossos cafés ☕
      </h2>

      <div className="flex flex-col items-center justify-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
        {coffees.map(coffee => (
          <div
            className="flex flex-col items-center justify-center gap-4 w-full"
            key={coffee.id}
          >
            {/* <img src={coffee.image} alt={coffee.name} className="w-full rounded" /> */}
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-lg font-bold text-center md:text-start">
                {coffee.name}
              </h3>
              <span className="text-sm text-center md:text-start">
                {coffee.description}
              </span>
              <span className="text-sm text-center md:text-start">
                {coffee.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
