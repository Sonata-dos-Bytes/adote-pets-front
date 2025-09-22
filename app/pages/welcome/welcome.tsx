import Button from "~/components/ui/button/button";
import "./welcome.css";
import welcomeImage from "/assets/images/welcome-picture.svg";
import welcomeBackground from "/assets/images/welcome-background.svg";

export function Welcome() {
  return (
    <main className="main-content">
      <section className="welcome-section">
        <div>
          <h1>O Novo <span>Melhor Amigo</span> da Sua Família!</h1>
        </div>
        <div>
          <p>
            Encontre o pet perfeito para compartilhar momentos especiais.
            Cães e gatos estão prontos para levar alegria ao seu lar.
          </p>
        </div>
        <div className="button-group">
          <div>
            <Button bgColor="#D77445" textColor="#fff3ed">Adote Agora</Button>
          </div>
          <div>
            <Button>Doe Agora</Button>
          </div>
        </div>
      </section>
      <section className="welcome-figure">
        <img src={welcomeImage} alt="Welcome Figure" />
        <img className="background-image" src={welcomeBackground} alt="Welcome Background" />
      </section>
    </main>
  );
}
