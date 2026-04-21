"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import LearningPaths from "./components/LearningPaths";
import WhySection from "./components/WhySection";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar/>
      <Hero/>
      <Features/>
      <LearningPaths/>
      <WhySection/>
      <CTA/>
      <Footer/>
    </div>
  );
}