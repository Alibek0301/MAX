import React from 'react';

const LoyaltyCard = ({ t, level, points, nextLevelOrders, progressPercent }) => {
  const levelColor = level.key === 'gold'
    ? 'from-amber-500/30 to-yellow-500/20 border-amber-400/40 text-amber-100'
    : level.key === 'silver'
      ? 'from-slate-400/25 to-slate-500/20 border-slate-300/35 text-slate-100'
      : 'from-orange-700/30 to-amber-700/20 border-orange-400/35 text-orange-100'

  const levelLabel = level.key === 'gold'
    ? t.loyaltyGold
    : level.key === 'silver'
      ? t.loyaltySilver
      : t.loyaltyBronze

  return (
    <div className={`rounded-xl border bg-gradient-to-r px-4 py-3 ${levelColor}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">{t.loyaltyLevel}: {levelLabel}</p>
        <p className="text-xs opacity-90">{t.loyaltyPoints}: {points}</p>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-black/35">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="mt-1 text-xs opacity-90">
        {nextLevelOrders > 0 ? `${t.loyaltyNext}: ${nextLevelOrders}` : `${t.loyaltyGold} max`}
      </p>
    </div>
  )
}

export { LoyaltyCard };
