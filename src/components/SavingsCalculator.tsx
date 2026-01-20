import { useState, useEffect, useRef } from "react";
import { Clock, Euro, TrendingUp, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Hook for animated counting
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
      
      // Easing function for smooth animation
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

  // Animated display values
  const animatedTimeSaved = useAnimatedNumber(timeSavedMonthly);
  const animatedMoneySaved = useAnimatedNumber(moneySavedMonthly);
  const animatedRoi = useAnimatedNumber(roi);

  useEffect(() => {
    // Calculate monthly hours spent on client communication
    const weeksPerMonth = 4;
    const totalHoursPerMonth = hoursPerDay * workDaysPerWeek * weeksPerMonth;
    
    // 100% automation rate - show real data
    const hoursSaved = Math.round(totalHoursPerMonth);
    
    // Calculate money saved based on hourly rate
    const moneySaved = Math.round(hoursSaved * hourlyRate);
    
    // Calculate ROI (monthly savings vs monthly cost)
    const monthlyCost = 99; // Approximate monthly cost
    const roiPercent = Math.round(((moneySaved - monthlyCost) / monthlyCost) * 100);
    
    setTimeSavedMonthly(hoursSaved);
    setMoneySavedMonthly(moneySaved);
    setRoi(Math.max(roiPercent, 0));
  }, [hoursPerDay, hourlyRate, workDaysPerWeek]);

  return (
    <section id="kalkulator" className="py-10 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Koliko bi Upitomat uštedio vama?
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Unesite svoje brojke i odmah vidite uštedu vremena i dodatnu prodaju.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-10">
            {/* Left Side - Inputs */}
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 md:p-8 shadow-card">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calculator className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">Vaši parametri</h3>
              </div>

              {/* Slider 1 - Hours per day */}
              <div className="mb-5 md:mb-8">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <label className="text-foreground font-medium text-sm md:text-base">Broj sati dnevno na upite?</label>
                  <span className="text-primary font-bold text-base md:text-lg tabular-nums">{hoursPerDay}h</span>
                </div>
                <Slider
                  value={[hoursPerDay]}
                  onValueChange={(value) => setHoursPerDay(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 md:mt-2">
                  <span>1h</span>
                  <span>10h</span>
                </div>
              </div>

              {/* Slider 2 - Hourly rate */}
              <div className="mb-5 md:mb-8">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <label className="text-foreground font-medium text-sm md:text-base">Koliko vrijedi vaš jedan sat?</label>
                  <span className="text-primary font-bold text-base md:text-lg tabular-nums">{hourlyRate}€</span>
                </div>
                <Slider
                  value={[hourlyRate]}
                  onValueChange={(value) => setHourlyRate(value[0])}
                  min={10}
                  max={150}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 md:mt-2">
                  <span>10€</span>
                  <span>150€</span>
                </div>
              </div>

              {/* Slider 3 - Work days per week */}
              <div>
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <label className="text-foreground font-medium text-sm md:text-base">Koliko dana tjedno radite?</label>
                  <span className="text-primary font-bold text-base md:text-lg tabular-nums">{workDaysPerWeek} dana</span>
                </div>
                <Slider
                  value={[workDaysPerWeek]}
                  onValueChange={(value) => setWorkDaysPerWeek(value[0])}
                  min={1}
                  max={7}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 md:mt-2">
                  <span>1 dan</span>
                  <span>7 dana</span>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 md:mb-2">Vaši rezultati:</h3>
              
              {/* Time Saved Monthly */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 md:p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-2xl md:text-4xl font-bold text-foreground tabular-nums">
                      + {animatedTimeSaved}h
                    </span>
                    <p className="text-emerald-400 font-medium text-sm md:text-base">Ušteda vremena mjesečno</p>
                  </div>
                </div>
              </div>

              {/* Money Saved Monthly */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 md:p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Euro className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-2xl md:text-4xl font-bold text-foreground tabular-nums">
                      + {animatedMoneySaved}€
                    </span>
                    <p className="text-emerald-400 font-medium text-sm md:text-base">Ušteda novaca mjesečno</p>
                  </div>
                </div>
              </div>

              {/* ROI / Growth */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 md:p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-2xl md:text-4xl font-bold text-foreground tabular-nums">
                      + {animatedRoi}%
                    </span>
                    <p className="text-emerald-400 font-medium text-sm md:text-base">Povrat/Rast</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="https://nurturehub-ai.lovable.app"
                className="mt-2 md:mt-4 w-full inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base md:text-lg"
              >
                Isprobajte Upitomat odmah
              </a>
              <p className="text-center text-xs md:text-sm text-muted-foreground">
                Procjene se temelje na implementacijama. Točne brojke prolazimo na demo pozivu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
