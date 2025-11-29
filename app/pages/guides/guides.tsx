import React, { useState } from 'react';
import { Search, PawPrint, Plus, MessageCircle, CheckCircle, ArrowRight, HelpCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

export const GuidesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigator = useNavigate();

  const sections = [
    {
      title: "Como Adotar um Pet",
      icon: Search,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      steps: [
        {
          number: "01",
          title: "Navegue e Escolha",
          description: "Explore nossa página de adoção e encontre o pet perfeito para você",
          icon: Search
        },
        {
          number: "02",
          title: "Entre em Contato",
          description: "Após escolher, entre em contato direto com o responsável pelo anúncio",
          icon: MessageCircle
        },
        {
          number: "03",
          title: "Finalize a Adoção",
          description: "Todo o processo de contato é feito fora da plataforma para sua segurança",
          icon: CheckCircle
        },
      ],
    },
    {
      title: "Como Anunciar um Pet",
      icon: Plus,
      color: "from-red-900 to-red-950",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-900",
      steps: [
        {
          number: "01",
          title: "Acesse a Página",
          description: "Navegue até a página de adoção através do menu principal",
          icon: PawPrint
        },
        {
          number: "02",
          title: "Preencha o Formulário",
          description: "Adicione todas as informações importantes do seu pet (fotos, idade, características)",
          icon: Plus
        },
        {
          number: "03",
          title: "Aguarde Contato",
          description: "Espere o contato de pessoas interessadas em adotar",
          icon: Clock
        },
      ],
    },
  ];

  const faqs = [
    {
      question: "A plataforma cobra alguma taxa?",
      answer: "Não! Nossa plataforma é 100% gratuita para adotantes e anunciantes."
    },
    {
      question: "Como funciona o processo de adoção?",
      answer: "Após encontrar um pet, você entra em contato direto com o responsável. A adoção é combinada entre vocês."
    },
    {
      question: "Posso anunciar qualquer tipo de animal?",
      answer: "Atualmente, nossa plataforma é focada em cães e gatos para adoção responsável."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="w-full max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E18559] to-[#d67347] rounded-full mb-6 shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#380706] mb-4">
            Guia da Plataforma
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tudo que você precisa saber para adotar ou anunciar um pet de forma simples e segura
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === i
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 hover:shadow-md hover:scale-102 border border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {section.title}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mb-16">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                activeTab === i ? 'block' : 'hidden'
              }`}
            >
              <div className={`${section.bgColor} rounded-3xl p-8 mb-8`}>
                <h2 className={`text-3xl font-bold ${section.iconColor} mb-6 text-center`}>
                  Passo a Passo
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {section.steps.map((step, idx) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                      >
                        {/* Number Badge */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 font-bold text-lg">{step.number}</span>
                        </div>

                        {/* Icon */}
                        <div className={`w-14 h-14 ${section.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                          <StepIcon className={`w-7 h-7 ${section.iconColor}`} />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-[#380706] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Arrow indicator for flow */}
                        {idx < section.steps.length - 1 && (
                          <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                            <ArrowRight className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#380706] mb-8 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-l-4 border-[#E18559] bg-orange-50 rounded-r-xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-[#380706] mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-[#E18559] flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-[#E18559] to-[#d67347] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <PawPrint className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Fazer a Diferença?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Cada adoção é uma vida transformada. Comece sua jornada agora e encontre seu novo melhor amigo!
          </p>
          <button 
            className="bg-white text-[#E18559] px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigator('/adoption')}  
          >
            Ir para Adoção
          </button>
        </div>
      </div>
    </div>
  );
};