import { useState, useEffect } from "react";
import { Clock, DollarSign, TrendingUp, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const SavingsCalculator = () => {
  const [messagesPerDay, setMessagesPerDay] = useState(25);
  const [clientsPerMonth, setClientsPerMonth] = useState(60);
  const [minutesPerMessage, setMinutesPerMessage] = useState(3);
  
  const [timeSaved, setTimeSaved] = useState(0);
  const [extraRevenue, setExtraRevenue] = useState(0);
  const [roi, setRoi] = useState(0);
  
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Calculate time saved (hours per month)
    const totalMinutesPerMonth = messagesPerDay * 30 * minutesPerMessage * 0.7; // 70% automation
    const hoursSaved = Math.round(totalMinutesPerMonth / 60);
    
    // Calculate extra revenue (based on faster response = more conversions)
    const additionalConversions = Math.round(clientsPerMonth * 0.04); // 4% more conversions
    const avgOrderValue = 100; // €100 average
    const revenue = additionalConversions * avgOrderValue;
    
    // Calculate ROI (first month)
    const monthlyCost = 99; // Approximate monthly cost
    const totalBenefit = revenue + (hoursSaved * 15); // Time value at €15/hr
    const roiPercent = Math.round(((totalBenefit - monthlyCost) / monthlyCost) * 100);
    
    setAnimate(true);
    setTimeout(() => {
      setTimeSaved(hoursSaved);
      setExtraRevenue(revenue);
      setRoi(Math.max(roiPercent, 0));
      setAnimate(false);
    }, 150);
  }, [messagesPerDay, clientsPerMonth, minutesPerMessage]);

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

              {/* Slider 1 - Messages per day */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-foreground font-medium">Poruka dnevno</label>
                  <span className="text-primary font-bold text-lg tabular-nums">{messagesPerDay}</span>
                </div>
                <Slider
                  value={[messagesPerDay]}
                  onValueChange={(value) => setMessagesPerDay(value[0])}
                  min={5}
                  max={250}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>5</span>
                  <span>250</span>
                </div>
              </div>

              {/* Slider 2 - Clients per month */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-foreground font-medium">Klijenata mjesečno</label>
                  <span className="text-primary font-bold text-lg tabular-nums">{clientsPerMonth}</span>
                </div>
                <Slider
                  value={[clientsPerMonth]}
                  onValueChange={(value) => setClientsPerMonth(value[0])}
                  min={10}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>10</span>
                  <span>500</span>
                </div>
              </div>

              {/* Slider 3 - Minutes per message */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-foreground font-medium">Minuta po poruci</label>
                  <span className="text-primary font-bold text-lg tabular-nums">{minutesPerMessage}min</span>
                </div>
                <Slider
                  value={[minutesPerMessage]}
                  onValueChange={(value) => setMinutesPerMessage(value[0])}
                  min={1}
                  max={15}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1min</span>
                  <span>15min</span>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">Vaši rezultati:</h3>
              
              {/* Time Saved */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${animate ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                      {timeSaved}h
                    </span>
                    <p className="text-emerald-400 font-medium">Ušteda vremena</p>
                  </div>
                </div>
              </div>

              {/* Extra Revenue */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${animate ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                      +€{extraRevenue}
                    </span>
                    <p className="text-emerald-400 font-medium">Dodatna prodaja</p>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-300 ${animate ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                      {roi}%
                    </span>
                    <p className="text-emerald-400 font-medium">ROI (1. mjesec)</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="https://preview--nurturehub-ai.lovable.app/auth"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
              >
                Želim da AI radi ovo za mene
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
