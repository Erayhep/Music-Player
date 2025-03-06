document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); // Sayfanın aşağı kaymasını engelle
        play.click(); // Play butonuna tıklanmış gibi işlem yap
    }
});

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyM") {
        if (sesDurumu === "sesli") {
            audio.muted = true;
            sesDurumu = "sessiz";
            volume.classList = "fa-solid fa-volume-xmark";
            volumeBar.value = 0;
            volumeBar.style.background = `linear-gradient(to right, purple 0%, #bbb 0%)`;
        } else {
            audio.muted = false;
            sesDurumu = "sesli";
            volume.classList = "fa-solid fa-volume-high";
            volumeBar.value = 100;
            volumeBar.style.background = `linear-gradient(to right, purple 100%, #bbb 100%)`;
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleMusicListButton = document.getElementById("toggle-music-list");
    const closeMusicListButton = document.getElementById("close-music-list");
    const musicListPanel = document.getElementById("music-list-panel");
    const container = document.querySelector(".container");
    let isOpen = false; // Panelin açık mı kapalı mı olduğunu takip etmek için

    // Panelin durumunu değiştiren fonksiyon
    function toggleMusicListPanel() {
        isOpen = !isOpen; // Durumu değiştir

        if (isOpen) {
            musicListPanel.classList.add('open'); // Paneli aç
            container.style.transform = "translate(-50%, -50%) translateX(-50px)"; // Sola kaydır
        } else {
            musicListPanel.classList.remove('open'); // Paneli kapat
            container.style.transform = "translate(-50%, -50%)"; // Eski yerine al
        }
    }

    // Çalma listesini açıp kapatan buton
    toggleMusicListButton.addEventListener("click", toggleMusicListPanel);

    // Çarpı butonuna tıklandığında çalma listesini kapat
    closeMusicListButton.addEventListener("click", function () {
        musicListPanel.classList.remove('open'); // Paneli kapat
        container.style.transform = "translate(-50%, -50%)"; // Eski yerine al
        isOpen = false; // Durumu güncelle
    });

    // Tab tuşuna basıldığında çalma listesini açıp kapat
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') { // Tab tuşuna basıldığında
            event.preventDefault(); // Varsayılan tab davranışını engelle
            toggleMusicListPanel(); // Panelin durumunu değiştir
        }
    });
});