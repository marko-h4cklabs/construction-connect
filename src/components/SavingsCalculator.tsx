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
  const [highlightedResult, setHighlightedResult] = useState<string | null>(null);
  
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
    
    // Trigger highlight animation on all results when parameters change
    setHighlightedResult('all');
    const timer = setTimeout(() => setHighlightedResult(null), 600);
    return () => clearTimeout(timer);
  }, [hoursPerDay, hourlyRate, workDaysPerWeek]);

  return (
    <section className="py-12 md:py-20 scroll-mt-24 savings-calculator-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <StaggeredText className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3 uppercase tracking-tight max-w-[85%] mx-auto">
            <span className="md:hidden">Koliko bi Upitomat<br />uštedio vama?</span>
            <span className="hidden md:inline">Koliko bi <span className="text-gradient">Upitomat</span> uštedio vama?</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-[85%] mx-auto">
            Unesite svoje brojke i odmah vidite uštedu vremena i dodatnu prodaju.
          </p>
        </StaggeredText>

        {/* Calculator Container - tighter coupling between sections */}
        <div className="max-w-5xl mx-auto">
          {/* Parameters Section */}
          <StaggeredText delay={200}>
            <div className="bg-card/40 backdrop-blur-sm border-2 border-border p-5 md:p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_hsl(50_100%_50%/0.2)]">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 border-2 border-border bg-muted/50 flex items-center justify-center group transition-all duration-300 hover:border-primary/50 hover:bg-primary/10">
                  <Calculator className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-tight">Vaši parametri</h3>
              </div>

              {/* Sliders in a grid for better control panel feel */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground font-semibold text-sm md:text-base tracking-tight normal-case">Sati dnevno na upite?</label>
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
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-muted-foreground font-semibold text-sm md:text-base tracking-tight normal-case">Vrijednost vašeg sata?</label>
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
                    <label className="text-muted-foreground font-semibold text-sm md:text-base tracking-tight normal-case">Radnih dana tjedno?</label>
                    <span className="text-foreground font-black text-lg md:text-xl tabular-nums">{workDaysPerWeek}</span>
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
            </div>
          </StaggeredText>

          {/* Subtle transition zone between sections */}
          <div 
            className="h-6 md:h-8 relative"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--card) / 0.4) 0%, hsl(var(--card) / 0.2) 50%, transparent 100%)',
            }}
          >
            {/* Subtle glow line */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1/3 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, hsl(50 100% 50% / 0.3) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* Results Section - Output aesthetic */}
          <StaggeredText delay={400}>
            <div 
              className="relative py-8 md:py-12 px-5 md:px-8"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, hsl(var(--card) / 0.15) 20%, hsl(var(--card) / 0.2) 50%, hsl(var(--card) / 0.15) 80%, transparent 100%)',
              }}
            >
              {/* Light wash behind results */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 40% at 50% 40%, hsl(50 100% 50% / 0.04) 0%, transparent 70%)',
                }}
              />
              
              <h3 className="text-lg md:text-xl font-bold text-foreground uppercase tracking-tight mb-8 md:mb-10 text-center relative z-10">
                Vaši rezultati
              </h3>
              
              {/* Results - Typography focused, all same size */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 relative z-10">
                {/* Time Saved */}
                <div 
                  className={`text-center transition-all duration-500 ${highlightedResult === 'all' ? 'scale-102' : 'scale-100'}`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground/30" strokeWidth={1.5} />
                  </div>
                  <div 
                    className={`transition-all duration-500 ${highlightedResult === 'all' ? 'drop-shadow-[0_0_15px_hsl(50_100%_50%/0.25)]' : ''}`}
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tabular-nums block">
                      +{animatedTimeSaved}h
                    </span>
                  </div>
                  <p className="text-muted-foreground/60 font-medium text-xs md:text-sm tracking-tight normal-case mt-2">
                    Ušteda vremena mjesečno
                  </p>
                </div>

                {/* Vertical separator - desktop only */}
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-border/30 to-transparent" />

                {/* Money Saved */}
                <div 
                  className={`text-center transition-all duration-500 ${highlightedResult === 'all' ? 'scale-102' : 'scale-100'}`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Euro className="w-4 h-4 text-muted-foreground/30" strokeWidth={1.5} />
                  </div>
                  <div 
                    className={`transition-all duration-500 ${highlightedResult === 'all' ? 'drop-shadow-[0_0_15px_hsl(50_100%_50%/0.25)]' : ''}`}
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tabular-nums block">
                      +{animatedMoneySaved}€
                    </span>
                  </div>
                  <p className="text-muted-foreground/60 font-medium text-xs md:text-sm tracking-tight normal-case mt-2">
                    Ušteda novaca mjesečno
                  </p>
                </div>

                {/* Vertical separator - desktop only */}
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-border/30 to-transparent" />

                {/* ROI */}
                <div 
                  className={`text-center transition-all duration-500 ${highlightedResult === 'all' ? 'scale-102' : 'scale-100'}`}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground/30" strokeWidth={1.5} />
                  </div>
                  <div 
                    className={`transition-all duration-500 ${highlightedResult === 'all' ? 'drop-shadow-[0_0_15px_hsl(50_100%_50%/0.25)]' : ''}`}
                  >
                    <span className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tabular-nums block">
                      +{animatedRoi}%
                    </span>
                  </div>
                  <p className="text-muted-foreground/60 font-medium text-xs md:text-sm tracking-tight normal-case mt-2">
                    Povrat/Rast
                  </p>
                </div>
              </div>

              {/* CTA Button - More breathing room */}
              <div className="relative z-10 flex flex-col items-center gap-3 mt-12 md:mt-16">
                <a
                  href="https://app.upitomat.hr/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 text-base md:text-lg bg-primary text-primary-foreground font-black uppercase tracking-wide border-2 border-foreground transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ boxShadow: '0 0 20px 3px hsl(50 100% 50% / 0.2)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px 5px hsl(50 100% 50% / 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px 3px hsl(50 100% 50% / 0.2)';
                  }}
                >
                  ISPROBAJTE UPITOMAT
                </a>
                <span className="text-sm text-muted-foreground tracking-wide">
                  besplatno, bez obveze
                </span>
              </div>
            </div>
          </StaggeredText>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
