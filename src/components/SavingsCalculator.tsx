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

            {/* Right Side - Results with vertical gradient background */}
            <StaggeredText delay={400} className="flex flex-col gap-5 relative">
              {/* Vertical gradient light wash */}
              <div 
                className="absolute inset-0 -mx-4 -my-2 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, hsl(50 100% 50% / 0.03) 30%, hsl(50 100% 50% / 0.05) 50%, hsl(50 100% 50% / 0.03) 70%, transparent 100%)',
                  filter: 'blur(40px)',
                }}
              />
              
              <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-tight mb-1 relative z-10">Vaši rezultati:</h3>
              
              {/* Time Saved - Primary/Dominant */}
              <div className="relative z-10 bg-card/50 backdrop-blur-md rounded-lg p-5 md:p-6 transition-all duration-500 group hover:translate-y-[-3px]"
                style={{ 
                  boxShadow: '0 8px 32px -8px hsl(0 0% 0% / 0.4), 0 4px 16px -4px hsl(50 100% 50% / 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px -8px hsl(0 0% 0% / 0.5), 0 6px 20px -4px hsl(50 100% 50% / 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px -8px hsl(0 0% 0% / 0.4), 0 4px 16px -4px hsl(50 100% 50% / 0.08)';
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-muted/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-muted-foreground/60" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-3xl md:text-4xl font-black text-primary tabular-nums" style={{ filter: 'brightness(1.15)' }}>
                      + {animatedTimeSaved}h
                    </span>
                    <p className="text-muted-foreground/70 font-medium text-xs md:text-sm tracking-tight normal-case mt-0.5">Ušteda vremena mjesečno</p>
                  </div>
                </div>
              </div>

              {/* Money Saved - Secondary */}
              <div className="relative z-10 bg-card/40 backdrop-blur-md rounded-lg p-4 md:p-5 transition-all duration-500 group hover:translate-y-[-2px]"
                style={{ 
                  boxShadow: '0 6px 24px -6px hsl(0 0% 0% / 0.35), 0 3px 12px -3px hsl(50 100% 50% / 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 32px -6px hsl(0 0% 0% / 0.45), 0 5px 16px -3px hsl(50 100% 50% / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 24px -6px hsl(0 0% 0% / 0.35), 0 3px 12px -3px hsl(50 100% 50% / 0.05)';
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-md bg-muted/20 flex items-center justify-center shrink-0">
                    <Euro className="w-4 h-4 text-muted-foreground/50" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-black text-primary tabular-nums">
                      + {animatedMoneySaved}€
                    </span>
                    <p className="text-muted-foreground/60 font-medium text-xs md:text-sm tracking-tight normal-case mt-0.5">Ušteda novaca mjesečno</p>
                  </div>
                </div>
              </div>

              {/* ROI - Tertiary */}
              <div className="relative z-10 bg-card/40 backdrop-blur-md rounded-lg p-4 md:p-5 transition-all duration-500 group hover:translate-y-[-2px]"
                style={{ 
                  boxShadow: '0 6px 24px -6px hsl(0 0% 0% / 0.35), 0 3px 12px -3px hsl(50 100% 50% / 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 32px -6px hsl(0 0% 0% / 0.45), 0 5px 16px -3px hsl(50 100% 50% / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 24px -6px hsl(0 0% 0% / 0.35), 0 3px 12px -3px hsl(50 100% 50% / 0.05)';
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-md bg-muted/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-muted-foreground/50" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-2xl md:text-3xl font-black text-primary tabular-nums">
                      + {animatedRoi}%
                    </span>
                    <p className="text-muted-foreground/60 font-medium text-xs md:text-sm tracking-tight normal-case mt-0.5">Povrat/Rast</p>
                  </div>
                </div>
              </div>

              {/* CTA Button - More breathing room */}
              <div className="relative z-10 flex flex-col items-center gap-2 mt-6 md:mt-8 pt-4">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[80%] mx-auto text-center py-4 text-base md:text-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide border-2 border-foreground focus-brutal transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ boxShadow: '0 0 25px 3px hsl(50 100% 50% / 0.25)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 35px 6px hsl(50 100% 50% / 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px 3px hsl(50 100% 50% / 0.25)';
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
