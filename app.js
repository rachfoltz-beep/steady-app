(function () {
  "use strict";

  var STORAGE_KEY = "poop_tracker_entries";
  var THEME_KEY = "poop_tracker_theme";

  var SIZE_OPTIONS = [
    { id: "pebble", name: "Pebble party", desc: "A polite little guest", emoji: "🪨" },
    { id: "junior", name: "Junior mint", desc: "Small but sincere", emoji: "🍫" },
    { id: "respectable", name: "Respectable log", desc: "Goldilocks would approve", emoji: "📏" },
    { id: "unit", name: "Absolute unit", desc: "We need to talk about fiber", emoji: "🏋️" },
    { id: "event", name: "Main event", desc: "The whole bathroom knew", emoji: "🎪" },
  ];

  var CONSISTENCY_OPTIONS = [
    { id: "rocket", name: "Rocket launch", desc: "3… 2… 1… splashdown", emoji: "🚀" },
    { id: "softserve", name: "Soft serve honors", desc: "Swirly and cooperative", emoji: "🍦" },
    { id: "logs", name: "Lincoln logs", desc: "Stackable architecture", emoji: "🪵" },
    { id: "rabbit", name: "Rabbit pellets", desc: "Scatter plot energy", emoji: "🐰" },
    { id: "mystery", name: "Mystery blob", desc: "Schrodinger’s consistency", emoji: "❓" },
    { id: "adventure", name: "Choose-your-own-adventure", desc: "Plot twists included", emoji: "📖" },
  ];

  var SICKO_MESSAGES = [
    "You sicko. No one — literally no one — wants a JPEG of that. Go touch grass (wash hands first).",
    "Absolutely not, you magnificent weirdo. This button exists purely to expose your chaos. Shame.",
    "We’re a tracker, not a museum. Keep your avant-garde photography to yourself, Picasso.",
    "Nice try, documentarian. The cloud said “hard pass.” So did civilization.",
    "That urge? That’s between you and your conscience. The rest of us are eating lunch. Stop.",
  ];

  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var FEEDBACK_EMAIL = "rach.foltz@gmail.com";
  var FEEDBACK_SUBJECTS = [
    "🚽 Poop Tracker: dispatch from the throne",
    "Not a stool sample — just app feedback",
    "URGENT (jk): Poop Tracker thoughts",
    "Hot goss from the porcelain think tank",
    "My browser and I have notes (Poop Tracker)",
    "Feature request / bug / emotional support (Poop Tracker)",
    "Certified feedback — no photography attached",
  ];

  function $(id) {
    return document.getElementById(id);
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function toDateKey(d) {
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function parseDateKey(key) {
    var p = key.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function loadEntries() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (_) {
      return [];
    }
  }

  function saveEntries(entries) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (_) {}
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showToast(msg) {
    var el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    el.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("is-visible");
      setTimeout(function () {
        el.hidden = true;
      }, 400);
    }, 2600);
  }

  function renderOptionChips(container, name, options) {
    if (!container) return;
    container.innerHTML = "";
    options.forEach(function (opt, i) {
      var id = name + "-" + opt.id;
      var label = document.createElement("label");
      label.className = "chip-option";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = name;
      input.value = opt.id;
      input.id = id;
      if (i === 0) input.checked = true;
      var face = document.createElement("span");
      face.className = "chip-face";
      face.innerHTML =
        '<span class="chip-emoji" aria-hidden="true">' +
        opt.emoji +
        "</span><span class=\"chip-text\"><span class=\"chip-name\">" +
        escapeHtml(opt.name) +
        "</span><span class=\"chip-desc\">" +
        escapeHtml(opt.desc) +
        "</span></span>";
      label.appendChild(input);
      label.appendChild(face);
      container.appendChild(label);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pickOption(arr, id) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return arr[i];
    }
    return null;
  }

  function labelForSize(id) {
    var o = pickOption(SIZE_OPTIONS, id);
    return o ? o.name : id;
  }

  function labelForConsistency(id) {
    var o = pickOption(CONSISTENCY_OPTIONS, id);
    return o ? o.name : id;
  }

  function emojiForSize(id) {
    var o = pickOption(SIZE_OPTIONS, id);
    return o ? o.emoji : "💩";
  }

  function setDefaultDateTime() {
    var d = $("field-date");
    var t = $("field-time");
    if (!d || !t) return;
    var now = new Date();
    d.value = toDateKey(now);
    t.value = pad2(now.getHours()) + ":" + pad2(now.getMinutes());
  }

  function openDialog(id) {
    var dlg = $(id);
    if (dlg && typeof dlg.showModal === "function") dlg.showModal();
  }

  function closeDialog(id) {
    var dlg = $(id);
    if (dlg && typeof dlg.close === "function") dlg.close();
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem(THEME_KEY, "dark");
      } catch (_) {}
    } else {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.setItem(THEME_KEY, "light");
      } catch (_) {}
    }
    var toggle = $("toggle-dark");
    if (toggle) toggle.checked = dark;
  }

  function initThemeToggle() {
    var toggle = $("toggle-dark");
    if (!toggle) return;
    toggle.checked = document.documentElement.getAttribute("data-theme") === "dark";
    toggle.addEventListener("change", function () {
      applyTheme(toggle.checked);
    });
  }

  function wireModalCloses() {
    document.querySelectorAll("[data-close-dialog]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeDialog(btn.getAttribute("data-close-dialog"));
      });
    });
  }

  function wireTabs() {
    var tabs = document.querySelectorAll(".tab[data-view]");
    var views = {
      log: $("view-log"),
      calendar: $("view-calendar"),
    };
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var v = tab.getAttribute("data-view");
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });
        Object.keys(views).forEach(function (key) {
          var el = views[key];
          if (!el) return;
          var show = key === v;
          el.classList.toggle("is-visible", show);
          el.hidden = !show;
        });
        if (v === "calendar") renderCalendar();
      });
    });
  }

  var calCursor = new Date();

  function renderCalendar() {
    var root = $("calendar-root");
    var label = $("cal-month-label");
    if (!root || !label) return;

    var y = calCursor.getFullYear();
    var m = calCursor.getMonth();
    label.textContent = calCursor.toLocaleString(undefined, { month: "long", year: "numeric" });

    root.innerHTML = "";
    DOW.forEach(function (d) {
      var h = document.createElement("div");
      h.className = "cal-dow";
      h.textContent = d;
      root.appendChild(h);
    });

    var first = new Date(y, m, 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var entries = loadEntries();
    var byDay = {};
    entries.forEach(function (e) {
      if (!byDay[e.date]) byDay[e.date] = [];
      byDay[e.date].push(e);
    });

    var today = new Date();
    var todayKey = toDateKey(today);

    for (var p = 0; p < startPad; p++) {
      var ph = document.createElement("div");
      ph.className = "cal-pad";
      ph.setAttribute("aria-hidden", "true");
      root.appendChild(ph);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var cellDate = new Date(y, m, day);
      var key = toDateKey(cellDate);
      var list = byDay[key] || [];
      var has = list.length > 0;
      var isToday = key === todayKey;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-cell";
      if (has) btn.classList.add("cal-cell--hit");
      if (isToday) btn.classList.add("cal-cell--today");
      btn.setAttribute("role", "gridcell");
      btn.setAttribute("aria-label", key + (has ? ", " + list.length + " logged" : ", no logs"));

      var icon = document.createElement("span");
      icon.className = "cal-cell-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = has ? "💩" : "·";
      var num = document.createElement("span");
      num.className = "cal-day-num";
      num.textContent = String(day);

      btn.appendChild(icon);
      btn.appendChild(num);
      btn.addEventListener("click", function (k, items) {
        return function () {
          openDayDialog(k, items);
        };
      }(key, list));

      root.appendChild(btn);
    }
  }

  function openDayDialog(dateKey, items) {
    var title = $("day-dialog-title");
    var body = $("day-dialog-body");
    if (!title || !body) return;

    var d = parseDateKey(dateKey);
    title.textContent = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!items || items.length === 0) {
      body.innerHTML = '<p class="day-detail-empty">Quiet day on the throne. Nothing logged.</p>';
    } else {
      var sorted = items.slice().sort(function (a, b) {
        return a.time.localeCompare(b.time);
      });
      body.innerHTML = sorted
        .map(function (e) {
          var note = e.notes
            ? '<p class="day-entry-meta"><strong>Notes:</strong> ' + escapeHtml(e.notes) + "</p>"
            : "";
          return (
            '<article class="day-entry"><div class="day-entry-time">' +
            escapeHtml(e.time) +
            '</div><p class="day-entry-meta"><strong>Size:</strong> ' +
            escapeHtml(labelForSize(e.size)) +
            " " +
            escapeHtml(emojiForSize(e.size)) +
            '</p><p class="day-entry-meta"><strong>Consistency:</strong> ' +
            escapeHtml(labelForConsistency(e.consistency)) +
            "</p>" +
            note +
            "</article>"
          );
        })
        .join("");
    }

    openDialog("dialog-day");
  }

  function wireCalendarNav() {
    var prev = $("cal-prev");
    var next = $("cal-next");
    if (prev)
      prev.addEventListener("click", function () {
        calCursor.setMonth(calCursor.getMonth() - 1);
        renderCalendar();
      });
    if (next)
      next.addEventListener("click", function () {
        calCursor.setMonth(calCursor.getMonth() + 1);
        renderCalendar();
      });
  }

  function wireForm() {
    var form = $("form-log");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var fd = new FormData(form);
      var date = fd.get("date");
      var time = fd.get("time");
      var size = fd.get("size");
      var consistency = fd.get("consistency");
      var notes = (fd.get("notes") || "").toString().trim();
      if (!date || !time || !size || !consistency) {
        showToast("Pick a date, time, size, and consistency — we’re thorough here.");
        return;
      }
      var entry = {
        id: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 9),
        date: date,
        time: time,
        size: size,
        consistency: consistency,
        notes: notes,
      };
      var all = loadEntries();
      all.push(entry);
      saveEntries(all);
      form.reset();
      setDefaultDateTime();
      renderOptionChips($("size-options"), "size", SIZE_OPTIONS);
      renderOptionChips($("consistency-options"), "consistency", CONSISTENCY_OPTIONS);
      showToast("Logged! Your calendar just got more… complete.");
    });
  }

  function wireFakePhoto() {
    var btn = $("btn-fake-photo");
    var msg = $("sicko-message");
    if (!btn || !msg) return;
    btn.addEventListener("click", function () {
      msg.textContent = randomChoice(SICKO_MESSAGES);
      openDialog("dialog-sicko");
    });
  }

  function wireSettings() {
    var b = $("btn-settings");
    if (b) b.addEventListener("click", function () {
      openDialog("dialog-settings");
    });
  }

  /**
   * iOS Safari often ignores window.location = mailto:… from script.
   * A same-tick programmatic <a click> matches a real link tap and opens Mail reliably.
   */
  function openMailto(href) {
    var a = document.createElement("a");
    a.href = href;
    a.setAttribute("rel", "noopener noreferrer");
    /* Must stay in the DOM; display:none breaks some mobile WebKits */
    a.style.cssText =
      "position:fixed;clip:rect(0,0,0,0);width:1px;height:1px;margin:-1px;overflow:hidden;";
    document.body.appendChild(a);
    try {
      a.click();
    } finally {
      setTimeout(function () {
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 0);
    }
  }

  function wireFeedback() {
    var btn = $("btn-feedback");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var subject = randomChoice(FEEDBACK_SUBJECTS);
      var body = "Hi Rach — Poop Tracker feedback:\n\n";
      var href =
        "mailto:" +
        FEEDBACK_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      openMailto(href);
    });
  }

  function init() {
    renderOptionChips($("size-options"), "size", SIZE_OPTIONS);
    renderOptionChips($("consistency-options"), "consistency", CONSISTENCY_OPTIONS);
    setDefaultDateTime();
    initThemeToggle();
    wireModalCloses();
    wireTabs();
    wireCalendarNav();
    wireForm();
    wireFakePhoto();
    wireSettings();
    wireFeedback();
    renderCalendar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
