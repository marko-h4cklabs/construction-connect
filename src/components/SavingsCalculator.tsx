import { useState, useEffect, useRef } from "react";
import { Clock, Euro, TrendingUp, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import AnimatedCounter from "@/components/AnimatedCounter";
import StaggeredText from "@/components/StaggeredText";

const useAnimatedNumber = (value: number, duration: number = 500) => {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(startValue + (endValue - startValue) * easeOutQuart);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousValue.current = value;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return displayValue;
};

const SavingsCalculator = () => {
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(5);
  
  const [timeSavedMonthly, setTimeSavedMonthly] = useState(0);
  const [moneySavedMonthly, setMoneySavedMonthly] = useState(0);
  const [roi, setRoi] = useState(0);

  const animatedTimeSaved = useAnimatedNumber(timeSavedMonthly);
  const animatedMoneySaved = useAnimatedNumber(moneySavedMonthly);
  const animatedRoi = useAnimatedNumber(roi);

  useEffect(() => {
    const weeksPerMonth = 4;
    const totalHoursPerMonth = hoursPerDay * workDaysPerWeek * weeksPerMonth;
    const hoursSaved = Math.round(totalHoursPerMonth);
    const moneySaved = Math.round(hoursSaved * hourlyRate);
    const monthlyCost = 99;
    const roiPercent = Math.round(((moneySaved - monthlyCost) / monthlyCost) * 100);
    
    setTimeSavedMonthly(hoursSaved);
    setMoneySavedMonthly(moneySaved);
    setRoi(Math.max(roiPercent, 0));
  }, [hoursPerDay, hourlyRate, workDaysPerWeek]);

  return (
    <section className="py-12 md:py-20 scroll-mt-24 savings-calculator-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <StaggeredText className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-scroll-heading mb-3 uppercase tracking-tight">
            Koliko bi Upitomat uštedio vama?
          </h2>
          <p className="text-scroll-adaptive opacity-80 text-sm md:text-lg max-w-2xl mx-auto">
            Unesite svoje brojke i odmah vidite uštedu vremena i dodatnu prodaju.
          </p>
        </StaggeredText>

        {/* Calculator Container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Side - Inputs */}
            <StaggeredText delay={200}>
              <div className="bg-[rgb(45,42,38)]/8 backdrop-blur-sm border border-[rgb(85,80,72)]/30 p-5 md:p-8 transition-all duration-300 hover:border-[rgb(180,140,60)]/40">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 border border-[rgb(85,80,72)]/40 bg-[rgb(45,42,38)]/5 flex items-center justify-center group icon-pulse-hover">
                    <Calculator className="w-5 h-5 text-scroll-adaptive group-hover:text-[rgb(180,140,60)] transition-colors duration-300 icon-glow-hover" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-scroll-heading uppercase tracking-tight">Vaši parametri</h3>
                </div>

                {/* Slider 1 */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-scroll-adaptive opacity-90 font-semibold text-sm md:text-base tracking-tight normal-case">Broj sati dnevno na upite?</label>
                    <span className="text-scroll-heading font-black text-lg md:text-xl tabular-nums">{hoursPerDay}h</span>
                  </div>
                  <Slider
                    value={[hoursPerDay]}
                    onValueChange={(value) => setHoursPerDay(value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-[rgb(120,95,50)] [&_[role=slider]]:border-[rgb(140,110,55)] [&_.bg-primary]:bg-[rgb(160,125,50)]"
                  />
                  <div className="flex justify-between text-xs text-scroll-adaptive opacity-60 mt-2">
                    <span>1h</span>
                    <span>10h</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-scroll-adaptive opacity-90 font-semibold text-sm md:text-base tracking-tight normal-case">Koliko vrijedi vaš jedan sat?</label>
                    <span className="text-scroll-heading font-black text-lg md:text-xl tabular-nums">{hourlyRate}€</span>
                  </div>
                  <Slider
                    value={[hourlyRate]}
                    onValueChange={(value) => setHourlyRate(value[0])}
                    min={10}
                    max={150}
                    step={5}
                    className="w-full [&_[role=slider]]:bg-[rgb(120,95,50)] [&_[role=slider]]:border-[rgb(140,110,55)] [&_.bg-primary]:bg-[rgb(160,125,50)]"
                  />
                  <div className="flex justify-between text-xs text-scroll-adaptive opacity-60 mt-2">
                    <span>10€</span>
                    <span>150€</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-scroll-adaptive opacity-90 font-semibold text-sm md:text-base tracking-tight normal-case">Koliko dana tjedno radite?</label>
                    <span className="text-scroll-heading font-black text-lg md:text-xl tabular-nums">{workDaysPerWeek} dana</span>
                  </div>
                  <Slider
                    value={[workDaysPerWeek]}
                    onValueChange={(value) => setWorkDaysPerWeek(value[0])}
                    min={1}
                    max={7}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-[rgb(120,95,50)] [&_[role=slider]]:border-[rgb(140,110,55)] [&_.bg-primary]:bg-[rgb(160,125,50)]"
                  />
                  <div className="flex justify-between text-xs text-scroll-adaptive opacity-60 mt-2">
                    <span>1 dan</span>
                    <span>7 dana</span>
                  </div>
                </div>
              </div>
            </StaggeredText>

            {/* Right Side - Results */}
            <StaggeredText delay={400} className="flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-scroll-heading uppercase tracking-tight mb-2">Vaši rezultati:</h3>
              
              {/* Time Saved */}
              <div className="bg-[rgb(45,42,38)]/8 backdrop-blur-sm border border-[rgb(85,80,72)]/30 p-4 md:p-5 hover:border-[rgb(180,140,60)]/50 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[rgb(85,80,72)]/40 bg-[rgb(45,42,38)]/5 flex items-center justify-center shrink-0 group-hover:border-[rgb(180,140,60)]/60 group-hover:bg-[rgb(180,140,60)]/10 transition-all duration-300 icon-pulse-hover">
                    <Clock className="w-6 h-6 text-scroll-adaptive group-hover:text-[rgb(180,140,60)] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-scroll-heading tabular-nums">
                      + {animatedTimeSaved}h
                    </span>
                    <p className="text-scroll-adaptive opacity-70 font-bold text-sm md:text-base tracking-tight normal-case">Ušteda vremena mjesečno</p>
                  </div>
                </div>
              </div>

              {/* Money Saved */}
              <div className="bg-[rgb(45,42,38)]/8 backdrop-blur-sm border border-[rgb(85,80,72)]/30 p-4 md:p-5 hover:border-[rgb(180,140,60)]/50 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[rgb(85,80,72)]/40 bg-[rgb(45,42,38)]/5 flex items-center justify-center shrink-0 group-hover:border-[rgb(180,140,60)]/60 group-hover:bg-[rgb(180,140,60)]/10 transition-all duration-300 icon-pulse-hover">
                    <Euro className="w-6 h-6 text-scroll-adaptive group-hover:text-[rgb(180,140,60)] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-scroll-heading tabular-nums">
                      + {animatedMoneySaved}€
                    </span>
                    <p className="text-scroll-adaptive opacity-70 font-bold text-sm md:text-base tracking-tight normal-case">Ušteda novaca mjesečno</p>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="bg-[rgb(45,42,38)]/8 backdrop-blur-sm border border-[rgb(85,80,72)]/30 p-4 md:p-5 hover:border-[rgb(180,140,60)]/50 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[rgb(85,80,72)]/40 bg-[rgb(45,42,38)]/5 flex items-center justify-center shrink-0 group-hover:border-[rgb(180,140,60)]/60 group-hover:bg-[rgb(180,140,60)]/10 transition-all duration-300 icon-pulse-hover">
                    <TrendingUp className="w-6 h-6 text-scroll-adaptive group-hover:text-[rgb(180,140,60)] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-scroll-heading tabular-nums">
                      + {animatedRoi}%
                    </span>
                    <p className="text-scroll-adaptive opacity-70 font-bold text-sm md:text-base tracking-tight normal-case">Povrat/Rast</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center gap-2 mt-2 md:mt-4">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 text-base md:text-lg bg-[rgb(120,95,50)] text-white font-bold uppercase tracking-wide border-2 border-[rgb(140,110,55)] focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:bg-[rgb(140,110,55)] hover:shadow-[0_0_35px_6px_rgba(180,140,60,0.4)]"
                  style={{ boxShadow: '0 0 25px 4px rgba(180,140,60,0.3)' }}
                >
                  Isprobajte Upitomat
                </a>
                <span className="text-sm text-scroll-adaptive opacity-70">
                  Besplatno, bez obveze
                </span>
              </div>
            </StaggeredText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;