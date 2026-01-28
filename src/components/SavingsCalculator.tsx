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
    <section className="py-12 md:py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <StaggeredText className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3 uppercase tracking-tight">
            Koliko bi Upitomat uštedio vama?
          </h2>
          <p className="text-foreground/70 text-sm md:text-lg max-w-2xl mx-auto">
            Unesite svoje brojke i odmah vidite uštedu vremena i dodatnu prodaju.
          </p>
        </StaggeredText>

        {/* Calculator Container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Side - Inputs */}
            <StaggeredText delay={200}>
              <div className="bg-background/40 backdrop-blur-sm border border-foreground/20 p-5 md:p-8 transition-all duration-300 hover:border-foreground/40">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 border border-foreground/40 bg-foreground/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-tight">Vaši parametri</h3>
                </div>

                {/* Slider 1 */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-foreground/90 font-semibold text-sm md:text-base tracking-tight normal-case">Broj sati dnevno na upite?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{hoursPerDay}h</span>
                  </div>
                  <Slider
                    value={[hoursPerDay]}
                    onValueChange={(value) => setHoursPerDay(value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary"
                  />
                  <div className="flex justify-between text-xs text-foreground/50 mt-2">
                    <span>1h</span>
                    <span>10h</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-foreground/90 font-semibold text-sm md:text-base tracking-tight normal-case">Koliko vrijedi vaš jedan sat?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{hourlyRate}€</span>
                  </div>
                  <Slider
                    value={[hourlyRate]}
                    onValueChange={(value) => setHourlyRate(value[0])}
                    min={10}
                    max={150}
                    step={5}
                    className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary"
                  />
                  <div className="flex justify-between text-xs text-foreground/50 mt-2">
                    <span>10€</span>
                    <span>150€</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-foreground/90 font-semibold text-sm md:text-base tracking-tight normal-case">Koliko dana tjedno radite?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{workDaysPerWeek} dana</span>
                  </div>
                  <Slider
                    value={[workDaysPerWeek]}
                    onValueChange={(value) => setWorkDaysPerWeek(value[0])}
                    min={1}
                    max={7}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary"
                  />
                  <div className="flex justify-between text-xs text-foreground/50 mt-2">
                    <span>1 dan</span>
                    <span>7 dana</span>
                  </div>
                </div>
              </div>
            </StaggeredText>

            {/* Right Side - Results */}
            <StaggeredText delay={400} className="flex flex-col gap-4">
              <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-tight mb-2">Vaši rezultati:</h3>
              
              {/* Time Saved */}
              <div className="bg-background/40 backdrop-blur-sm border border-foreground/20 p-4 md:p-5 hover:border-primary/60 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-foreground/40 bg-foreground/10 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/10 transition-colors">
                    <Clock className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                      + {animatedTimeSaved}h
                    </span>
                    <p className="text-foreground/60 font-bold text-sm md:text-base tracking-tight normal-case">Ušteda vremena mjesečno</p>
                  </div>
                </div>
              </div>

              {/* Money Saved */}
              <div className="bg-background/40 backdrop-blur-sm border border-foreground/20 p-4 md:p-5 hover:border-primary/60 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-foreground/40 bg-foreground/10 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/10 transition-colors">
                    <Euro className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                      + {animatedMoneySaved}€
                    </span>
                    <p className="text-foreground/60 font-bold text-sm md:text-base tracking-tight normal-case">Ušteda novaca mjesečno</p>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="bg-background/40 backdrop-blur-sm border border-foreground/20 p-4 md:p-5 hover:border-primary/60 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-foreground/40 bg-foreground/10 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/10 transition-colors">
                    <TrendingUp className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                      + {animatedRoi}%
                    </span>
                    <p className="text-foreground/60 font-bold text-sm md:text-base tracking-tight normal-case">Povrat/Rast</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center gap-2 mt-2 md:mt-4">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 text-base md:text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-primary focus-brutal transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_30px_4px_hsl(50_100%_50%/0.4)]"
                  style={{ boxShadow: '0 0 25px 3px hsl(50 100% 50% / 0.3)' }}
                >
                  Isprobajte Upitomat
                </a>
                <span className="text-sm text-foreground/60">
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
