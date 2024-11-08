type DigitalMenuPriceProps = {
  price: number
}

export function DigitalMenuPriceTable({ price }: DigitalMenuPriceProps) {
  return <span>{`R$ ${price?.toFixed(2).replace('.', ',')}`}</span>
}
