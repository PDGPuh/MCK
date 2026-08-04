import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sliders, Zap, Check } from "lucide-react";
import { usePlayer, EQ_PRESETS } from "../../store/playerContext";
import { EqPresetName, EqBands } from "../../types/music";

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BAND_LABELS: Record<number, string> = {
  60: "60Hz",
  250: "250Hz",
  1000: "1kHz",
  4000: "4kHz",
  12000: "12kHz",
};

const FREQUENCIES = [60, 250, 1000, 4000, 12000] as const;

export const EqualizerModal: React.FC<EqualizerModalProps> = ({ isOpen, onClose }) => {
  const { eqBands, eqPreset, isEqEnabled, setEqBand, applyEqPreset, toggleEq } = usePlayer();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto bg-[#0d1013] border-t border-white/15 rounded-t-[28px] p-6 pb-10 shadow-[0_-12px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#b9c6d8]" />
                <h3 className="text-lg font-bold text-[#f2f0ea] tracking-wide">Audio Equalizer</h3>
              </div>

              <div className="flex items-center gap-3">
                {/* EQ Toggle Switch */}
                <button
                  onClick={toggleEq}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isEqEnabled ? "bg-[#b9c6d8]" : "bg-[#12161a] border border-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[#050607] transition-transform ${
                      isEqEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Audio Quality Chip */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#12161a] border border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#b9c6d8]" />
                <span className="text-xs font-semibold text-[#f2f0ea]">FLAC Lossless Audio Engine</span>
              </div>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-[#b9c6d8]/15 text-[#b9c6d8] uppercase">
                24-BIT / 96KHZ
              </span>
            </div>

            {/* Equalizer Presets */}
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-xs font-bold text-[#969aa0] uppercase tracking-wider">Presets</span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {(Object.keys(EQ_PRESETS) as EqPresetName[]).map((preset) => {
                  const isSelected = eqPreset === preset;
                  return (
                    <button
                      key={preset}
                      onClick={() => applyEqPreset(preset)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                        isSelected
                          ? "bg-[#b9c6d8] text-[#050607] border-[#b9c6d8] shadow-[0_0_12px_rgba(185,198,216,0.4)]"
                          : "bg-[#12161a] text-[#969aa0] hover:text-[#f2f0ea] border-white/10"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{preset}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5-Band Vertical Equalizer Sliders */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#969aa0] uppercase">
                <span>Frequency Bands</span>
                <span>Gain (-12dB to +12dB)</span>
              </div>

              <div className="grid grid-cols-5 gap-2 p-4 rounded-2xl bg-[#050607] border border-white/10 items-end min-h-[220px]">
                {FREQUENCIES.map((freq) => {
                  const gain = isEqEnabled ? eqBands[freq as keyof EqBands] || 0 : 0;
                  return (
                    <div key={freq} className="flex flex-col items-center gap-3 h-full justify-between">
                      {/* Gain Value Readout */}
                      <span className="text-[11px] font-mono font-bold text-[#b9c6d8]">
                        {gain > 0 ? `+${gain}` : gain}dB
                      </span>

                      {/* Vertical Slider */}
                      <div className="relative flex-1 flex items-center justify-center w-full min-h-[140px]">
                        <input
                          type="range"
                          min={-12}
                          max={12}
                          step={1}
                          disabled={!isEqEnabled}
                          value={gain}
                          onChange={(e) => setEqBand(freq, parseFloat(e.target.value))}
                          aria-label={`Set equalizer for ${BAND_LABELS[freq]}`}
                          className="w-[140px] h-2 bg-[#12161a] rounded-lg appearance-none cursor-pointer accent-[#b9c6d8] -rotate-90 origin-center disabled:opacity-30"
                        />
                      </div>

                      {/* Frequency Label */}
                      <span className="text-xs font-semibold text-[#f2f0ea]">{BAND_LABELS[freq]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => applyEqPreset("Flat")}
              className="w-full py-2.5 rounded-xl bg-[#12161a] hover:bg-white/10 text-xs font-semibold text-[#969aa0] hover:text-[#f2f0ea] transition-colors border border-white/10"
            >
              Reset Equalizer to Flat
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
