"use client";

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";


export default function Home() {

  const [entered, setEntered] = useState(false);

  const [formData, setFormData] = useState({
    longitude: "",
    latitude: "",
    housing_median_age: "",
    total_rooms: "",
    total_bedrooms: "",
    population: "",
    households: "",
    median_income: "",
    ocean_proximity: "INLAND",
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://housing-price-tlx4.onrender.com/predict",
        {
          longitude: Number(formData.longitude),
          latitude: Number(formData.latitude),
          housing_median_age: Number(formData.housing_median_age),
          total_rooms: Number(formData.total_rooms),
          total_bedrooms: Number(formData.total_bedrooms),
          population: Number(formData.population),
          households: Number(formData.households),
          median_income: Number(formData.median_income),
          ocean_proximity: formData.ocean_proximity,
        }
      );

      const predictedValue = response.data.predicted_price;

setPrediction(predictedValue);

const audio = new Audio("/transition.mp3");

audio.volume = 0.2;

audio.play();

    } catch (error) {

      console.error(error);
      alert("Prediction failed");

    } finally {

      setLoading(false);

    }
  };

  const generateInsights = () => {

    const insights = [];

    if (Number(formData.median_income) > 6) {
      insights.push(
        "Affluent income distribution elevated valuation potential."
      );
    }

    if (Number(formData.total_rooms) > 3000) {
      insights.push(
        "Expanded architectural volume positively influenced prediction."
      );
    }

    if (Number(formData.housing_median_age) < 15) {
      insights.push(
        "Contemporary structural age contributed to premium positioning."
      );
    }

    if (formData.ocean_proximity === "NEAR BAY") {
      insights.push(
        "Prestigious geographic proximity significantly enhanced pricing."
      );
    }

    if (insights.length === 0) {
      insights.push(
        "Balanced residential metrics resulted in stable market estimation."
      );
    }

    return insights;
  };
  const getPropertyTier = () => {

  if (!prediction) return "";

  if (prediction > 500000) {
    return "Imperial Estate";
  }

  if (prediction > 300000) {
    return "Luxury Residence";
  }

  if (prediction > 150000) {
    return "Premium Urban Housing";
  }

  return "Standard Residential";
  };
  return (

    <main className="min-h-screen bg-[#0b0b0b] text-[#f5e6c8] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[140px] rounded-full" />

      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#b8924a]/10 blur-[120px] rounded-full" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#e6d3b3]/5 blur-[100px] rounded-full" />
{[...Array(18)].map((_, i) => (

  <div
    key={i}
    className="pointer-events-none absolute text-[#d4af37]/20 animate-pulse"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 12 + 10}px`,
      animationDuration: `${Math.random() * 4 + 2}s`,
    }}
  >
    ✦
  </div>

))}
      <AnimatePresence>

        {!entered ? (

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative"
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_50%)]" />

            <div className="relative z-10 max-w-5xl">

              <div className="text-[#d4af37] text-lg tracking-[0.4em] mb-6">
                ━━━ ❖ ━━━
              </div>

              <h1
                className="text-3xl sm:text-5xl md:text-6xl leading-tight"
                style={{
                  fontFamily: "var(--font-cinzel)",
                }}
              >
                𓂀 HOUSING INTELLIGENCE 𓂀
              </h1>

              <p
                className="mt-10 text-lg md:text-2xl text-[#d8c4a0] leading-relaxed"
                style={{
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                A refined machine learning experience designed
                for elegant property valuation and intelligent
                real estate forecasting.
              </p>

              <button
                onClick={() => {

  setEntered(true);

}}
                className="mt-16 px-10 py-5 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-500 text-lg tracking-widest"
              >
                ENTER EXPERIENCE
              </button>

              <div
                className="mt-24 text-[#8a7a5e] text-sm tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                Crafted & Maintained by Sahil Kumar
              </div>

            </div>

          </motion.section>

        ) : (

          <motion.section
  initial={{ opacity: 0, scale: 1.03 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.2 }}
            className="px-4 sm:px-8 py-12"
          >

            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">

                <div className="text-[#d4af37] tracking-[0.4em] mb-4">
                  ✦ PROPERTY ANALYSIS ✦
                </div>

                <h2
                  className="text-5xl md:text-7xl"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                  }}
                >
                  Intelligent Valuation
                </h2>

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div className="hover:shadow-[0_0_60px_rgba(212,175,55,0.08)]
hover:border-[#d4af37]/30
transition-all duration-700 border border-[#3a2f1c] bg-[#111111] p-8 rounded-none">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {Object.keys(formData)
                      .filter((key) => key !== "ocean_proximity")
                      .map((field) => (

                        <input
                          key={field}
                          name={field}
                          placeholder={field.replaceAll("_", " ")}
                          onChange={handleChange}
                          className="bg-black border border-[#3a2f1c] px-4 py-4 outline-none text-[#f5e6c8]"
                        />

                    ))}

                  </div>

                  <select
                    name="ocean_proximity"
                    onChange={handleChange}
                    className="w-full mt-4 bg-black border border-[#3a2f1c] px-4 py-4 text-[#f5e6c8]"
                  >
                    <option value="INLAND">INLAND</option>
                    <option value="NEAR BAY">NEAR BAY</option>
                    <option value="<1H OCEAN">{"<1H OCEAN"}</option>
                    <option value="NEAR OCEAN">NEAR OCEAN</option>
                  </select>

                  <button
  onClick={handlePredict}
  className="w-full mt-8 bg-[#d4af37] text-black py-5 tracking-[0.3em] hover:opacity-80 transition hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
>
  {loading ? "ANALYZING..." : "GENERATE VALUATION"}

                    
                  </button>

                </div>

                <div className=" hover:shadow-[0_0_60px_rgba(212,175,55,0.08)]
hover:border-[#d4af37]/30
transition-all duration-700 border border-[#3a2f1c] bg-[#111111] p-10">

                  <div className="text-[#d4af37] tracking-[0.3em] mb-8">
                    ✦ ───────── AI VALUATION ───────── ✦
                  </div>

                  {loading ? (

                  <div className="flex flex-col items-center justify-center py-20">

  <div className="animate-spin text-5xl text-[#d4af37]">
    ✦
  </div>

  <div
    className="mt-10 text-[#d4af37] tracking-[0.4em] text-sm"
    style={{
      fontFamily: "var(--font-cinzel)",
    }}
  >
    ANALYZING PROPERTY INTELLIGENCE
  </div>

  <div className="mt-6 text-[#8a7a5e] text-center max-w-md leading-relaxed">

    Neural valuation systems are processing
    architectural, geographic and economic
    intelligence patterns.

  </div>

</div>

                  ) : prediction ? (

                    <div>

                      <div
                        className="text-5xl md:text-7xl text-[#d4af37]"
                        style={{
                          fontFamily: "var(--font-cinzel)",
                        }}
                      >
                        $
<CountUp
  end={prediction}
  duration={2.5}
  separator=","
  decimals={2}
/>
                      </div>

                      <div className="mt-10 space-y-4">

                        {generateInsights().map((insight, index) => (

                          <div
                            key={index}
                            className="border border-[#3a2f1c] bg-black p-4 text-[#d8c4a0]"
                          >
                            ✦ {insight}
                          </div>

                        ))}
{prediction && (

  <div className="mt-10">

    <a
      href={`/analytics?price=${prediction}`}
      className="inline-block border border-[#d4af37] px-8 py-4 text-[#d4af37] tracking-[0.3em] hover:bg-[#d4af37] hover:text-black transition-all duration-500"
    >
      VIEW MARKET INTELLIGENCE
    </a>

  </div>

)}
                      </div>

                    </div>

                  ) : (

                    <div className="text-[#8a7a5e] mt-20">
                      Awaiting property intelligence input...
                    </div>

                  )}

                </div>

              </div>

              <div
                className="text-center mt-24 text-[#6d5d42] tracking-[0.3em] text-sm"
                style={{
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                ━━━ ❖ ━━━  SAHIL KUMAR  ━━━ ❖ ━━━
              </div>

            </div>
<div className="mt-28">

  <div className="text-center mb-14">

    <div className="text-[#d4af37] tracking-[0.4em] mb-5">
      ✦ ───────── MARKET INTELLIGENCE ───────── ✦
    </div>

    <h2
      className="text-4xl md:text-6xl"
      style={{
        fontFamily: "var(--font-cinzel)",
      }}
    >
      Valuation Analytics
    </h2>

  </div>

  <div className="border border-[#3a2f1c] bg-[#111111] p-8 hover:shadow-[0_0_60px_rgba(212,175,55,0.08)] transition-all duration-700">

  </div>

</div>
          </motion.section>

        )}

      </AnimatePresence>

    </main>
  );
}