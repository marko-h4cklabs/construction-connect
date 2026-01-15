import { useState, useEffect } from "react";
import { Clock, Euro, TrendingUp, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const SavingsCalculator = () => {
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(5);
  
  const [timeSavedMonthly, setTimeSavedMonthly] = useState(0);
  const [moneySavedMonthly, setMoneySavedMonthly] = useState(0);
  const [roi, setRoi] = useState(0);
  
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Calculate monthly hours spent on client communication
    const weeksPerMonth = 4.33;
    const totalHoursPerMonth = hoursPerDay * workDaysPerWeek * weeksPerMonth;
    
    // Assume 70% automation rate
    const hoursSaved = Math.round(totalHoursPerMonth * 0.7);
    
    // Calculate money saved based on hourly rate
    const moneySaved = Math.round(hoursSaved * hourlyRate);
    
    // Calculate ROI (monthly savings vs monthly cost)
    const monthlyCost = 99; // Approximate monthly cost
    const roiPercent = Math.round(((moneySaved - monthlyCost) / monthlyCost) * 100);
    
    setAnimate(true);
    setTimeout(() => {
      setTimeSavedMonthly(hoursSaved);
      setMoneySavedMonthly(moneySaved);
      setRoi(Math.max(roiPercent, 0));
      setAnimate(false);
    }, 150);
  }, [hoursPerDay, hourlyRate, workDaysPerWeek]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Koliko bi Upitomat uštedio vama?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unesite svoje brojke i odmah vidite uštedu vremena i dodatnu prodaju.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Side - Inputs */}
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-card">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Vaši parametri</h3>
              </div>

              {/* Slider 1 - Hours per day */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-foreground font-medium">Broj sati dnevno na upite?</label>
                  <span className="text-primary font-bold text-lg tabular-nums">{hoursPerDay}h</span>
                </div>
                <Slider
                  value={[hoursPerDay]}
                  onValueChange={(value) => setHoursPerDay(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1h</span>
                  <span>10h</span>
                </div>
              </div>

              {/* Slider 2 - Hourly rate */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-foreground font-medium">Koliko vrijedi vaš jedan sat?</label>
                  <span className="text-primary font-bold text-lg tabular-nums">{hourlyRate}€</span>
                </div>
                <Slider
                  value={[hourlyRate]}
                  onValueChange={(value) => setHourlyRate(value[0])}
                  min={10}
                  max={150}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>10€</span>
                  <span>150€</span>
                </div>
              </div>

              {/* Slider 3 - Work days per week */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-foreground font-medium">Koliko dana tjedno radite?</label>
                  <span className="text-primary font-bold text-lg tabular-nums">{workDaysPerWeek} dana</span>
                </div>
                <Slider
                  value={[workDaysPerWeek]}
                  onValueChange={(value) => setWorkDaysPerWeek(value[0])}
                  min={1}
                  max={7}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1 dan</span>
                  <span>7 dana</span>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">Vaši rezultati:</h3>
              
              {/* Time Saved Monthly */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${animate ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                      + {timeSavedMonthly}h
                    </span>
                    <p className="text-emerald-400 font-medium">Ušteda vremena mjesečno</p>
                  </div>
                </div>
              </div>

              {/* Money Saved Monthly */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Euro className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${animate ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                      + {moneySavedMonthly}€
                    </span>
                    <p className="text-emerald-400 font-medium">Ušteda novaca mjesečno</p>
                  </div>
                </div>
              </div>

              {/* ROI / Growth */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${animate ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                      + {roi}%
                    </span>
                    <p className="text-emerald-400 font-medium">Povrat/Rast</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="https://preview--nurturehub-ai.lovable.app/auth"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
              >
                Isprobajte Upitomat odmah
              </a>
              <p className="text-center text-sm text-muted-foreground">
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
