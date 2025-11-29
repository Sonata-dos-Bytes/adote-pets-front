
export const AboutPage = () => {
  return <div className="flex flex-row gap-2">
    <div className="w-1/2 p-4" >

  
    <div className="text-left">
      <h1 className="p-6 text-3xl font-bold mb-4">NOSSA HISTÓRIA</h1>
    </div>
    <div className="flex flex-col gap-2 indent-8 text-justify">
        <p>
          Somos um grupo de seis estudantes apaixonados por tecnologia e por causas que realmente fazem a diferença:
          <b> Guilherme, Matheus, Pedro, Erikli, Thayna e Luan Jacomini</b>
          . Tudo começou com uma ideia simples durante uma conversa comum — percebemos o quanto muitos animais aguardam por um lar e como,
          ao mesmo tempo, várias pessoas querem adotar, 
          mas não encontram uma plataforma acessível e organizada.
        </p>
        <p>
          Movidos pelo <i>ódio</i>, decidimos criar um site que aproximasse pessoas e pets em busca de uma segunda chance. 
          Cada integrante contribuiu com habilidades únicas: desde o desenvolvimento e design até a experiência do usuário e o planejamento. Com isso, 
          construímos uma plataforma dedicada à adoção responsável de cães e gatos, oferecendo informações claras,
          filtrando necessidades específicas e facilitando o contato entre adotantes e protetores.
        </p>
        <p>
          Acreditamos que cada animal merece amor, segurança e um lar de verdade. 
          Nosso projeto nasceu para tornar esse encontro mais fácil, humano e consciente. 
          E esta é apenas a primeira etapa do nosso compromisso: 
          criar soluções que impactem positivamente vidas — humanas e animais.
        </p>
    </div>
  </div>
  <div className="w-1/2 p-8" > <img src="./assets/images/adote-pets.png" alt="" className="w-200 h-200" /></div>
  </div>

};
