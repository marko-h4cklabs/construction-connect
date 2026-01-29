import { useState, useEffect, useRef } from "react";
import { Clock, Euro, TrendingUp, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
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
  const [sliderGlow, setSliderGlow] = useState<string | null>(null);
  
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
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3 uppercase tracking-tight">
            Koliko bi Upitomat uštedio <span className="text-gradient">vama</span>?
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Unesite svoje brojke i odmah vidite uštedu vremena i dodatnu prodaju.
          </p>
        </StaggeredText>

        {/* Calculator Container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Side - Inputs */}
            <StaggeredText delay={200}>
              <div className="bg-card/40 backdrop-blur-sm border-2 border-border p-5 md:p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(50_100%_50%/0.2)]">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 border-2 border-border bg-muted/50 flex items-center justify-center group transition-all duration-300 hover:border-primary/50 hover:bg-primary/10">
                    <Calculator className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-tight">Vaši parametri</h3>
                </div>

                {/* Slider 1 */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground font-semibold text-sm md:text-base tracking-tight normal-case">Broj sati dnevno na upite?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{hoursPerDay}h</span>
                  </div>
                  <div className={`transition-all duration-300 ${sliderGlow === 'hours' ? 'drop-shadow-[0_0_16px_hsl(145_70%_42%/0.5)]' : ''}`}>
                    <Slider
                      value={[hoursPerDay]}
                      onValueChange={(value) => setHoursPerDay(value[0])}
                      onPointerDown={() => setSliderGlow('hours')}
                      onPointerUp={() => setSliderGlow(null)}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1h</span>
                    <span>10h</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground font-semibold text-sm md:text-base tracking-tight normal-case">Koliko vrijedi vaš jedan sat?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{hourlyRate}€</span>
                  </div>
                  <div className={`transition-all duration-300 ${sliderGlow === 'rate' ? 'drop-shadow-[0_0_16px_hsl(145_70%_42%/0.5)]' : ''}`}>
                    <Slider
                      value={[hourlyRate]}
                      onValueChange={(value) => setHourlyRate(value[0])}
                      onPointerDown={() => setSliderGlow('rate')}
                      onPointerUp={() => setSliderGlow(null)}
                      min={10}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>10€</span>
                    <span>150€</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground font-semibold text-sm md:text-base tracking-tight normal-case">Koliko dana tjedno radite?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{workDaysPerWeek} dana</span>
                  </div>
                  <div className={`transition-all duration-300 ${sliderGlow === 'days' ? 'drop-shadow-[0_0_16px_hsl(145_70%_42%/0.5)]' : ''}`}>
                    <Slider
                      value={[workDaysPerWeek]}
                      onValueChange={(value) => setWorkDaysPerWeek(value[0])}
                      onPointerDown={() => setSliderGlow('days')}
                      onPointerUp={() => setSliderGlow(null)}
                      min={1}
                      max={7}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
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
              <div className="bg-card/40 backdrop-blur-sm border-2 border-border p-4 md:p-5 hover:border-primary/60 transition-all duration-500 group hover:shadow-[0_0_30px_-8px_hsl(50_100%_50%/0.25)] hover:translate-y-[-2px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-border bg-muted/30 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                    <Clock className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-[1.05] transition-all duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                      + {animatedTimeSaved}h
                    </span>
                    <p className="text-muted-foreground font-bold text-sm md:text-base tracking-tight normal-case">Ušteda vremena mjesečno</p>
                  </div>
                </div>
              </div>

              {/* Money Saved */}
              <div className="bg-card/40 backdrop-blur-sm border-2 border-border p-4 md:p-5 hover:border-primary/60 transition-all duration-500 group hover:shadow-[0_0_30px_-8px_hsl(50_100%_50%/0.25)] hover:translate-y-[-2px]" style={{ transitionDelay: '50ms' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-border bg-muted/30 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                    <Euro className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-[1.05] transition-all duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                      + {animatedMoneySaved}€
                    </span>
                    <p className="text-muted-foreground font-bold text-sm md:text-base tracking-tight normal-case">Ušteda novaca mjesečno</p>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="bg-card/40 backdrop-blur-sm border-2 border-border p-4 md:p-5 hover:border-primary/60 transition-all duration-500 group hover:shadow-[0_0_30px_-8px_hsl(50_100%_50%/0.25)] hover:translate-y-[-2px]" style={{ transitionDelay: '100ms' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-border bg-muted/30 flex items-center justify-center shrink-0 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                    <TrendingUp className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-[1.05] transition-all duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                      + {animatedRoi}%
                    </span>
                    <p className="text-muted-foreground font-bold text-sm md:text-base tracking-tight normal-case">Povrat/Rast</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center gap-2 mt-2 md:mt-4">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-4 text-base md:text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-foreground focus-brutal transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ boxShadow: '0 0 30px 4px hsl(50 100% 50% / 0.3)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px 8px hsl(50 100% 50% / 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px 4px hsl(50 100% 50% / 0.3)';
                  }}
                >
                  Isprobajte Upitomat
                </a>
                <span className="text-sm text-muted-foreground tracking-wide">
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
