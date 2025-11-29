import React from 'react';
import { Heart, Users, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <Heart className="w-8 h-8 text-[#E18559]" fill="#E18559" />
          </div>
          <h1 className="text-5xl font-bold text-[#380706] mb-4">
            Nossa História
          </h1>
          <div className="w-24 h-1 bg-[#E18559] mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#E18559]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#380706] mb-3">
                    Quem Somos
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Somos um grupo de seis estudantes apaixonados por tecnologia e por
                    causas que realmente fazem a diferença:
                    <span className="font-semibold text-[#E18559]"> Guilherme, Matheus, Pedro, Erikli, Thayna e Luan Jacomini</span>.
                    Tudo começou com uma ideia simples durante uma conversa comum —
                    percebemos o quanto muitos animais aguardam por um lar e como, ao
                    mesmo tempo, várias pessoas querem adotar, mas não encontram uma
                    plataforma acessível e organizada.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#E18559]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#380706] mb-3">
                    Nossa Missão
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Movidos pela <span className="italic font-medium">paixão</span>, decidimos criar um site que aproximasse
                    pessoas e pets em busca de uma segunda chance. Cada integrante
                    contribuiu com habilidades únicas: desde o desenvolvimento e design
                    até a experiência do usuário e o planejamento.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Com isso, construímos uma plataforma dedicada à adoção responsável de cães e gatos,
                    oferecendo informações claras, filtrando necessidades específicas e
                    facilitando o contato entre adotantes e protetores.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#E18559] to-[#d67347] rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-3">
                Nosso Propósito
              </h2>
              <p className="leading-relaxed">
                Acreditamos que cada animal merece amor, segurança e um lar de
                verdade. Nosso projeto nasceu para tornar esse encontro mais fácil,
                humano e consciente. E esta é apenas a primeira etapa do nosso
                compromisso: criar soluções que impactem positivamente vidas —
                humanas e animais.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E18559] to-[#380706] rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="./assets/images/adote-pets.png"
                alt="Adote Pets"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#E18559] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#380706] rounded-full opacity-10 animate-pulse delay-75"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-[#E18559] mb-2">6</div>
            <div className="text-gray-600 font-medium">Integrantes Dedicados</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-[#E18559] mb-2">1</div>
            <div className="text-gray-600 font-medium">Missão Compartilhada</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl font-bold text-[#E18559] mb-2">∞</div>
            <div className="text-gray-600 font-medium">Vidas Impactadas</div>
          </div>
        </div>
      </div>
    </div>
  );
};