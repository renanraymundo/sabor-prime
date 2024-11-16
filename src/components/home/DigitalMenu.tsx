import {
  getDigitalMenusByLine,
  getLines,
} from '@/actions/DigitalMenuLineActions'

import { FinalizeOrder } from '../FinalizeOrder'
import {
  DigitalMenuContent,
  DigitalMenuContentItemProps,
} from './DigitalMenuContent'

export async function DigitalMenu() {
  const lines = await getLines()
  const digitalMenusByLine = await getDigitalMenusByLine(
    lines.map((line) => line.id),
  )

  return (
    <section className="flex items-center justify-center py-12">
      <div className="theme-container">
        <h1 className="relative mx-auto flex max-w-max items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary px-8 py-2 font-bold text-white before:h-2 before:w-2 before:rounded-full before:bg-white after:h-2 after:w-2 after:rounded-full after:bg-white max-xs:text-2xl xs:text-3xl">
          Cardápio Digital
        </h1>
        <p className="mt-2 text-center max-md:text-base max-md:leading-5 md:text-xl md:leading-6">
          Monte seu kit, entregamos a partir de 6 unidades de qualquer linha ou
          na escolha de no mínimo 1 kit do cardápio.
        </p>

        <DigitalMenuContent
          items={digitalMenusByLine as DigitalMenuContentItemProps[]}
        />

        <FinalizeOrder />
      </div>
    </section>
  )
}
