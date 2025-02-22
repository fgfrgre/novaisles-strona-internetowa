function copyIP() {
  navigator.clipboard.writeText("novaisles.pl");
  const e = document.querySelector(".copy-notification");
  e.classList.add("show");
  setTimeout(() => { e.classList.remove("show") }, 3000);
}

async function fetchServerStatus() {
  try {
    const e = await fetch("https://api.mcsrvstat.us/3/novaisles.pl"),
          t = await e.json(),
          o = document.querySelector(".status-indicator"),
          s = document.querySelector(".players"),
          n = document.querySelector(".motd"),
          r = document.querySelector(".version"),
          a = document.querySelector(".server-icon");
    if (t.online) {
      o.classList.add("online");
      o.classList.remove("offline");
      s.innerHTML = `Graczy: ${t.players.online}/${t.players.max}`;
      n.innerHTML = t.motd.clean.join("<br>");
      r.textContent = `Wersja: ${t.version}`;
      a.style.display = "block";
    } else {
      o.classList.add("offline");
      o.classList.remove("online");
      s.textContent = "Serwer offline";
      n.textContent = "";
      r.textContent = "";
      a.style.display = "none";
    }
  } catch (e) {
    console.error("Błąd pobierania statusu:", e);
    document.querySelector(".players").textContent = "Błąd pobierania statusu";
    document.querySelector(".server-icon").style.display = "none";
  }
}

fetchServerStatus();
setInterval(fetchServerStatus, 60000);

// Funkcja do obsługi zakładek w sekcji administracji
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("defaultTab").click();
});
