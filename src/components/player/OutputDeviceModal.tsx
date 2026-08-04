import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Speaker, Headphones, Check, RefreshCw, Radio } from "lucide-react";
import { usePlayer } from "../../store/playerContext";

interface OutputDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutputDeviceModal: React.FC<OutputDeviceModalProps> = ({ isOpen, onClose }) => {
  const [realDevices, setRealDevices] = useState<MediaDeviceInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { activeDeviceId, setAudioOutputDevice } = usePlayer();

  const fetchRealDevices = async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices) return;
    setLoading(true);
    try {
      // Enumerate physical audio output devices
      let devices = await navigator.mediaDevices.enumerateDevices();
      let audioOutputs = devices.filter((d) => d.kind === "audiooutput");

      // Check if device labels are accessible
      const hasLabels = audioOutputs.some((d) => d.label && d.label.length > 0);

      if (!hasLabels && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
          setPermissionGranted(true);

          // Re-enumerate to get full device labels
          devices = await navigator.mediaDevices.enumerateDevices();
          audioOutputs = devices.filter((d) => d.kind === "audiooutput");
        } catch (permErr) {
          console.warn("Microphone permission skipped, listing available device IDs:", permErr);
        }
      }

      setRealDevices(audioOutputs);
    } catch (e) {
      console.warn("Error enumerating real audio output devices:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRealDevices();
    }
  }, [isOpen]);

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

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto bg-[#0d1013] border-t border-white/15 rounded-t-[28px] p-6 pb-10 shadow-[0_-12px_50px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Speaker className="w-5 h-5 text-[#b9c6d8]" />
                <h3 className="text-lg font-bold text-[#f2f0ea]">Hardware Audio Output</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchRealDevices}
                  aria-label="Refresh audio devices"
                  className="p-1.5 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[#969aa0] mb-4 leading-relaxed">
              Detecting physical audio hardware connected to your device via Web Audio MediaDevices API.
            </p>

            {/* Device List */}
            <div className="flex flex-col gap-2.5 mb-6">
              {realDevices.length > 0 ? (
                realDevices.map((dev, idx) => {
                  const isSelected = activeDeviceId === dev.deviceId || (activeDeviceId === "default" && idx === 0);
                  const labelName = dev.label || `Audio Output ${idx + 1} (${dev.deviceId.slice(0, 8)}...)`;
                  const isHeadphones = labelName.toLowerCase().includes("headphone") || labelName.toLowerCase().includes("bluetooth") || labelName.toLowerCase().includes("beats") || labelName.toLowerCase().includes("airpods");

                  const Icon = isHeadphones ? Headphones : Speaker;

                  return (
                    <div
                      key={dev.deviceId || idx}
                      onClick={() => {
                        setAudioOutputDevice(dev.deviceId, labelName);
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border transition-all ${
                        isSelected
                          ? "bg-[#12161a] border-[#b9c6d8] shadow-[0_0_15px_rgba(185,198,216,0.3)]"
                          : "bg-[#050607] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`p-2.5 rounded-xl flex-shrink-0 ${isSelected ? "bg-[#b9c6d8] text-[#050607]" : "bg-[#12161a] text-[#969aa0]"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className={`text-sm font-semibold truncate ${isSelected ? "text-[#f2f0ea]" : "text-[#969aa0]"}`}>
                            {labelName}
                          </span>
                          <span className="text-[10px] text-[#676d74]">Hardware Sink ID: {dev.deviceId ? `${dev.deviceId.slice(0, 12)}...` : "Default Direct"}</span>
                        </div>
                      </div>

                      {isSelected && <Check className="w-5 h-5 text-[#b9c6d8] flex-shrink-0 ml-2" />}
                    </div>
                  );
                })
              ) : (
                /* System Default Fallback if device enumeration is blocked */
                <div
                  onClick={() => setAudioOutputDevice("default", "System Default Audio Output")}
                  className="flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border bg-[#12161a] border-[#b9c6d8]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#b9c6d8] text-[#050607]">
                      <Speaker className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#f2f0ea]">System Default Audio Output</span>
                      <span className="text-[10px] text-[#676d74]">Primary Hardware Device</span>
                    </div>
                  </div>
                  <Check className="w-5 h-5 text-[#b9c6d8]" />
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#b9c6d8] text-[#050607] text-xs font-bold active:scale-95 transition-transform"
            >
              Done Selecting Output
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
