import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Stats from "./components/Stats";
import DeliveryLive from "./components/DeliveryLive";
import MobileApp from "./components/MobileApp";
import Footer from "./components/Footer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar/>
      <Hero/>
      <Stats/>
      <AboutSection/>
      <DeliveryLive/>
      <MobileApp/>
      <Footer/>
    </div>
  );
}