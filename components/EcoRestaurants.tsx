import Image from "next/image";
import spRestaurants from "@/public/img/sp-restaurants.jpg";

export default function EcoRestaurants() {
  return (
    <section id="eco-restaurants">
      <table>
        <tbody>
          <tr>
            <td>
              <h4>
                O restaurante parceiro passa a ser reconhecido pela responsabilidade com as
                <br />
                embalagens de seus produtos e paga somente um valor mensal pelo compartilhamento
                <br />
                dessas embalagens.
              </h4>
            </td>
            <td>
              <Image className="restaurantImage" src={spRestaurants} alt="Restaurantes em São Paulo" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
