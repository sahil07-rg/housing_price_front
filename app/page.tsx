"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Sparkles,
  Building2,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export default function Home() {
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
        "https://housing-price-api.onrender.com/predict",
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

      setPrediction(response.data.predicted_price);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.3),transparent_40%)]" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl mb-8">
            <Sparkles size={18} />
            <span className="text-sm text-zinc-300">
              AI Powered Real Estate Intelligence
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-none">
            Predict
            <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent">
              {" "}
              Housing Prices
            </span>
          </h1>

          <p className="text-zinc-400 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Advanced machine learning powered housing price prediction platform
            built using FastAPI, Docker, Scikit-learn and Next.js.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
          >

            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-zinc-300" />
              <h2 className="text-2xl font-semibold">
                Property Parameters
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">

              {Object.keys(formData)
                .filter((key) => key !== "ocean_proximity")
                .map((field) => (
                  <input
                    key={field}
                    name={field}
                    placeholder={field.replaceAll("_", " ")}
                    onChange={handleChange}
                    className="bg-black/40 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-white/30 transition"
                  />
                ))}

            </div>

            <select
              name="ocean_proximity"
              onChange={handleChange}
              className="w-full mt-4 bg-black/40 border border-white/10 rounded-2xl px-4 py-4 outline-none"
            >
              <option value="INLAND">INLAND</option>
              <option value="NEAR BAY">NEAR BAY</option>
              <option value="<1H OCEAN">{"<1H OCEAN"}</option>
              <option value="NEAR OCEAN">NEAR OCEAN</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePredict}
              className="w-full mt-8 bg-white text-black font-semibold py-4 rounded-2xl text-lg"
            >
              {loading ? "Analyzing..." : "Generate Prediction"}
            </motion.button>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-10 overflow-hidden"
          >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%)]" />

            <div className="relative z-10">

              <div className="flex items-center gap-3 mb-8">
                <TrendingUp />
                <h2 className="text-3xl font-bold">
                  AI Prediction
                </h2>
              </div>

              {prediction ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-16"
                >

                  <div className="text-zinc-400 mb-3">
                    Estimated Property Value
                  </div>

                  <div className="flex items-center gap-4 text-6xl font-bold">

                    <IndianRupee
                      size={50}
                      className="text-green-400"
                    />

                    <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
                      {prediction.toFixed(2)}
                    </span>

                  </div>

                  <p className="mt-8 text-zinc-500 leading-relaxed">
                    The AI model analyzed location intelligence,
                    population metrics, income distribution and
                    housing statistics to generate this prediction.
                  </p>

                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center mt-24">

                  <div className="text-center">
                    <div className="text-zinc-500 text-xl">
                      Awaiting Property Data
                    </div>

                    <p className="text-zinc-600 mt-3">
                      Enter property attributes to begin AI analysis.
                    </p>
                  </div>

                </div>
              )}

            </div>

          </motion.div>

        </div>

      </section>
    </main>
  );
}