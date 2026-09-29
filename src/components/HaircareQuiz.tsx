import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { HAIRCARE_QUIZ_QUESTIONS, calculateHaircareResult } from '../data/quizData';
import { PRODUCTS } from '../data/products';
import { Product, QuizResult } from '../types';
import { formatINR, updateAnalytics } from '../utils/helpers';
import { ProductIllustration } from './BotanicalArtwork';

interface HaircareQuizProps {
  onAddToCart: (product: Product, quantity?: number, isRefill?: boolean) => void;
  onOpenQuickView: (product: Product) => void;
}

export const HaircareQuiz: React.FC<HaircareQuizProps> = ({ onAddToCart, onOpenQuickView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [allAdded, setAllAdded] = useState(false);

  const totalSteps = HAIRCARE_QUIZ_QUESTIONS.length;
  const currentQuestion = HAIRCARE_QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (questionId: number, tag: string) => {
    const updatedAnswers = { ...answers, [questionId]: tag };
    setAnswers(updatedAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const calculated = calculateHaircareResult(updatedAnswers);
      setResult(calculated);
      updateAnalytics((prev) => ({
        ...prev,
        quizCompletions: prev.quizCompletions + 1
      }));
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setAllAdded(false);
  };

  const recommendedProducts = result
    ? result.recommendedProductIds
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => !!p)
    : [];

  const handleAddAllToCart = () => {
    recommendedProducts.forEach((p) => {
      onAddToCart(p, 1, false);
    });
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2000);
  };

  return (
    <section id="haircare-quiz" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0EC] border border-[#D2DCD4] text-xs font-semibold text-[#2C4836] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#758A7A]" />
            <span>Ayurvedic Hair &amp; Scalp Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C3325]">
            Custom Scalp Revival &amp; Density Diagnostic
          </h2>
          <p className="mt-2 text-stone-600 text-sm font-sans">
            Assess hard water exposure, root weakening, and scalp porosity to receive your tailored 3-step
            herbal regimen without silicones or synthetic fragrance.
          </p>
        </div>

        {/* Container */}
        <div className="bg-[#FAF8F5] rounded-3xl shadow-xl border border-[#E2DDD5] p-6 sm:p-10 relative overflow-hidden">
          {!result ? (
            <div>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="font-medium text-[#1C3325]">
                    Question {currentStep + 1} of {totalSteps}
                  </span>
                  <span className="font-mono text-[#758A7A] font-semibold">
                    {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full h-2 bg-[#E8ECE9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#758A7A] rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="min-h-[70px] mb-8">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C3325] leading-snug">
                  {currentQuestion.question}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.tag;
                  return (
                    <button
                      key={opt.tag}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.tag)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border transition-all text-sm flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#1C3325] bg-[#EBF0EC] shadow-sm'
                          : 'border-[#E8ECE9] bg-white hover:border-[#758A7A] hover:bg-[#F9F7F4]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-medium text-[#1C3325] group-hover:text-[#43634E]">
                          {opt.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#1C3325] bg-[#1C3325]'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 font-sans leading-relaxed">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8ECE9] text-xs">
                {currentStep > 0 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-medium py-1 px-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                ) : (
                  <span className="text-stone-400">Step 1 of 6</span>
                )}
                <span className="text-stone-400 font-mono">100% Free · No Sign Up</span>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center pb-6 border-b border-[#E8ECE9]">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#758A7A]">
                  Tailored Regimen
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C3325] mt-1">
                  {result.title}
                </h3>
                <p className="text-xs font-mono text-[#2C4836] bg-[#EBF0EC] inline-block px-3 py-1 rounded-full mt-2 font-medium">
                  {result.doshaOrProfile}
                </p>
                <p className="text-sm text-stone-600 font-sans max-w-2xl mx-auto mt-3 leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Weekly Champi & Care steps */}
              <div className="bg-[#F5F0EA] p-5 rounded-2xl border border-[#E2DDD5]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1C3325] mb-2.5">
                  Your Weekly Scalp &amp; Follicle Protocol
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.ritualSteps.map((step, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E8ECE9] text-xs">
                      <p className="font-serif font-bold text-[#1C3325] mb-1">Phase 0{idx + 1}</p>
                      <p className="text-stone-600 font-sans">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Products */}
              <div>
                <h4 className="text-lg font-serif font-bold text-[#1C3325] mb-4">
                  Recommended Hair Formulations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => onOpenQuickView(product)}
                      className="bg-white p-4 rounded-2xl border border-[#E8ECE9] hover:border-[#758A7A] transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
                    >
                      <div className="h-36 relative bg-[#FAF8F5] rounded-xl overflow-hidden mb-3">
                        <ProductIllustration
                          type={product.category}
                          accent={product.accentColor}
                          name={product.name}
                          size={product.size}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#758A7A] tracking-wider">
                          {product.category}
                        </span>
                        <h5 className="text-sm font-serif font-bold text-[#1C3325] line-clamp-1 mt-0.5">
                          {product.name}
                        </h5>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                          {product.tagline}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-[#F4EFEB] flex items-center justify-between">
                        <span className="text-sm font-serif font-bold text-[#1C3325] tabular-nums">
                          {formatINR(product.price)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product, 1, false);
                          }}
                          className="px-2.5 py-1 text-xs bg-[#1C3325] text-white rounded-lg hover:bg-[#122118]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1-Click Bundle Discount Callout */}
              {recommendedProducts.length > 0 && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EBF0EC] via-[#F4EFEB] to-[#FAF8F5] border border-[#D2DCD4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-serif font-bold text-[#1C3325] text-base">
                        Complete Ayurvedic Hair Ritual Bundle
                      </span>
                      <span className="text-[10px] bg-[#1C3325] text-white px-2 py-0.5 rounded-full font-semibold">
                        Save 10%
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-sans mt-0.5">
                      Oil, scalp tonic, and butter mask designed to reverse shedding in synergy
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-stone-400 line-through text-xs font-mono">
                      {formatINR(recommendedProducts.reduce((sum, p) => sum + p.price, 0))}
                    </span>
                    <span className="text-lg font-serif font-bold text-[#1C3325] tabular-nums">
                      {formatINR(
                        Math.round(
                          recommendedProducts.reduce((sum, p) => sum + p.price, 0) * 0.9
                        )
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8ECE9]">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 py-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Haircare Quiz</span>
                </button>

                <button
                  onClick={handleAddAllToCart}
                  disabled={allAdded}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    allAdded
                      ? 'bg-[#43634E] text-white shadow-emerald-900/20'
                      : 'bg-[#1C3325] hover:bg-[#122118] text-[#FAF8F5] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {allAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Haircare Bundle Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        1-Click Bundle Add to Cart (Save 10% ·{' '}
                        {formatINR(
                          Math.round(
                            recommendedProducts.reduce((sum, p) => sum + p.price, 0) * 0.9
                          )
                        )}
                        )
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
