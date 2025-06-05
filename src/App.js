import React, { useState, useEffect, useRef } from "react";

function CircularTimer({ remaining, duration }) {
  const radius = 45;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = remaining / duration;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="circle-timer">
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#007bff"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="14px"
        fill="#333"
      >
        {Math.floor(remaining / 60)}:
        {(remaining % 60).toString().padStart(2, "0")}
      </text>
    </svg>
  );
}
import "./App.css";

const schedule = {
  Monday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Skin-to-skin with parent, natural light exposure",
        hi: "माँ या पापा के साथ त्वचा से त्वचा संपर्क, प्राकृतिक रोशनी में रहना",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "1–2 mins tummy time or black & white visual card",
        hi: "1–2 मिनट टमी टाइम या ब्लैक एंड व्हाइट कार्ड दिखाना",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Gentle massage and leg cycling",
        hi: "हल्की मालिश और पैरों की साइक्लिंग",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Nap with white noise or heartbeat sounds",
        hi: "सफेद शोर या दिल की धड़कन की आवाज़ के साथ झपकी",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: {
        en: "Mirror face time with soft talking",
        hi: "आईने में चेहरा देखना और धीमे स्वर में बात करना",
      },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: {
        en: "Warm bath, swaddle, lullaby",
        hi: "गुनगुना स्नान, कपड़े में लपेटना, लोरी गाना",
      },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
  Tuesday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Hold close with rhythmic hum",
        hi: "धीमी धुन के साथ गले लगाकर रखना",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "Contrast visual cards & calm voice",
        hi: "कॉन्ट्रास्ट कार्ड और शांत स्वर में बात करना",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Massage with warm oil and talk",
        hi: "गर्म तेल से मालिश और संवाद",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Cradle-hold nap + soft background music",
        hi: "गोद में झपकी और पृष्ठभूमि में धीमा संगीत",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: {
        en: "Soft toy touch & naming (1 word)",
        hi: "मुलायम खिलौने को छूकर उसका नाम लेना (1 शब्द)",
      },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: {
        en: "Lullaby & rocking to sleep",
        hi: "लोरी गाना और गोद में झुलाना",
      },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
  Wednesday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Skin-to-skin + sunlight by window",
        hi: "त्वचा से त्वचा संपर्क और खिड़की से धूप लेना",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "High contrast cloth book time",
        hi: "ब्लैक एंड व्हाइट कपड़े की किताब देखना",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Diaper time: smile + name body parts",
        hi: "डायपर बदलते समय: मुस्कुराना और अंगों का नाम लेना",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Rocking nap with low light",
        hi: "धीमी रोशनी में झुलाते हुए झपकी",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: {
        en: "Mirror face time + peek-a-boo",
        hi: "आईने में चेहरा और झांकी-बू खेल",
      },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: {
        en: "Bath, towel hug, gentle touch",
        hi: "स्नान, तौलिया से लपेटना, कोमल स्पर्श",
      },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
  Thursday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Music time: soft instrumental tune",
        hi: "संगीत समय: हल्का वाद्य संगीत",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "Visual card tracking + facial mimic",
        hi: "विजुअल कार्ड और चेहरे की नकल करना",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Tummy time (2 min) on firm surface",
        hi: "फर्म सतह पर टमी टाइम (2 मिनट)",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Hold & nap with heartbeat sound track",
        hi: "हाथ में लेकर दिल की धड़कन की ध्वनि के साथ झपकी",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: {
        en: "Finger movement dance in front of eyes",
        hi: "आँखों के सामने उंगलियों की हरकत",
      },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: {
        en: "Soft talking and warm towel press",
        hi: "धीमी बात और गर्म तौलिया लगाना",
      },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
  Friday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Skin-to-skin on chest, eye contact",
        hi: "छाती पर स्किन-टू-स्किन, आँखों में संपर्क",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "Contrast mobile + smile mimic",
        hi: "कॉन्ट्रास्ट मोबाइल और मुस्कान की नकल",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Name family members softly",
        hi: "परिवार के नाम धीरे-धीरे लेना",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Nap on shoulder with calm hum",
        hi: "कंधे पर झपकी और शांत धुन",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: { en: "Wrist rattle play", hi: "कलाई वाली झुनझुना खेल" },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: {
        en: "Warm water sponge & dry towel rub",
        hi: "गर्म पानी से स्पंज और तौलिया से सुखाना",
      },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
  Saturday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Belly-to-belly rest + singing",
        hi: "पेट से पेट लगाकर आराम और गाना",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "Face-to-face gentle talking",
        hi: "चेहरे के सामने हल्के से बात करना",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Tummy time + soft praise",
        hi: "टमी टाइम और धीरे-धीरे तारीफ करना",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Nap in sling or carrier",
        hi: "स्लिंग या कैरियर में झपकी",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: {
        en: "Sing caregiver’s name while rocking",
        hi: "झुलाते हुए देखभाल करने वाले का नाम लेना",
      },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: {
        en: "Foot massage with ghee or oil",
        hi: "घी या तेल से पैरों की मालिश",
      },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
  Sunday: [
    {
      label: "🌌 Night Time",
      time: "12:00 AM – 7:00 AM",
      activity: {
        en: "Feed, burp, cuddle, sleep",
        hi: "दूध पिलाना, डकार दिलाना, गले लगाना, नींद",
      },
    },
    {
      label: "🌅 Early Morning",
      time: "7:00 AM – 8:30 AM",
      activity: {
        en: "Family bonding circle time",
        hi: "परिवार के साथ जुड़ाव का समय",
      },
    },
    {
      label: "🌞 Morning",
      time: "8:30 AM – 11:00 AM",
      activity: {
        en: "Black & white mobile gaze",
        hi: "ब्लैक एंड व्हाइट मोबाइल को देखना",
      },
    },
    {
      label: "🕊️ Midday",
      time: "11:00 AM – 1:00 PM",
      activity: {
        en: "Massage with gentle song",
        hi: "कोमल गाने के साथ मालिश",
      },
    },
    {
      label: "😴 Afternoon",
      time: "1:00 PM – 3:30 PM",
      activity: {
        en: "Nap with dim lullaby audio",
        hi: "धीमी लोरी की ध्वनि के साथ झपकी",
      },
    },
    {
      label: "🌇 Early Evening",
      time: "3:30 PM – 6:00 PM",
      activity: {
        en: "Face stroking and smile mimic",
        hi: "चेहरे को सहलाना और मुस्कुराहट की नकल",
      },
    },
    {
      label: "🌙 Evening Wind-down",
      time: "6:00 PM – 8:00 PM",
      activity: { en: "Wrap, hum, hold", hi: "लपेटना, गुनगुनाना, पकड़ना" },
    },
    {
      label: "🌌 Night Time",
      time: "8:00 PM – 11:59 PM",
      activity: {
        en: "Feed, soothe, sleep in dim light",
        hi: "दूध पिलाना, शांत करना, धीमी रोशनी में सुलाना",
      },
    },
  ],
};

const getCurrentBlock = (daySchedule) => {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (timeStr) => {
    const [raw, period] = timeStr.split(" ");
    let [h, m] = raw.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  for (const block of daySchedule) {
    const [startStr, endStr] = block.time.split("–").map((t) => t.trim());
    const start = toMinutes(startStr);
    const end = toMinutes(endStr);

    if (start > end) {
      if (nowMins >= start || nowMins < end) return block;
    } else {
      if (nowMins >= start && nowMins < end) return block;
    }
  }

  return null;
};

export default function App() {
  const [currentDay, setCurrentDay] = useState("Monday");
  const [currentBlock, setCurrentBlock] = useState(null);
  const [lang, setLang] = useState("en");
  const [completionMap, setCompletionMap] = useState({});
  const [now, setNow] = useState(new Date());
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const today = new Date().toLocaleString("en-US", { weekday: "long" });
    setCurrentDay(today);
    const block = getCurrentBlock(schedule[today] || []);
    setCurrentBlock(block);

    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const blocks = schedule[currentDay] || [];

  const handleTick = (label) => {
    setCompletionMap((prev) => {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return {
        ...prev,
        [label]: {
          done: !prev[label]?.done,
          time: !prev[label]?.done ? timestamp : null,
        },
      };
    });
  };

  const toMinutes = (timeStr) => {
    const [raw, period] = timeStr.split(" ");
    let [h, m] = raw.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  const getActivityDuration = (text) => {
    const keywords = {
      tummy: 2,
      massage: 10,
      visual: 3,
      mirror: 2,
      talk: 5,
      lullaby: 3,
      hold: 5,
    };
    for (const key in keywords) {
      if (text.toLowerCase().includes(key)) return keywords[key];
    }
    return 5;
  };

  const getImageUrl = (text) => {
    const keyword = text.split(" ")[0];
    return `https://source.unsplash.com/100x100/?baby,${encodeURIComponent(
      keyword
    )}`;
  };

  const getAudio = (text) => {
    if (text.toLowerCase().includes("massage"))
      return "https://cdn.pixabay.com/download/audio/2022/03/15/audio_87695c8ce3.mp3";
    if (text.toLowerCase().includes("nap"))
      return "https://cdn.pixabay.com/download/audio/2021/09/15/audio_b672d2cd40.mp3";
    if (text.toLowerCase().includes("mirror"))
      return "https://cdn.pixabay.com/download/audio/2023/03/28/audio_43f7e1b6e2.mp3";
    return "https://cdn.pixabay.com/download/audio/2022/05/16/audio_8c3421abcc.mp3";
  };

  const missedBlocks = blocks.filter((block) => {
    const [_, endStr] = block.time.split("–").map((t) => t.trim());
    const blockEnd = toMinutes(endStr) + 60;
    const nowMins = now.getHours() * 60 + now.getMinutes();
    return nowMins > blockEnd && !completionMap[block.label]?.done;
  });

  const startTimer = (label, duration, audioSrc) => {
    if (timers[label]) return;
    const endTime = Date.now() + duration * 60000;
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.play();
    setTimers((prev) => ({ ...prev, [label]: { endTime, audio } }));
  };

  const stopTimer = (label, chime = false) => {
    if (timers[label]) {
      timers[label].audio.pause();
      if (chime)
        new Audio(
          "https://cdn.pixabay.com/download/audio/2022/03/15/audio_12232c3692.mp3"
        ).play();
      setTimers((prev) => {
        const copy = { ...prev };
        delete copy[label];
        return copy;
      });
    }
  };

  return (
    <div className="App">
      <div className="header-banner">
        <h1 className="app-title">👶 Armaan’s Schedule for the Day</h1>
      </div>
      <div className="language-toggle">
        <button
          onClick={() => setLang("en")}
          className={lang === "en" ? "active" : ""}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => setLang("hi")}
          className={lang === "hi" ? "active" : ""}
        >
          हिंदी
        </button>
      </div>
      <h1 className="title">Today's Schedule ({currentDay})</h1>
      <div className="schedule-list">
        {blocks.map((block, idx) => {
          const done = completionMap[block.label]?.done;
          const time = completionMap[block.label]?.time;
          const [_, endStr] = block.time.split("–").map((t) => t.trim());
          const blockEnd = toMinutes(endStr) + 60;
          const nowMins = now.getHours() * 60 + now.getMinutes();
          const isExpired = nowMins > blockEnd;
          const duration = getActivityDuration(block.activity[lang]);
          const audio = getAudio(block.activity[lang]);

          const timerRunning = timers[block.label];
          const remaining = timerRunning
            ? Math.max(
                0,
                Math.floor((timerRunning.endTime - Date.now()) / 1000)
              )
            : 0;
          const minutes = Math.floor(remaining / 60);
          const seconds = remaining % 60;

          if (timerRunning && remaining <= 0) stopTimer(block.label, true);

          return (
            <div
              key={idx}
              className={`schedule-block ${
                currentBlock?.label === block.label ? "current" : ""
              } ${done ? "completed" : ""}`}
            >
              <div className="block-header">
                {block.label} <span className="time">({block.time})</span>
              </div>
              <div className="activity">{block.activity[lang]}</div>
              <div className="timer-ui">
                <p>⏱ {duration} min activity</p>
                {!timerRunning ? (
                  <button
                    onClick={() => startTimer(block.label, duration, audio)}
                  >
                    ▶️ Start Timer
                  </button>
                ) : (
                  <>
                    <CircularTimer
                      remaining={remaining}
                      duration={duration * 60}
                    />
                    <button onClick={() => stopTimer(block.label, true)}>
                      ⏹ Stop
                    </button>
                  </>
                )}
                {timerRunning && (
                  <div className="activity-image">
                    <img
                      src={getImageUrl(block.activity[lang])}
                      alt="activity"
                      width="100"
                      height="100"
                      style={{ borderRadius: "8px", marginTop: "0.5rem" }}
                    />
                  </div>
                )}
              </div>
              <label className="tick">
                <input
                  type="checkbox"
                  checked={done || false}
                  onChange={() => handleTick(block.label)}
                  disabled={isExpired && !done}
                />{" "}
                {done ? "Done" : isExpired ? "Expired" : "Mark as done"}
              </label>
              {done && time && (
                <div className="timestamp">Marked done at {time}</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="summary">
        <h2>🧾 Daily Summary</h2>
        <p>
          ✔️ Completed:{" "}
          {Object.values(completionMap).filter((v) => v.done).length} of{" "}
          {blocks.length}
        </p>
        {missedBlocks.length > 0 && (
          <div>
            <p>❌ Missed:</p>
            <ul>
              {missedBlocks.map((b, i) => (
                <li key={i}>{b.label}</li>
              ))}
            </ul>
          </div>
        )}
        {missedBlocks.length === 0 && <p>👏 All done! Great job today!</p>}
      </div>
    </div>
  );
}
