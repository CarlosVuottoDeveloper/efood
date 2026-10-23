import Image from "next/image";
import productLifecycle from "@/public/img/product-lifecycle.png";

export default function AboutUs() {
  return (
    <section id="about-us" className="grayBackground">
      <table>
        <tbody>
          <tr>
            <td>
              <Image className="fullImage" src={productLifecycle} alt="Ciclo de vida do produto" />
            </td>
            <td>
              <h4>
                O que é o Efood?
                <br />
                Somos uma empresa que visa substituir as embalagens descartáveis de uso único por soluções
                <br />
                reutilizáveis equivalentes.
                <br />
                Somos gerenciados e compartilhados através da rede de cafés existente,
                <br />
                minimizando desperdícios e<br />
                recursos.
                <br />
                Uso compartilhado, menos recursos, menos desperdício.
                <br />
                Por que retornar?
                <br />
                A devolução e reutilização evitam que as embalagens de uso único cheguem ao aterro.
                <br />
                Isso reduz o uso de
                <br />
                recursos e as ineficiências de reciclagem.
                <br />
                Retornar é como reciclar, mas é 1000 vezes melhor.
                <br />A Efood
                <br />
                emprega um conjunto compartilhado de produtos e materiais escolhidos para higiene,
                <br />
                segurança e<br />
                longevidade.
              </h4>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
