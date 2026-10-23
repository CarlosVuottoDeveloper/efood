import Header from "@/components/Header";
import TopNav from "@/components/TopNav";
import AboutUs from "@/components/AboutUs";
import EcoRestaurants from "@/components/EcoRestaurants";
import PartnerForm from "@/components/PartnerForm";
import Poll from "@/components/Poll";

export default function Home() {
  return (
    <>
      <Header />
      <TopNav />
      <main>
        <AboutUs />
        <EcoRestaurants />
        <PartnerForm />
      </main>
      <Poll />
    </>
  );
}
