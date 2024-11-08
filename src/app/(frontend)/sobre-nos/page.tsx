export default function AboutUsPage() {
  return (
    <section className="py-8">
      <div className="theme-container flex h-full flex-col items-center justify-center gap-6 text-center">
        <h1 className="relative mx-auto flex max-w-max items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary-100 px-8 py-2 text-white before:h-2 before:w-2 before:rounded-full before:bg-white after:h-2 after:w-2 after:rounded-full after:bg-white max-xs:text-3xl xs:text-4xl">
          Sobre nós
        </h1>
        <p className="mx-auto w-full max-w-[46rem] text-slate-500 max-xs:text-xl xs:text-3xl">
          Somos uma empresa familiar desde 2019, atendendo Campinas e região.
          Temos paixão por servir nossos clientes com o que há de mais saudável,
          sem abrir mão do sabor caseiro, como na casa da vovó. Buscamos os
          melhores ingredientes como: Azeite extra virgem, Manteiga pura,
          Hortaliças frescas e sal marinho. Evitamos condimentos
          industrializados.
        </p>
      </div>
    </section>
  )
}
