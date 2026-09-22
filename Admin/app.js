document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.split("/").pop() || "pending-new.html";
  document.querySelectorAll(".nav a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // Load stats for sidebar counts
  loadSidebarCounts();
  setInterval(loadSidebarCounts, 1000);
});

async function loadSidebarCounts() {
  try {
    const response = await fetch(`${CONFIG.API_BASE}/admin/stats`);
    const result = await response.json();

    if (result.success && result.data) {
      const pendingCount = document.getElementById('pendingCount');
      const historyCount = document.getElementById('historyCount');

      if (pendingCount) {
        pendingCount.textContent = result.data.pending || 0;
      }
      if (historyCount) {
        historyCount.textContent = (result.data.approved || 0) + (result.data.rejected || 0);
      }
    }
  } catch (err) {
    console.error('Error loading sidebar counts:', err);
  }
}