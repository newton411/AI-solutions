import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, DollarSign, Clock, Zap } from 'lucide-react';

/**
 * Yield Calculator Component
 * Interactive tool for users to simulate returns based on Phase 2 equations
 */
export const YieldCalculator: React.FC = () => {
  const [deposit, setDeposit] = useState<string>('10000');
  const [duration, setDuration] = useState<number>(12); // months
  const [baseApy, setBaseApy] = useState<number>(12); // base APY

  // Phase 2 Boost Calculation
  // Lock duration affects multiplier: 3-12 months = 1x, 13-24 = 1.5x, 25-36 = 2x, 37-48 = 2.5x
  const getBoostMultiplier = (months: number): number => {
    if (months <= 12) return 1.0;
    if (months <= 24) return 1.5;
    if (months <= 36) return 2.0;
    return 2.5;
  };

  // Calculate yields
  const calculations = useMemo(() => {
    const depositAmount = parseFloat(deposit) || 0;
    const boost = getBoostMultiplier(duration);
    const effectiveApy = baseApy * boost;
    const monthlyRate = effectiveApy / 100 / 12;

    // Compound interest calculation
    let totalValue = depositAmount;
    let totalRewards = 0;

    for (let i = 0; i < duration; i++) {
      const monthlyYield = totalValue * monthlyRate;
      totalRewards += monthlyYield;
      totalValue += monthlyYield;
    }

    const dailyYield = (depositAmount * (effectiveApy / 100)) / 365;

    return {
      depositAmount,
      boost,
      effectiveApy,
      monthlyYield: depositAmount * monthlyRate,
      dailyYield,
      totalRewards: totalRewards,
      totalValue: totalValue,
    };
  }, [deposit, duration, baseApy]);

  const durationLabels = [
    { value: 3, label: '3mo (1.0x)' },
    { value: 12, label: '12mo (1.0x)' },
    { value: 24, label: '24mo (1.5x)' },
    { value: 36, label: '36mo (2.0x)' },
    { value: 48, label: '48mo (2.5x)' },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-cyan-950/10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold">EARNINGS SIMULATOR</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent font-heading">
            Calculate Your SUPLOCK Returns
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Simulate your earnings with Phase 2 boost multipliers. Longer lock duration = higher boost = maximum yields.
          </p>
        </motion.div>

        {/* Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 glass-cyan rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Your Parameters</h3>

            {/* Deposit Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-300 mb-3">Initial Deposit ($SUPRA)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                </div>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="10000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Min. 100 SUPRA recommended</p>
            </div>

            {/* Duration Slider */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-300 mb-3">
                Lock Duration: <span className="text-cyan-200">{duration} months</span>
              </label>
              <input
                type="range"
                min="3"
                max="48"
                step="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-cyan-500/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-3 gap-2">
                {durationLabels.map((label) => (
                  <motion.button
                    key={label.value}
                    onClick={() => setDuration(label.value)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      duration === label.value
                        ? 'bg-cyan-500 text-white'
                        : 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {label.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Base APY Info */}
            <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
              <p className="text-xs text-gray-400 mb-2">Base APY (Phase 2)</p>
              <p className="text-2xl font-bold text-cyan-300">{baseApy}%</p>
              <p className="text-xs text-gray-500 mt-2">Varies by vault. Boosted by lock duration.</p>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-cyan rounded-xl p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Boost Multiplier */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <p className="text-sm text-gray-400">Boost Multiplier</p>
                </div>
                <p className="text-3xl font-bold text-cyan-300">{calculations.boost.toFixed(1)}x</p>
              </motion.div>

              {/* Effective APY */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <p className="text-sm text-gray-400">Effective APY</p>
                </div>
                <p className="text-3xl font-bold text-blue-300">{calculations.effectiveApy.toFixed(1)}%</p>
              </motion.div>

              {/* Daily Yield */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-cyan-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <p className="text-sm text-gray-400">Daily Yield</p>
                </div>
                <p className="text-3xl font-bold text-purple-300">${calculations.dailyYield.toFixed(2)}</p>
              </motion.div>

              {/* Monthly Yield */}
              <motion.div
                className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <p className="text-sm text-gray-400">Monthly Yield</p>
                </div>
                <p className="text-3xl font-bold text-cyan-300">${calculations.monthlyYield.toFixed(2)}</p>
              </motion.div>
            </div>

            {/* Total Summary */}
            <div className="border-t border-cyan-500/20 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Initial Deposit:</span>
                <span className="text-xl font-bold text-white">${calculations.depositAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Rewards ({duration}mo):</span>
                <span className="text-xl font-bold text-green-400">+${calculations.totalRewards.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-center justify-between">
                <span className="font-semibold text-cyan-300">Total Value After {duration}mo:</span>
                <span className="text-2xl font-bold text-cyan-200">${calculations.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>

              {/* ROI Percentage */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-400 mb-2">Return on Investment</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  {(((calculations.totalValue - calculations.depositAmount) / calculations.depositAmount) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <motion.p
              className="text-xs text-gray-500 mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ⚠️ <strong>Disclaimer:</strong> This calculator provides estimates based on Phase 2 parameters. Actual returns
              may vary based on market conditions, protocol updates, and vault performance. Not financial advice.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YieldCalculator;
