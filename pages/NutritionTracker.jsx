import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Apple, 
  Plus, 
  Utensils, 
  CheckCircle2, 
  Info, 
  Heart, 
  Sparkles, 
  ShieldCheck,
  Wheat,
  Leaf
} from 'lucide-react';

export default function NutritionTracker() {
  const { lang, t } = useLanguage();
  const [dietaryType, setDietaryType] = useState('All'); // 'All', 'Vegetarian', 'Non-Vegetarian'
  const [loggedFoods, setLoggedFoods] = useState([
    { name: "Moong Dal Tadka (1 bowl)", protein: 9, iron: "Medium", calcium: "Low", category: "Vegetarian" },
    { name: "Whole Wheat Chapati (2 rotis)", protein: 6, iron: "Low", fiber: "High", category: "Vegetarian" },
    { name: "Fresh Curd / Dahi (1 katori)", protein: 5, calcium: "High", b12: "Medium", category: "Vegetarian" },
  ]);
  const [selectedFoodInput, setSelectedFoodInput] = useState('');

  const commonIndianFoods = [
    { name: "Sprouted Moong / Chana", protein: "12g per bowl", sourceOf: "Protein, Iron, Vitamin C", type: "Vegetarian" },
    { name: "Palak / Green Leafy Saag", protein: "3g per bowl", sourceOf: "Iron, Folate, Calcium", type: "Vegetarian" },
    { name: "Ragi Roti / Millet Porridge", protein: "5g per serving", sourceOf: "High Calcium & Dietary Fiber", type: "Vegetarian" },
    { name: "Paneer / Cottage Cheese", protein: "18g per 100g", sourceOf: "Protein & Calcium", type: "Vegetarian" },
    { name: "Boiled Eggs (2)", protein: "12g", sourceOf: "Protein, Vitamin B12, Choline", type: "Non-Vegetarian" },
    { name: "Rohu / Freshwater Fish Curry", protein: "20g per fillet", sourceOf: "Lean Protein, Healthy Fats (Omega-3)", type: "Non-Vegetarian" },
    { name: "Besan Chilla / Lentil Pancake", protein: "8g per piece", sourceOf: "Plant Protein & Complex Carbs", type: "Vegetarian" },
    { name: "Amla / Indian Gooseberry", protein: "0.5g", sourceOf: "Extremely High Vitamin C & Antioxidants", type: "Vegetarian" },
  ];

  const nutrientMeters = [
    { name: "Protein", current: "32g", target: "55 - 65g", desc: "Muscle repair, cellular immunity, and tissue strength.", status: "Good Progress" },
    { name: "Iron", current: "Adequate", target: "15 - 19 mg", desc: "Vital for hemoglobin and preventing anemia and tiredness.", status: "Optimal" },
    { name: "Calcium", current: "Good", target: "1000 mg", desc: "Bone density, tooth strength, and cardiovascular nerve signaling.", status: "Optimal" },
    { name: "Vitamin B12", current: "Moderate", target: "2.4 mcg", desc: "Nerve health and red blood cell formation (Curd/Milk/Eggs).", status: "Focus Area" },
    { name: "Dietary Fiber", current: "High", target: "25 - 30g", desc: "Digestive regularity, blood sugar balance, and gut microbiome.", status: "Optimal" },
  ];

  const handleAddFood = (food) => {
    setLoggedFoods([
      ...loggedFoods,
      { name: food.name, protein: 7, iron: "Medium", category: food.type }
    ]);
  };

  const filteredFoods = commonIndianFoods.filter(f => {
    if (dietaryType === 'All') return true;
    return f.type === dietaryType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Apple className="w-3.5 h-3.5 text-emerald-600" />
            <span>Holistic Indian Dietary Wellness</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('nutrition_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('nutrition_subtitle')}
          </p>
        </div>
      </div>

      {/* Ethical Dietary Disclaimer */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Nourishment First Philosophy:</strong> Gram Aarogya focuses purely on wholesome, accessible nutrition education. We do not advocate restrictive dieting, extreme calorie restriction, or appearance-based metrics.
        </p>
      </div>

      {/* Key Nutrient Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nutrientMeters.map((nm, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-apple transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">{nm.name}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                nm.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                nm.status === 'Good Progress' ? 'bg-medical-50 text-medical-700 border border-medical-200' :
                'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {nm.status}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{nm.current}</span>
              <span className="text-xs text-slate-400">/ Goal: {nm.target}</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {nm.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Indian Wholesome Food Guide */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-apple space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {lang === 'hi' ? 'पौष्टिक भारतीय खाद्य स्रोत' : 'Nutrient-Rich Indian Food Guide'}
            </h3>
            <p className="text-xs text-slate-500">Traditional and affordable regional nutrition</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {['All', 'Vegetarian', 'Non-Vegetarian'].map((t) => (
              <button
                key={t}
                onClick={() => setDietaryType(t)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  dietaryType === t
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredFoods.map((f, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/80 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    f.type === 'Vegetarian' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {f.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{f.protein}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                <p className="text-xs text-emerald-700 font-medium mt-1">{f.sourceOf}</p>
              </div>

              <button
                onClick={() => handleAddFood(f)}
                className="w-full py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3 text-emerald-600" />
                <span>Add to Log</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Logged Foods Today */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Foods Logged Today</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {loggedFoods.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">{item.name}</p>
                <p className="text-slate-400 text-[11px]">{item.category}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                Nutritious Choice
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
