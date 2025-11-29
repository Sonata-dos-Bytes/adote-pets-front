export const GuidesPage = () => {
  const sections = [
    {
      title: "Primeiros Passos",
      content: [
        "Navegue pela página de adoção e escolha seu Pet",
        "Depois de escolher, entre em contato com o responsável pelo anuncio",
        "Todo o contato é feito fora da nossa plataforma",
      ],
    },
    {
      title: "Adicione um Pet para adoção",
      content: [
        "Navegue até a página de adoção",
        "Preencha o formulário com as informações do seu Pet",
        "Espere o contato de alguém interessado",
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      {/* Cabeçalho */}
      <h1 className="text-4xl font-bold text-[color:var(--color-secondary)]">
        Guia da Plataforma
      </h1>

      <p className="text-gray-700 text-lg mt-3">
        Aqui você encontra instruções, respostas para dúvidas frequentes e orientações
        gerais sobre o uso do sistema.
      </p>

      {/* Divisões */}
      <div className="mt-12 space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="border border-gray-200 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-[color:var(--color-primary)] mb-4">
              {section.title}
            </h2>

            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-500 mt-16">
      </div>
    </div>
  );
};
