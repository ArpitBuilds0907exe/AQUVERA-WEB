/* Aquvera – site behaviour */
(function(){
  const C = window.AQUVERA;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  /* ---------- Fill contact details from config.js ---------- */
  $$("[data-phone-text]").forEach(e => e.textContent = C.phoneDisplay);
  $$("[data-tel]").forEach(e => e.href = "tel:" + C.phoneDial);
  $$("[data-wa]").forEach(e => e.href = "https://wa.me/" + C.whatsapp);
  $$("[data-mail-text]").forEach(e => e.textContent = C.email);
  $$("[data-mail]").forEach(e => e.href = "mailto:" + C.email);
  $$("[data-software]").forEach(e => e.href = C.softwareUrl);
  $$("[data-linkedin]").forEach(e => e.href = C.linkedin);
  $$("[data-instagram]").forEach(e => e.href = C.instagram);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("#menu a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Enquiry dialog ---------- */
  const dlg = $("#enquiry"), dlgTitle = $("#dlgTitle");
  function openEnquiry(plan){
    dlgTitle.textContent = plan ? "Enquire about the " + plan + " plan" : "Contact us to enquire";
    if (typeof dlg.showModal === "function") dlg.showModal();
    else window.location.href = "tel:" + C.phoneDial;   // very old browsers: go straight to the call
  }
  $$("[data-enquire]").forEach(b => b.addEventListener("click", () => openEnquiry(b.dataset.enquire)));
  $("#dlgClose").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  /* ---------- Contact form -> opens the visitor's email app ---------- */
  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = "Aquvera enquiry: " + f.get("interest");
    const body = "Name: " + f.get("name") + "\nFirm / company: " + f.get("firm") +
      "\nPhone: " + f.get("phone") + "\n\n" + f.get("message");
    window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });

  /* ---------- Sample reconciliation demo ---------- */
  const data = [
    {a:"HDFC 04 Mar: Rs 1,86,400 credit", b:"Ledger: two invoices, Rs 92,400 + Rs 94,000", c:87, w:"Split payment. Sum matches, reference does not.", t:"Bank stmt row 214 to Ledger vouchers 1187, 1191"},
    {a:"ICICI 11 Mar: Rs 48,250 debit", b:"No ledger entry found", c:64, w:"Unmatched. Similar to vendor payments in Feb.", t:"Bank stmt row 389 | nearest: Ledger voucher 1302 (Rs 48,520)"},
    {a:"TDS 26Q: Rs 21,000 deducted", b:"Filed return shows Rs 12,000", c:92, w:"Mismatch of Rs 9,000 before the filing deadline.", t:"TDS ledger row 41 to Filed 26Q, challan 0217"}
  ];
  const box = $("#exs"), fin = $("#fin"), msg = $("#msg");
  let done = 0;
  data.forEach((d, i) => {
    const e = document.createElement("div");
    e.className = "ex";
    e.innerHTML = `<div class="row"><div><strong>${d.a}</strong><br>${d.b}</div><span class="conf">Confidence ${d.c}%</span></div><div class="why">${d.w}</div><div class="trace" id="t${i}">Source: ${d.t}</div><div class="acts"><button class="p" data-a="Approved">Approve</button><button data-a="Edited">Edit</button><button data-a="Overridden">Override</button><button data-a="trace" aria-expanded="false">Show source</button></div>`;
    e.querySelector(".acts").addEventListener("click", ev => {
      const b = ev.target.closest("button"); if (!b) return;
      const a = b.dataset.a;
      if (a === "trace") {
        const t = document.getElementById("t" + i);
        const on = t.classList.toggle("on");
        b.setAttribute("aria-expanded", on);
        b.textContent = on ? "Hide source" : "Show source";
        return;
      }
      const first = !e.classList.contains("done");
      e.classList.add("done");
      e.classList.toggle("over", a === "Overridden");
      e.querySelector(".acts").innerHTML = `<span class="verdict">${a} by reviewer. Logged for the learning loop.</span>`;
      if (first) { done++; if (done === data.length) { fin.disabled = false; msg.textContent = "All exceptions reviewed."; } }
    });
    box.appendChild(e);
  });
  fin.addEventListener("click", () => {
    fin.disabled = true;
    fin.textContent = "Finalized with human sign-off";
    msg.textContent = "Nothing is final until a professional signs off, and that has happened.";
  });

  /* ---------- Savings calculator ---------- */
  const f = $("#fte"), s = $("#sal");
  const r1 = n => Math.round(n * 10) / 10;
  function calc(){
    const v = f.value * s.value;
    $("#fteo").textContent = f.value;
    $("#salo").textContent = s.value;
    $("#sv").textContent = "Rs " + r1(v) + " lakh";
    $("#fee").textContent = "Rs " + r1(v * .25) + " to " + r1(v * .4) + " lakh";
    $("#net").textContent = "Rs " + r1(v * .6) + " to " + r1(v * .75) + " lakh";
  }
  f.addEventListener("input", calc); s.addEventListener("input", calc); calc();
})();
