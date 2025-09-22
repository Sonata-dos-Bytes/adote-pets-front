import { Icon } from "@iconify/react";
import "./footer.css";
import InputWithIcon from "../ui/input-with-icon/input-with-icon";
import Button from "../ui/button/button";

export default function Footer() {
  return (
    <footer className="footer">
      {/* BLOCO SUPERIOR */}
      <section className="footer-logo">
        <div className="footer-col">
          <h3>Como podemos ajudar</h3>
          <ul>
            <li><a href="#">Adotar um pet</a></li>
            <li><a href="#">Doar um pet</a></li>
            <li><a href="#">Adotar FAQ&apos;s</a></li>
            <li><a href="#">Doar FAQ&apos;s</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contatos</h3>
          <ul>
            <li>
              <Icon icon="mdi:map-marker" className="icon" />
              <span>123 Rua Brasil, Maranhão, Brasil</span>
            </li>
            <li>
              <Icon icon="mdi:phone" className="icon" />
              <span>+55 (99) 98477-5124</span>
            </li>
            <li>
              <Icon icon="mdi:email" className="icon" />
              <span>adotepets@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Mantenha contato conosco</h3>
          <p className="newsletter-text">
            Junte-se à newsletter AdotePets e seja o primeiro a saber das novidades
          </p>
          <form className="newsletter-form">
            <InputWithIcon
              icon="mdi:email-outline"
              type="email"
              placeholder="Coloque seu e-mail"
            />
            <Button type="submit">Inscreva-se</Button>
          </form>
        </div>
      </section>

      {/* BLOCO INFERIOR */}
      <section className="footer-content">
        <div>
          <p>©2025 AdotePets</p>
        </div>
        <div className="social-icons">
          <a href="#"><Icon icon="ri:facebook-fill" width="24" height="24" /></a>
          <a href="#"><Icon icon="ri:pinterest-fill" width="24" height="24" /></a>
          <a href="#"><Icon icon="ri:tumblr-fill" width="24" height="24" /></a>
          <a href="#"><Icon icon="ri:instagram-line" width="24" height="24" /></a>
          <a href="#"><Icon icon="ri:youtube-fill" width="24" height="24" /></a>
        </div>
      </section>
    </footer>
  );
}
