import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiSend,
  FiUser,
  FiMail,
} from 'react-icons/fi';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolio-data';

interface DayInfo {
  dayNumber: number;
  isCurrentMonth: boolean;
  dateKey: string; // YYYY-MM-DD
  isAvailable: boolean;
}

const TIME_SLOTS = [
  { time: '10:00 AM', period: 'Morning (IST)' },
  { time: '11:30 AM', period: 'Morning (IST)' },
  { time: '02:00 PM', period: 'Afternoon (IST)' },
  { time: '04:30 PM', period: 'Afternoon (IST)' },
  { time: '06:00 PM', period: 'Evening (IST)' },
  { time: '08:30 PM', period: 'Night / Global (IST)' },
];

const TOPICS = [
  'Full-Stack / Engineering Role Discussion',
  'MERN / Architecture Project Consultation',
  'AI Integration & Prototype Development',
  'Technical Deep-Dive & Code Review',
];

export function BookingCalendar() {
  // Current time is September 2026 as per workspace metadata
  const [baseMonth, setBaseMonth] = useState<number>(8); // 8 is September (0-indexed)
  const [baseYear, setBaseYear] = useState<number>(2026);

  // Selected date
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-18');
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0]);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const prevMonth = () => {
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(baseYear - 1);
    } else {
      setBaseMonth(baseMonth - 1);
    }
  };

  const nextMonth = () => {
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(baseYear + 1);
    } else {
      setBaseMonth(baseMonth + 1);
    }
  };

  // Helper to get calendar days for a month
  const getDaysForMonth = (year: number, month: number): DayInfo[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday as first day of week: 0 = Mon, 6 = Sun
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: DayInfo[] = [];

    // Preceding month trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const prevM = month === 0 ? 11 : month - 1;
      const prevY = month === 0 ? year - 1 : year;
      const key = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        isCurrentMonth: false,
        dateKey: key,
        isAvailable: false,
      });
    }

    // Current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayOfWeek = new Date(year, month, d).getDay();
      // Sundays (0) and Saturdays (6) have fewer slots, weekdays are available
      const isAvailable = dayOfWeek !== 0;
      days.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateKey: key,
        isAvailable,
      });
    }

    // Trailing days for next month to fill grid (up to 35 or 42)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 11 ? 0 : month + 1;
      const nextY = month === 11 ? year + 1 : year;
      const key = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        isCurrentMonth: false,
        dateKey: key,
        isAvailable: false,
      });
    }

    return days;
  };

  // Next month calculation
  const nextMonthIndex = (baseMonth + 1) % 12;
  const nextMonthYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  const currentMonthDays = getDaysForMonth(baseYear, baseMonth);
  const nextMonthDays = getDaysForMonth(nextMonthYear, nextMonthIndex);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ffffff', '#fb923c', '#d97706'],
      });
    } catch {
      // ignore
    }

    setIsSuccess(true);

    // Build pre-filled mailto with meeting focus as subject and project context as body
    const subject = encodeURIComponent(`${selectedTopic} — Meeting Request`);
    const body = encodeURIComponent(
      `${notes}\n\n` +
      `-----------------------------------------\n` +
      `Meeting Details:\n` +
      `Date: ${selectedDate}\n` +
      `Time: ${selectedTime} (IST)\n` +
      `Meeting Focus: ${selectedTopic}\n` +
      `Attendee: ${guestName || 'Guest'}\n` +
      `Email: ${guestEmail}`
    );

    setTimeout(() => {
      window.location.href = `mailto:gouravthakurpp@gmail.com?subject=${subject}&body=${body}`;
    }, 800);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Calendar Card container inspired by reference screenshot */}
      <div className="relative rounded-3xl bg-[#090909]/95 border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 md:p-8 backdrop-blur-xl overflow-hidden">
        {/* Subtle Ambient Light Spot */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#f97316]/10 blur-[90px]" />

        {/* Header matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-[#f97316] text-xs font-bold uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-ping" />
              Direct Engineering Booking
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Schedule a Session with Gourav
            </h3>
            <p className="text-xs md:text-sm text-[#8E8E8E] mt-0.5">
              Select a date and time slot for a technical discussion or opportunity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#A3A3A3]">
              <FiGlobe className="text-[#f97316]" />
              <span>UTC+05:30 (IST) • 30 Mins</span>
            </div>
          </div>
        </div>

        {/* Dual Month Calendar Display */}
        <div className="mt-6">
          {/* Month Navigation Control */}
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Previous Month"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-around w-full max-w-2xl text-center">
              <div className="font-bold text-white text-base md:text-lg tracking-wide uppercase">
                {monthNames[baseMonth]} {baseYear}
              </div>
              <div className="hidden md:block font-bold text-white/70 text-base md:text-lg tracking-wide uppercase">
                {monthNames[nextMonthIndex]} {nextMonthYear}
              </div>
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Next Month"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Month 1 */}
            <div>
              <div className="grid grid-cols-7 text-center mb-2">
                {weekdays.map((day) => (
                  <span
                    key={day}
                    className="text-xs font-semibold text-[#737373] uppercase tracking-wider py-1 select-none"
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {currentMonthDays.map((day, idx) => {
                  const isSelected = selectedDate === day.dateKey;
                  return (
                    <button
                      key={`m1-${idx}`}
                      type="button"
                      disabled={!day.isCurrentMonth}
                      onClick={() => setSelectedDate(day.dateKey)}
                      className={`relative h-10 w-full rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        !day.isCurrentMonth
                          ? 'text-[#333333] cursor-not-allowed'
                          : isSelected
                          ? 'bg-white text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105 z-10'
                          : 'text-[#D4D4D4] hover:bg-white/[0.08] hover:text-white cursor-pointer'
                      }`}
                    >
                      {day.dayNumber}
                      {isSelected && (
                        <motion.span
                          layoutId="selectedDayDot"
                          className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#f97316]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Month 2 (Visible on desktop, matching reference image) */}
            <div className="hidden md:block">
              <div className="grid grid-cols-7 text-center mb-2">
                {weekdays.map((day) => (
                  <span
                    key={`m2-h-${day}`}
                    className="text-xs font-semibold text-[#737373] uppercase tracking-wider py-1 select-none"
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {nextMonthDays.map((day, idx) => {
                  const isSelected = selectedDate === day.dateKey;
                  return (
                    <button
                      key={`m2-${idx}`}
                      type="button"
                      disabled={!day.isCurrentMonth}
                      onClick={() => setSelectedDate(day.dateKey)}
                      className={`relative h-10 w-full rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        !day.isCurrentMonth
                          ? 'text-[#333333] cursor-not-allowed'
                          : isSelected
                          ? 'bg-white text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105 z-10'
                          : 'text-[#D4D4D4] hover:bg-white/[0.08] hover:text-white cursor-pointer'
                      }`}
                    >
                      {day.dayNumber}
                      {isSelected && (
                        <motion.span
                          layoutId="selectedDayDot"
                          className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#f97316]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Time Slots & Meeting Details */}
        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-white uppercase tracking-wider">
            <FiClock className="text-[#f97316]" />
            Select Preferred Time Slot ({selectedDate})
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-2.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#f97316] text-black border-[#f97316] font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                      : 'bg-white/[0.02] border-white/10 text-white/80 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs md:text-sm font-semibold">{slot.time}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-black/80' : 'text-[#737373]'}`}>
                    {slot.period}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    required
                    placeholder="E.g. Sarah Jenkins / Engineering Recruiter"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#f97316] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#f97316] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
                Meeting Focus / Agenda
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors cursor-pointer"
              >
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic} className="bg-[#121212] text-white">
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
                Project Context <span className="text-[#f97316]">*</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="Share project requirements, role scope, or specific topics to discuss (mandatory)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
              />
            </div>

            {/* Confirmation Banner / Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#8E8E8E] text-center sm:text-left">
                Direct mail dispatch to <span className="text-white font-mono">{PERSONAL_INFO.email}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#EDEDED] text-black font-black tracking-widest text-xs uppercase hover:bg-[#f97316] hover:text-white hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiCalendar className="w-4 h-4" />
                <span>Book Meeting</span>
              </button>
            </div>
          </form>

          {/* Success feedback toast */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-sm text-white"
              >
                <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-emerald-400">
                    Meeting booked for {selectedDate} at {selectedTime}. Calendar updated.
                  </div>
                  <div className="text-xs text-[#A3A3A3] mt-0.5">
                    Email invitation dispatched to gouravthakurpp@gmail.com
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
