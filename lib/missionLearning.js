// ═══════════════════════════════════════════════════════════════
//  MISSION LEARNING CAROUSEL DATA  —  T1 through T7
//  Language: Simple & fun, like explaining to a 5-year-old!
//  Each mission: 3-4 slides  |  Bilingual EN + ID
// ═══════════════════════════════════════════════════════════════

export const MISSION_LEARNING = {

  // ─────────────────────────────────────────────────────────────
  //  TIER 1
  // ─────────────────────────────────────────────────────────────

  // T1-001: Power Cable Loose
  't1_001': {
    slides: [
      {
        emoji: '🔌',
        title: { en: 'What Is a Power Cable?', id: 'Apa Itu Kabel Power?' },
        body: {
          en: "A power cable is like a straw for electricity ⚡. The computer drinks electricity through this straw to wake up and work. No straw = no power = no turning on!",
          id: 'Kabel power itu seperti sedotan untuk listrik ⚡. Komputer meminum listrik melalui sedotan ini agar bisa menyala. Tanpa sedotan = tanpa listrik = tidak bisa nyala!',
        },
        tip: { en: '💡 Always check the power cable FIRST!', id: '💡 Selalu periksa kabel power DULU!' },
        image: null,
      },
      {
        emoji: '😵',
        title: { en: 'Why Won\'t It Turn On?', id: 'Kenapa Tidak Mau Nyala?' },
        body: {
          en: "If the power cable is loose — like a straw that slipped out of a juice box 🧃 — electricity can't get in. The PC just sits there silent and dark. It's not broken, just thirsty!",
          id: 'Kalau kabel longgar — seperti sedotan yang meleset dari kotak jus 🧃 — listrik tidak bisa masuk. PC hanya diam dan gelap. Tidak rusak, cuma kehausan!',
        },
        tip: { en: '💡 Loose cable is the #1 cause of "PC won\'t turn on"!', id: '💡 Kabel longgar adalah penyebab #1 "PC tidak mau nyala"!' },
        image: null,
      },
      {
        emoji: '🔎',
        title: { en: 'How to Check It', id: 'Cara Memeriksanya' },
        body: {
          en: "Look at the back of the PC. Find the cable going in. Push it gently until you feel a small 'click'. Then check the wall socket too — both ends must be plugged in tightly! 🏠",
          id: 'Lihat bagian belakang PC. Temukan kabel yang masuk. Dorong perlahan sampai terasa \'klik\' kecil. Lalu cek colokan dinding juga — kedua ujung harus terpasang kuat! 🏠',
        },
        tip: { en: '💡 Check BOTH ends: PC side AND the wall!', id: '💡 Periksa KEDUA ujung: sisi PC DAN dinding!' },
        image: null,
      },
      {
        emoji: '✅',
        title: { en: 'Your Mission', id: 'Misi Kamu' },
        body: {
          en: "Find the loose power connection, secure it properly, and bring the PC back to life! Think of yourself as a doctor giving the computer its medicine — a proper power connection! 🩺",
          id: 'Temukan koneksi power yang longgar, pasang dengan benar, dan hidupkan kembali PC! Bayangkan kamu dokter yang memberi komputer obatnya — koneksi power yang sempurna! 🩺',
        },
        tip: { en: '🚀 Ready? Let\'s fix it!', id: '🚀 Siap? Ayo perbaiki!' },
        image: null,
      },
    ],
  },

  // T1-002: Mouse Not Moving
  't1_002': {
    slides: [
      {
        emoji: '🖱️',
        title: { en: 'How Does a Mouse Work?', id: 'Bagaimana Mouse Bekerja?' },
        body: {
          en: "A computer mouse is like your finger on a touchscreen — it tells the computer 'go here, click this!' It connects via a cable or Bluetooth signal, like a walkie-talkie 📻.",
          id: 'Mouse komputer itu seperti jarimu di layar sentuh — ia memberi tahu komputer \'ke sini, klik ini!\' Terhubung lewat kabel atau sinyal Bluetooth, seperti walkie-talkie 📻.',
        },
        tip: { en: '💡 Wired mouse = more reliable. Wireless = more freedom!', id: '💡 Mouse kabel = lebih andal. Nirkabel = lebih bebas!' },
        image: null,
      },
      {
        emoji: '😤',
        title: { en: 'Why Won\'t the Mouse Move?', id: 'Kenapa Mouse Tidak Bergerak?' },
        body: {
          en: "Three common culprits: 1) USB not plugged in properly 🔌, 2) Mouse pad too dirty (the sensor can't see!) 👀, or 3) The mouse driver is confused. Like a car without fuel — it can't move!",
          id: 'Tiga penyebab umum: 1) USB tidak terpasang dengan benar 🔌, 2) Mouse pad terlalu kotor (sensor tidak bisa melihat!) 👀, atau 3) Driver mouse bingung. Seperti mobil tanpa bensin — tidak bisa bergerak!',
        },
        tip: { en: '💡 Try a different USB port first — it\'s the quickest test!', id: '💡 Coba port USB yang berbeda dulu — itu tes tercepat!' },
        image: null,
      },
      {
        emoji: '🛠️',
        title: { en: 'Steps to Fix It', id: 'Langkah Memperbaikinya' },
        body: {
          en: "Step 1: Unplug and replug the USB. Step 2: Try a different port. Step 3: Clean the mouse pad. Step 4: Restart the computer. Step 5: Update or reinstall the driver. Start simple, work up!",
          id: 'Langkah 1: Cabut dan pasang ulang USB. Langkah 2: Coba port lain. Langkah 3: Bersihkan mouse pad. Langkah 4: Restart komputer. Langkah 5: Update atau instal ulang driver. Mulai dari yang mudah!',
        },
        tip: { en: '🚀 Most mouse problems are fixed in 30 seconds!', id: '🚀 Kebanyakan masalah mouse selesai dalam 30 detik!' },
        image: null,
      },
    ],
  },

  // T1-003: Monitor No Signal
  't1_003': {
    slides: [
      {
        emoji: '🖥️',
        title: { en: 'Monitor vs Computer — They\'re Different!', id: 'Monitor vs Komputer — Keduanya Berbeda!' },
        body: {
          en: "The monitor is just the SCREEN — like a TV 📺. The actual computer (CPU box) is separate. They talk to each other through a video cable. No cable = no picture, even if everything is on!",
          id: 'Monitor hanyalah LAYARNYA saja — seperti TV 📺. Komputer sebenarnya (kotak CPU) terpisah. Keduanya berkomunikasi melalui kabel video. Tanpa kabel = tanpa gambar, meski semuanya menyala!',
        },
        tip: { en: '💡 "No Signal" = the monitor is ON but can\'t see the computer!', id: '💡 "No Signal" = monitor MENYALA tapi tidak bisa melihat komputer!' },
        image: null,
      },
      {
        emoji: '📺',
        title: { en: 'Why "No Signal"?', id: 'Kenapa "No Signal"?' },
        body: {
          en: "Imagine trying to watch TV but the HDMI cable isn't plugged in 😅. The TV turns on fine, but it sees nothing! Same with monitors. The cable between PC and monitor might be loose, wrong port, or damaged.",
          id: 'Bayangkan mencoba menonton TV tapi kabel HDMI tidak terpasang 😅. TV menyala dengan baik, tapi tidak melihat apa-apa! Sama dengan monitor. Kabel antara PC dan monitor mungkin longgar, port salah, atau rusak.',
        },
        tip: { en: '💡 Common ports: HDMI (most common), VGA (old), DisplayPort (pro)!', id: '💡 Port umum: HDMI (paling umum), VGA (lama), DisplayPort (pro)!' },
        image: null,
      },
      {
        emoji: '🔧',
        title: { en: 'How to Fix It', id: 'Cara Memperbaikinya' },
        body: {
          en: "Check: Is the cable plugged into the monitor AND the PC? Try pressing the monitor's input button to select the right port. If using adapter, check that too. If all else fails — try a different cable!",
          id: 'Cek: Apakah kabel terpasang ke monitor DAN PC? Coba tekan tombol input monitor untuk memilih port yang benar. Jika menggunakan adaptor, periksa juga. Jika semuanya gagal — coba kabel yang berbeda!',
        },
        tip: { en: '🚀 Wiggle the cable gently — sometimes that\'s all it takes!', id: '🚀 Goyang kabelnya perlahan — terkadang itu saja sudah cukup!' },
        image: null,
      },
    ],
  },

  // T1-004: Restart Frozen PC
  't1_004': {
    slides: [
      {
        emoji: '🧊',
        title: { en: 'Why Do Computers Freeze?', id: 'Kenapa Komputer Bisa Membeku?' },
        body: {
          en: "When a computer freezes, it's like your brain being overloaded 🤯. Too many programs running at once, a program crashing, or even a virus can cause the PC to freeze and stop responding to anything!",
          id: 'Ketika komputer membeku, itu seperti otakmu yang kelebihan beban 🤯. Terlalu banyak program berjalan sekaligus, program yang crash, atau bahkan virus bisa membuat PC membeku dan berhenti merespons!',
        },
        tip: { en: '💡 A frozen PC is NOT the same as a crashed PC — patience first!', id: '💡 PC membeku TIDAK sama dengan PC crash — sabar dulu!' },
        image: null,
      },
      {
        emoji: '⏳',
        title: { en: 'Wait First, Then Act', id: 'Tunggu Dulu, Baru Bertindak' },
        body: {
          en: "First, wait 30-60 seconds 🕐. Sometimes computers are just 'thinking very hard' and will recover. If still frozen, try Ctrl+Alt+Delete to open Task Manager and close the stuck program.",
          id: 'Pertama, tunggu 30-60 detik 🕐. Kadang komputer hanya \'berpikir keras\' dan akan pulih sendiri. Jika masih membeku, coba Ctrl+Alt+Delete untuk membuka Task Manager dan tutup program yang macet.',
        },
        tip: { en: '💡 Ctrl+Alt+Delete = the emergency escape hatch!', id: '💡 Ctrl+Alt+Delete = pintu darurat komputer!' },
        image: null,
      },
      {
        emoji: '🔄',
        title: { en: 'The Restart Solution', id: 'Solusi Restart' },
        body: {
          en: "If nothing works, a FORCED restart is needed — hold the power button for 5 seconds until it turns off. This is like 'emergency stopping' a stuck merry-go-round 🎠. Then turn it back on and check!",
          id: 'Jika tidak ada yang berhasil, restart PAKSA diperlukan — tahan tombol power selama 5 detik sampai mati. Ini seperti \'menghentikan paksa\' komedi putar yang macet 🎠. Lalu nyalakan kembali dan periksa!',
        },
        tip: { en: '🚀 Restart solves 70% of computer problems — it\'s the magic wand!', id: '🚀 Restart menyelesaikan 70% masalah komputer — ini tongkat ajaibnya!' },
        image: null,
      },
    ],
  },

  // T1-005: Home WiFi Setup
  't1_005': {
    slides: [
      {
        emoji: '📶',
        title: { en: 'What Is WiFi?', id: 'Apa Itu WiFi?' },
        body: {
          en: "WiFi is invisible radio waves carrying internet data through the air 🌊. A router sends these waves like a lighthouse 🏮 — any device nearby can catch the signal and connect to the internet!",
          id: 'WiFi adalah gelombang radio tak kasat mata yang membawa data internet melalui udara 🌊. Router mengirimkan gelombang ini seperti mercusuar 🏮 — perangkat terdekat bisa menangkap sinyal dan terhubung ke internet!',
        },
        tip: { en: '💡 Walls and distance weaken the WiFi signal!', id: '💡 Dinding dan jarak memperlemah sinyal WiFi!' },
        image: null,
      },
      {
        emoji: '🏠',
        title: { en: 'Setting Up WiFi at Home', id: 'Memasang WiFi di Rumah' },
        body: {
          en: "Setting up home WiFi needs: 1) A router (the signal sender) 2) Internet from ISP through a cable. Connect the cable to WAN port 🟡 of the router, power it on, and wait 2 minutes. Magic! ✨",
          id: 'Memasang WiFi rumah butuh: 1) Router (pengirim sinyal) 2) Internet dari ISP melalui kabel. Hubungkan kabel ke port WAN 🟡 pada router, nyalakan, dan tunggu 2 menit. Ajaib! ✨',
        },
        tip: { en: '💡 WAN port = the internet incoming port (usually yellow or labeled)!', id: '💡 Port WAN = port masuk internet (biasanya kuning atau berlabel)!' },
        image: null,
      },
      {
        emoji: '🔐',
        title: { en: 'Securing Your WiFi', id: 'Mengamankan WiFi-mu' },
        body: {
          en: "A WiFi without a password is like leaving your front door wide open 🚪. Anyone nearby can use your internet! Always set a strong password — mix letters, numbers and symbols. Like 'HomeWiFi@2024!'",
          id: 'WiFi tanpa password seperti membiarkan pintu depan terbuka lebar 🚪. Siapa saja di sekitar bisa menggunakan internetmu! Selalu buat password kuat — gabungkan huruf, angka, dan simbol. Seperti \'RumahWiFi@2024!\'',
        },
        tip: { en: '🚀 Use WPA3 or WPA2 encryption — the strongest security!', id: '🚀 Gunakan enkripsi WPA3 atau WPA2 — keamanan terkuat!' },
        image: null,
      },
    ],
  },

  // T1-006: Connect Bluetooth Headset
  't1_006': {
    slides: [
      {
        emoji: '🎧',
        title: { en: 'What Is Bluetooth?', id: 'Apa Itu Bluetooth?' },
        body: {
          en: "Bluetooth is like a short-range invisible string 🧵 connecting two devices. Unlike WiFi (long range for internet), Bluetooth is short range — perfect for headsets, speakers, and keyboards nearby!",
          id: 'Bluetooth itu seperti tali tak kasat mata jarak pendek 🧵 yang menghubungkan dua perangkat. Tidak seperti WiFi (jarak jauh untuk internet), Bluetooth jarak pendek — sempurna untuk headset, speaker, dan keyboard terdekat!',
        },
        tip: { en: '💡 Bluetooth range: about 10 meters max. WiFi: up to 50+ meters!', id: '💡 Jangkauan Bluetooth: sekitar 10 meter. WiFi: hingga 50+ meter!' },
        image: null,
      },
      {
        emoji: '🤝',
        title: { en: 'How "Pairing" Works', id: 'Cara Kerja "Pairing"' },
        body: {
          en: "Pairing is like introducing two people for the first time 🤝. The headset says 'Hi, I'm looking for a friend!' The PC says 'I see you, let's connect!' They shake hands and remember each other forever!",
          id: 'Pairing itu seperti memperkenalkan dua orang untuk pertama kali 🤝. Headset berkata \'Hai, saya mencari teman!\' PC berkata \'Saya melihatmu, ayo terhubung!\' Mereka berjabat tangan dan mengingat satu sama lain selamanya!',
        },
        tip: { en: '💡 Always put headset in PAIRING MODE first (usually hold power button)!', id: '💡 Selalu nyalakan MODE PAIRING headset dulu (biasanya tahan tombol power)!' },
        image: null,
      },
      {
        emoji: '⚙️',
        title: { en: 'Step by Step', id: 'Langkah demi Langkah' },
        body: {
          en: "1) Turn on Bluetooth on PC (Settings → Bluetooth). 2) Put headset in pairing mode. 3) PC will 'see' the headset. 4) Click it and confirm. 5) Done — they're now best friends! 🎉",
          id: '1) Aktifkan Bluetooth di PC (Pengaturan → Bluetooth). 2) Nyalakan mode pairing headset. 3) PC akan \'melihat\' headset. 4) Klik dan konfirmasi. 5) Selesai — mereka kini sahabat! 🎉',
        },
        tip: { en: '🚀 If it fails, turn Bluetooth OFF and ON again on the PC!', id: '🚀 Jika gagal, matikan dan nyalakan Bluetooth di PC!' },
        image: null,
      },
    ],
  },

  // T1-007: USB Drive Not Detected
  't1_007': {
    slides: [
      {
        emoji: '💾',
        title: { en: 'What Is a USB Drive?', id: 'Apa Itu USB Drive?' },
        body: {
          en: "A USB drive (flash drive) is like a tiny portable suitcase for files 🧳. You can carry photos, documents, or games and plug it into any computer. Super handy — but sometimes it needs a little help!",
          id: 'USB drive (flash drive) itu seperti koper portabel kecil untuk file 🧳. Kamu bisa membawa foto, dokumen, atau game dan mencolokkannya ke komputer mana pun. Sangat praktis — tapi kadang butuh sedikit bantuan!',
        },
        tip: { en: '💡 Always safely eject USB before removing — never just yank it out!', id: '💡 Selalu keluarkan USB dengan aman sebelum dicabut — jangan langsung dicabut!' },
        image: null,
      },
      {
        emoji: '🤔',
        title: { en: 'Why Won\'t It Show Up?', id: 'Kenapa Tidak Muncul?' },
        body: {
          en: "3 common reasons: 1) Dirty USB connector (dust blocks contact) 🌫️, 2) The USB port is broken, 3) The USB drive's file system is damaged. Like a dirty plug in a socket — no contact, no power!",
          id: '3 penyebab umum: 1) Konektor USB kotor (debu menghalangi kontak) 🌫️, 2) Port USB rusak, 3) Sistem file USB drive rusak. Seperti colokan kotor — tidak ada kontak, tidak ada daya!',
        },
        tip: { en: '💡 Blow gently into the USB port to remove dust — old IT trick!', id: '💡 Tiup perlahan ke port USB untuk menghilangkan debu — trik IT lama!' },
        image: null,
      },
      {
        emoji: '🔧',
        title: { en: 'How to Fix It', id: 'Cara Memperbaikinya' },
        body: {
          en: "Try: 1) Different USB port. 2) Different computer (to test the USB). 3) Right-click 'My Computer' → Manage → Disk Management (see if it shows there). 4) Run CHKDSK command to fix drive errors.",
          id: 'Coba: 1) Port USB yang berbeda. 2) Komputer yang berbeda (untuk menguji USB). 3) Klik kanan \'Komputer Saya\' → Kelola → Manajemen Disk (lihat apakah muncul di sana). 4) Jalankan perintah CHKDSK untuk memperbaiki error drive.',
        },
        tip: { en: '🚀 Disk Management is your secret weapon — it sees hidden drives!', id: '🚀 Manajemen Disk adalah senjata rahasiamu — bisa melihat drive tersembunyi!' },
        image: null,
      },
    ],
  },

  // T1-008: Reconnect HDMI Cable
  't1_008': {
    slides: [
      {
        emoji: '🔗',
        title: { en: 'What Does HDMI Do?', id: 'Apa Fungsi HDMI?' },
        body: {
          en: "HDMI is a special cable that carries BOTH video AND audio from your PC to a screen or TV 📺. Think of it as a highway with two lanes — one for picture, one for sound — all in one cable!",
          id: 'HDMI adalah kabel khusus yang membawa BAIK video MAUPUN audio dari PC ke layar atau TV 📺. Bayangkan sebagai jalan raya dengan dua jalur — satu untuk gambar, satu untuk suara — semua dalam satu kabel!',
        },
        tip: { en: '💡 HDMI supports up to 4K quality — crystal clear picture!', id: '💡 HDMI mendukung hingga kualitas 4K — gambar sangat jernih!' },
        image: null,
      },
      {
        emoji: '😵',
        title: { en: 'When HDMI Goes Wrong', id: 'Ketika HDMI Bermasalah' },
        body: {
          en: "If HDMI is loose or damaged — the screen shows black, flickering, or 'no signal'. Like a phone charger that only works if you hold it at the right angle 😂 — frustrating! Time to fix it properly.",
          id: 'Jika HDMI longgar atau rusak — layar menampilkan hitam, berkedip, atau \'no signal\'. Seperti charger HP yang hanya berfungsi jika dipegang di sudut yang tepat 😂 — menyebalkan! Saatnya memperbaikinya dengan benar.',
        },
        tip: { en: '💡 Flickering screen = loose HDMI. Black screen = completely disconnected!', id: '💡 Layar berkedip = HDMI longgar. Layar hitam = benar-benar terputus!' },
        image: null,
      },
      {
        emoji: '✅',
        title: { en: 'The Fix', id: 'Cara Memperbaikinya' },
        body: {
          en: "Firmly push the HDMI cable into BOTH the PC port AND the monitor port until you hear or feel it click. If it's loose often — the port is worn out and may need a new cable or HDMI to DisplayPort adapter.",
          id: 'Dorong kabel HDMI dengan kuat ke port PC DAN port monitor sampai terdengar atau terasa kliknya. Jika sering longgar — portnya sudah aus dan mungkin perlu kabel baru atau adaptor HDMI ke DisplayPort.',
        },
        tip: { en: '🚀 Secure the cable with a zip tie to prevent future looseness!', id: '🚀 Kencangkan kabel dengan zip tie untuk mencegah kelonggaran di masa depan!' },
        image: null,
      },
    ],
  },

  // T1-009: Printer Not Printing
  't1_009': {
    slides: [
      {
        emoji: '🖨️',
        title: { en: 'How Does a Printer Work?', id: 'Bagaimana Printer Bekerja?' },
        body: {
          en: "A printer is like a tiny robot artist 🤖🎨. When you send a document, the computer tells the printer what to draw. The printer sprays tiny dots of ink (or uses heat for laser) to make the picture on paper!",
          id: 'Printer itu seperti robot seniman kecil 🤖🎨. Saat kamu mengirim dokumen, komputer memberi tahu printer apa yang harus digambar. Printer menyemprotkan titik-titik tinta kecil (atau menggunakan panas untuk laser) untuk membuat gambar di atas kertas!',
        },
        tip: { en: '💡 Inkjet = ink spray. Laser = heat powder. Both make text and images!', id: '💡 Inkjet = semprotan tinta. Laser = bubuk panas. Keduanya membuat teks dan gambar!' },
        image: null,
      },
      {
        emoji: '😤',
        title: { en: 'Why Won\'t It Print?', id: 'Kenapa Tidak Mau Print?' },
        body: {
          en: "Top reasons: 1) 🖨️ Not connected (USB or WiFi). 2) 📄 Paper jam (paper stuck inside). 3) 🎨 Ink cartridge empty. 4) 📋 Print queue jammed (old jobs blocking new ones). Like a traffic jam for documents!",
          id: 'Alasan utama: 1) 🖨️ Tidak terhubung (USB atau WiFi). 2) 📄 Kertas macet (kertas tersangkut di dalam). 3) 🎨 Kartrid tinta kosong. 4) 📋 Antrian cetak macet (pekerjaan lama memblokir yang baru). Seperti kemacetan lalu lintas untuk dokumen!',
        },
        tip: { en: '💡 Clear the print queue first — it fixes 50% of print problems!', id: '💡 Bersihkan antrian cetak dulu — itu menyelesaikan 50% masalah cetak!' },
        image: null,
      },
      {
        emoji: '🛠️',
        title: { en: 'Fix It Step by Step', id: 'Perbaiki Langkah demi Langkah' },
        body: {
          en: "1) Check printer is ON and connected. 2) Clear paper jams (open the cover carefully). 3) Check ink levels. 4) Clear print queue: Control Panel → Printers → right-click → Cancel All. 5) Restart printer.",
          id: '1) Periksa printer ON dan terhubung. 2) Bersihkan kemacetan kertas (buka penutup dengan hati-hati). 3) Periksa level tinta. 4) Bersihkan antrian cetak: Panel Kontrol → Printer → klik kanan → Batalkan Semua. 5) Restart printer.',
        },
        tip: { en: '🚀 Print a test page first to confirm everything works!', id: '🚀 Cetak halaman uji dulu untuk memastikan semuanya berfungsi!' },
        image: null,
      },
    ],
  },

  // T1-010: WiFi Password Changed
  't1_010': {
    slides: [
      {
        emoji: '🔑',
        title: { en: 'WiFi Passwords — Why They Matter', id: 'Password WiFi — Kenapa Penting' },
        body: {
          en: "Your WiFi password is like the key to your house 🏠. Change the key = everyone who had the old key gets locked out. That's why your phone and laptop suddenly can't connect when the router password changes!",
          id: 'Password WiFi-mu seperti kunci rumahmu 🏠. Ganti kunci = semua yang punya kunci lama terkunci di luar. Itulah kenapa HP dan laptop kamu tiba-tiba tidak bisa terhubung ketika password router berubah!',
        },
        tip: { en: '💡 Every device needs the new password after a change!', id: '💡 Setiap perangkat butuh password baru setelah perubahan!' },
        image: null,
      },
      {
        emoji: '📱',
        title: { en: 'How to Reconnect', id: 'Cara Terhubung Kembali' },
        body: {
          en: "On phone: Settings → WiFi → find your network → tap 'Forget' → reconnect with new password. On PC: click WiFi icon → your network → 'Connect' → type the new password. Simple as making a new friend! 🤝",
          id: 'Di HP: Pengaturan → WiFi → temukan jaringanmu → ketuk \'Lupakan\' → hubungkan kembali dengan password baru. Di PC: klik ikon WiFi → jaringanmu → \'Hubungkan\' → ketik password baru. Semudah membuat teman baru! 🤝',
        },
        tip: { en: '💡 Can\'t find the new password? Check the router sticker or ask the owner!', id: '💡 Tidak bisa menemukan password baru? Periksa stiker router atau tanya pemiliknya!' },
        image: null,
      },
      {
        emoji: '🛡️',
        title: { en: 'Good Password Habits', id: 'Kebiasaan Password yang Baik' },
        body: {
          en: "A strong WiFi password: at least 12 characters long, mix UPPERCASE + lowercase + numbers + symbols. Example: 'BlueHouse#99$' — strong and easy to remember. Write it down and keep it safe! 📝",
          id: 'Password WiFi yang kuat: minimal 12 karakter, gabungkan BESAR + kecil + angka + simbol. Contoh: \'RumahBiru#99$\' — kuat dan mudah diingat. Tulis dan simpan dengan aman! 📝',
        },
        tip: { en: '🚀 Change your WiFi password every 6 months for security!', id: '🚀 Ganti password WiFi setiap 6 bulan untuk keamanan!' },
        image: null,
      },
    ],
  },

  // Interactive Simulation Network Mission Tutorial
  't1_wifi_sim': {
    slides: [
      {
        emoji: '🌐',
        title: { en: 'Welcome to the Network Simulator!', id: 'Selamat Datang di Simulator Jaringan!' },
        body: {
          en: "In this mode, you act as a real network technician! You will physically drag cables, manage power inputs, and configure switches and routers to establish active communication paths.",
          id: "Di mode ini, Anda bertindak sebagai teknisi jaringan sungguhan! Anda akan menarik kabel secara fisik, mencolokkan daya listrik, serta mengatur rute switch dan router.",
        },
        tip: { en: '💡 Cable colors help: Coaxial is blue, Ethernet is green, Power is orange!', id: '💡 Warna kabel membantu Anda: Koaksial biru, Ethernet hijau, Daya oranye!' },
        image: null,
      },
      {
        emoji: '📶',
        title: { en: 'The WAN vs LAN Router Rule', id: 'Aturan Penting: WAN vs LAN' },
        body: {
          en: "The internet feed from the modem MUST connect to the Router's WAN (Internet) port. Computers and printer cables must go into the Router's LAN ports (LAN1, LAN2, LAN3). If they are mixed up, devices cannot get an internet path!",
          id: "Kabel data dari modem HARUS masuk ke port WAN (Internet) Router. Kabel komputer dan printer harus dicolokkan ke port LAN Router (LAN1, LAN2, LAN3). Jika tertukar, rute internet tidak akan terbentuk!",
        },
        tip: { en: '💡 WAN port receives the internet feed, LAN ports distribute it.', id: '💡 Port WAN menerima internet luar, port LAN membagikannya.' },
        image: null,
      },
      {
        emoji: '🔌',
        title: { en: 'How to Connect & Power Devices', id: 'Menyambungkan Kabel & Menyalakan Daya' },
        body: {
          en: "1) Select a cable tool from the bottom tray. 2) Click the source device and choose a port. 3) Click the target device and choose its port. 4) Use Pointer tool, click the device, and flip its power switch to ON!",
          id: "1) Pilih alat kabel di baki bawah. 2) Klik perangkat asal dan tentukan port. 3) Klik perangkat tujuan dan tentukan port tujuan. 4) Gunakan Pointer, klik perangkat, lalu nyalakan tombol Power ke ON!",
        },
        tip: { en: '💡 Red LED means no power, Green LED means powered and linked!', id: '💡 LED merah berarti mati daya, LED hijau berarti menyala dan aktif!' },
        image: null,
      },
      {
        emoji: '💻',
        title: { en: 'Diagnostic Ping Test', id: 'Menguji dengan Diagnostic Ping' },
        body: {
          en: "Once everything is cabled and powered, run the Diagnostic Ping Test. The command line terminal will trace the hop-by-hop route to Google's public DNS (8.8.8.8) to verify your connection.",
          id: "Setelah semua kabel terpasang dan perangkat menyala, jalankan Tes Ping. Terminal baris perintah akan melacak rute hop demi hop ke DNS Google (8.8.8.8) untuk memastikan koneksi lancar.",
        },
        tip: { en: '🚀 If the ping test passes, the network is fixed!', id: '🚀 Jika tes ping sukses, jaringan teratasi!' },
        image: null,
      },
    ],
  },

  // Interactive Simulation PC Repair Mission Tutorial
  't1_pc_repair_sim': {
    slides: [
      {
        emoji: '🖥️',
        title: { en: 'Welcome to the PC Repair Simulator!', id: 'Selamat Datang di Simulator Reparasi PC!' },
        body: {
          en: "Get hands-on in the hardware lab! In this mode, you will remove side panels, install hardware slots directly, plug in vital ATX and fan cables, and boot the machine step-by-step.",
          id: "Mari masuk ke lab perangkat keras! Di mode ini, Anda akan melepas panel casing, memasang slot hardware secara langsung, mencolokkan kabel daya ATX, serta menyalakan PC langkah demi langkah.",
        },
        tip: { en: '💡 Components must click securely into their slots or they won\'t boot!', id: '💡 Komponen harus terpasang erat di slotnya agar PC bisa menyala!' },
        image: null,
      },
      {
        emoji: '🧠',
        title: { en: 'Motherboard Layers', id: 'Lapisan Mainboard / Motherboard' },
        body: {
          en: "The motherboard is the backbone. Components are layered: CPU socket sits underneath the large CPU Cooler fan. RAM stick slots are next to the CPU. The GPU sits on the PCIe slot. SSD storage sits on the M.2 slot.",
          id: "Motherboard adalah tulang punggung PC. Komponen terpasang berlapis: soket CPU terletak di bawah kipas pendingin CPU. Slot RAM berada di sebelah CPU. GPU di slot PCIe. SSD di slot M.2.",
        },
        tip: { en: '💡 Put the CPU in first, then apply thermal paste and lock the Cooler!', id: '💡 Pasang CPU dulu, beri pasta termal, lalu kunci Kipas Pendingin!' },
        image: null,
      },
      {
        emoji: '🔌',
        title: { en: 'Loose Power Cables', id: 'Kabel Daya Longgar' },
        body: {
          en: "A motherboard needs power through two main cables: 1) The wide 24-Pin ATX Power cable on the side, and 2) The 4/8-Pin CPU Power cable on the top. CPU Cooler fan also needs its cable connected to CPU_FAN pin!",
          id: "Motherboard butuh daya melalui dua kabel utama: 1) Kabel ATX Power 24-Pin lebar di samping, dan 2) Kabel CPU Power 4/8-Pin di atas. Kipas pendingin CPU juga butuh kabelnya terhubung ke pin CPU_FAN!",
        },
        tip: { en: '💡 Check the PSU Cable Manager to install/re-plug power cords.', id: '💡 Periksa PSU Cable Manager untuk memasang/mencolokkan kabel daya.' },
        image: null,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  TIER 2
  // ─────────────────────────────────────────────────────────────

  // T2-001: Install RAM Upgrade
  't2_001': {
    slides: [
      {
        emoji: '🧠',
        title: { en: 'What Is RAM?', id: 'Apa Itu RAM?' },
        body: {
          en: "RAM is your computer's short-term memory 🧠 — like your actual desk. The more desk space you have, the more things you can work on at once. Small desk = slow computer. Big desk = fast computer!",
          id: 'RAM adalah memori jangka pendek komputermu 🧠 — seperti meja kerjamu. Semakin luas meja, semakin banyak hal yang bisa kamu kerjakan sekaligus. Meja kecil = komputer lambat. Meja besar = komputer cepat!',
        },
        tip: { en: '💡 RAM ≠ Storage! RAM is temporary, storage is permanent!', id: '💡 RAM ≠ Penyimpanan! RAM sementara, penyimpanan permanen!' },
        image: null,
      },
      {
        emoji: '⚡',
        title: { en: 'Why Upgrade RAM?', id: 'Kenapa Upgrade RAM?' },
        body: {
          en: "4GB RAM in 2024 is like having a tiny desk — you can only fit 2 things on it! Adding more RAM (8GB, 16GB) is like buying a bigger desk 🪑. More space = open Chrome + Photoshop + Spotify all at once!",
          id: '4GB RAM di tahun 2024 seperti punya meja kecil — hanya bisa menaruh 2 hal! Menambah RAM (8GB, 16GB) seperti membeli meja lebih besar 🪑. Lebih banyak ruang = buka Chrome + Photoshop + Spotify sekaligus!',
        },
        tip: { en: '💡 Check your PC\'s max RAM capacity before buying!', id: '💡 Periksa kapasitas RAM maksimum PC-mu sebelum membeli!' },
        image: null,
      },
      {
        emoji: '🔧',
        title: { en: 'Installing RAM Safely', id: 'Memasang RAM dengan Aman' },
        body: {
          en: "RAM is FRAGILE! Static electricity from your hands can kill it ⚡. Always: 1) Turn PC off completely. 2) Touch metal case to discharge static. 3) Hold RAM by the edges only. 4) Push into slot firmly until it clicks!",
          id: 'RAM itu RAPUH! Listrik statis dari tanganmu bisa merusaknya ⚡. Selalu: 1) Matikan PC sepenuhnya. 2) Sentuh casing logam untuk membuang listrik statis. 3) Pegang RAM hanya di tepinya. 4) Dorong ke slot dengan kuat sampai klik!',
        },
        tip: { en: '🚀 Match RAM type: DDR4 slot needs DDR4 RAM — they won\'t fit otherwise!', id: '🚀 Cocokkan jenis RAM: slot DDR4 butuh RAM DDR4 — tidak akan pas jika berbeda!' },
        image: null,
      },
    ],
  },

  // T2-002: Replace Faulty HDD with SSD
  't2_002': {
    slides: [
      {
        emoji: '💿',
        title: { en: 'HDD vs SSD — What\'s the Difference?', id: 'HDD vs SSD — Apa Bedanya?' },
        body: {
          en: "HDD (Hard Disk Drive) has spinning metal plates inside — like a vinyl record player 🎵. SSD (Solid State Drive) has no moving parts — like a USB flash drive but MUCH bigger and faster! ⚡",
          id: 'HDD (Hard Disk Drive) punya piringan logam yang berputar di dalamnya — seperti pemutar piringan hitam 🎵. SSD (Solid State Drive) tidak punya bagian yang bergerak — seperti flash drive USB tapi JAUH lebih besar dan cepat! ⚡',
        },
        tip: { en: '💡 SSD loads Windows in ~10 seconds. HDD takes 60+ seconds!', id: '💡 SSD memuat Windows dalam ~10 detik. HDD butuh 60+ detik!' },
        image: null,
      },
      {
        emoji: '🚀',
        title: { en: 'Why Switch to SSD?', id: 'Kenapa Beralih ke SSD?' },
        body: {
          en: "Switching from HDD to SSD is like upgrading from a bicycle to a rocket ship 🚀. Everything becomes 5-10x faster: startup, opening apps, saving files. The customer will feel the difference immediately!",
          id: 'Beralih dari HDD ke SSD itu seperti upgrade dari sepeda ke roket 🚀. Segalanya menjadi 5-10x lebih cepat: startup, membuka aplikasi, menyimpan file. Pelanggan akan langsung merasakan perbedaannya!',
        },
        tip: { en: '💡 Clone the old HDD to new SSD to copy everything over!', id: '💡 Clone HDD lama ke SSD baru untuk menyalin semuanya!' },
        image: null,
      },
      {
        emoji: '🛠️',
        title: { en: 'The Replacement Process', id: 'Proses Penggantian' },
        body: {
          en: "1) Clone data from HDD to SSD using software. 2) Shut down PC. 3) Open case. 4) Unscrew old HDD, remove SATA cable. 5) Install new SSD in same spot. 6) Reconnect cable. 7) Boot up and test! 🎉",
          id: '1) Clone data dari HDD ke SSD menggunakan software. 2) Matikan PC. 3) Buka casing. 4) Lepas sekrup HDD lama, lepas kabel SATA. 5) Pasang SSD baru di tempat yang sama. 6) Hubungkan kembali kabel. 7) Nyalakan dan uji! 🎉',
        },
        tip: { en: '🚀 Always backup data BEFORE replacing any storage drive!', id: '🚀 Selalu backup data SEBELUM mengganti drive penyimpanan apapun!' },
        image: null,
      },
    ],
  },

  // T2-003: Overheating Gaming PC
  't2_003': {
    slides: [
      {
        emoji: '🌡️',
        title: { en: 'Why Do Gaming PCs Overheat?', id: 'Kenapa PC Gaming Bisa Kepanasan?' },
        body: {
          en: "Gaming makes the GPU and CPU work extremely hard — like running a marathon 🏃. They get HOT! Good cooling (fans + thermal paste) removes this heat. If cooling fails — the PC shuts down to protect itself!",
          id: 'Gaming membuat GPU dan CPU bekerja sangat keras — seperti lari maraton 🏃. Mereka menjadi PANAS! Pendinginan yang baik (kipas + pasta termal) membuang panas ini. Jika pendinginan gagal — PC mati untuk melindungi dirinya!',
        },
        tip: { en: '💡 Safe CPU temp: under 85°C. Above 95°C = danger zone! 🔥', id: '💡 Suhu CPU aman: di bawah 85°C. Di atas 95°C = zona bahaya! 🔥' },
        image: null,
      },
      {
        emoji: '💨',
        title: { en: 'The Role of Thermal Paste', id: 'Peran Pasta Termal' },
        body: {
          en: "Thermal paste is like jam between toast and butter 🍞 — it fills microscopic gaps between the CPU and its cooler, letting heat transfer perfectly. Old dried paste = like dry toast — heat gets stuck!",
          id: 'Pasta termal itu seperti selai di antara roti dan mentega 🍞 — mengisi celah mikroskopis antara CPU dan pendinginnya, memungkinkan panas berpindah sempurna. Pasta lama yang kering = seperti roti kering — panas tertahan!',
        },
        tip: { en: '💡 Reapply thermal paste every 2-3 years for best cooling!', id: '💡 Oleskan ulang pasta termal setiap 2-3 tahun untuk pendinginan terbaik!' },
        image: null,
      },
      {
        emoji: '🧹',
        title: { en: 'Cleaning & Fixing Overheating', id: 'Membersihkan & Mengatasi Kepanasan' },
        body: {
          en: "Fix steps: 1) Open PC case. 2) Use compressed air to blow dust off fans and heatsink. 3) Remove CPU cooler. 4) Clean old thermal paste. 5) Apply fresh paste (pea-sized amount). 6) Reattach cooler. Test!",
          id: 'Langkah perbaikan: 1) Buka casing PC. 2) Gunakan udara bertekanan untuk meniup debu dari kipas dan heatsink. 3) Lepas cooler CPU. 4) Bersihkan pasta termal lama. 5) Oleskan pasta baru (ukuran kacang polong). 6) Pasang kembali cooler. Uji!',
        },
        tip: { en: '🚀 Monitor temps with HWMonitor — knowledge is power!', id: '🚀 Pantau suhu dengan HWMonitor — pengetahuan adalah kekuatan!' },
        image: null,
      },
    ],
  },

  // T2-004: PC Beeps — No POST
  't2_004': {
    slides: [
      {
        emoji: '🔊',
        title: { en: 'What Is POST?', id: 'Apa Itu POST?' },
        body: {
          en: "POST = Power On Self Test. When you turn on a PC, it checks itself first — like a pilot checking instruments before takeoff ✈️. It tests: RAM, GPU, CPU, keyboard. If something fails, it BEEPS to tell you!",
          id: 'POST = Power On Self Test. Saat menyalakan PC, ia memeriksa dirinya sendiri dulu — seperti pilot memeriksa instrumen sebelum lepas landas ✈️. Ia menguji: RAM, GPU, CPU, keyboard. Jika ada yang gagal, ia BERBUNYI untuk memberitahumu!',
        },
        tip: { en: '💡 Beep codes are like morse code — each pattern means something!', id: '💡 Kode bip seperti kode morse — setiap pola memiliki arti!' },
        image: null,
      },
      {
        emoji: '📖',
        title: { en: 'Reading the Beep Codes', id: 'Membaca Kode Bip' },
        body: {
          en: "Common beep patterns (BIOS dependent): 1 long + 2 short = Video card problem 🖥️. 3 beeps = RAM issue 🧠. Continuous beeping = RAM not detected. It's the PC talking to you — learn its language! 🗣️",
          id: 'Pola bip umum (tergantung BIOS): 1 panjang + 2 pendek = Masalah kartu video 🖥️. 3 bip = Masalah RAM 🧠. Bip terus-menerus = RAM tidak terdeteksi. PC sedang berbicara kepadamu — pelajari bahasanya! 🗣️',
        },
        tip: { en: '💡 Search "[your motherboard brand] beep codes" to decode yours!', id: '💡 Cari "[merek motherboard kamu] beep codes" untuk mendekodenya!' },
        image: null,
      },
      {
        emoji: '🔧',
        title: { en: 'Fixing Beep Errors', id: 'Memperbaiki Error Bip' },
        body: {
          en: "Most beep errors are from RAM: 1) Open PC. 2) Remove RAM stick(s). 3) Clean gold contacts with eraser. 4) Reseat RAM firmly. 5) If still beeping — try ONE stick at a time to find the faulty one. 🕵️",
          id: 'Kebanyakan error bip dari RAM: 1) Buka PC. 2) Lepas stick RAM. 3) Bersihkan kontak emas dengan penghapus. 4) Pasang kembali RAM dengan kuat. 5) Jika masih bip — coba SATU stick sekaligus untuk menemukan yang rusak. 🕵️',
        },
        tip: { en: '🚀 Also check: is the GPU fully seated in its PCIe slot?', id: '🚀 Juga periksa: apakah GPU terpasang penuh di slot PCIe-nya?' },
        image: null,
      },
    ],
  },

  // T2-005: Fan Replacement
  't2_005': {
    slides: [
      {
        emoji: '💨',
        title: { en: 'Why Are Fans So Important?', id: 'Kenapa Kipas Sangat Penting?' },
        body: {
          en: "PC fans are like the lungs of a computer 🫁. They breathe in cool air and breathe out hot air. Without fans, the PC would overheat in minutes — like running with a bag on your head! The fan keeps it alive!",
          id: 'Kipas PC itu seperti paru-paru komputer 🫁. Mereka menghirup udara dingin dan menghembuskan udara panas. Tanpa kipas, PC akan kepanasan dalam hitungan menit — seperti berlari dengan kantong di kepala! Kipas menjaganya tetap hidup!',
        },
        tip: { en: '💡 PC has multiple fans: CPU fan, case fans, GPU fan. All matter!', id: '💡 PC punya beberapa kipas: kipas CPU, kipas casing, kipas GPU. Semuanya penting!' },
        image: null,
      },
      {
        emoji: '😰',
        title: { en: 'Signs of a Failing Fan', id: 'Tanda-Tanda Kipas yang Rusak' },
        body: {
          en: "Watch out for: 1) Grinding or rattling noise 🔊 (bearings failing). 2) Fan spinning very slowly. 3) PC overheating rapidly. 4) Fan not spinning at all. A bad fan is like a broken AC — everything gets hot! 🥵",
          id: 'Waspadai: 1) Suara gerinda atau bergetar 🔊 (bantalan rusak). 2) Kipas berputar sangat lambat. 3) PC cepat kepanasan. 4) Kipas tidak berputar sama sekali. Kipas rusak seperti AC yang rusak — semuanya panas! 🥵',
        },
        tip: { en: '💡 Use HWMonitor to check fan RPM — healthy fan runs 1000-3000 RPM!', id: '💡 Gunakan HWMonitor untuk memeriksa RPM kipas — kipas sehat berjalan 1000-3000 RPM!' },
        image: null,
      },
      {
        emoji: '🔄',
        title: { en: 'Replacing a Fan', id: 'Mengganti Kipas' },
        body: {
          en: "1) Note fan size (usually 80mm, 120mm, or 140mm). 2) Buy matching replacement. 3) Unplug old fan connector from motherboard. 4) Unscrew (usually 4 screws). 5) Install new fan, reconnect. 6) Test spin!",
          id: '1) Catat ukuran kipas (biasanya 80mm, 120mm, atau 140mm). 2) Beli pengganti yang sesuai. 3) Lepas konektor kipas lama dari motherboard. 4) Buka sekrup (biasanya 4 sekrup). 5) Pasang kipas baru, hubungkan kembali. 6) Uji putaran!',
        },
        tip: { en: '🚀 Match the arrow on the fan to know which way it blows air!', id: '🚀 Cocokkan panah pada kipas untuk mengetahui arah aliran udaranya!' },
        image: null,
      },
    ],
  },

  // T2-006: Cable Management Cleanup
  't2_006': {
    slides: [
      {
        emoji: '🍝',
        title: { en: 'What Is Cable Management?', id: 'Apa Itu Manajemen Kabel?' },
        body: {
          en: "Cable management is organizing cables inside a PC so they don't look like spaghetti 🍝. Messy cables block airflow (causing heat!) and make repairs harder. Clean cables = cool PC + easy access!",
          id: 'Manajemen kabel adalah mengatur kabel di dalam PC agar tidak terlihat seperti spageti 🍝. Kabel berantakan menghalangi aliran udara (menyebabkan panas!) dan membuat perbaikan lebih sulit. Kabel rapi = PC dingin + mudah diakses!',
        },
        tip: { en: '💡 Good cable management improves cooling by up to 10°C!', id: '💡 Manajemen kabel yang baik meningkatkan pendinginan hingga 10°C!' },
        image: null,
      },
      {
        emoji: '🗂️',
        title: { en: 'Why It Matters', id: 'Kenapa Ini Penting' },
        body: {
          en: "Imagine a kitchen with pots, pans, and utensils thrown everywhere 🍳. Hard to cook! Clean cable management is like an organized kitchen — you know where everything is, airflows well, and it looks professional!",
          id: 'Bayangkan dapur dengan panci, wajan, dan peralatan dilempar ke mana-mana 🍳. Sulit untuk memasak! Manajemen kabel yang bersih seperti dapur yang terorganisir — kamu tahu di mana segalanya, udara mengalir baik, dan terlihat profesional!',
        },
        tip: { en: '💡 Zip ties and velcro straps are your best friends for cable management!', id: '💡 Zip tie dan tali velcro adalah sahabat terbaik untuk manajemen kabel!' },
        image: null,
      },
      {
        emoji: '🎯',
        title: { en: 'How to Do It', id: 'Cara Melakukannya' },
        body: {
          en: "1) Identify all cables (power, SATA, fan). 2) Route cables behind the motherboard tray. 3) Bundle similar cables with zip ties. 4) Leave only necessary cable length exposed. 5) Result: a beautiful, airy PC! 😍",
          id: '1) Identifikasi semua kabel (power, SATA, kipas). 2) Alirkan kabel di belakang tray motherboard. 3) Ikat kabel serupa dengan zip tie. 4) Sisakan hanya panjang kabel yang diperlukan. 5) Hasilnya: PC yang indah dan berangin! 😍',
        },
        tip: { en: '🚀 Before you start — take a photo of current cable layout!', id: '🚀 Sebelum mulai — foto tata letak kabel saat ini!' },
        image: null,
      },
    ],
  },

  // T2-007: BIOS Reset for Boot Issue
  't2_007': {
    slides: [
      {
        emoji: '⚙️',
        title: { en: 'What Is BIOS?', id: 'Apa Itu BIOS?' },
        body: {
          en: "BIOS (Basic Input/Output System) is the very first program that runs when you turn on a PC 🏁. Before Windows even loads, BIOS checks all hardware and decides what to boot from. It's the PC's alarm clock and morning routine!",
          id: 'BIOS (Basic Input/Output System) adalah program pertama yang berjalan saat kamu menyalakan PC 🏁. Sebelum Windows memuat, BIOS memeriksa semua hardware dan memutuskan dari mana harus boot. Ini adalah jam alarm dan rutinitas pagi PC!',
        },
        tip: { en: '💡 Press DEL, F2, or F12 during startup to enter BIOS!', id: '💡 Tekan DEL, F2, atau F12 saat startup untuk masuk BIOS!' },
        image: null,
      },
      {
        emoji: '🔀',
        title: { en: 'When BIOS Goes Wrong', id: 'Ketika BIOS Bermasalah' },
        body: {
          en: "Wrong BIOS settings can stop a PC from booting — like giving wrong directions to a delivery driver 📦. Maybe boot order is wrong (tries to boot from empty USB), or settings got corrupted. Reset fixes it!",
          id: 'Pengaturan BIOS yang salah bisa mencegah PC dari booting — seperti memberi petunjuk yang salah kepada pengemudi pengiriman 📦. Mungkin urutan boot salah (mencoba boot dari USB kosong), atau pengaturan rusak. Reset memperbaikinya!',
        },
        tip: { en: '💡 "Boot order" = which drive to start from first (usually your SSD/HDD)!', id: '💡 "Urutan boot" = drive mana yang diutamakan pertama (biasanya SSD/HDD kamu)!' },
        image: null,
      },
      {
        emoji: '🔄',
        title: { en: 'How to Reset BIOS', id: 'Cara Reset BIOS' },
        body: {
          en: "Method 1: Inside BIOS → find 'Load Default Settings' or 'Reset to Default'. Method 2: Remove the CMOS battery (small coin battery on motherboard) for 30 seconds — this wipes all settings. Fresh start! 🌟",
          id: 'Metode 1: Di dalam BIOS → cari \'Muat Pengaturan Default\' atau \'Reset ke Default\'. Metode 2: Lepas baterai CMOS (baterai koin kecil di motherboard) selama 30 detik — ini menghapus semua pengaturan. Mulai segar! 🌟',
        },
        tip: { en: '🚀 After reset, set the correct date/time and boot order in BIOS!', id: '🚀 Setelah reset, atur tanggal/waktu yang benar dan urutan boot di BIOS!' },
        image: null,
      },
    ],
  },

  // T2-008: Gaming Cafe Network Slowdown
  't2_008': {
    slides: [
      {
        emoji: '🎮',
        title: { en: 'Networks in a Gaming Café', id: 'Jaringan di Gaming Café' },
        body: {
          en: "A gaming café has 20+ PCs all sharing one internet connection — like 20 people drinking from the same bottle of water 🍶. If someone hogging bandwidth (downloading huge files), everyone else lags! 😤",
          id: 'Gaming café punya 20+ PC yang semuanya berbagi satu koneksi internet — seperti 20 orang minum dari satu botol air yang sama 🍶. Jika seseorang memonopoli bandwidth (mengunduh file besar), semua orang lag! 😤',
        },
        tip: { en: '💡 Bandwidth = the size of the internet pipe. More PCs = less per PC!', id: '💡 Bandwidth = ukuran pipa internet. Lebih banyak PC = lebih sedikit per PC!' },
        image: null,
      },
      {
        emoji: '🔍',
        title: { en: 'Finding the Culprit', id: 'Menemukan Penyebabnya' },
        body: {
          en: "Use network monitoring tools to see which PC is using the most bandwidth — like checking water meter usage per room 🚰. A PC downloading 10GB update during peak hours is everyone's enemy! Find it and pause the download.",
          id: 'Gunakan alat pemantauan jaringan untuk melihat PC mana yang menggunakan paling banyak bandwidth — seperti memeriksa penggunaan meteran air per ruangan 🚰. PC yang mengunduh pembaruan 10GB saat jam sibuk adalah musuh semua orang! Temukan dan jeda pengunduhan.',
        },
        tip: { en: '💡 Tools: Wireshark, NetLimiter, or router admin panel!', id: '💡 Alat: Wireshark, NetLimiter, atau panel admin router!' },
        image: null,
      },
      {
        emoji: '⚖️',
        title: { en: 'The Solution: QoS', id: 'Solusi: QoS' },
        body: {
          en: "QoS (Quality of Service) is like a traffic police officer 🚦 in your router. It prioritizes gaming traffic (low ping needed!) over downloads. Set it up = all 20 PCs get fair share and gaming stays smooth!",
          id: 'QoS (Quality of Service) seperti polisi lalu lintas 🚦 di dalam routermu. Ia memprioritaskan lalu lintas gaming (butuh ping rendah!) daripada unduhan. Atur ini = semua 20 PC mendapat bagian yang adil dan gaming tetap lancar!',
        },
        tip: { en: '🚀 Set gaming PCs as high priority in QoS — gamers will love you!', id: '🚀 Atur PC gaming sebagai prioritas tinggi di QoS — gamer akan mencintaimu!' },
        image: null,
      },
    ],
  },

  // T2-009: PSU Replacement
  't2_009': {
    slides: [
      {
        emoji: '⚡',
        title: { en: 'What Does a PSU Do?', id: 'Apa Fungsi PSU?' },
        body: {
          en: "The PSU (Power Supply Unit) converts AC wall power into the DC voltages your PC needs ⚡. It feeds the motherboard, CPU, GPU, and drives. Think of it as the heart of the PC — if the heart is weak, everything suffers!",
          id: 'PSU (Power Supply Unit) mengubah daya AC dari dinding menjadi tegangan DC yang dibutuhkan PC ⚡. Ia memberi daya pada motherboard, CPU, GPU, dan drive. Anggap seperti jantung PC — jika jantung lemah, semuanya menderita!',
        },
        tip: { en: '💡 PSU failure under load = random shutoffs during heavy tasks!', id: '💡 PSU rusak saat beban = mati mendadak saat tugas berat!' },
        image: null,
      },
      {
        emoji: '🔢',
        title: { en: 'Calculating the Right Wattage', id: 'Menghitung Wattage yang Tepat' },
        body: {
          en: "Add up all component TDP values: CPU + GPU + motherboard + RAM + storage + fans ≈ total draw. Then add 30% headroom for efficiency and peaks. Example: 475W total → need at least 620W PSU. Never run a PSU near 100% capacity! 📊",
          id: 'Jumlahkan semua nilai TDP komponen: CPU + GPU + motherboard + RAM + storage + kipas ≈ total kebutuhan. Lalu tambahkan 30% headroom untuk efisiensi dan puncak. Contoh: 475W total → butuh PSU minimal 620W. Jangan pernah jalankan PSU mendekati 100% kapasitas! 📊',
        },
        tip: { en: '💡 Use PCPartPicker.com to estimate total system wattage!', id: '💡 Gunakan PCPartPicker.com untuk estimasi wattage sistem total!' },
        image: null,
      },
      {
        emoji: '🔧',
        title: { en: 'Safe PSU Replacement Steps', id: 'Langkah Penggantian PSU yang Aman' },
        body: {
          en: "1) Calculate needed wattage. 2) Power OFF + flip PSU switch + unplug from wall + press power button to drain capacitors. 3) Disconnect all cables (24-pin, 8-pin CPU, PCIe, SATA). 4) Remove old PSU (4 rear screws). 5) Install new PSU and reconnect. 6) Stress test 30 min! 🎉",
          id: '1) Hitung wattage yang dibutuhkan. 2) Matikan + balik saklar PSU + cabut dari dinding + tekan tombol power untuk membuang kapasitor. 3) Lepas semua kabel (24-pin, 8-pin CPU, PCIe, SATA). 4) Lepas PSU lama (4 sekrup belakang). 5) Pasang PSU baru dan hubungkan kembali. 6) Stress test 30 menit! 🎉',
        },
        tip: { en: '🚀 Always discharge capacitors before touching PSU internals!', id: '🚀 Selalu buang kapasitor sebelum menyentuh bagian dalam PSU!' },
        image: null,
      },
    ],
  },

  // T2-010: GPU Installation
  't2_010': {
    slides: [
      {
        emoji: '🖥️',
        title: { en: 'What Does the GPU Do?', id: 'Apa Fungsi GPU?' },
        body: {
          en: "The GPU (Graphics Processing Unit) renders every frame you see on screen 🖥️. For gaming, it does ~80% of the heavy lifting. Upgrading your GPU is the single biggest performance boost for games — like giving your car a bigger engine!",
          id: 'GPU (Graphics Processing Unit) merender setiap frame yang kamu lihat di layar 🖥️. Untuk gaming, ia melakukan ~80% kerja berat. Upgrade GPU adalah peningkatan performa terbesar untuk game — seperti memberi mobilmu mesin yang lebih besar!',
        },
        tip: { en: '💡 Always check PSU wattage supports the new GPU before buying!', id: '💡 Selalu cek wattage PSU mendukung GPU baru sebelum membeli!' },
        image: null,
      },
      {
        emoji: '⚠️',
        title: { en: 'The Step Most People Skip', id: 'Langkah yang Sering Dilewati' },
        body: {
          en: "CRITICAL: Uninstall old GPU drivers FIRST using DDU (Display Driver Uninstaller) while old GPU is still installed. If you skip this, Windows loads old drivers on new hardware = crashes, black screens, no display. DDU removes every trace of old drivers! 🛡️",
          id: 'PENTING: Uninstall driver GPU lama DULU menggunakan DDU (Display Driver Uninstaller) saat GPU lama masih terpasang. Jika dilewati, Windows memuat driver lama di hardware baru = crash, layar hitam, tidak ada tampilan. DDU menghapus setiap jejak driver lama! 🛡️',
        },
        tip: { en: '💡 Run DDU in Safe Mode for the cleanest driver removal!', id: '💡 Jalankan DDU dalam Safe Mode untuk penghapusan driver paling bersih!' },
        image: null,
      },
      {
        emoji: '🔧',
        title: { en: 'Installing the New GPU', id: 'Memasang GPU Baru' },
        body: {
          en: "1) DDU old drivers in Safe Mode. 2) Power off + discharge. 3) Release PCIe retention clip → remove old GPU. 4) Insert new GPU firmly until clip snaps. 5) Secure bracket screw. 6) Connect PCIe power cables. 7) Boot → connect monitor to NEW GPU → install latest drivers! ✅",
          id: '1) DDU driver lama dalam Safe Mode. 2) Matikan + buang daya. 3) Lepas klip retensi PCIe → lepas GPU lama. 4) Pasang GPU baru dengan kuat sampai klip berbunyi. 5) Kencangkan sekrup bracket. 6) Hubungkan kabel power PCIe. 7) Booting → hubungkan monitor ke GPU BARU → instal driver terbaru! ✅',
        },
        tip: { en: '🚀 Connect monitor to the GPU, NOT the motherboard\'s video out!', id: '🚀 Hubungkan monitor ke GPU, BUKAN output video motherboard!' },
        image: null,
      },
    ],
  },

  // T2-011: Motherboard Diagnostic
  't2_011': {
    slides: [
      {
        emoji: '🔊',
        title: { en: 'POST — The PC\'s Self-Check', id: 'POST — Pemeriksaan Mandiri PC' },
        body: {
          en: "POST = Power-On Self-Test. Every time you boot, the PC checks: CPU ✓, RAM ✓, GPU ✓, storage ✓. If any critical component fails — it halts and signals via beep codes or diagnostic LEDs. No POST = something critical failed before Windows even tried to load!",
          id: 'POST = Power-On Self-Test. Setiap kali boot, PC memeriksa: CPU ✓, RAM ✓, GPU ✓, storage ✓. Jika komponen kritis gagal — ia berhenti dan memberi sinyal melalui kode bip atau LED diagnostik. Tidak POST = sesuatu yang kritis gagal sebelum Windows mencoba memuat!',
        },
        tip: { en: '💡 No POST + no beeps = likely motherboard or CPU issue!', id: '💡 Tidak POST + tidak ada bip = kemungkinan masalah motherboard atau CPU!' },
        image: null,
      },
      {
        emoji: '🔍',
        title: { en: 'Reading Debug LEDs', id: 'Membaca LED Debug' },
        body: {
          en: "Modern motherboards have Q-LED debug lights: CPU / DRAM / VGA / BOOT. Whichever LED stays lit = that component failed POST! DRAM LED lit = RAM issue (reseat or test one stick). VGA LED lit = GPU issue. CPU LED = serious problem. LEDs are your map to the fault! 🗺️",
          id: 'Motherboard modern punya lampu debug Q-LED: CPU / DRAM / VGA / BOOT. LED yang tetap menyala = komponen itu gagal POST! LED DRAM menyala = masalah RAM (pasang ulang atau uji satu stick). LED VGA menyala = masalah GPU. LED CPU = masalah serius. LED adalah petamu ke kerusakan! 🗺️',
        },
        tip: { en: '💡 Check QVL (Qualified Vendor List) on mobo website for RAM compatibility!', id: '💡 Periksa QVL di website mobo untuk kompatibilitas RAM!' },
        image: null,
      },
      {
        emoji: '🧪',
        title: { en: 'Breadboarding to Isolate Faults', id: 'Breadboarding untuk Mengisolasi Kerusakan' },
        body: {
          en: "Breadboarding = boot PC with MINIMUM parts outside the case: CPU + 1 RAM + PSU + Mobo on a cardboard surface. This eliminates case short circuits. If it POSTs outside but not inside → the case is causing a short! Add components one by one until fault reappears. 🕵️",
          id: 'Breadboarding = boot PC dengan komponen MINIMUM di luar casing: CPU + 1 RAM + PSU + Mobo di atas kardus. Ini menghilangkan short circuit dari casing. Jika POST di luar tapi tidak di dalam → casing menyebabkan short! Tambahkan komponen satu per satu sampai kerusakan muncul kembali. 🕵️',
        },
        tip: { en: '🚀 Breadboarding saves hours of blind guessing — always try it!', id: '🚀 Breadboarding menghemat berjam-jam dugaan buta — selalu coba!' },
        image: null,
      },
    ],
  },

  // T2-012: Laptop Screen Replacement
  't2_012': {
    slides: [
      {
        emoji: '💔',
        title: { en: 'When a Laptop Screen Cracks', id: 'Ketika Layar Laptop Retak' },
        body: {
          en: "A cracked laptop screen is fixable! The LCD panel is replaceable — it's connected by an eDP (embedded DisplayPort) cable. The screen is NOT part of the motherboard. Cost is usually $50-120 for the panel, much cheaper than a new laptop! 💰",
          id: 'Layar laptop yang retak bisa diperbaiki! Panel LCD bisa diganti — terhubung melalui kabel eDP (embedded DisplayPort). Layar BUKAN bagian dari motherboard. Biaya biasanya $50-120 untuk panelnya, jauh lebih murah dari laptop baru! 💰',
        },
        tip: { en: '💡 Connect external monitor to confirm: if image appears → only screen is broken!', id: '💡 Hubungkan monitor eksternal untuk konfirmasi: jika gambar muncul → hanya layar yang rusak!' },
        image: null,
      },
      {
        emoji: '🔍',
        title: { en: 'Finding the Right Replacement Panel', id: 'Mencari Panel Pengganti yang Tepat' },
        body: {
          en: "Match EXACTLY: screen size (15.6\"), resolution (1920x1080), backlight type (LED), connector type (30-pin or 40-pin eDP), and touch/non-touch variant. Check the panel's model number (sticker on back of existing screen) or search '[laptop model] replacement screen'. Wrong panel = won't fit! 📐",
          id: 'Cocokkan PERSIS: ukuran layar (15.6\"), resolusi (1920x1080), jenis backlight (LED), jenis konektor (30-pin atau 40-pin eDP), dan varian touch/non-touch. Periksa nomor model panel (stiker di belakang layar yang ada) atau cari \'[model laptop] replacement screen\'. Panel yang salah = tidak akan pas! 📐',
        },
        tip: { en: '💡 Search the panel model number on AliExpress or Amazon for OEM pricing!', id: '💡 Cari nomor model panel di AliExpress atau Amazon untuk harga OEM!' },
        image: null,
      },
      {
        emoji: '🛠️',
        title: { en: 'Safe Disassembly Steps', id: 'Langkah Pembongkaran yang Aman' },
        body: {
          en: "1) Remove battery first — always! 2) Pry rubber bumpers off bezel to find hidden screws. 3) Use plastic pry tool to separate bezel (never metal near screen!). 4) Unscrew LCD brackets. 5) Gently disconnect eDP cable. 6) Reverse to reassemble. Test before closing! 🧪",
          id: '1) Lepas baterai dulu — selalu! 2) Congkel bumper karet dari bezel untuk menemukan sekrup tersembunyi. 3) Gunakan alat plastic pry untuk memisahkan bezel (jangan pernah logam di dekat layar!). 4) Buka sekrup bracket LCD. 5) Lepas kabel eDP dengan hati-hati. 6) Balikkan urutan untuk merakit kembali. Uji sebelum ditutup! 🧪',
        },
        tip: { en: '🚀 Watch a YouTube teardown video for YOUR specific laptop model first!', id: '🚀 Tonton video teardown YouTube untuk model laptop spesifik KAMU dulu!' },
        image: null,
      },
    ],
  },

  // T2-013: Data Recovery from Dead PC
  't2_013': {
    slides: [
      {
        emoji: '💡',
        title: { en: 'Dead PC ≠ Dead Data', id: 'PC Mati ≠ Data Mati' },
        body: {
          en: "A PC that won't boot usually has a failed motherboard, PSU, or CPU — not a failed drive! The HDD/SSD stores data independently. As long as the drive itself is healthy, your data is accessible. Drive and PC are separate — fix them separately! 🔍",
          id: 'PC yang tidak mau boot biasanya memiliki motherboard, PSU, atau CPU yang rusak — bukan drive yang rusak! HDD/SSD menyimpan data secara independen. Selama drive itu sendiri sehat, data kamu bisa diakses. Drive dan PC terpisah — perbaiki secara terpisah! 🔍',
        },
        tip: { en: '💡 ALWAYS try data recovery BEFORE attempting hardware repair on the dead PC!', id: '💡 SELALU coba recovery data SEBELUM mencoba perbaikan hardware di PC yang mati!' },
        image: null,
      },
      {
        emoji: '🔌',
        title: { en: 'How to Access the Drive', id: 'Cara Mengakses Drive' },
        body: {
          en: "Remove the HDD/SSD from the dead PC. Connect it to a working PC via USB-to-SATA adapter or enclosure (~$15 tool every IT pro needs!). The drive appears in File Explorer as an external drive. Browse files normally and copy what you need to backup storage! 💾",
          id: 'Lepas HDD/SSD dari PC yang mati. Hubungkan ke PC yang berfungsi melalui adaptor USB-ke-SATA atau enclosure (~$15 alat yang dibutuhkan setiap IT pro!). Drive muncul di File Explorer sebagai drive eksternal. Jelajahi file secara normal dan salin yang kamu butuhkan ke penyimpanan backup! 💾',
        },
        tip: { en: '💡 USB-to-SATA adapter is a must-have IT tool — buy one today!', id: '💡 Adaptor USB-ke-SATA adalah alat IT yang wajib dimiliki — beli sekarang!' },
        image: null,
      },
      {
        emoji: '🚑',
        title: { en: 'When Files Don\'t Show Up', id: 'Ketika File Tidak Muncul' },
        body: {
          en: "Drive not detected or shows errors? Use Recuva (free) or TestDisk (free) to scan at sector level and recover deleted or corrupted files. These tools can recover files even from partially damaged drives. Always verify recovered files by opening them! 🎯",
          id: 'Drive tidak terdeteksi atau menampilkan error? Gunakan Recuva (gratis) atau TestDisk (gratis) untuk scan di level sektor dan recovery file yang dihapus atau rusak. Alat-alat ini bisa recovery file bahkan dari drive yang rusak sebagian. Selalu verifikasi file yang dipulihkan dengan membukanya! 🎯',
        },
        tip: { en: '🚀 Verify recovered files by OPENING them — file name present ≠ file intact!', id: '🚀 Verifikasi file yang dipulihkan dengan MEMBUKANYA — nama file ada ≠ file utuh!' },
        image: null,
      },
    ],
  },

  // T2-014: OS Reinstall — Keep Data
  't2_014': {
    slides: [
      {
        emoji: '🔄',
        title: { en: 'In-Place Repair vs Clean Install', id: 'Perbaikan In-Place vs Instal Bersih' },
        body: {
          en: "Two ways to reinstall Windows: 1) In-place upgrade repair — reinstalls system files while KEEPING your personal files and apps. 2) Clean install — wipes EVERYTHING. For a corrupted Windows, always try in-place repair first! It saves hours of reinstalling apps. 💡",
          id: 'Dua cara untuk instal ulang Windows: 1) Perbaikan upgrade in-place — menginstal ulang file sistem sambil TETAP menjaga file pribadi dan aplikasi kamu. 2) Instal bersih — menghapus SEMUA. Untuk Windows yang rusak, selalu coba perbaikan in-place dulu! Menghemat berjam-jam reinstalasi aplikasi. 💡',
        },
        tip: { en: '💡 In-place repair keeps files. Boot menu install = clean install = data gone!', id: '💡 Perbaikan in-place menjaga file. Instal dari boot menu = instal bersih = data hilang!' },
        image: null,
      },
      {
        emoji: '🛡️',
        title: { en: 'BACKUP FIRST — Always!', id: 'BACKUP DULU — Selalu!' },
        body: {
          en: "Even with 'keep files' option selected, ALWAYS back up first! Technology can fail unexpectedly. Back up: Documents, Desktop, Downloads, AppData\\Roaming (browser profiles, email data), and any work folders. Copy to external drive or cloud. Only then proceed! 🔐",
          id: 'Bahkan dengan opsi \'simpan file\' dipilih, SELALU backup dulu! Teknologi bisa gagal tak terduga. Backup: Documents, Desktop, Downloads, AppData\\Roaming (profil browser, data email), dan folder kerja apa pun. Salin ke drive eksternal atau cloud. Baru kemudian lanjutkan! 🔐',
        },
        tip: { en: '💡 No backup = gambling with your data. Always backup BEFORE reinstalling!', id: '💡 Tidak backup = berjudi dengan data kamu. Selalu backup SEBELUM instal ulang!' },
        image: null,
      },
      {
        emoji: '⚙️',
        title: { en: 'The Correct Procedure', id: 'Prosedur yang Benar' },
        body: {
          en: "1) Backup everything. 2) Download Windows ISO from microsoft.com → make bootable USB with Rufus. 3) Run Setup.exe FROM WITHIN WINDOWS (not from boot menu!) to get the 'Keep files' option. 4) Choose 'Upgrade this PC → Keep personal files and apps'. 5) Wait 45-60min. 6) Verify files after! ✅",
          id: '1) Backup semua. 2) Unduh ISO Windows dari microsoft.com → buat USB bootable dengan Rufus. 3) Jalankan Setup.exe DARI DALAM WINDOWS (bukan dari boot menu!) untuk mendapatkan opsi \'Simpan file\'. 4) Pilih \'Upgrade PC ini → Simpan file pribadi dan aplikasi\'. 5) Tunggu 45-60 menit. 6) Verifikasi file setelahnya! ✅',
        },
        tip: { en: '🚀 Run Setup.exe from within Windows = keeps files. Boot menu = clean wipe!', id: '🚀 Jalankan Setup.exe dari dalam Windows = menjaga file. Boot menu = hapus bersih!' },
        image: null,
      },
    ],
  },

  // T2-015: Power Supply Wattage Guide
  't2_015': {
    slides: [
      {
        emoji: '⚡',
        title: { en: 'How to Calculate PSU Wattage', id: 'Cara Menghitung Wattage PSU' },
        body: {
          en: "Add up all component TDP values: CPU + GPU + motherboard (30-50W) + RAM (5W each) + SSD (5W) + fans (3W each). Example: i5 (125W) + RTX 4060 (115W) + rest (100W) = 340W total. Then add 30% headroom: 340 × 1.3 = 442W → buy a 550W or 650W PSU. 📊",
          id: 'Jumlahkan semua nilai TDP komponen: CPU + GPU + motherboard (30-50W) + RAM (5W each) + SSD (5W) + kipas (3W each). Contoh: i5 (125W) + RTX 4060 (115W) + sisanya (100W) = 340W total. Lalu tambahkan 30% headroom: 340 × 1.3 = 442W → beli PSU 550W atau 650W. 📊',
        },
        tip: { en: '💡 Use pcpartpicker.com estimated wattage as your starting point!', id: '💡 Gunakan estimasi wattage pcpartpicker.com sebagai titik awal kamu!' },
        image: null,
      },
      {
        emoji: '🏅',
        title: { en: '80 PLUS Efficiency Ratings', id: 'Rating Efisiensi 80 PLUS' },
        body: {
          en: "80 PLUS certifications measure how efficiently the PSU converts AC→DC power: Bronze (82%), Silver (85%), Gold (87-90%), Platinum (92%), Titanium (94%). Higher = less heat, lower electricity bill, quieter fan. Always get at least Bronze certified! Never buy uncertified cheap PSUs! ⚠️",
          id: 'Sertifikasi 80 PLUS mengukur seberapa efisien PSU mengubah daya AC→DC: Bronze (82%), Silver (85%), Gold (87-90%), Platinum (92%), Titanium (94%). Lebih tinggi = lebih sedikit panas, tagihan listrik lebih rendah, kipas lebih senyap. Selalu dapatkan setidaknya sertifikasi Bronze! Jangan pernah beli PSU murah tanpa sertifikasi! ⚠️',
        },
        tip: { en: '💡 Gold PSU is the sweet spot — great efficiency, reasonable price!', id: '💡 PSU Gold adalah titik manis — efisiensi bagus, harga wajar!' },
        image: null,
      },
      {
        emoji: '💀',
        title: { en: 'Why Cheap PSUs Are Dangerous', id: 'Kenapa PSU Murah Berbahaya' },
        body: {
          en: "A failing or underpowered PSU delivers unstable voltages — voltage ripple can INSTANTLY destroy your CPU, GPU, or motherboard 💀. A cheap $15 PSU can kill $800 of components! The PSU is the foundation of your PC. Spend a little more here, save a lot everywhere else. Quality PSUs last 5-10 years! 🛡️",
          id: 'PSU yang rusak atau kekurangan daya memberikan tegangan tidak stabil — riak tegangan bisa LANGSUNG merusak CPU, GPU, atau motherboard 💀. PSU murah $15 bisa membunuh komponen senilai $800! PSU adalah fondasi PC kamu. Keluarkan sedikit lebih banyak di sini, hemat banyak di mana-mana. PSU berkualitas bertahan 5-10 tahun! 🛡️',
        },
        tip: { en: '🚀 Brands: Seasonic, Corsair, EVGA, be quiet! — all reliable choices!', id: '🚀 Merek: Seasonic, Corsair, EVGA, be quiet! — semua pilihan yang dapat diandalkan!' },
        image: null,
      },
    ],
  },

  // T2-016: Thermal Paste Replacement
  't2_016': {
    slides: [
      {
        emoji: '🔥',
        title: { en: 'Why Thermal Paste Matters', id: 'Kenapa Thermal Paste Penting' },
        body: {
          en: "Thermal paste fills microscopic gaps between the CPU surface and cooler base 🔬. Without it, air pockets trap heat. With it, heat transfers 10x more efficiently! After 3-5 years, paste dries out and crumbles → CPU temps spike → throttling → sluggish performance even on simple tasks! 🌡️",
          id: 'Thermal paste mengisi celah mikroskopis antara permukaan CPU dan dasar cooler 🔬. Tanpanya, kantong udara menjebak panas. Dengannya, panas berpindah 10x lebih efisien! Setelah 3-5 tahun, pasta mengering dan retak → suhu CPU melonjak → throttling → performa lambat bahkan untuk tugas sederhana! 🌡️',
        },
        tip: { en: '💡 Thermal paste replacement can drop temps by 15-25°C on old PCs!', id: '💡 Penggantian thermal paste bisa turunkan suhu 15-25°C di PC lama!' },
        image: null,
      },
      {
        emoji: '🧹',
        title: { en: 'Removing Old Paste Properly', id: 'Menghapus Pasta Lama dengan Benar' },
        body: {
          en: "Use isopropyl alcohol (90%+ concentration — lower leaves moisture!). Apply to a lint-free cloth or cotton swab. Gently wipe old paste from CPU surface AND heatsink base until both surfaces are clean and shiny. Never use water or tissue — they leave residue and fibers! ✨",
          id: 'Gunakan isopropyl alcohol (konsentrasi 90%+ — yang lebih rendah meninggalkan kelembaban!). Oleskan pada kain bebas serat atau kapas. Usap perlahan pasta lama dari permukaan CPU DAN dasar heatsink hingga kedua permukaan bersih dan mengkilap. Jangan pernah gunakan air atau tisu — mereka meninggalkan residu dan serat! ✨',
        },
        tip: { en: '💡 Clean both surfaces — CPU top AND heatsink bottom. Both must be spotless!', id: '💡 Bersihkan kedua permukaan — atas CPU DAN bawah heatsink. Keduanya harus bersih!' },
        image: null,
      },
      {
        emoji: '🎯',
        title: { en: 'Applying New Paste Correctly', id: 'Mengoleskan Pasta Baru dengan Benar' },
        body: {
          en: "Apply a PEA-SIZED dot (~4mm) to the exact CENTER of the CPU. Do NOT spread it manually — the pressure of the heatsink when mounted will distribute it perfectly. Install heatsink straight down. Tighten screws in X pattern (opposite corners) for even pressure. Test temps after! 🎉",
          id: 'Oleskan titik SEUKURAN KACANG POLONG (~4mm) tepat di TENGAH CPU. JANGAN disebarkan secara manual — tekanan heatsink saat dipasang akan mendistribusikannya dengan sempurna. Pasang heatsink lurus ke bawah. Kencangkan sekrup dalam pola X (sudut yang berlawanan) untuk tekanan merata. Uji suhu setelahnya! 🎉',
        },
        tip: { en: '🚀 Good brands: Arctic MX-4, Thermal Grizzly Kryonaut, Noctua NT-H1!', id: '🚀 Merek bagus: Arctic MX-4, Thermal Grizzly Kryonaut, Noctua NT-H1!' },
        image: null,
      },
    ],
  },

  // T2-017: PC Build Consultation
  't2_017': {
    slides: [
      {
        emoji: '🎮',
        title: { en: 'GPU — The Heart of a Gaming PC', id: 'GPU — Jantung PC Gaming' },
        body: {
          en: "For gaming, the GPU renders every frame — it's doing 80% of the work. On a limited budget, invest MORE in the GPU. A mid-range GPU + budget CPU will outperform a high-end CPU + budget GPU for games. Example: RTX 4060 + i5 > RTX 3060 + i9 for gaming FPS! 🚀",
          id: 'Untuk gaming, GPU merender setiap frame — ia melakukan 80% pekerjaan. Dengan anggaran terbatas, investasikan LEBIH ke GPU. GPU kelas menengah + CPU anggaran akan mengalahkan CPU kelas atas + GPU anggaran untuk game. Contoh: RTX 4060 + i5 > RTX 3060 + i9 untuk FPS gaming! 🚀',
        },
        tip: { en: '💡 Balance is key — don\'t have a $500 GPU with a $50 CPU (bottleneck)!', id: '💡 Keseimbangan adalah kunci — jangan punya GPU $500 dengan CPU $50 (bottleneck)!' },
        image: null,
      },
      {
        emoji: '🧠',
        title: { en: 'RAM — 16GB Is the New Minimum', id: 'RAM — 16GB Adalah Minimum Baru' },
        body: {
          en: "In 2024, 8GB RAM is NOT enough! Windows 11 uses 3-4GB idle. A game like Valorant needs 4-6GB. Chrome with 10 tabs = 2-4GB more. Total = 9-14GB needed constantly. With 8GB, the system swaps to disk (pagefile), causing severe stutters. 16GB is the new minimum, 32GB for future-proofing! 💡",
          id: 'Di tahun 2024, 8GB RAM TIDAK cukup! Windows 11 menggunakan 3-4GB saat idle. Game seperti Valorant membutuhkan 4-6GB. Chrome dengan 10 tab = 2-4GB lagi. Total = 9-14GB dibutuhkan terus-menerus. Dengan 8GB, sistem menukar ke disk (pagefile), menyebabkan stuttering parah. 16GB adalah minimum baru, 32GB untuk masa depan! 💡',
        },
        tip: { en: '💡 Get 2 sticks (e.g., 2×8GB) for dual-channel — faster than 1×16GB!', id: '💡 Dapatkan 2 stick (mis., 2×8GB) untuk dual-channel — lebih cepat dari 1×16GB!' },
        image: null,
      },
      {
        emoji: '⚡',
        title: { en: 'SSD — Non-Negotiable for the OS', id: 'SSD — Wajib untuk OS' },
        body: {
          en: "HDD for Windows: 60-120 second boot, slow app launches, constant stuttering 🐌. SSD for Windows: 5-10 second boot, instant launches, smooth experience 🚀. The difference is night and day! Use SSD for OS + programs. Add secondary HDD only for bulk media/document storage. Never put Windows on HDD in 2024!",
          id: 'HDD untuk Windows: boot 60-120 detik, peluncuran aplikasi lambat, stuttering terus-menerus 🐌. SSD untuk Windows: boot 5-10 detik, peluncuran instan, pengalaman mulus 🚀. Perbedaannya sangat drastis! Gunakan SSD untuk OS + program. Tambahkan HDD sekunder hanya untuk penyimpanan media/dokumen massal. Jangan pernah taruh Windows di HDD di tahun 2024!',
        },
        tip: { en: '🚀 SATA SSD vs NVMe SSD = same FPS but NVMe loads games faster!', id: '🚀 SATA SSD vs NVMe SSD = FPS sama tapi NVMe memuat game lebih cepat!' },
        image: null,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  Legacy IDs (backward compatibility)
  // ─────────────────────────────────────────────────────────────
  mission_001: {
    slides: [
      {
        emoji: '🔌',
        title: { en: 'What Is a Power Cable?', id: 'Apa Itu Kabel Power?' },
        body: {
          en: "A power cable is like a straw for electricity ⚡. The computer drinks electricity through this straw to wake up. No straw = no power = no turning on!",
          id: 'Kabel power itu seperti sedotan untuk listrik ⚡. Komputer meminum listrik melalui sedotan ini agar bisa menyala. Tanpa sedotan = tanpa listrik = tidak bisa nyala!',
        },
        tip: { en: '💡 Always check the power cable FIRST!', id: '💡 Selalu periksa kabel power DULU!' },
        image: null,
      },
      {
        emoji: '🔎',
        title: { en: 'How to Check', id: 'Cara Memeriksa' },
        body: {
          en: "Push the cable gently at both ends — the PC side and the wall socket. Both must be firmly plugged in. Like making sure both ends of a garden hose are attached before turning on the water! 🪣",
          id: 'Dorong kabel perlahan di kedua ujungnya — sisi PC dan colokan dinding. Keduanya harus terpasang kuat. Seperti memastikan kedua ujung selang terpasang sebelum membuka air! 🪣',
        },
        tip: { en: '🚀 Ready? Let\'s fix it!', id: '🚀 Siap? Ayo perbaiki!' },
        image: null,
      },
    ],
  },

  mission_002: {
    slides: [
      {
        emoji: '📶',
        title: { en: 'How Does Internet Work?', id: 'Bagaimana Internet Bekerja?' },
        body: {
          en: "The internet is like a giant invisible pipe 🪣 carrying information. Your router is the tap. If the tap is off or blocked — no internet!",
          id: 'Internet itu seperti pipa tak kasat mata yang sangat besar 🪣 yang mengalirkan informasi. Router-mu adalah kerannya. Jika keran mati atau tersumbat — tidak ada internet!',
        },
        tip: { en: '💡 Restart the router — 30 seconds off, then back on!', id: '💡 Restart router — matikan 30 detik, lalu nyalakan kembali!' },
        image: null,
      },
    ],
  },

  mission_003: {
    slides: [
      {
        emoji: '🌡️',
        title: { en: 'Why Does a PC Shut Down Randomly?', id: 'Kenapa PC Mati Sendiri?' },
        body: {
          en: "If a PC gets TOO HOT — it shuts itself down to avoid damage. Like a kettle with a safety switch! Clean the fans and it'll be fine. 🌬️",
          id: 'Jika PC terlalu PANAS — ia mati sendiri untuk menghindari kerusakan. Seperti ketel dengan sakelar keamanan! Bersihkan kipas dan semuanya akan baik-baik saja. 🌬️',
        },
        tip: { en: '💡 Dust = enemy of cooling. Clean every 6 months!', id: '💡 Debu = musuh pendinginan. Bersihkan setiap 6 bulan!' },
        image: null,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  TIER 3
  // ─────────────────────────────────────────────────────────────

  't3_001': { slides: [ { emoji: '💙', title: { en: 'What Is a Blue Screen (BSOD)?', id: 'Apa Itu Blue Screen (BSOD)?' }, body: { en: "BSOD = Blue Screen of Death. When Windows hits a problem it can't fix, it stops everything and shows a blue screen 💙 — like a teacher yelling 'STOP CLASS!' It's protecting you from bigger damage!", id: 'BSOD = Blue Screen of Death. Saat Windows mengalami masalah yang tidak bisa diperbaiki, ia menghentikan segalanya dan menampilkan layar biru 💙 — seperti guru berteriak "HENTIKAN KELAS!" Ia melindungimu dari kerusakan yang lebih besar!' }, tip: { en: '💡 BSOD always shows an error code — that code is your clue!', id: '💡 BSOD selalu menampilkan kode error — kode itu adalah petunjukmu!' }, image: null }, { emoji: '🔍', title: { en: 'Reading the Error Code', id: 'Membaca Kode Error' }, body: { en: "Every BSOD has a STOP code. Google it! Most causes: bad RAM, outdated driver, or corrupted Windows file. Take a photo of the screen before it restarts — that code is your roadmap to the fix! 🗺️", id: 'Setiap BSOD punya kode STOP. Cari di Google! Penyebab umum: RAM buruk, driver usang, atau file Windows rusak. Foto layar sebelum restart — kode itu adalah peta jalan menuju perbaikanmu! 🗺️' }, tip: { en: '💡 Event Viewer shows BSOD history even after restart!', id: '💡 Event Viewer menampilkan riwayat BSOD bahkan setelah restart!' }, image: null }, { emoji: '🛠️', title: { en: 'Fixing BSOD', id: 'Memperbaiki BSOD' }, body: { en: "Steps: 1) Note error code. 2) Run 'sfc /scannow' in Admin CMD. 3) Update or rollback latest driver. 4) Run memory test if RAM suspected. SFC = Windows self-repair tool — very powerful! ✨", id: 'Langkah: 1) Catat kode error. 2) Jalankan "sfc /scannow" di CMD Admin. 3) Update atau rollback driver terbaru. 4) Jalankan tes memori jika RAM dicurigai. SFC = alat perbaikan diri Windows — sangat kuat! ✨' }, tip: { en: '🚀 sfc /scannow fixes most Windows file corruption issues!', id: '🚀 sfc /scannow memperbaiki sebagian besar masalah korupsi file Windows!' }, image: null } ] },

  't3_002': { slides: [ { emoji: '🐌', title: { en: 'Why Does Windows Start So Slow?', id: 'Kenapa Windows Mulai Sangat Lambat?' }, body: { en: "Startup bloatware = apps that load automatically when Windows starts! Like 20 people talking at once when you wake up 😩. Each wastes RAM and CPU before you do anything. Time to clean them up!", id: 'Bloatware startup = aplikasi yang otomatis berjalan saat Windows mulai! Seperti 20 orang berbicara sekaligus saat kamu bangun 😩. Setiap aplikasi membuang RAM dan CPU sebelum kamu melakukan apa pun. Saatnya membersihkannya!' }, tip: { en: '💡 Chrome, Discord, Spotify all love to auto-start!', id: '💡 Chrome, Discord, Spotify semua suka auto-start!' }, image: null }, { emoji: '⚡', title: { en: 'Disabling Startup Apps', id: 'Menonaktifkan Aplikasi Startup' }, body: { en: "Ctrl+Shift+Esc → Startup tab. See ALL apps starting with Windows. Right-click unneeded ones → Disable. They still work — just won't auto-start. Boot time can drop from 60s to 10s! 🚀", id: 'Ctrl+Shift+Esc → tab Startup. Lihat SEMUA aplikasi yang mulai dengan Windows. Klik kanan yang tidak diperlukan → Nonaktifkan. Tetap bisa dipakai — hanya tidak otomatis mulai. Waktu boot bisa turun dari 60d ke 10d! 🚀' }, tip: { en: '💡 Disable = safe. Does NOT delete the app!', id: '💡 Nonaktifkan = aman. TIDAK menghapus aplikasi!' }, image: null }, { emoji: '🏎️', title: { en: 'Your Mission', id: 'Misi Kamu' }, body: { en: "Find and disable unnecessary startup programs on this PC. Focus on games, chat apps, media players. Always KEEP antivirus and Windows services running. Fewer starters = faster boot = happy user! 😊", id: 'Temukan dan nonaktifkan program startup yang tidak perlu di PC ini. Fokus pada game, aplikasi chat, pemutar media. Selalu PERTAHANKAN antivirus dan layanan Windows. Lebih sedikit program startup = boot lebih cepat = pengguna senang! 😊' }, tip: { en: '🚀 Fast boot = first impression users have every morning!', id: '🚀 Boot cepat = kesan pertama yang pengguna rasakan setiap pagi!' }, image: null } ] },

  't3_003': { slides: [ { emoji: '🎮', title: { en: 'What Is a Driver?', id: 'Apa Itu Driver?' }, body: { en: "A driver is a translator 🗣️ between hardware and Windows. GPU driver tells Windows how to use its graphics power. Without the driver — Windows can't talk to the hardware, like two people speaking different languages!", id: 'Driver adalah penerjemah 🗣️ antara hardware dan Windows. Driver GPU memberi tahu Windows cara menggunakan kekuatan grafisnya. Tanpa driver — Windows tidak bisa berkomunikasi dengan hardware, seperti dua orang berbicara bahasa berbeda!' }, tip: { en: '💡 Yellow ⚠️ in Device Manager = missing or broken driver!', id: '💡 ⚠️ Kuning di Device Manager = driver hilang atau rusak!' }, image: null }, { emoji: '🔄', title: { en: 'How to Reinstall a Driver', id: 'Cara Instal Ulang Driver' }, body: { en: "1) Find device in Device Manager (Win+X). 2) Right-click → Uninstall Device. 3) Download latest driver from manufacturer's official website. 4) Run installer. 5) Restart. The device wakes up properly! 🎉", id: '1) Temukan perangkat di Device Manager (Win+X). 2) Klik kanan → Hapus Instalasi. 3) Unduh driver terbaru dari situs resmi produsen. 4) Jalankan installer. 5) Restart. Perangkat berfungsi dengan benar! 🎉' }, tip: { en: '💡 Always download from the OFFICIAL manufacturer website only!', id: '💡 Selalu unduh dari situs RESMI produsen saja!' }, image: null }, { emoji: '✅', title: { en: 'Test After Install', id: 'Uji Setelah Instalasi' }, body: { en: "After reinstalling: test the device. Sound working? Screen right? Internet connecting? Pass = correct driver! Fail = back to Device Manager. Windows Update can also install many drivers automatically! 🔍", id: 'Setelah instal ulang: uji perangkat. Suara berfungsi? Layar benar? Internet terhubung? Lulus = driver benar! Gagal = kembali ke Device Manager. Windows Update juga bisa menginstal banyak driver secara otomatis! 🔍' }, tip: { en: '🚀 Driver date = check if newer version exists on manufacturer site!', id: '🚀 Tanggal driver = periksa apakah versi lebih baru ada di situs produsen!' }, image: null } ] },

  't3_004': { slides: [ { emoji: '💀', title: { en: 'Corrupted System Files', id: 'File Sistem Rusak' }, body: { en: "Windows system files are the rules of a board game 🎲. If pages get ripped out — the game can't be played. Apps crash, Windows behaves weirdly. Causes: power cut during update, virus, bad shutdown!", id: 'File sistem Windows adalah aturan permainan papan 🎲. Jika halaman robek — permainan tidak bisa dimainkan. Aplikasi crash, Windows berperilaku aneh. Penyebab: listrik mati saat update, virus, shutdown yang salah!' }, tip: { en: '💡 "Corrupted" = damaged, like a torn book page!', id: '💡 "Rusak" = hancur, seperti halaman buku yang robek!' }, image: null }, { emoji: '🩺', title: { en: 'SFC — Windows Self-Doctor', id: 'SFC — Dokter Diri Windows' }, body: { en: "SFC (System File Checker) scans all Windows files and repairs corrupted ones. Like a spell-checker for Windows 📝. Run: 'sfc /scannow' in Admin CMD. Wait ~10 minutes. Magic! ✨ It finds and replaces bad files automatically.", id: 'SFC (System File Checker) memindai semua file Windows dan memperbaiki yang rusak. Seperti spell-checker untuk Windows 📝. Jalankan: "sfc /scannow" di CMD Admin. Tunggu ~10 menit. Ajaib! ✨ Secara otomatis menemukan dan menggantikan file yang buruk.' }, tip: { en: '💡 Must run CMD as Administrator for sfc to work!', id: '💡 Harus jalankan CMD sebagai Administrator agar sfc berfungsi!' }, image: null }, { emoji: '🏥', title: { en: 'DISM — The Heavy Artillery', id: 'DISM — Artileri Berat' }, body: { en: "If SFC fails: 'DISM /Online /Cleanup-Image /RestoreHealth'. Downloads fresh Windows files from Microsoft to replace broken ones. Like getting spare parts delivered! Best order: DISM first, then SFC. 📦", id: 'Jika SFC gagal: "DISM /Online /Cleanup-Image /RestoreHealth". Mengunduh file Windows segar dari Microsoft untuk menggantikan yang rusak. Seperti mendapatkan suku cadang! Urutan terbaik: DISM dulu, kemudian SFC. 📦' }, tip: { en: '🚀 DISM needs internet to download replacement files!', id: '🚀 DISM butuh internet untuk mengunduh file pengganti!' }, image: null } ] },

  't3_005': { slides: [ { emoji: '👤', title: { en: 'Windows User Accounts', id: 'Akun Pengguna Windows' }, body: { en: "User accounts are like name badges at an office 🏢. Each person has their own badge — their own files, settings, and permissions. Admin badge = master key. Standard badge = limited access. Right tool for right person!", id: 'Akun pengguna seperti lencana nama di kantor 🏢. Setiap orang punya lencana sendiri — file, pengaturan, dan izin mereka sendiri. Lencana Admin = kunci utama. Lencana Standar = akses terbatas. Alat yang tepat untuk orang yang tepat!' }, tip: { en: '💡 Give employees Standard accounts to protect system settings!', id: '💡 Beri karyawan akun Standar untuk melindungi pengaturan sistem!' }, image: null }, { emoji: '🔐', title: { en: 'Creating Accounts Properly', id: 'Membuat Akun dengan Benar' }, body: { en: "Settings → Accounts → Add someone. Strong password, correct type (Admin vs Standard). For offices: Standard is safer for most employees. Only IT staff needs Admin accounts!", id: 'Pengaturan → Akun → Tambahkan seseorang. Password kuat, jenis yang benar (Admin vs Standar). Untuk kantor: Standar lebih aman untuk kebanyakan karyawan. Hanya staf IT yang butuh akun Admin!' }, tip: { en: '💡 Never share Admin password widely — only IT team!', id: '💡 Jangan bagikan password Admin secara luas — hanya tim IT!' }, image: null }, { emoji: '🗂️', title: { en: 'User Data & Profiles', id: 'Data & Profil Pengguna' }, body: { en: "Each account gets its own folder in C:/Users/Name — their desktop, documents, downloads all separate. Delete the account = delete their room too! Always backup before removing accounts. 📂", id: 'Setiap akun mendapat folder sendiri di C:/Users/Nama — desktop, dokumen, unduhan semuanya terpisah. Hapus akun = hapus kamar mereka juga! Selalu backup sebelum menghapus akun. 📂' }, tip: { en: '🚀 Document all accounts — who they are and why they exist!', id: '🚀 Dokumentasikan semua akun — siapa mereka dan kenapa ada!' }, image: null } ] },

  't3_006': { slides: [ { emoji: '🔄', title: { en: 'Why Windows Update Gets Stuck', id: 'Kenapa Windows Update Macet' }, body: { en: "Updates are like game patches 🎮 — big downloads that improve the system. If internet cuts mid-download or update conflicts with old file = STUCK. Progress bar freezes. Need to fix the update pipeline!", id: 'Update seperti patch game 🎮 — unduhan besar yang meningkatkan sistem. Jika internet terputus di tengah unduhan atau update berkonflik dengan file lama = MACET. Progress bar membeku. Perlu memperbaiki pipeline update!' }, tip: { en: '💡 Let updates run overnight with PC plugged in!', id: '💡 Biarkan update berjalan semalaman dengan PC terpasang!' }, image: null }, { emoji: '🛠️', title: { en: 'How to Unstick It', id: 'Cara Membuka Kemacetan' }, body: { en: "Fix: 1) Run Windows Update Troubleshooter (Settings → Troubleshoot). 2) Stop Windows Update service → delete C:/Windows/SoftwareDistribution → restart service. 3) Retry update. Works most of the time! 🔧", id: 'Perbaikan: 1) Jalankan Windows Update Troubleshooter (Pengaturan → Troubleshoot). 2) Hentikan layanan Windows Update → hapus C:/Windows/SoftwareDistribution → restart layanan. 3) Coba update lagi. Biasanya berhasil! 🔧' }, tip: { en: '💡 SoftwareDistribution = update download cache. Safe to clear!', id: '💡 SoftwareDistribution = cache unduhan update. Aman untuk dihapus!' }, image: null }, { emoji: '🛡️', title: { en: 'Why Updates Are Critical', id: 'Kenapa Update Sangat Penting' }, body: { en: "Skipping updates = leaving security holes open 🧱. Hackers exploit known vulnerabilities in unpatched Windows. A company that skips updates = front door left unlocked. Update = digital security guard! 🔐", id: 'Melewatkan update = membiarkan lubang keamanan terbuka 🧱. Hacker mengeksploitasi kerentanan yang diketahui di Windows yang tidak diperbarui. Perusahaan yang melewatkan update = pintu depan tidak terkunci. Update = penjaga keamanan digital! 🔐' }, tip: { en: '🚀 Set updates to run outside business hours!', id: '🚀 Atur update berjalan di luar jam kerja!' }, image: null } ] },

  't3_007': { slides: [ { emoji: '🖨️', title: { en: 'Printer Drivers — The Translator', id: 'Driver Printer — Sang Penerjemah' }, body: { en: "Printer driver = translator between Windows and printer 🗣️. Wrong driver = garbled instructions = printer prints garbage or nothing at all. Always use the EXACT model driver from the manufacturer's site!", id: 'Driver printer = penerjemah antara Windows dan printer 🗣️. Driver salah = instruksi tidak jelas = printer mencetak omong kosong atau tidak mencetak sama sekali. Selalu gunakan driver model TEPAT dari situs produsen!' }, tip: { en: '💡 Model number is on a sticker on the printer!', id: '💡 Nomor model ada di stiker pada printer!' }, image: null }, { emoji: '⚠️', title: { en: 'Wrong Driver Symptoms', id: 'Gejala Driver Salah' }, body: { en: "Signs of wrong driver: prints random characters, prints blank pages, or 'offline' even when connected. Fix: Device Manager → uninstall driver → reinstall correct one from manufacturer's website. Then test print! 🖨️", id: 'Tanda driver salah: mencetak karakter acak, mencetak halaman kosong, atau "offline" meski terhubung. Perbaikan: Device Manager → hapus driver → instal ulang yang benar dari situs produsen. Lalu uji cetak! 🖨️' }, tip: { en: '💡 Check printer model: exact match needed for driver!', id: '💡 Periksa model printer: perlu kecocokan tepat untuk driver!' }, image: null }, { emoji: '✅', title: { en: 'Test & Verify', id: 'Uji & Verifikasi' }, body: { en: "After installing: right-click printer → Printer Properties → Print Test Page. Clean result = correct driver! Also check printer shows 'Ready' not 'Error' in Windows Printers list. Job done! ✅", id: 'Setelah instalasi: klik kanan printer → Properti Printer → Cetak Halaman Uji. Hasil bersih = driver benar! Juga periksa printer menampilkan "Siap" bukan "Error". Pekerjaan selesai! ✅' }, tip: { en: '🚀 Save the correct driver file for future reinstalls!', id: '🚀 Simpan file driver yang benar untuk instal ulang di masa depan!' }, image: null } ] },

  't3_008': { slides: [ { emoji: '🔒', title: { en: 'Windows Permissions', id: 'Izin Windows' }, body: { en: "Permissions are like keys in a hotel 🏨. Some keys open only your room (Standard). Some open all rooms (Admin). 'Access Denied' = you're using the wrong key! You need higher permission for that door.", id: 'Izin seperti kunci di hotel 🏨. Beberapa kunci hanya membuka kamarmu (Standar). Beberapa membuka semua kamar (Admin). "Akses Ditolak" = kamu menggunakan kunci yang salah! Kamu butuh izin lebih tinggi untuk pintu itu.' }, tip: { en: '💡 Right-click → "Run as Administrator" solves many permission errors!', id: '💡 Klik kanan → "Jalankan sebagai Administrator" menyelesaikan banyak error izin!' }, image: null }, { emoji: '📂', title: { en: 'Fixing Folder Permissions', id: 'Memperbaiki Izin Folder' }, body: { en: "Right-click folder → Properties → Security tab → Edit → Add your user → check 'Full Control'. Now you own it! Like getting a master key made just for you 🗝️. Be careful — don't give Full Control to everyone!", id: 'Klik kanan folder → Properti → tab Keamanan → Edit → Tambahkan penggunamu → centang "Kontrol Penuh". Sekarang kamu memilikinya! Seperti mendapatkan kunci induk 🗝️. Hati-hati — jangan berikan Kontrol Penuh ke semua orang!' }, tip: { en: '💡 Least privilege: give minimum permission needed, nothing more!', id: '💡 Hak minimum: berikan izin minimum yang diperlukan, tidak lebih!' }, image: null }, { emoji: '🛡️', title: { en: 'Security Best Practice', id: 'Praktik Terbaik Keamanan' }, body: { en: "Security rule: Read only = just reading. Modify = can edit. Full Control = can delete too. Match the permission to the job. Document permission changes — who got access to what and when. 📋", id: 'Aturan keamanan: Baca saja = hanya membaca. Modifikasi = bisa mengedit. Kontrol Penuh = bisa menghapus juga. Cocokkan izin dengan pekerjaan. Dokumentasikan perubahan izin — siapa mendapat akses ke apa dan kapan. 📋' }, tip: { en: '🚀 Audit permissions quarterly — remove what is no longer needed!', id: '🚀 Audit izin setiap kuartal — hapus yang sudah tidak diperlukan!' }, image: null } ] },

  't3_009': { slides: [ { emoji: '🔐', title: { en: 'Account Lockouts', id: 'Akun Terkunci' }, body: { en: "After too many wrong password attempts, Windows locks the account 🔒 — like a safe that seals after 3 wrong codes. It protects against hackers. But sometimes employees just forgot their password!", id: 'Setelah terlalu banyak percobaan password yang salah, Windows mengunci akun 🔒 — seperti brankas yang menutup setelah 3 kode salah. Ini melindungi dari hacker. Tapi terkadang karyawan hanya lupa password mereka!' }, tip: { en: '💡 Account Policy sets how many attempts = lockout!', id: '💡 Kebijakan Akun mengatur berapa percobaan = kunci!' }, image: null }, { emoji: '🔑', title: { en: 'Unlocking the Account', id: 'Membuka Kunci Akun' }, body: { en: "Computer Management → Local Users & Groups → Users → right-click locked user → Properties → uncheck 'Account is locked out'. Then reset their password. Done! They can log in fresh. 🆕", id: 'Manajemen Komputer → Pengguna & Grup Lokal → Pengguna → klik kanan pengguna terkunci → Properti → hapus centang "Akun dikunci". Lalu reset password mereka. Selesai! Mereka bisa login dengan segar. 🆕' }, tip: { en: '💡 In Active Directory domain: use ADUC to unlock domain accounts!', id: '💡 Di domain Active Directory: gunakan ADUC untuk membuka kunci akun domain!' }, image: null }, { emoji: '🛡️', title: { en: 'Preventing Future Lockouts', id: 'Mencegah Lockout Berulang' }, body: { en: "Teach users: use password managers 🔑. Set lockout policy to 5-10 attempts (3 is too strict). Enable self-service password reset if possible. Good prevention = fewer IT calls! 📞", id: 'Ajarkan pengguna: gunakan manajer password 🔑. Atur kebijakan lockout ke 5-10 percobaan (3 terlalu ketat). Aktifkan reset password mandiri jika memungkinkan. Pencegahan yang baik = lebih sedikit panggilan IT! 📞' }, tip: { en: '🚀 Repeated lockouts = possible hack attempt. Log and investigate!', id: '🚀 Lockout berulang = kemungkinan percobaan hack. Catat dan selidiki!' }, image: null } ] },

  't3_010': { slides: [ { emoji: '🌐', title: { en: 'What Is a Domain?', id: 'Apa Itu Domain?' }, body: { en: "A domain is a company kingdom 👑 where a Domain Controller (server) is the king. It controls who can login to which PC and what they can access. All PCs are 'citizens' managed centrally. Much better than everyone being independent!", id: 'Domain adalah kerajaan perusahaan 👑 di mana Domain Controller (server) adalah rajanya. Ia mengontrol siapa yang bisa login ke PC mana dan apa yang bisa diakses. Semua PC adalah "warga" yang dikelola secara terpusat. Jauh lebih baik daripada semua orang independen!' }, tip: { en: '💡 Domain = centralized control. Workgroup = every PC independent!', id: '💡 Domain = kontrol terpusat. Workgroup = setiap PC independen!' }, image: null }, { emoji: '🏢', title: { en: 'Joining a PC to the Domain', id: 'Menggabungkan PC ke Domain' }, body: { en: "PC → System Properties → Change → Domain → type domain name → enter admin credentials → restart. PC is now part of the kingdom! Domain users can login with company credentials. 👑", id: 'PC → Properti Sistem → Ubah → Domain → ketik nama domain → masukkan kredensial admin → restart. PC sekarang bagian dari kerajaan! Pengguna domain bisa login dengan kredensial perusahaan. 👑' }, tip: { en: '💡 PC must be on company network to join domain!', id: '💡 PC harus berada di jaringan perusahaan untuk bergabung domain!' }, image: null }, { emoji: '✅', title: { en: 'Verify the Join', id: 'Verifikasi Bergabung' }, body: { en: "After joining: login with COMPANY\\username format. Check System Properties — should show the domain name. Test accessing shared drives. Group Policy applies automatically. Welcome to the kingdom! 🎉", id: 'Setelah bergabung: login dengan format PERUSAHAAN\\username. Periksa Properti Sistem — harus menampilkan nama domain. Uji akses drive bersama. Group Policy berlaku secara otomatis. Selamat datang di kerajaan! 🎉' }, tip: { en: '🚀 Group Policy = kingdom rules that apply to all citizens automatically!', id: '🚀 Group Policy = aturan kerajaan yang berlaku untuk semua warga secara otomatis!' }, image: null } ] },

  't3_011': { slides: [ { emoji: '📧', title: { en: 'How Email Sync Works', id: 'Cara Sinkronisasi Email Bekerja' }, body: { en: "Outlook and email server talk constantly — like a walkie-talkie 📻 always on. New email on server → Outlook receives it. Connection breaks = no sync. Error in mailbox = sync stops. Need to fix the connection!", id: 'Outlook dan server email berkomunikasi terus-menerus — seperti walkie-talkie 📻 yang selalu menyala. Email baru di server → Outlook menerimanya. Koneksi putus = tidak ada sinkronisasi. Error di mailbox = sinkronisasi berhenti. Perlu memperbaiki koneksi!' }, tip: { en: '💡 Bottom right of Outlook shows "Connected" when syncing properly!', id: '💡 Kanan bawah Outlook menampilkan "Terhubung" saat sinkronisasi dengan benar!' }, image: null }, { emoji: '🔧', title: { en: 'Common Fix Steps', id: 'Langkah Perbaikan Umum' }, body: { en: "1) Check internet. 2) File → Account Settings → verify server address. 3) Remove and re-add the account. 4) Repair Office installation. 5) Delete Outlook .ost cache file — Outlook rebuilds from server automatically! 🔄", id: '1) Periksa internet. 2) File → Pengaturan Akun → verifikasi alamat server. 3) Hapus dan tambahkan kembali akun. 4) Perbaiki instalasi Office. 5) Hapus file cache Outlook .ost — Outlook membangun ulang dari server secara otomatis! 🔄' }, tip: { en: '💡 .ost file location: C:/Users/Name/AppData/Local/Microsoft/Outlook!', id: '💡 Lokasi file .ost: C:/Users/Nama/AppData/Local/Microsoft/Outlook!' }, image: null }, { emoji: '☁️', title: { en: 'Office 365 vs Exchange', id: 'Office 365 vs Exchange' }, body: { en: "Office 365 = cloud email (Microsoft manages it). Local Exchange = company's own server. Both use Outlook but configured differently. Cloud is easier — Microsoft handles the infrastructure! Check status.office.com if M365 is down. ☁️", id: 'Office 365 = email cloud (Microsoft mengelola). Exchange Lokal = server email perusahaan. Keduanya menggunakan Outlook tapi dikonfigurasi berbeda. Cloud lebih mudah — Microsoft menangani infrastruktur! Periksa status.office.com jika M365 down. ☁️' }, tip: { en: '🚀 Always check if it is a server issue before blaming Outlook!', id: '🚀 Selalu periksa apakah ini masalah server sebelum menyalahkan Outlook!' }, image: null } ] },

  't3_012': { slides: [ { emoji: '📁', title: { en: 'Shared Drives — Office Filing Cabinet', id: 'Shared Drive — Lemari Arsip Kantor' }, body: { en: "A shared drive is like a filing cabinet 🗄️ everyone uses together. Files go in, anyone with the right key (permission) can access. Wrong key = Access Denied! IT controls who gets which key.", id: 'Shared drive itu seperti lemari arsip 🗄️ yang semua orang gunakan bersama. File masuk, siapa pun dengan kunci yang benar (izin) bisa mengakses. Kunci salah = Akses Ditolak! IT mengontrol siapa mendapat kunci mana.' }, tip: { en: '💡 Shared drives live on a server, not individual PCs!', id: '💡 Shared drive berada di server, bukan PC individual!' }, image: null }, { emoji: '🔑', title: { en: 'Why Access Gets Denied', id: 'Kenapa Akses Ditolak' }, body: { en: "Reasons: 1) User not in correct security group. 2) Share permissions don't match NTFS permissions. 3) Account reset and lost group membership. All three must align for access to work! 🔗", id: 'Alasan: 1) Pengguna tidak ada di grup keamanan yang benar. 2) Izin share tidak cocok izin NTFS. 3) Akun direset dan kehilangan keanggotaan grup. Ketiganya harus selaras agar akses berfungsi! 🔗' }, tip: { en: '💡 Both Share permissions AND NTFS permissions must allow access!', id: '💡 Baik izin Share DAN izin NTFS harus mengizinkan akses!' }, image: null }, { emoji: '🛠️', title: { en: 'Fixing Shared Drive Access', id: 'Memperbaiki Akses Shared Drive' }, body: { en: "Right-click folder → Properties → Sharing → Permissions: add user/group. Also check Security tab (NTFS). Both must match! Test by logging in as the affected user after fixing. ✅", id: 'Klik kanan folder → Properti → Berbagi → Izin: tambahkan pengguna/grup. Juga periksa tab Keamanan (NTFS). Keduanya harus cocok! Uji dengan login sebagai pengguna yang terpengaruh setelah perbaikan. ✅' }, tip: { en: '🚀 Map shared drive with net use for easy daily access!', id: '🚀 Petakan shared drive dengan net use untuk akses mudah sehari-hari!' }, image: null } ] },

  // T3-013: Group Policy Editor Basics
  't3_013': {
    slides: [
      { emoji: '👑', title: { en: 'What Is Group Policy?', id: 'Apa Itu Group Policy?' }, body: { en: "Group Policy = a rulebook the Domain Controller pushes to ALL domain PCs at once 📋. Instead of visiting 80 PCs one by one, write the rule once → it applies to everyone automatically. Examples: enforce screen lock, block USB drives, restrict Control Panel.", id: 'Group Policy = buku aturan yang didorong Domain Controller ke SEMUA PC domain sekaligus 📋. Daripada mengunjungi 80 PC satu per satu, tulis aturan sekali → berlaku otomatis. Contoh: paksa kunci layar, blokir drive USB, batasi Control Panel.' }, tip: { en: '💡 One GPO = rules for 1000 PCs in minutes!', id: '💡 Satu GPO = aturan untuk 1000 PC dalam menit!' }, image: null },
      { emoji: '🗂️', title: { en: 'Computer vs User Configuration', id: 'Konfigurasi Komputer vs Pengguna' }, body: { en: "Two halves: Computer Configuration = rules applied to the PC regardless of who logs in (firewall, drive restrictions). User Configuration = rules applied to the USER regardless of which PC they use (desktop wallpaper, browser settings). Always pick the correct half! 🎯", id: 'Dua bagian: Computer Configuration = aturan ke PC terlepas siapa yang login (firewall, batasan drive). User Configuration = aturan ke PENGGUNA terlepas PC mana yang dipakai (wallpaper, browser). Selalu pilih bagian yang tepat! 🎯' }, tip: { en: '💡 Screen lock = Computer Config. Desktop wallpaper = User Config!', id: '💡 Kunci layar = Computer Config. Wallpaper = User Config!' }, image: null },
      { emoji: '⚡', title: { en: 'gpupdate — Apply Rules Instantly', id: 'gpupdate — Terapkan Aturan Seketika' }, body: { en: "After creating a policy, run gpupdate /force on any client PC to apply immediately — no waiting for next login or 90-min refresh cycle. Use gpresult /r to see which policies are currently applied to a PC. Essential commands every IT admin must know! 🔍", id: 'Setelah membuat policy, jalankan gpupdate /force di PC klien untuk menerapkan segera — tidak perlu menunggu login berikutnya atau siklus refresh 90 menit. Gunakan gpresult /r untuk melihat policy yang aktif di PC. Perintah penting yang harus diketahui setiap admin IT! 🔍' }, tip: { en: '🚀 gpresult /r — shows all active Group Policies on a PC!', id: '🚀 gpresult /r — tampilkan semua Group Policy aktif di PC!' }, image: null },
    ],
  },

  // T3-014: Event Viewer Log Analysis
  't3_014': {
    slides: [
      { emoji: '📖', title: { en: "Event Viewer — PC's Black Box", id: 'Event Viewer — Kotak Hitam PC' }, body: { en: "Event Viewer records EVERYTHING Windows does: crashes, errors, logins, service starts/stops 🗂️. Like the black box on an airplane — even after a crash and restart, the log is preserved. Use it to find out EXACTLY what happened and when.", id: 'Event Viewer merekam SEMUA yang dilakukan Windows: crash, error, login, start/stop layanan 🗂️. Seperti kotak hitam pesawat — bahkan setelah crash dan restart, log tersimpan. Gunakan untuk mengetahui PERSIS apa yang terjadi dan kapan.' }, tip: { en: '💡 Win+R → eventvwr.msc — opens Event Viewer instantly!', id: '💡 Win+R → eventvwr.msc — membuka Event Viewer seketika!' }, image: null },
      { emoji: '🔴', title: { en: 'Understanding Event Levels', id: 'Memahami Level Event' }, body: { en: "Severity levels: Critical 💀 = system failure. Error ❌ = something failed. Warning ⚠️ = potential problem. Information ℹ️ = normal activity. Filter by Critical & Error first when troubleshooting — Information events can be thousands per day and are rarely useful! 🎯", id: 'Level keparahan: Critical 💀 = kegagalan sistem. Error ❌ = sesuatu gagal. Warning ⚠️ = potensi masalah. Information ℹ️ = aktivitas normal. Filter Critical & Error dulu — event Information bisa ribuan per hari dan jarang berguna! 🎯' }, tip: { en: '💡 Event ID 41 Kernel-Power = unexpected shutdown (crash or power loss)!', id: '💡 Event ID 41 Kernel-Power = shutdown tak terduga (crash atau kehilangan daya)!' }, image: null },
      { emoji: '🔍', title: { en: 'Finding the Crash Cause', id: 'Menemukan Penyebab Crash' }, body: { en: "Navigate: Windows Logs → System → Filter Current Log → Level: Critical & Error → set date to when crash happened. Look for the event just BEFORE the crash — the timestamp sequence tells the story! Common: Event ID 6008 = unexpected shutdown, ID 41 = power failure, ID 1001 = BSOD dump. 🕵️", id: 'Navigasi: Windows Logs → System → Filter Current Log → Level: Critical & Error → tanggal saat crash. Cari event tepat SEBELUM crash — urutan timestamp menceritakan kisahnya! Umum: Event ID 6008 = shutdown tak terduga, ID 41 = kegagalan daya, ID 1001 = dump BSOD. 🕵️' }, tip: { en: '🚀 Right-click event → Attach Task = auto-alert on next occurrence!', id: '🚀 Klik kanan event → Attach Task = peringatan otomatis saat terjadi lagi!' }, image: null },
    ],
  },

  // T3-015: Software Deployment to 30 PCs
  't3_015': {
    slides: [
      { emoji: '🤖', title: { en: 'Silent Installers — The IT Superpower', id: 'Silent Installer — Kekuatan Super IT' }, body: { en: "Silent installers install software with ZERO user interaction — no dialog boxes, no Next clicks 🤖. Most support flags: /silent, /S, /quiet, /norestart. Example: chrome_setup.exe /silent /install. Perfect for deploying to 30+ PCs without touching each one!", id: 'Silent installer menginstal perangkat lunak dengan NOL interaksi pengguna — tidak ada kotak dialog, tidak perlu klik Next 🤖. Sebagian besar mendukung flag: /silent, /S, /quiet, /norestart. Contoh: chrome_setup.exe /silent /install. Sempurna untuk deploy ke 30+ PC tanpa menyentuh satu per satu!' }, tip: { en: '💡 Check flags: run setup.exe --help to see all install options!', id: '💡 Periksa flag: jalankan setup.exe --help untuk melihat semua opsi install!' }, image: null },
      { emoji: '📜', title: { en: 'Batch Scripts — Chain Installs', id: 'Batch Script — Rangkai Instalasi' }, body: { en: "A .bat file is a list of commands that run automatically 📜. Example: 'start /wait chrome_setup.exe /silent && start /wait vlc_setup.exe /S'. The /wait flag waits for each install to finish before starting the next. Chain any number of installers! ALWAYS test on ONE PC first! 🔗", id: 'File .bat adalah daftar perintah yang berjalan otomatis 📜. Contoh: start /wait chrome_setup.exe /silent && start /wait vlc_setup.exe /S. Flag /wait menunggu setiap install selesai. Rangkai berapa pun installer! SELALU uji di SATU PC dulu! 🔗' }, tip: { en: '💡 One bug × 30 PCs = 30 broken installations. TEST FIRST!', id: '💡 Satu bug × 30 PC = 30 instalasi rusak. UJI DULU!' }, image: null },
      { emoji: '⏰', title: { en: 'Task Scheduler — Deploy While They Sleep', id: 'Task Scheduler — Deploy Saat Tidur' }, body: { en: "Task Scheduler runs your batch script at any time — like 2AM when users are gone 🌙. Benefits: zero disruption, PC is idle (installs faster), no accidental Cancel clicks. For labs: after school hours. For offices: after business hours. Check results at 7AM! ✅", id: 'Task Scheduler menjalankan batch script kapan saja — seperti pukul 2 pagi saat pengguna pergi 🌙. Manfaat: nol gangguan, PC idle (install lebih cepat), tidak ada klik Cancel tidak sengaja. Untuk lab: setelah jam sekolah. Untuk kantor: setelah jam kerja. Periksa hasilnya pukul 7 pagi! ✅' }, tip: { en: '🚀 Store installers on a network share — one update = all PCs get new version!', id: '🚀 Simpan installer di network share — satu update = semua PC dapat versi baru!' }, image: null },
    ],
  },

  // T3-016: Configure Remote Desktop Access
  't3_016': {
    slides: [
      { emoji: '🖥️', title: { en: 'What Is Remote Desktop (RDP)?', id: 'Apa Itu Remote Desktop (RDP)?' }, body: { en: "RDP lets you control another PC's screen over a network as if sitting right in front of it 🖱️. Your keyboard presses and mouse movements are sent to the remote PC in real-time. Uses port 3389. Perfect for WFH access, IT support, and server management!", id: 'RDP memungkinkan kamu mengontrol layar PC lain melalui jaringan seolah duduk di depannya 🖱️. Tekanan keyboard dan gerakan mouse dikirim ke PC jarak jauh secara real-time. Menggunakan port 3389. Sempurna untuk akses WFH, dukungan IT, dan manajemen server!' }, tip: { en: '💡 RDP uses port 3389 — remember this for firewall rules!', id: '💡 RDP menggunakan port 3389 — ingat ini untuk aturan firewall!' }, image: null },
      { emoji: '⚙️', title: { en: 'Enabling RDP on the Host PC', id: 'Mengaktifkan RDP di PC Host' }, body: { en: "On the PC you want to remote INTO: right-click This PC → Properties → Remote settings → Enable 'Allow remote connections' → click Select Users to add who can connect. Note the PC IP with ipconfig. PC must stay ON and not sleep to receive connections! 💡", id: 'Di PC yang ingin di-remote KE DALAMNYA: klik kanan This PC → Properti → Remote settings → Aktifkan Allow remote connections → klik Select Users. Catat IP PC dengan ipconfig. PC harus tetap MENYALA dan tidak tidur untuk menerima koneksi! 💡' }, tip: { en: '💡 Windows Home = cannot be RDP host. Needs Pro or Enterprise!', id: '💡 Windows Home = tidak bisa jadi host RDP. Butuh Pro atau Enterprise!' }, image: null },
      { emoji: '🛡️', title: { en: 'Secure RDP Best Practices', id: 'Praktik Terbaik RDP Aman' }, body: { en: "Opening RDP directly to internet = security risk ⚠️. Safer options: 1) VPN first → RDP over VPN (most secure). 2) Port forwarding only with strong password + NLA enabled. 3) Change RDP port from default 3389. Never use RDP without a STRONG password — bots scan for open port 3389 constantly! 🔒", id: 'Membuka RDP langsung ke internet = risiko keamanan ⚠️. Opsi lebih aman: 1) VPN dulu → RDP melalui VPN (paling aman). 2) Port forwarding hanya dengan password kuat + NLA. 3) Ubah port dari default 3389. Jangan pernah RDP tanpa password KUAT — bot terus memindai port 3389 terbuka! 🔒' }, tip: { en: '🚀 VPN + RDP is the gold standard for secure remote access!', id: '🚀 VPN + RDP adalah standar emas akses jarak jauh yang aman!' }, image: null },
    ],
  },

  // T3-017: Antivirus Deployment Policy
  't3_017': {
    slides: [
      { emoji: '🛡️', title: { en: 'Managed vs Individual Antivirus', id: 'Antivirus Terkelola vs Individual' }, body: { en: "Individual AV = each PC manages itself (impossible to monitor at scale 🤦). Managed/Enterprise AV = ONE central dashboard shows ALL 20/50/100 PC statuses 📊. IT sees: which PCs are protected, which had threats, which need updates — from one screen. Examples: Sophos, Bitdefender GravityZone, Microsoft Defender for Business.", id: 'AV Individual = setiap PC mengatur diri sendiri (mustahil dipantau dalam skala besar 🤦). AV Terkelola/Enterprise = SATU dashboard pusat tampilkan semua status 20/50/100 PC 📊. IT melihat semuanya dari satu layar. Contoh: Sophos, Bitdefender GravityZone, Microsoft Defender for Business.' }, tip: { en: '💡 Managed AV = push updates + policies to all PCs from one console!', id: '💡 AV Terkelola = dorong update + kebijakan ke semua PC dari satu konsol!' }, image: null },
      { emoji: '⏰', title: { en: 'Schedule Scans for Zero Disruption', id: 'Jadwalkan Scan Tanpa Gangguan' }, body: { en: "Full AV scans are CPU/disk intensive — schedule them when users aren't working! Best: 2AM–4AM weekdays. Set PCs to 'Wake for maintenance' so they wake, scan, and sleep again. This way users NEVER feel performance slowdowns. Real-time protection still runs 24/7! 💤", id: 'Scan AV penuh intensif CPU/disk — jadwalkan saat pengguna tidak bekerja! Terbaik: pukul 2–4 pagi hari kerja. Atur PC ke Wake for maintenance agar bangun, scan, lalu tidur lagi. Pengguna TIDAK PERNAH merasakan perlambatan. Perlindungan real-time tetap jalan 24/7! 💤' }, tip: { en: '💡 Real-time protection = always on. Full scan = scheduled off-hours!', id: '💡 Perlindungan real-time = selalu aktif. Scan penuh = jadwalkan di luar jam kerja!' }, image: null },
      { emoji: '⚠️', title: { en: 'Handling False Positives', id: 'Menangani False Positive' }, body: { en: "False positive = AV incorrectly flags a safe file as threat 😱. Common with custom business software. Correct response: 1) Verify file is legitimate with the software vendor. 2) Restore from quarantine. 3) Add to AV exclusion list. NEVER disable real-time protection — just exclude the specific verified file! 🔒", id: 'False positive = AV salah menandai file aman sebagai ancaman 😱. Umum dengan software bisnis kustom. Respons benar: 1) Verifikasi file sah dengan vendor. 2) Pulihkan dari karantina. 3) Tambahkan ke daftar pengecualian AV. JANGAN PERNAH nonaktifkan perlindungan real-time — hanya kecualikan file spesifik yang terverifikasi! 🔒' }, tip: { en: '🚀 Submit false positives to vendor — helps improve global AV detection!', id: '🚀 Kirim false positive ke vendor — bantu tingkatkan deteksi AV global!' }, image: null },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  //  TIER 4
  // ─────────────────────────────────────────────────────────────

  't4_001': { slides: [ { emoji: '🌐', title: { en: 'What Is DNS?', id: 'Apa Itu DNS?' }, body: { en: "DNS = the internet's phone book 📒. Type 'google.com' → DNS finds the IP address → connects you. Without DNS, you'd need to memorize numbers for every website. DNS down = websites unreachable even if internet works!", id: 'DNS = buku telepon internet 📒. Ketik "google.com" → DNS mencari alamat IP → menghubungkanmu. Tanpa DNS, kamu harus menghafal angka untuk setiap website. DNS mati = website tidak bisa diakses meski internet berfungsi!' }, tip: { en: '💡 DNS down ≠ internet down! Test by pinging an IP like 8.8.8.8!', id: '💡 DNS mati ≠ internet mati! Uji dengan ping IP seperti 8.8.8.8!' }, image: null }, { emoji: '🕵️', title: { en: 'Diagnosing DNS Problems', id: 'Mendiagnosa Masalah DNS' }, body: { en: "Test: ping 8.8.8.8 (works = internet OK, DNS broken). Try nslookup google.com — if fails = DNS confirmed broken. Quick fix: change DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare). Then run ipconfig /flushdns!", id: 'Uji: ping 8.8.8.8 (berhasil = internet OK, DNS rusak). Coba nslookup google.com — jika gagal = DNS dipastikan rusak. Perbaikan cepat: ganti DNS ke 8.8.8.8 (Google) atau 1.1.1.1 (Cloudflare). Lalu jalankan ipconfig /flushdns!' }, tip: { en: '💡 ipconfig /flushdns = clears old DNS records. Always safe to run!', id: '💡 ipconfig /flushdns = membersihkan catatan DNS lama. Aman dijalankan!' }, image: null }, { emoji: '🔧', title: { en: 'Fixing the DNS Outage', id: 'Memperbaiki Gangguan DNS' }, body: { en: "Steps: 1) Change DNS on affected PCs. 2) Restart DNS service on server (if internal DNS). 3) Check DNS server event logs. 4) Verify DNS zone records are intact. Start simple — often just a service restart! 🎯", id: 'Langkah: 1) Ubah DNS di PC yang terpengaruh. 2) Restart layanan DNS di server (jika DNS internal). 3) Periksa log event server DNS. 4) Verifikasi catatan zona DNS utuh. Mulai sederhana — sering kali hanya restart layanan! 🎯' }, tip: { en: '🚀 Always have backup DNS server — single DNS = single point of failure!', id: '🚀 Selalu punya server DNS cadangan — DNS tunggal = single point of failure!' }, image: null } ] },

  't4_002': { slides: [ { emoji: '📡', title: { en: 'What Does a Router Do?', id: 'Apa yang Dilakukan Router?' }, body: { en: "Router = traffic director of your network 🚦. Receives internet from ISP, splits it for all devices, makes sure data goes to RIGHT device. Badly configured = chaos! Like a broken traffic light at a busy intersection.", id: 'Router = direktur lalu lintas jaringanmu 🚦. Menerima internet dari ISP, membaginya untuk semua perangkat, memastikan data pergi ke perangkat yang BENAR. Konfigurasi buruk = kekacauan! Seperti lampu lalu lintas rusak di persimpangan ramai.' }, tip: { en: '💡 Default router IP: 192.168.1.1 or 192.168.0.1!', id: '💡 IP router default: 192.168.1.1 atau 192.168.0.1!' }, image: null }, { emoji: '⚙️', title: { en: 'Key Router Settings', id: 'Pengaturan Router Utama' }, body: { en: "Important: WAN = internet input. LAN = your devices. DHCP = auto-gives IPs. NAT = all devices share one public IP. Gateway = the 'exit' of your local network. Wrong gateway = NO internet for ALL devices! 🌐", id: 'Penting: WAN = input internet. LAN = perangkatmu. DHCP = otomatis beri IP. NAT = semua perangkat berbagi satu IP publik. Gateway = "pintu keluar" jaringan lokalmu. Gateway salah = TIDAK ADA internet untuk SEMUA perangkat! 🌐' }, tip: { en: '💡 Wrong gateway = most common cause of "internet not working"!', id: '💡 Gateway salah = penyebab paling umum "internet tidak berfungsi"!' }, image: null }, { emoji: '🧪', title: { en: 'Testing After Config', id: 'Uji Setelah Konfigurasi' }, body: { en: "3-step test: 1) Ping router IP (tests local). 2) Ping 8.8.8.8 (tests ISP). 3) Open website (tests DNS). Pass all 3 = perfect! Fail at 1 = routing. Fail at 2 = ISP. Fail at 3 = DNS. Systematic! 🎯", id: 'Uji 3 langkah: 1) Ping IP router (uji lokal). 2) Ping 8.8.8.8 (uji ISP). 3) Buka website (uji DNS). Lulus semua 3 = sempurna! Gagal di 1 = routing. Gagal di 2 = ISP. Gagal di 3 = DNS. Sistematis! 🎯' }, tip: { en: '🚀 Document router settings before changing — always have rollback plan!', id: '🚀 Dokumentasikan pengaturan router sebelum mengubah — selalu punya rencana rollback!' }, image: null } ] },

  't4_003': { slides: [ { emoji: '📵', title: { en: 'WiFi Dead Zones', id: 'Zona Mati WiFi' }, body: { en: "Dead zones = spots where WiFi signal can't reach. Walls, floors, metal objects weaken signal. Like shouting through thick walls 📣 — muffled! Concrete walls block most. Glass barely affects it.", id: 'Zona mati = tempat di mana sinyal WiFi tidak bisa menjangkau. Dinding, lantai, benda logam melemahkan sinyal. Seperti berteriak melalui dinding tebal 📣 — teredam! Dinding beton memblokir paling banyak. Kaca hampir tidak berpengaruh.' }, tip: { en: '💡 2.4GHz = longer range. 5GHz = faster but shorter range!', id: '💡 2.4GHz = jangkauan lebih jauh. 5GHz = lebih cepat tapi jangkauan lebih pendek!' }, image: null }, { emoji: '🔌', title: { en: 'Extender vs Access Point', id: 'Extender vs Access Point' }, body: { en: "WiFi Extender = rebroadcasts existing signal (easy, but slower). Access Point = wired to router, creates strong new WiFi zone (better!). For offices: multiple APs on cables = full coverage everywhere! 🎯", id: 'WiFi Extender = menyiarkan ulang sinyal yang ada (mudah, tapi lebih lambat). Access Point = terhubung ke router via kabel, membuat zona WiFi kuat baru (lebih baik!). Untuk kantor: beberapa AP pada kabel = cakupan penuh di mana saja! 🎯' }, tip: { en: '💡 Place router/AP high and centrally for best coverage!', id: '💡 Tempatkan router/AP tinggi dan di tengah untuk cakupan terbaik!' }, image: null }, { emoji: '🗺️', title: { en: 'WiFi Heatmapping', id: 'Pemetaan Panas WiFi' }, body: { en: "Use WiFi Analyzer app to map signal strength. Red = strong, Green = medium, Blue = weak. Place access points in weak zones. Goal: green everywhere! A visual approach to perfect coverage. 🌿", id: 'Gunakan aplikasi WiFi Analyzer untuk memetakan kekuatan sinyal. Merah = kuat, Hijau = sedang, Biru = lemah. Tempatkan access point di zona lemah. Tujuan: hijau di mana saja! Pendekatan visual untuk cakupan sempurna. 🌿' }, tip: { en: '🚀 Wired connection always beats WiFi for speed and reliability!', id: '🚀 Koneksi kabel selalu mengalahkan WiFi untuk kecepatan dan keandalan!' }, image: null } ] },

  't4_004': { slides: [ { emoji: '🔌', title: { en: 'What Is a Network Switch?', id: 'Apa Itu Network Switch?' }, body: { en: "Switch = multi-port connector for network cables 🔌. Connects PCs, printers, servers into one network. Each port handles one device. Dead port = that device can't connect. Switch LEDs: blink = active, solid = linked, off = no device.", id: 'Switch = konektor multi-port untuk kabel jaringan 🔌. Menghubungkan PC, printer, server ke satu jaringan. Setiap port menangani satu perangkat. Port mati = perangkat itu tidak bisa terhubung. LED switch: berkedip = aktif, solid = terhubung, mati = tidak ada perangkat.' }, tip: { en: '💡 LED not blinking = no network activity on that port!', id: '💡 LED tidak berkedip = tidak ada aktivitas jaringan di port itu!' }, image: null }, { emoji: '🕵️', title: { en: 'Diagnosing a Bad Port', id: 'Mendiagnosa Port Rusak' }, body: { en: "Test method: 1) Try different cable in same port. 2) Try same cable in different port. Cable works in port 2 but NOT port 1 = port 1 is dead. Label the bad port and use a spare! 🔧", id: 'Metode uji: 1) Coba kabel berbeda di port yang sama. 2) Coba kabel yang sama di port berbeda. Kabel berfungsi di port 2 tapi TIDAK di port 1 = port 1 mati. Beri label port rusak dan gunakan yang cadangan! 🔧' }, tip: { en: '💡 Label your switch ports — saves hours of troubleshooting!', id: '💡 Beri label port switch-mu — menghemat berjam-jam troubleshooting!' }, image: null }, { emoji: '🔄', title: { en: 'When to Replace', id: 'Kapan Mengganti' }, body: { en: "Multiple dead ports or random reboots = time to replace the switch. Switches are the heart of the network 💙. A dying switch affects EVERY connected device. Keep spare switches in stock — critical infrastructure!", id: 'Beberapa port mati atau reboot acak = saatnya mengganti switch. Switch adalah jantung jaringan 💙. Switch yang sekarat memengaruhi SETIAP perangkat yang terhubung. Simpan switch cadangan di stok — infrastruktur kritis!' }, tip: { en: '🚀 Managed switch = you can disable bad ports via web interface!', id: '🚀 Managed switch = kamu bisa menonaktifkan port buruk via antarmuka web!' }, image: null } ] },

  't4_005': { slides: [ { emoji: '📬', title: { en: 'Static vs Dynamic IP', id: 'IP Statis vs Dinamis' }, body: { en: "Dynamic IP = changes every time (like hotel room number changes each visit). Static IP = permanent address (like your home address). Servers need static IPs so everyone always knows where to find them! 📍", id: 'IP Dinamis = berubah setiap kali (seperti nomor kamar hotel yang berubah setiap kunjungan). IP Statis = alamat permanen (seperti alamat rumahmu). Server butuh IP statis agar semua orang selalu tahu di mana menemukannya! 📍' }, tip: { en: '💡 Servers, printers, APs = static. User PCs = dynamic (DHCP)!', id: '💡 Server, printer, AP = statis. PC pengguna = dinamis (DHCP)!' }, image: null }, { emoji: '⚙️', title: { en: 'Setting a Static IP', id: 'Mengatur IP Statis' }, body: { en: "Network Adapter Properties → IPv4 → Use the following IP. Fill: IP address, Subnet mask (255.255.255.0), Default gateway (router IP), DNS server. Always confirm no other device uses same IP first! 🔍", id: 'Properti Adaptor Jaringan → IPv4 → Gunakan IP berikut. Isi: Alamat IP, Subnet mask (255.255.255.0), Gateway default (IP router), Server DNS. Selalu konfirmasi tidak ada perangkat lain menggunakan IP yang sama dulu! 🔍' }, tip: { en: '💡 Duplicate IP = both devices disconnect! Check first!', id: '💡 IP duplikat = kedua perangkat terputus! Periksa dulu!' }, image: null }, { emoji: '✅', title: { en: 'Verify and Document', id: 'Verifikasi dan Dokumentasikan' }, body: { en: "After setting: ipconfig to confirm. Ping router to test. Update your IP register spreadsheet. Document: which IP, which device, which location, who assigned. This spreadsheet saves hours when troubleshooting! 📊", id: 'Setelah mengatur: ipconfig untuk konfirmasi. Ping router untuk menguji. Perbarui spreadsheet register IP-mu. Dokumentasikan: IP mana, perangkat mana, lokasi mana, siapa yang menetapkan. Spreadsheet ini menghemat berjam-jam saat troubleshooting! 📊' }, tip: { en: '🚀 Keep IP register up to date — essential network documentation!', id: '🚀 Pertahankan register IP terkini — dokumentasi jaringan yang penting!' }, image: null } ] },

  't4_006': { slides: [ { emoji: '📦', title: { en: 'What Is Packet Loss?', id: 'Apa Itu Packet Loss?' }, body: { en: "Data travels as 'packets' — tiny envelopes 📩. Packet loss = some envelopes never arrive. In gaming: lag spikes. In calls: frozen voice. In transfers: corruption. Even 1% packet loss causes noticeable problems!", id: 'Data berjalan sebagai "paket" — amplop kecil 📩. Packet loss = beberapa amplop tidak pernah tiba. Dalam gaming: lag spike. Dalam panggilan: suara membeku. Dalam transfer: korupsi. Bahkan 1% packet loss menyebabkan masalah yang terasa!' }, tip: { en: '💡 Healthy = 0% loss. Above 5% = serious problem!', id: '💡 Sehat = 0% loss. Di atas 5% = masalah serius!' }, image: null }, { emoji: '🔬', title: { en: 'Finding Where Loss Happens', id: 'Menemukan Di Mana Loss Terjadi' }, body: { en: "ping 8.8.8.8 -n 100 = sends 100 pings, shows how many timed out. tracert = shows path and where packets drop. Faulty cable, bad switch port, overloaded link = common culprits. Find the hop with loss! 🕵️", id: 'ping 8.8.8.8 -n 100 = mengirim 100 ping, menampilkan berapa yang time out. tracert = menampilkan jalur dan di mana paket dijatuhkan. Kabel cacat, port switch buruk, link yang terlalu padat = penyebab umum. Temukan hop dengan loss! 🕵️' }, tip: { en: '💡 tracert = shows every "hop" from your PC to destination!', id: '💡 tracert = menampilkan setiap "hop" dari PC-mu ke tujuan!' }, image: null }, { emoji: '🛠️', title: { en: 'Fixing Packet Loss', id: 'Memperbaiki Packet Loss' }, body: { en: "Fixes in order: 1) Replace Ethernet cable (bad crimp = loss). 2) Check switch port LED. 3) Monitor for congestion. 4) Update network card drivers. Cable replacement fixes 80% of packet loss cases! 🔌", id: 'Perbaikan berurutan: 1) Ganti kabel Ethernet (crimp buruk = loss). 2) Periksa LED port switch. 3) Pantau kemacetan. 4) Update driver kartu jaringan. Penggantian kabel memperbaiki 80% kasus packet loss! 🔌' }, tip: { en: '🚀 Cat6 cable or better = much less interference and packet loss!', id: '🚀 Kabel Cat6 atau lebih baik = interferensi dan packet loss jauh lebih sedikit!' }, image: null } ] },

  't4_007': { slides: [ { emoji: '🖨️', title: { en: 'Network Printer = Shared for All', id: 'Network Printer = Bersama untuk Semua' }, body: { en: "Network printer connects to office network (not one PC). Like a photocopier in the lobby 🏢 — EVERYONE uses it! IT sets up once, deploys to all computers. Give it a static IP so it never moves address!", id: 'Network printer terhubung ke jaringan kantor (bukan satu PC). Seperti mesin fotokopi di lobi 🏢 — SEMUA ORANG menggunakannya! IT mengatur sekali, menyebarkan ke semua komputer. Beri IP statis agar alamatnya tidak pernah berubah!' }, tip: { en: '💡 Static IP for printers = no connection problems when DHCP renews!', id: '💡 IP statis untuk printer = tidak ada masalah koneksi saat DHCP memperbarui!' }, image: null }, { emoji: '🔧', title: { en: 'Setting Up Network Printer', id: 'Mengatur Network Printer' }, body: { en: "1) Set static IP on printer (via printer menu). 2) Install printer driver on PC. 3) Add printer: Control Panel → Devices & Printers → Add Printer → 'Not listed' → by IP address → enter printer's IP. Done! 🎉", id: '1) Atur IP statis pada printer (via menu printer). 2) Instal driver printer di PC. 3) Tambahkan printer: Panel Kontrol → Perangkat & Printer → Tambah Printer → "Tidak terdaftar" → berdasarkan alamat IP → masukkan IP printer. Selesai! 🎉' }, tip: { en: '💡 Use Print Server for easy company-wide deployment via Group Policy!', id: '💡 Gunakan Print Server untuk penyebaran mudah seluruh perusahaan via Group Policy!' }, image: null }, { emoji: '✅', title: { en: 'Test from Multiple PCs', id: 'Uji dari Beberapa PC' }, body: { en: "Print test page from 2-3 different PCs to confirm all can reach printer. Check printer queue on server for stuck jobs. Document printer: IP, model, floor, room. Future IT will thank you! 📋", id: 'Cetak halaman uji dari 2-3 PC berbeda untuk konfirmasi semuanya bisa menjangkau printer. Periksa antrian printer di server untuk pekerjaan yang macet. Dokumentasikan printer: IP, model, lantai, ruangan. IT masa depan akan berterima kasih! 📋' }, tip: { en: '🚀 Share via Print Server = one place to manage all company printers!', id: '🚀 Bagikan via Print Server = satu tempat untuk mengelola semua printer perusahaan!' }, image: null } ] },

  't4_008': { slides: [ { emoji: '🌩️', title: { en: 'ISP Outage — Not Your Fault!', id: 'Gangguan ISP — Bukan Salahmu!' }, body: { en: "ISP outage = the internet highway itself is broken 🚧. Not your router, not your cables. The ISP's own infrastructure is down. No amount of rebooting your router helps! You need to verify and escalate to ISP.", id: 'Gangguan ISP = jalan raya internet itu sendiri rusak 🚧. Bukan router-mu, bukan kabel-mu. Infrastruktur ISP sendiri yang down. Tidak ada gunanya mereboot router! Kamu perlu memverifikasi dan mengescalate ke ISP.' }, tip: { en: '💡 First: confirm it is ISP by pinging router IP successfully!', id: '💡 Pertama: konfirmasi ini ISP dengan berhasil ping IP router!' }, image: null }, { emoji: '📞', title: { en: 'Handling ISP Outage', id: 'Menangani Gangguan ISP' }, body: { en: "Steps: 1) Confirm router reachable but no internet. 2) Call ISP, get incident number. 3) Set up mobile hotspot backup 📱. 4) Notify management and users. 5) Monitor ISP status page. 6) Log outage start time for SLA claim!", id: 'Langkah: 1) Konfirmasi router dapat dijangkau tapi tidak ada internet. 2) Hubungi ISP, dapatkan nomor insiden. 3) Siapkan hotspot mobile cadangan 📱. 4) Beritahu manajemen dan pengguna. 5) Pantau halaman status ISP. 6) Catat waktu mulai gangguan untuk klaim SLA!' }, tip: { en: '💡 Save ISP support number — outages always hit at worst time!', id: '💡 Simpan nomor dukungan ISP — gangguan selalu terjadi di waktu terburuk!' }, image: null }, { emoji: '📋', title: { en: 'SLA — Your Rights', id: 'SLA — Hak-Hakmu' }, body: { en: "SLA = contract between you and ISP. Guarantees uptime (e.g., 99.9%). Exceeds SLA? You can claim compensation. Always document: outage start, ISP contacted at, service restored at. Evidence for SLA claim! 🏛️", id: 'SLA = kontrak antara kamu dan ISP. Menjamin uptime (mis., 99,9%). Melebihi SLA? Kamu bisa mengklaim kompensasi. Selalu dokumentasikan: mulai gangguan, ISP dihubungi pada, layanan pulih pada. Bukti untuk klaim SLA! 🏛️' }, tip: { en: '🚀 For critical business: get dual-ISP failover — automatic internet backup!', id: '🚀 Untuk bisnis kritis: dapatkan dual-ISP failover — cadangan internet otomatis!' }, image: null } ] },

  't4_009': { slides: [ { emoji: '🏢', title: { en: 'What Is a VLAN?', id: 'Apa Itu VLAN?' }, body: { en: "VLAN = invisible walls 🧱 dividing one network into separate segments. HR, Finance, IT = all on same switch but can't access each other without permission. Like separate rooms in one building. Security + performance!", id: 'VLAN = dinding tak kasat mata 🧱 yang membagi satu jaringan menjadi segmen terpisah. HR, Keuangan, IT = semuanya di switch yang sama tapi tidak bisa mengakses satu sama lain tanpa izin. Seperti ruangan terpisah di satu gedung. Keamanan + performa!' }, tip: { en: '💡 VLANs improve security AND reduce network congestion!', id: '💡 VLAN meningkatkan keamanan DAN mengurangi kemacetan jaringan!' }, image: null }, { emoji: '🖨️', title: { en: 'Printer Cross-VLAN Problem', id: 'Masalah Printer Lintas VLAN' }, body: { en: "Printer on VLAN 10, users on VLAN 20 = they can't see each other by default (invisible wall!). Solution: inter-VLAN routing on router (gateway routes between VLANs), or move printer to users' VLAN. 🔧", id: 'Printer di VLAN 10, pengguna di VLAN 20 = mereka tidak bisa saling melihat secara default (dinding tak kasat mata!). Solusi: inter-VLAN routing pada router (gateway mengarahkan antar VLAN), atau pindahkan printer ke VLAN pengguna. 🔧' }, tip: { en: '💡 Router-on-a-stick = one port handles all VLANs!', id: '💡 Router-on-a-stick = satu port menangani semua VLAN!' }, image: null }, { emoji: '✅', title: { en: 'Fix and Test', id: 'Perbaiki dan Uji' }, body: { en: "Options: 1) Add printer to correct VLAN in switch config. 2) Set up inter-VLAN routing. 3) Use print server bridging VLANs. After fix: ping printer IP from user PC to confirm reachability. ✅", id: 'Opsi: 1) Tambahkan printer ke VLAN yang benar dalam konfigurasi switch. 2) Atur inter-VLAN routing. 3) Gunakan print server yang menjembatani VLAN. Setelah perbaikan: ping IP printer dari PC pengguna untuk konfirmasi keterjangkauan. ✅' }, tip: { en: '🚀 Document VLAN assignments — prevents future device placement errors!', id: '🚀 Dokumentasikan penugasan VLAN — mencegah kesalahan penempatan perangkat masa depan!' }, image: null } ] },

  't4_010': { slides: [ { emoji: '📮', title: { en: 'What Is DHCP?', id: 'Apa Itu DHCP?' }, body: { en: "DHCP = automatic IP distributor — like a hotel receptionist 🏨 giving each guest a room number. DHCP gives each device an IP when it connects. DHCP down = no IPs = devices get 169.254.x.x (self-assigned) = no internet!", id: 'DHCP = distributor IP otomatis — seperti resepsionis hotel 🏨 memberi setiap tamu nomor kamar. DHCP memberi setiap perangkat IP saat terhubung. DHCP mati = tidak ada IP = perangkat mendapat 169.254.x.x (ditetapkan sendiri) = tidak ada internet!' }, tip: { en: '💡 169.254.x.x IP address = DHCP failed! Clear sign of DHCP down!', id: '💡 Alamat IP 169.254.x.x = DHCP gagal! Tanda jelas DHCP mati!' }, image: null }, { emoji: '🔧', title: { en: 'Fixing DHCP Server Down', id: 'Memperbaiki DHCP Server Mati' }, body: { en: "1) Check DHCP service on server (Services → DHCP Server → Start if stopped). 2) Check DHCP scope hasn't run out of IPs (expand if >80% used). 3) Client fix: ipconfig /release then ipconfig /renew. 🔄", id: '1) Periksa layanan DHCP di server (Layanan → DHCP Server → Mulai jika berhenti). 2) Periksa scope DHCP belum habis IP-nya (perluas jika >80% terpakai). 3) Perbaikan klien: ipconfig /release lalu ipconfig /renew. 🔄' }, tip: { en: '💡 ipconfig /renew = asks DHCP server for fresh IP — quick client fix!', id: '💡 ipconfig /renew = meminta server DHCP untuk IP baru — perbaikan klien cepat!' }, image: null }, { emoji: '🛡️', title: { en: 'DHCP Failover', id: 'DHCP Failover' }, body: { en: "Enterprise: set up DHCP failover between two servers. Main fails → backup takes over automatically. Like having two receptionists — if one is sick, the other still gives out room keys! Zero downtime for users. 🏆", id: 'Enterprise: atur failover DHCP antara dua server. Utama gagal → cadangan mengambil alih otomatis. Seperti punya dua resepsionis — jika satu sakit, yang lain tetap membagikan kunci kamar! Tanpa downtime untuk pengguna. 🏆' }, tip: { en: '🚀 Monitor DHCP scope usage — 80% full = time to expand!', id: '🚀 Pantau penggunaan scope DHCP — 80% penuh = saatnya memperluas!' }, image: null } ] },

  't4_011': { slides: [ { emoji: '🚦', title: { en: 'WiFi Congestion', id: 'Kemacetan WiFi' }, body: { en: "WiFi channels are like radio stations 📻. If everyone uses the same channel = interference and slowness. Like 10 people talking on same walkie-talkie 📣. 2.4GHz especially crowded in offices. Need to find less-used channel!", id: 'Saluran WiFi seperti stasiun radio 📻. Jika semua orang menggunakan saluran yang sama = interferensi dan lambat. Seperti 10 orang berbicara di walkie-talkie yang sama 📣. 2.4GHz sangat padat di kantor. Perlu menemukan saluran yang lebih sedikit digunakan!' }, tip: { en: '💡 2.4GHz non-overlapping channels: 1, 6, or 11 only!', id: '💡 Saluran 2.4GHz yang tidak tumpang tindih: hanya 1, 6, atau 11!' }, image: null }, { emoji: '📊', title: { en: 'Finding the Right Channel', id: 'Menemukan Saluran yang Tepat' }, body: { en: "Use WiFi Analyzer to see which channels nearby networks use. Choose channel with least competition. Change in router settings. Result: less interference, better speeds for everyone! 🚀", id: 'Gunakan WiFi Analyzer untuk melihat saluran mana yang digunakan jaringan terdekat. Pilih saluran dengan kompetisi paling sedikit. Ubah di pengaturan router. Hasilnya: interferensi lebih sedikit, kecepatan lebih baik untuk semua orang! 🚀' }, tip: { en: '💡 Enable Auto Channel on modern routers for automatic optimization!', id: '💡 Aktifkan Saluran Otomatis di router modern untuk optimasi otomatis!' }, image: null }, { emoji: '⚖️', title: { en: 'Band Steering and QoS', id: 'Band Steering dan QoS' }, body: { en: "Push fast devices to 5GHz band. Keep slow/distant on 2.4GHz. Enable band steering in router for auto-switching. Also use QoS to prioritize important traffic (video calls) over casual browsing. Balance = everyone happy! 😊", id: 'Dorong perangkat cepat ke pita 5GHz. Pertahankan yang lambat/jauh di 2.4GHz. Aktifkan band steering di router untuk beralih otomatis. Juga gunakan QoS untuk memprioritaskan lalu lintas penting (panggilan video) daripada browsing biasa. Seimbang = semua senang! 😊' }, tip: { en: '🚀 Enterprise WiFi: controller-managed APs = automatic optimization!', id: '🚀 WiFi Enterprise: AP yang dikelola controller = optimasi otomatis!' }, image: null } ] },

  't4_012': { slides: [ { emoji: '🏢', title: { en: 'What Is a VLAN?', id: 'Apa Itu VLAN?' }, body: { en: "VLAN = Virtual LAN 🏗️. One physical switch, multiple isolated networks. Think of it as invisible walls inside your network: HR can't see Finance, Guests can't see Servers — all on the same hardware! Security + performance in one.", id: 'VLAN = Virtual LAN 🏗️. Satu switch fisik, beberapa jaringan terisolasi. Bayangkan sebagai dinding tak kasat mata di dalam jaringan Anda: HR tidak bisa melihat Keuangan, Tamu tidak bisa melihat Server — semuanya di hardware yang sama! Keamanan + performa dalam satu.' }, tip: { en: '💡 Managed switch required for VLAN — unmanaged switches do NOT support VLANs!', id: '💡 Switch terkelola diperlukan untuk VLAN — switch tidak terkelola TIDAK mendukung VLAN!' }, image: null }, { emoji: '🔒', title: { en: 'Staff vs Guest VLAN', id: 'VLAN Staff vs Tamu' }, body: { en: "Guest VLAN = internet only! Staff VLAN = internet + internal resources. Guests connecting to 'CompanyGuest' WiFi land in VLAN 20 — isolated. They can browse the web but cannot ping 192.168.10.x servers. Essential security! 🛡️", id: 'VLAN Tamu = hanya internet! VLAN Staff = internet + sumber daya internal. Tamu yang terhubung ke WiFi \"CompanyGuest\" masuk ke VLAN 20 — terisolasi. Mereka bisa browsing web tapi tidak bisa ping server 192.168.10.x. Keamanan penting! 🛡️' }, tip: { en: '💡 Always isolate Guest WiFi — treat all guests as untrusted!', id: '💡 Selalu isolasi WiFi Tamu — perlakukan semua tamu sebagai tidak tepercaya!' }, image: null }, { emoji: '✅', title: { en: 'Verify VLAN Isolation', id: 'Verifikasi Isolasi VLAN' }, body: { en: "Test it! From Guest device: ping internal server (should TIMEOUT ✅). Ping 8.8.8.8 (should SUCCEED ✅). Both results together = correct VLAN isolation. Document the VLAN map: VLAN 10=Staff, VLAN 20=Guest, VLAN 30=Printers. 📋", id: 'Uji! Dari perangkat Tamu: ping server internal (harus TIMEOUT ✅). Ping 8.8.8.8 (harus BERHASIL ✅). Kedua hasil bersama = isolasi VLAN yang benar. Dokumentasikan peta VLAN: VLAN 10=Staff, VLAN 20=Tamu, VLAN 30=Printer. 📋' }, tip: { en: '🚀 802.1Q tagging: trunk ports carry multiple VLANs between switches and router!', id: '🚀 802.1Q tagging: port trunk membawa beberapa VLAN antara switch dan router!' }, image: null } ] },

  't4_013': { slides: [ { emoji: '📻', title: { en: 'WiFi Channels Explained', id: 'Penjelasan Channel WiFi' }, body: { en: "WiFi channels = radio frequencies 📻. 2.4GHz has channels 1–13 but only 3 are non-overlapping: 1, 6, and 11. 5GHz has 24+ non-overlapping channels. Multiple APs on the SAME channel = they compete with each other = slower WiFi!", id: 'Channel WiFi = frekuensi radio 📻. 2.4GHz punya channel 1-13 tapi hanya 3 yang tidak tumpang tindih: 1, 6, dan 11. 5GHz punya 24+ channel tidak tumpang tindih. Beberapa AP di channel YANG SAMA = mereka bersaing satu sama lain = WiFi lebih lambat!' }, tip: { en: '💡 2.4GHz rule: use ONLY channels 1, 6, or 11 for multiple APs!', id: '💡 Aturan 2.4GHz: gunakan HANYA channel 1, 6, atau 11 untuk beberapa AP!' }, image: null }, { emoji: '⚡', title: { en: '5GHz — The Speed Advantage', id: '5GHz — Keunggulan Kecepatan' }, body: { en: "5GHz WiFi = faster speeds (AC and AX) + less congestion because fewer devices use it. Downside: shorter range. Strategy: 5GHz for office workers at desks, 2.4GHz for phones in distant areas. Enable band steering for automatic switching! 🔄", id: '5GHz WiFi = kecepatan lebih cepat (AC dan AX) + lebih sedikit kemacetan karena lebih sedikit perangkat menggunakannya. Kekurangan: jangkauan lebih pendek. Strategi: 5GHz untuk pekerja kantor di meja, 2.4GHz untuk ponsel di area yang jauh. Aktifkan band steering untuk peralihan otomatis! 🔄' }, tip: { en: '💡 Band steering = device auto-switches to 5GHz when in range!', id: '💡 Band steering = perangkat beralih otomatis ke 5GHz saat dalam jangkauan!' }, image: null }, { emoji: '🛠️', title: { en: 'Applying the Fix', id: 'Menerapkan Perbaikan' }, body: { en: "Step 1: Use WiFi Analyzer app — see all channels in use nearby. Step 2: Set each AP to different non-overlapping channel. Step 3: Enable 5GHz on all APs. Step 4: Run speedtest again — expect 300-400% improvement! 🚀 Document the channel plan!", id: 'Langkah 1: Gunakan aplikasi WiFi Analyzer — lihat semua channel yang digunakan di sekitar. Langkah 2: Atur setiap AP ke channel yang tidak tumpang tindih yang berbeda. Langkah 3: Aktifkan 5GHz di semua AP. Langkah 4: Jalankan speedtest lagi — harapkan peningkatan 300-400%! 🚀 Dokumentasikan rencana channel!' }, tip: { en: '🚀 Channel plan document = lifesaver when troubleshooting future WiFi issues!', id: '🚀 Dokumen rencana channel = penyelamat saat troubleshooting masalah WiFi di masa depan!' }, image: null } ] },

  't4_014': { slides: [ { emoji: '📋', title: { en: 'Why Document the Network?', id: 'Mengapa Mendokumentasikan Jaringan?' }, body: { en: "Network without documentation = mystery box 🎁. When the engineer leaves, knowledge leaves too! Good docs: every device IP, MAC, location, VLAN, function. This saves HOURS during outages. Your future self — and colleagues — will thank you! 🙏", id: 'Jaringan tanpa dokumentasi = kotak misteri 🎁. Ketika engineer pergi, pengetahuan pun ikut pergi! Dokumentasi yang baik: setiap IP perangkat, MAC, lokasi, VLAN, fungsi. Ini menghemat berjam-jam saat gangguan. Diri Anda di masa depan — dan rekan — akan berterima kasih! 🙏' }, tip: { en: '💡 Undocumented network = ticking time bomb. Document NOW!', id: '💡 Jaringan yang tidak terdokumentasi = bom waktu. Dokumentasikan SEKARANG!' }, image: null }, { emoji: '🔍', title: { en: 'Scanning and Discovering Devices', id: 'Memindai dan Menemukan Perangkat' }, body: { en: "Discovery tools: arp -a (see IP/MAC cache), nmap -sn 192.168.1.0/24 (scan whole subnet), Advanced IP Scanner (GUI). Cross-reference MAC with vendor database to identify device type. Build your IP register spreadsheet! 📊", id: 'Alat penemuan: arp -a (lihat cache IP/MAC), nmap -sn 192.168.1.0/24 (scan seluruh subnet), Advanced IP Scanner (GUI). Referensi silang MAC dengan database vendor untuk mengidentifikasi jenis perangkat. Bangun spreadsheet register IP Anda! 📊' }, tip: { en: '💡 arp -a shows only recently communicated devices. nmap shows ALL live hosts!', id: '💡 arp -a hanya menampilkan perangkat yang baru saja dikomunikasikan. nmap menampilkan SEMUA host yang aktif!' }, image: null }, { emoji: '📐', title: { en: 'Good IP Address Plan', id: 'Rencana Alamat IP yang Baik' }, body: { en: "Best practice IP layout: .1 = Router, .2-.10 = Network devices (switches/APs), .50-.99 = Servers (static), .100-.200 = DHCP pool for user PCs, .201-.254 = Printers/fixed devices. Structured = easy to troubleshoot! 🗂️", id: 'Tata letak IP praktik terbaik: .1 = Router, .2-.10 = Perangkat jaringan (switch/AP), .50-.99 = Server (statis), .100-.200 = Pool DHCP untuk PC pengguna, .201-.254 = Printer/perangkat tetap. Terstruktur = mudah troubleshoot! 🗂️' }, tip: { en: '🚀 Keep IP register in shared drive + print backup — digital + physical!', id: '🚀 Simpan register IP di drive bersama + cetak backup — digital + fisik!' }, image: null } ] },

  't4_015': { slides: [ { emoji: '🚧', title: { en: 'What Is a Firewall?', id: 'Apa Itu Firewall?' }, body: { en: "Firewall = checkpoint 🚧 for all network traffic. Checks every packet: ALLOW or BLOCK based on rules you define. Default policy: block everything, then open ONLY what is needed. Never the opposite! Open ports are attack surfaces.", id: 'Firewall = pos pemeriksaan 🚧 untuk semua lalu lintas jaringan. Memeriksa setiap paket: IZINKAN atau BLOKIR berdasarkan aturan yang Anda tentukan. Kebijakan default: blokir segalanya, lalu buka HANYA yang diperlukan. Tidak pernah sebaliknya! Port terbuka adalah permukaan serangan.' }, tip: { en: '💡 Default DENY = most secure firewall stance. Whitelist approach!', id: '💡 Default DENY = posisi firewall paling aman. Pendekatan whitelist!' }, image: null }, { emoji: '✍️', title: { en: 'Writing Good Firewall Rules', id: 'Menulis Aturan Firewall yang Baik' }, body: { en: "Every rule must specify 5 things: 1) Source IP/range, 2) Destination IP, 3) Port number, 4) Protocol (TCP/UDP), 5) Action (ALLOW/DENY). Never use 'ANY' for all three! Document each rule: date added, who requested, business reason. Audit annually! 📋", id: 'Setiap aturan harus menyebutkan 5 hal: 1) IP/rentang Sumber, 2) IP Tujuan, 3) Nomor port, 4) Protokol (TCP/UDP), 5) Tindakan (IZINKAN/TOLAK). Jangan pernah gunakan \"ANY\" untuk ketiganya! Dokumentasikan setiap aturan: tanggal ditambahkan, siapa yang meminta, alasan bisnis. Audit setiap tahun! 📋' }, tip: { en: '💡 Old firewall rules accumulate like barnacles — audit and remove unused ones!', id: '💡 Aturan firewall lama menumpuk seperti kerang — audit dan hapus yang tidak digunakan!' }, image: null }, { emoji: '🧪', title: { en: 'Testing After Rule Changes', id: 'Pengujian Setelah Perubahan Aturan' }, body: { en: "After adding rule: test with Test-NetConnection -Port 8443 (PowerShell) or telnet IP port. Confirm allowed traffic works. Then confirm blocked traffic is still blocked — test from different source to ensure over-permissive rules were not created! ✅", id: 'Setelah menambahkan aturan: uji dengan Test-NetConnection -Port 8443 (PowerShell) atau telnet IP port. Konfirmasi lalu lintas yang diizinkan berfungsi. Kemudian konfirmasi lalu lintas yang diblokir masih diblokir — uji dari sumber berbeda untuk memastikan aturan yang terlalu permisif tidak dibuat! ✅' }, tip: { en: '🚀 Keep a firewall change log — essential for security audits and incident response!', id: '🚀 Simpan log perubahan firewall — penting untuk audit keamanan dan respons insiden!' }, image: null } ] },

  't4_016': { slides: [ { emoji: '🛣️', title: { en: 'What Is QoS?', id: 'Apa Itu QoS?' }, body: { en: "QoS = Quality of Service. NOT adding more bandwidth — it is smarter management of bandwidth you already have 🛣️. Like an HOV lane on a highway: video calls get the fast lane, file downloads use regular lanes. Same road, smarter priority!", id: 'QoS = Quality of Service. BUKAN menambahkan lebih banyak bandwidth — ini adalah manajemen bandwidth yang lebih cerdas yang sudah Anda miliki 🛣️. Seperti jalur HOV di jalan raya: video call mendapat jalur cepat, unduhan file menggunakan jalur biasa. Jalan yang sama, prioritas lebih cerdas!' }, tip: { en: '💡 QoS does NOT increase speed — it prioritizes existing bandwidth smarter!', id: '💡 QoS TIDAK meningkatkan kecepatan — itu memprioritaskan bandwidth yang ada dengan lebih cerdas!' }, image: null }, { emoji: '🎯', title: { en: 'QoS Priority Tiers', id: 'Tingkatan Prioritas QoS' }, body: { en: "Priority order: 1) VOIP/Video calls (real-time, delay-sensitive, must be HIGH). 2) Business apps (ERP, CRM). 3) Web browsing. 4) File downloads. 5) Backups/updates (LOWEST — delay is invisible to users). Set this in router/switch QoS settings! 📊", id: 'Urutan prioritas: 1) VOIP/Video call (real-time, sensitif delay, harus TINGGI). 2) Aplikasi bisnis (ERP, CRM). 3) Web browsing. 4) Unduhan file. 5) Backup/update (TERENDAH — penundaan tidak terlihat oleh pengguna). Atur ini di pengaturan QoS router/switch! 📊' }, tip: { en: '💡 VoIP needs < 150ms latency and < 1% packet loss — give it top priority!', id: '💡 VoIP butuh < 150ms latency dan < 1% packet loss — beri prioritas tertinggi!' }, image: null }, { emoji: '📈', title: { en: 'QoS is Not a Silver Bullet', id: 'QoS Bukan Solusi Ajaib' }, body: { en: "QoS helps, but if your link is fully saturated (100Mbps with 100Mbps usage), even QoS cannot fully fix the problem. QoS buys time and reduces impact — but ultimately you may need to upgrade bandwidth. QoS + upgrade = full solution! 🚀", id: 'QoS membantu, tapi jika link Anda benar-benar jenuh (100Mbps dengan penggunaan 100Mbps), bahkan QoS tidak bisa sepenuhnya memperbaiki masalah. QoS memberikan waktu dan mengurangi dampak — tapi akhirnya Anda mungkin perlu meningkatkan bandwidth. QoS + upgrade = solusi penuh! 🚀' }, tip: { en: '🚀 Monitor bandwidth usage trends — upgrade BEFORE hitting 80% saturation!', id: '🚀 Pantau tren penggunaan bandwidth — upgrade SEBELUM mencapai saturasi 80%!' }, image: null } ] },

  't4_017': { slides: [ { emoji: '🔐', title: { en: 'What Is a VPN?', id: 'Apa Itu VPN?' }, body: { en: "VPN = Virtual Private Network 🔐. Creates an encrypted tunnel between your device and the office. Like a private armored car on a public road — traffic is yours, no one can intercept. Remote workers MUST use VPN to access internal resources safely!", id: 'VPN = Virtual Private Network 🔐. Membuat terowongan terenkripsi antara perangkat Anda dan kantor. Seperti mobil lapis baja pribadi di jalan umum — lalu lintas milik Anda, tidak ada yang bisa mencegat. Pekerja remote HARUS menggunakan VPN untuk mengakses sumber daya internal dengan aman!' }, tip: { en: '💡 VPN Connected ≠ VPN Working. Always test internal access after connecting!', id: '💡 VPN Terhubung ≠ VPN Berfungsi. Selalu uji akses internal setelah terhubung!' }, image: null }, { emoji: '⚠️', title: { en: 'Subnet Conflict — The Silent Killer', id: 'Konflik Subnet — Pembunuh Diam-Diam' }, body: { en: "Most common VPN issue: home router (192.168.1.x) uses SAME subnet as office (192.168.1.x). VPN connects but PC cannot route correctly — no idea which 192.168.1.50 is which! Fix: change home router to 192.168.5.x or 10.0.0.x. Problem solved! 🏠", id: 'Masalah VPN paling umum: router rumah (192.168.1.x) menggunakan subnet YANG SAMA dengan kantor (192.168.1.x). VPN terhubung tapi PC tidak bisa merutekan dengan benar — tidak tahu mana 192.168.1.50 yang mana! Perbaikan: ubah router rumah ke 192.168.5.x atau 10.0.0.x. Masalah teratasi! 🏠' }, tip: { en: '💡 Office VPN should use a unique subnet like 10.10.0.x to avoid home conflicts!', id: '💡 VPN kantor harus menggunakan subnet unik seperti 10.10.0.x untuk menghindari konflik rumah!' }, image: null }, { emoji: '🧰', title: { en: 'Other VPN Fixes', id: 'Perbaikan VPN Lainnya' }, body: { en: "Other VPN issues: 1) Split tunneling OFF = all traffic goes through VPN (safer). 2) DNS not resolving internal hostnames = set VPN DNS to internal DNS server. 3) VPN drops frequently = MTU mismatch (set to 1400). 4) Slow VPN = bandwidth issue on WAN. Systematic! 🔧", id: 'Masalah VPN lainnya: 1) Split tunneling MATI = semua lalu lintas melalui VPN (lebih aman). 2) DNS tidak meyelesaikan hostname internal = atur DNS VPN ke server DNS internal. 3) VPN sering putus = ketidakcocokan MTU (atur ke 1400). 4) VPN lambat = masalah bandwidth di WAN. Sistematis! 🔧' }, tip: { en: '🚀 Always test VPN with internal ping + internal file access — both must work!', id: '🚀 Selalu uji VPN dengan ping internal + akses file internal — keduanya harus berfungsi!' }, image: null } ] },

  // ─────────────────────────────────────────────────────────────
  //  TIER 5
  // ─────────────────────────────────────────────────────────────

  't5_001': { slides: [ { emoji: '💾', title: { en: 'The 3-2-1 Backup Rule', id: 'Aturan Backup 3-2-1' }, body: { en: "3 copies, 2 different storage types, 1 offsite. Like keeping a spare house key: one with you 🔑, one with family, one in a bank vault. If any one fails — the others save you. Never lose data!", id: '3 salinan, 2 jenis penyimpanan berbeda, 1 di luar lokasi. Seperti menyimpan kunci rumah cadangan: satu padamu 🔑, satu dengan keluarga, satu di brankas bank. Jika salah satu gagal — yang lain menyelamatkanmu. Tidak pernah kehilangan data!' }, tip: { en: '💡 No backup = gambling with data. Always backup BEFORE disaster!', id: '💡 Tidak ada backup = berjudi dengan data. Selalu backup SEBELUM bencana!' }, image: null }, { emoji: '🔄', title: { en: 'Restoring from Backup', id: 'Memulihkan dari Backup' }, body: { en: "Restore = loading a saved game 🎮. Steps: verify backup integrity → mount → select files → confirm location → execute → test. Always restore to TEST environment first, never directly to production!", id: 'Restore = memuat game yang disimpan 🎮. Langkah: verifikasi integritas backup → mount → pilih file → konfirmasi lokasi → jalankan → uji. Selalu restore ke lingkungan UJI dulu, tidak langsung ke produksi!' }, tip: { en: '💡 Test restores regularly — untested backup may not work when needed!', id: '💡 Uji restore secara teratur — backup yang belum diuji mungkin tidak berfungsi saat dibutuhkan!' }, image: null }, { emoji: '📅', title: { en: 'Backup Types', id: 'Jenis Backup' }, body: { en: "Full = copy everything (slow, big). Incremental = only changes since last backup (fast). Differential = changes since last FULL (medium). Most use Full + Incremental combo. Schedule them automatically! 📦", id: 'Penuh = salin segalanya (lambat, besar). Inkremental = hanya perubahan sejak backup terakhir (cepat). Diferensial = perubahan sejak PENUH terakhir (sedang). Kebanyakan menggunakan kombinasi Penuh + Inkremental. Jadwalkan secara otomatis! 📦' }, tip: { en: '🚀 Automated backups = peace of mind, zero forgetting!', id: '🚀 Backup otomatis = ketenangan pikiran, tidak pernah lupa!' }, image: null } ] },

  't5_002': { slides: [ { emoji: '⚙️', title: { en: 'Windows Services', id: 'Layanan Windows' }, body: { en: "Services = programs running silently in background 24/7 — like building maintenance crew 🏗️ working at night. Print Spooler, SQL Server, Windows Update — they run without you seeing them. Until they crash!", id: 'Layanan = program yang berjalan diam-diam di latar belakang 24/7 — seperti kru pemeliharaan gedung 🏗️ yang bekerja di malam hari. Print Spooler, SQL Server, Windows Update — mereka berjalan tanpa kamu melihatnya. Sampai mereka crash!' }, tip: { en: '💡 services.msc = your dashboard to manage all Windows services!', id: '💡 services.msc = dasbor untuk mengelola semua layanan Windows!' }, image: null }, { emoji: '🔄', title: { en: 'Restarting a Crashed Service', id: 'Me-restart Layanan yang Crash' }, body: { en: "Signs: feature stops working suddenly. Check Event Viewer for error. Fix: services.msc → right-click service → Restart. Pro tip: set Recovery → auto-restart on failure so it recovers itself! 🤖", id: 'Tanda: fitur tiba-tiba berhenti berfungsi. Periksa Event Viewer untuk error. Perbaikan: services.msc → klik kanan layanan → Restart. Tip pro: atur Pemulihan → restart otomatis saat gagal agar pulih sendiri! 🤖' }, tip: { en: '💡 Event Viewer = crime scene of your crashed service!', id: '💡 Event Viewer = TKP dari layanan yang crash!' }, image: null }, { emoji: '🛡️', title: { en: 'Auto-Recovery Setup', id: 'Pengaturan Pemulihan Otomatis' }, body: { en: "Double-click service → Recovery tab. First failure → Restart service. Second failure → Restart service. Subsequent → Run program (alert script). Self-healing infrastructure = fewer 3am emergency calls! 🌙", id: 'Klik dua kali layanan → tab Pemulihan. Kegagalan pertama → Restart layanan. Kedua → Restart. Berikutnya → Jalankan program (skrip alert). Infrastruktur yang menyembuhkan diri = lebih sedikit panggilan darurat jam 3 pagi! 🌙' }, tip: { en: '🚀 PowerShell: Restart-Service -Name "ServiceName" — faster than GUI!', id: '🚀 PowerShell: Restart-Service -Name "ServiceName" — lebih cepat dari GUI!' }, image: null } ] },

  't5_003': { slides: [ { emoji: '🖥️', title: { en: 'What Is Remote Desktop?', id: 'Apa Itu Remote Desktop?' }, body: { en: "RDP = control another PC over network — like driving from passenger seat 🚗! You see their screen, control with your keyboard and mouse. IT pros use this daily to fix remote users' problems without traveling!", id: 'RDP = mengontrol PC lain melalui jaringan — seperti mengemudi dari kursi penumpang 🚗! Kamu melihat layar mereka, mengontrol dengan keyboard dan mouse-mu. Pro IT menggunakan ini setiap hari untuk memperbaiki masalah pengguna remote tanpa bepergian!' }, tip: { en: '💡 RDP port = 3389. Must be allowed in firewall!', id: '💡 Port RDP = 3389. Harus diizinkan di firewall!' }, image: null }, { emoji: '🔒', title: { en: 'Why RDP Fails', id: 'Kenapa RDP Gagal' }, body: { en: "Common causes: 1) RDP not enabled on target. 2) Firewall blocking port 3389. 3) Wrong credentials. 4) Network issue. 5) User not in Remote Desktop Users group. Check all 5 in order! 🔍", id: 'Penyebab umum: 1) RDP tidak diaktifkan di target. 2) Firewall memblokir port 3389. 3) Kredensial salah. 4) Masalah jaringan. 5) Pengguna tidak ada di grup Remote Desktop Users. Periksa semua 5 secara berurutan! 🔍' }, tip: { en: '💡 Enable RDP: System Properties → Remote → Allow remote connections!', id: '💡 Aktifkan RDP: Properti Sistem → Remote → Izinkan koneksi remote!' }, image: null }, { emoji: '🔐', title: { en: 'Secure RDP', id: 'RDP yang Aman' }, body: { en: "NEVER expose RDP directly to internet — use VPN first! Or use RD Gateway. Change port from 3389 to custom. Enable NLA (Network Level Auth). RDP exposed to internet = hacker honeypot. Always use VPN! 🛡️", id: 'JANGAN pernah ekspos RDP langsung ke internet — gunakan VPN dulu! Atau gunakan RD Gateway. Ubah port dari 3389 ke kustom. Aktifkan NLA (Autentikasi Tingkat Jaringan). RDP yang terekspos ke internet = sarang hacker. Selalu gunakan VPN! 🛡️' }, tip: { en: '🚀 VPN + RDP = secure combination for remote access!', id: '🚀 VPN + RDP = kombinasi aman untuk akses remote!' }, image: null } ] },

  't5_004': { slides: [ { emoji: '💽', title: { en: 'Server Storage — The Warehouse', id: 'Storage Server — Gudangnya' }, body: { en: "Server storage is a massive warehouse 🏭 where all company files live. Servers can have terabytes! But like any warehouse — if never cleaned, it fills up. Operations stop when disk is 100% full. Emergency!", id: 'Storage server adalah gudang besar 🏭 di mana semua file perusahaan berada. Server bisa punya terabyte! Tapi seperti gudang mana pun — jika tidak pernah dibersihkan, ia akan penuh. Operasi berhenti saat disk 100% penuh. Darurat!' }, tip: { en: '💡 Server disk over 85% full = performance degrades rapidly!', id: '💡 Disk server di atas 85% penuh = kinerja turun drastis!' }, image: null }, { emoji: '🔍', title: { en: 'What to Clean First', id: 'Apa yang Harus Dibersihkan Dulu' }, body: { en: "Safe to clean: 1) C:/Windows/Temp files. 2) Old log files. 3) Shadow copies (old snapshots). 4) Recycle Bin. 5) Windows Update cache. Use WinDirStat to visualize biggest space hogs! 🗑️", id: 'Aman untuk dibersihkan: 1) File C:/Windows/Temp. 2) File log lama. 3) Shadow copy (snapshot lama). 4) Recycle Bin. 5) Cache Windows Update. Gunakan WinDirStat untuk memvisualisasikan yang paling banyak memakan ruang! 🗑️' }, tip: { en: '💡 WinDirStat = visual disk usage map. See biggest folders instantly!', id: '💡 WinDirStat = peta penggunaan disk visual. Lihat folder terbesar seketika!' }, image: null }, { emoji: '📊', title: { en: 'Set Disk Alerts', id: 'Atur Alert Disk' }, body: { en: "Set monitoring alerts: 75% = warning email. 85% = urgent alert. Act before crisis! Like a fuel gauge light ⛽ — act before you run empty. PowerShell scripts can automate cleanup on schedule! 🤖", id: 'Atur alert pemantauan: 75% = email peringatan. 85% = alert mendesak. Bertindak sebelum krisis! Seperti lampu indikator bahan bakar ⛽ — bertindak sebelum kosong. Skrip PowerShell bisa mengotomatisasi pembersihan sesuai jadwal! 🤖' }, tip: { en: '🚀 Automate weekly log cleanup — prevention beats emergency!', id: '🚀 Otomatiskan pembersihan log mingguan — pencegahan mengalahkan darurat!' }, image: null } ] },

  't5_005': { slides: [ { emoji: '📂', title: { en: 'Permissions at Enterprise Scale', id: 'Izin dalam Skala Enterprise' }, body: { en: "In enterprise: hundreds of users need specific folder access. Like a library 📚 — students READ, librarians ADD, head librarian can DELETE. Permissions control exactly who can do what. Groups make it manageable!", id: 'Dalam enterprise: ratusan pengguna butuh akses folder spesifik. Seperti perpustakaan 📚 — siswa MEMBACA, pustakawan MENAMBAH, kepala pustakawan bisa MENGHAPUS. Izin mengontrol persis siapa yang bisa melakukan apa. Grup membuatnya terkelola!' }, tip: { en: '💡 Always use Security Groups for permissions, not individual users!', id: '💡 Selalu gunakan Grup Keamanan untuk izin, bukan pengguna individual!' }, image: null }, { emoji: '👥', title: { en: 'Groups = Scalable Permissions', id: 'Grup = Izin yang Skalabel' }, body: { en: "Create group 'HR-Team', add all HR users. Give group folder access. New hire? Add to group → instant access. Employee leaves? Remove from group → access revoked. One change affects all! Much better than individual permissions!", id: 'Buat grup "HR-Team", tambahkan semua pengguna HR. Beri akses folder grup. Karyawan baru? Tambahkan ke grup → akses instan. Karyawan pergi? Hapus dari grup → akses dicabut. Satu perubahan memengaruhi semua! Jauh lebih baik dari izin individual!' }, tip: { en: '💡 Nested groups: HR-Team can be member of Company-All group!', id: '💡 Grup bersarang: HR-Team bisa menjadi anggota grup Company-All!' }, image: null }, { emoji: '🔐', title: { en: 'NTFS + Share = Two Layers', id: 'NTFS + Share = Dua Lapisan' }, body: { en: "Two permission layers: SHARE (who can access over network) and NTFS (who can do what in folder). More restrictive wins! Best practice: Share = Everyone Full Control, control everything via NTFS only. Cleaner! 🎯", id: 'Dua lapisan izin: SHARE (siapa yang bisa akses melalui jaringan) dan NTFS (siapa yang bisa melakukan apa di folder). Yang lebih ketat menang! Praktik terbaik: Share = Everyone Full Control, kontrol segalanya hanya melalui NTFS. Lebih bersih! 🎯' }, tip: { en: '🚀 Document permission matrix — who has access to what!', id: '🚀 Dokumentasikan matriks izin — siapa punya akses ke apa!' }, image: null } ] },

  't5_006': { slides: [ { emoji: '🔐', title: { en: 'What Is SSH?', id: 'Apa Itu SSH?' }, body: { en: "SSH = secure private phone line 📞 to a Linux server. Control server remotely — type commands from anywhere! Encrypted, so nobody intercepts. Port 22 by default. Firewall must allow port 22 to connect.", id: 'SSH = saluran telepon pribadi yang aman 📞 ke server Linux. Kontrol server dari jarak jauh — ketik perintah dari mana saja! Terenkripsi, sehingga tidak ada yang menyadap. Port 22 secara default. Firewall harus mengizinkan port 22 untuk terhubung.' }, tip: { en: '💡 SSH = secure. Telnet = NOT secure (plain text). Always use SSH!', id: '💡 SSH = aman. Telnet = TIDAK aman (teks biasa). Selalu gunakan SSH!' }, image: null }, { emoji: '🚫', title: { en: 'SSH Connection Refused — Why?', id: 'SSH Connection Refused — Kenapa?' }, body: { en: "Refused means: 1) SSH service not running (systemctl status sshd). 2) Firewall blocking port 22. 3) Wrong IP. 4) Server is down. Check each one! systemctl start sshd = starts SSH service on Linux.", id: 'Ditolak berarti: 1) Layanan SSH tidak berjalan (systemctl status sshd). 2) Firewall memblokir port 22. 3) IP salah. 4) Server mati. Periksa satu per satu! systemctl start sshd = memulai layanan SSH di Linux.' }, tip: { en: '💡 systemctl start sshd → systemctl enable sshd (auto-start on boot)!', id: '💡 systemctl start sshd → systemctl enable sshd (auto-start saat boot)!' }, image: null }, { emoji: '🔑', title: { en: 'SSH Keys — Better Than Passwords', id: 'Kunci SSH — Lebih Baik dari Password' }, body: { en: "SSH key pair: private key on your PC, public key on server. They match = instant secure login without password! More secure than password. Never share private key. Store it safely. 🗝️", id: 'Pasangan kunci SSH: kunci privat di PC-mu, kunci publik di server. Keduanya cocok = login aman instan tanpa password! Lebih aman dari password. Jangan pernah berbagi kunci privat. Simpan dengan aman. 🗝️' }, tip: { en: '🚀 Disable password SSH auth, use keys only — prevents brute force!', id: '🚀 Nonaktifkan autentikasi password SSH, gunakan kunci saja — mencegah brute force!' }, image: null } ] },

  't5_007': { slides: [ { emoji: '📊', title: { en: 'Server Monitoring', id: 'Monitoring Server' }, body: { en: "Monitoring = CCTV for IT systems 📹. Watches CPU, RAM, disk, network 24/7. When something wrong (CPU 100% for 10min) → ALERT sent before users notice! Proactive IT = fewer crises. Always be watching!", id: 'Monitoring = CCTV untuk sistem IT 📹. Mengawasi CPU, RAM, disk, jaringan 24/7. Ketika ada yang salah (CPU 100% selama 10 menit) → ALERT dikirim sebelum pengguna menyadari! IT proaktif = lebih sedikit krisis. Selalu mengawasi!' }, tip: { en: '💡 Tools: Nagios, Zabbix, Datadog, PRTG — all excellent options!', id: '💡 Alat: Nagios, Zabbix, Datadog, PRTG — semua pilihan yang sangat baik!' }, image: null }, { emoji: '🚨', title: { en: 'Responding to Alerts', id: 'Merespons Alert' }, body: { en: "Alert received! 1) Don't panic. 2) Verify alert is real (false positive?). 3) SSH/RDP into server. 4) Check resource usage (top, Task Manager). 5) Identify offending process. 6) Fix or restart. Systematic = calm!", id: 'Alert diterima! 1) Jangan panik. 2) Verifikasi alert nyata (false positive?). 3) SSH/RDP ke server. 4) Periksa penggunaan sumber daya (top, Task Manager). 5) Identifikasi proses bermasalah. 6) Perbaiki atau restart. Sistematis = tenang!' }, tip: { en: '💡 Document every incident — helps find patterns over time!', id: '💡 Dokumentasikan setiap insiden — membantu menemukan pola dari waktu ke waktu!' }, image: null }, { emoji: '📈', title: { en: 'Baselines and Thresholds', id: 'Baseline dan Ambang Batas' }, body: { en: "Baseline = your normal. CPU normal = 20%, alert at 80%. RAM normal = 60%, alert at 90%. Without baseline you can't know what's abnormal. Establish baselines, then set smart thresholds. 📏", id: 'Baseline = kondisi normalmu. CPU normal = 20%, alert pada 80%. RAM normal = 60%, alert pada 90%. Tanpa baseline kamu tidak bisa tahu apa yang tidak normal. Tetapkan baseline, lalu atur ambang batas yang cerdas. 📏' }, tip: { en: '🚀 On-call rotation = not one person watching 24/7!', id: '🚀 Rotasi on-call = bukan satu orang mengawasi 24/7!' }, image: null } ] },

  't5_008': { slides: [ { emoji: '💻', title: { en: 'What Is Virtualization?', id: 'Apa Itu Virtualisasi?' }, body: { en: "Virtualization = one physical server running MANY virtual machines. Like apartments 🏢 — one building, many families living independently. Hyper-V is Microsoft's platform. Saves 80-90% in hardware costs!", id: 'Virtualisasi = satu server fisik menjalankan BANYAK mesin virtual. Seperti apartemen 🏢 — satu gedung, banyak keluarga hidup secara independen. Hyper-V adalah platform Microsoft. Menghemat 80-90% dalam biaya hardware!' }, tip: { en: '💡 1 physical server running 10 VMs = massive cost savings!', id: '💡 1 server fisik menjalankan 10 VM = penghematan biaya yang besar!' }, image: null }, { emoji: '🔧', title: { en: 'Why VM Fails to Boot', id: 'Kenapa VM Gagal Boot' }, body: { en: "VM boot failures: 1) Virtual disk missing. 2) Not enough RAM. 3) Snapshot conflict. 4) Hyper-V service not running. 5) Virtual switch wrong. Check Hyper-V event logs — they tell the exact story! 📜", id: 'Kegagalan boot VM: 1) Disk virtual hilang. 2) RAM tidak cukup. 3) Konflik snapshot. 4) Layanan Hyper-V tidak berjalan. 5) Virtual switch salah. Periksa log event Hyper-V — mereka menceritakan kisah yang tepat! 📜' }, tip: { en: '💡 Checkpoint = VM save state — great for before testing changes!', id: '💡 Checkpoint = simpan status VM — bagus sebelum menguji perubahan!' }, image: null }, { emoji: '🏥', title: { en: 'Recovery Steps', id: 'Langkah Pemulihan' }, body: { en: "1) Check Hyper-V Manager for errors. 2) Ensure Hyper-V service running. 3) Verify virtual disk path exists. 4) Restore from last checkpoint. 5) If disk corrupted → restore from backup. Always have VM backups! 🛡️", id: '1) Periksa Hyper-V Manager untuk error. 2) Pastikan layanan Hyper-V berjalan. 3) Verifikasi jalur disk virtual ada. 4) Pulihkan dari checkpoint terakhir. 5) Jika disk rusak → pulihkan dari backup. Selalu punya backup VM! 🛡️' }, tip: { en: '🚀 Replicate critical VMs to another host — instant failover!', id: '🚀 Replikasi VM kritis ke host lain — failover instan!' }, image: null } ] },

  't5_009': { slides: [ { emoji: '💽', title: { en: 'Linux Disk Full = Emergency!', id: 'Disk Linux Penuh = Darurat!' }, body: { en: "100% disk = everything stops! Web server can't write logs, database can't save data, users can't upload. Like a completely blocked pipe 🚰. Requires immediate action — every minute costs!", id: '100% disk = segalanya berhenti! Web server tidak bisa menulis log, database tidak bisa menyimpan data, pengguna tidak bisa mengunggah. Seperti pipa yang tersumbat sepenuhnya 🚰. Membutuhkan tindakan segera — setiap menit berharga!' }, tip: { en: '💡 df -h = shows disk usage. du -sh /* = shows biggest directories!', id: '💡 df -h = menampilkan penggunaan disk. du -sh /* = menampilkan direktori terbesar!' }, image: null }, { emoji: '🔍', title: { en: 'Finding Space Hogs', id: 'Menemukan Pemakan Ruang' }, body: { en: "Commands: df -h (all mounts), du -sh /* (top-level). Common culprits: /var/log (huge logs), /tmp (temp files), old kernels, database files. Drill down: du -sh /var/* to find the exact beast! 🐉", id: 'Perintah: df -h (semua mount), du -sh /* (tingkat atas). Penyebab umum: /var/log (log besar), /tmp (file temp), kernel lama, file database. Telusuri: du -sh /var/* untuk menemukan biang keladinya! 🐉' }, tip: { en: '💡 journalctl --vacuum-size=500M = shrinks logs to 500MB safely!', id: '💡 journalctl --vacuum-size=500M = mengecilkan log ke 500MB dengan aman!' }, image: null }, { emoji: '🧹', title: { en: 'Safe Cleanup', id: 'Pembersihan yang Aman' }, body: { en: "Safe to delete: apt/yum clean all (package cache), journalctl --vacuum-time=7d (old logs), /tmp old files, *.gz in /var/log. Then set up logrotate to prevent recurrence. Prevention > emergency! 🛡️", id: 'Aman untuk dihapus: apt/yum clean all (cache paket), journalctl --vacuum-time=7d (log lama), file /tmp lama, *.gz di /var/log. Kemudian atur logrotate untuk mencegah pengulangan. Pencegahan > darurat! 🛡️' }, tip: { en: '🚀 Set disk alerts at 80% — fix BEFORE it hits 100%!', id: '🚀 Atur alert disk pada 80% — perbaiki SEBELUM mencapai 100%!' }, image: null } ] },

  't5_010': { slides: [ { emoji: '🛡️', title: { en: 'Firewall — Security Guard', id: 'Firewall — Penjaga Keamanan' }, body: { en: "Firewall = security guard at the door 💂. Checks every connection: ALLOW or BLOCK. Like a bouncer at a club — based on rules. Default rule: BLOCK all, then allow only what is needed. Whitelist approach!", id: 'Firewall = penjaga keamanan di pintu 💂. Memeriksa setiap koneksi: IZINKAN atau BLOKIR. Seperti bouncer di klub — berdasarkan aturan. Aturan default: BLOKIR semua, lalu izinkan hanya yang diperlukan. Pendekatan whitelist!' }, tip: { en: '💡 Windows Firewall blocks RDP port 3389 by default!', id: '💡 Windows Firewall memblokir port RDP 3389 secara default!' }, image: null }, { emoji: '🔓', title: { en: 'Opening RDP Through Firewall', id: 'Membuka RDP Melalui Firewall' }, body: { en: "Fix: Windows Firewall → Inbound Rules → New Rule → Port → TCP 3389 → Allow. Or easier: search 'Allow an app through Windows Firewall' → check Remote Desktop. Test with telnet [IP] 3389 after! 🎯", id: 'Perbaikan: Windows Firewall → Aturan Masuk → Aturan Baru → Port → TCP 3389 → Izinkan. Atau lebih mudah: cari "Izinkan aplikasi melalui Windows Firewall" → centang Remote Desktop. Uji dengan telnet [IP] 3389 setelah itu! 🎯' }, tip: { en: '💡 telnet [IP] 3389 = tests if port 3389 is reachable!', id: '💡 telnet [IP] 3389 = menguji apakah port 3389 bisa dijangkau!' }, image: null }, { emoji: '🔐', title: { en: 'Secure RDP Always', id: 'Selalu Amankan RDP' }, body: { en: "NEVER open RDP directly to internet. Use VPN first, then RDP internally. Or use RD Gateway. Change port 3389 to custom. Enable NLA. RDP on internet = top hacker target. VPN protects everything! 🛡️", id: 'JANGAN pernah buka RDP langsung ke internet. Gunakan VPN dulu, lalu RDP secara internal. Atau gunakan RD Gateway. Ubah port 3389 ke kustom. Aktifkan NLA. RDP di internet = target hacker teratas. VPN melindungi segalanya! 🛡️' }, tip: { en: '🚀 Security: VPN + RDP + MFA = triple protection!', id: '🚀 Keamanan: VPN + RDP + MFA = perlindungan tiga lapis!' }, image: null } ] },

  't5_011': { slides: [ { emoji: '🧯', title: { en: 'Why Test Backups?', id: 'Kenapa Menguji Backup?' }, body: { en: "Untested backup = fire extinguisher never checked 🧯. Looks fine, but when fire hits — might not work! Many companies discover broken backups only during actual disaster. Test BEFORE you need them!", id: 'Backup yang belum diuji = alat pemadam tidak pernah diperiksa 🧯. Terlihat baik, tapi saat kebakaran terjadi — mungkin tidak berfungsi! Banyak perusahaan menemukan backup rusak hanya saat bencana nyata. Uji SEBELUM kamu membutuhkannya!' }, tip: { en: '💡 Backup without restore test = false sense of security!', id: '💡 Backup tanpa uji restore = rasa aman yang palsu!' }, image: null }, { emoji: '🔬', title: { en: 'How to Verify Backup', id: 'Cara Memverifikasi Backup' }, body: { en: "Steps: 1) Restore to TEST environment. 2) Check file integrity — can you open files? 3) Check completeness — all files there? 4) Test application with restored data. 5) Document results. Pass all = backup is real! ✅", id: 'Langkah: 1) Restore ke lingkungan UJI. 2) Periksa integritas file — bisa membuka file? 3) Periksa kelengkapan — semua file ada? 4) Uji aplikasi dengan data yang dipulihkan. 5) Dokumentasikan hasil. Lulus semua = backup nyata! ✅' }, tip: { en: '💡 ALWAYS restore to separate test env — never overwrite production!', id: '💡 SELALU restore ke lingkungan uji terpisah — jangan pernah menimpa produksi!' }, image: null }, { emoji: '📅', title: { en: 'Backup Testing Schedule', id: 'Jadwal Pengujian Backup' }, body: { en: "Test full restore: quarterly. File-level restore: monthly. Automate backup verification with hash/checksum checks. Log all results. Make backup testing a normal IT ritual, not a special event! 🔄", id: 'Uji restore penuh: setiap kuartal. Restore tingkat file: setiap bulan. Otomatiskan verifikasi backup dengan pemeriksaan hash/checksum. Catat semua hasil. Jadikan pengujian backup ritual IT normal, bukan acara khusus! 🔄' }, tip: { en: '🚀 Know your RTO and RPO numbers — test to validate them!', id: '🚀 Ketahui angka RTO dan RPO-mu — uji untuk memvalidasinya!' }, image: null } ] },

  // ─────────────────────────────────────────────────────────────
  //  TIER 5 — Additional missions (012-017)
  // ─────────────────────────────────────────────────────────────

  't5_012': { slides: [ { emoji: '👥', title: { en: 'Active Directory — The Company Directory', id: 'Active Directory — Direktori Perusahaan' }, body: { en: "Active Directory = the ultimate company phonebook. Every user account, computer, printer, and permission lives here. One place to manage all employees: create/disable accounts, set passwords, assign group memberships. AD is the backbone of every Windows enterprise network!", id: 'Active Directory = buku telepon perusahaan terbaik. Setiap akun pengguna, komputer, printer, dan izin ada di sini. Satu tempat untuk mengelola semua karyawan: buat/nonaktifkan akun, atur password, tetapkan keanggotaan grup. AD adalah tulang punggung setiap jaringan enterprise Windows!' }, tip: { en: '💡 OU (Organizational Unit) = folders inside AD to organize users by department!', id: '💡 OU (Organizational Unit) = folder di dalam AD untuk mengorganisir pengguna per departemen!' }, image: null }, { emoji: '📋', title: { en: 'Bulk User Import — Why Not Manual?', id: 'Import Pengguna Massal — Kenapa Tidak Manual?' }, body: { en: "Creating 100 accounts manually in AD takes hours and introduces typos. PowerShell Import-ADUser with a CSV file does it in 30 seconds, consistently, no errors. Always prepare: FirstName, LastName, Username, Department, OU, Password columns. Automation = precision + speed!", id: 'Membuat 100 akun secara manual di AD membutuhkan berjam-jam dan menimbulkan kesalahan ketik. PowerShell Import-ADUser dengan file CSV melakukannya dalam 30 detik, konsisten, tanpa error. Selalu siapkan: kolom FirstName, LastName, Username, Department, OU, Password. Otomasi = presisi + kecepatan!' }, tip: { en: '💡 Always test with 1-2 users from the CSV before running the full import!', id: '💡 Selalu uji dengan 1-2 pengguna dari CSV sebelum menjalankan import penuh!' }, image: null }, { emoji: '🔐', title: { en: 'Post-Import Security Steps', id: 'Langkah Keamanan Pasca-Import' }, body: { en: "After bulk import: 1) Force password change on first login. 2) Verify OUs are correct. 3) Check group memberships match department. 4) Disable any test accounts. 5) Send welcome email. 6) Run audit report to verify all accounts. Never skip the audit!", id: 'Setelah import massal: 1) Paksa perubahan password pada login pertama. 2) Verifikasi OU sudah benar. 3) Periksa keanggotaan grup sesuai departemen. 4) Nonaktifkan akun uji. 5) Kirim email sambutan. 6) Jalankan laporan audit. Jangan pernah lewati audit!' }, tip: { en: '🚀 Use Get-ADUser -Filter * | Export-CSV to audit all created accounts!', id: '🚀 Gunakan Get-ADUser -Filter * | Export-CSV untuk mengaudit semua akun yang dibuat!' }, image: null } ] },

  't5_013': { slides: [ { emoji: '📜', title: { en: 'Group Policy — The Rule Book', id: 'Group Policy — Buku Aturan' }, body: { en: "GPO (Group Policy Object) = rules pushed from the server to ALL computers automatically. Lock screen after 5 min idle? Done for all 200 PCs. Block USB drives? Done everywhere. Enforce screensaver? Done. One setting in GPO = instant change across the entire organization!", id: 'GPO (Group Policy Object) = aturan yang didorong dari server ke SEMUA komputer secara otomatis. Kunci layar setelah 5 menit idle? Selesai untuk semua 200 PC. Blokir USB drive? Selesai di mana saja. Paksa screensaver? Selesai. Satu pengaturan di GPO = perubahan instan di seluruh organisasi!' }, tip: { en: '💡 GPO applies to OUs — assign GPO to the right OU for targeted control!', id: '💡 GPO berlaku untuk OU — tetapkan GPO ke OU yang benar untuk kontrol yang ditargetkan!' }, image: null }, { emoji: '🔧', title: { en: 'Creating a GPO — The Right Way', id: 'Membuat GPO — Cara yang Benar' }, body: { en: "Steps: 1) Open GPMC. 2) Right-click target OU → Create GPO. 3) Edit: Computer/User Config → Policies → find setting. 4) Link GPO to OU. 5) Run gpupdate /force on test machine. 6) Verify with gpresult /r. Always test on one machine first!", id: 'Langkah: 1) Buka GPMC. 2) Klik kanan OU target → Buat GPO. 3) Edit: Konfigurasi Komputer/Pengguna → Kebijakan → temukan pengaturan. 4) Tautkan GPO ke OU. 5) Jalankan gpupdate /force di mesin uji. 6) Verifikasi dengan gpresult /r. Selalu uji di satu mesin dulu!' }, tip: { en: '💡 gpresult /r shows which GPOs are applied to the machine — great for debugging!', id: '💡 gpresult /r menampilkan GPO mana yang diterapkan ke mesin — bagus untuk debugging!' }, image: null }, { emoji: '⚠️', title: { en: 'GPO Troubleshooting', id: 'Troubleshooting GPO' }, body: { en: "GPO not applying? Check: 1) Is PC in the correct OU? 2) Is GPO linked to that OU? 3) Is GPO enforced or blocked? 4) Run gpupdate /force. 5) Check gpresult /r for conflicts. 6) Look at Event Viewer → Applications → Group Policy. Methodical debugging always wins!", id: 'GPO tidak diterapkan? Periksa: 1) Apakah PC ada di OU yang benar? 2) Apakah GPO ditautkan ke OU itu? 3) Apakah GPO ditegakkan atau diblokir? 4) Jalankan gpupdate /force. 5) Periksa gpresult /r untuk konflik. 6) Lihat Event Viewer. Debug metodis selalu menang!' }, tip: { en: '🚀 Default Domain Policy applies to all — be careful editing it!', id: '🚀 Default Domain Policy berlaku untuk semua — hati-hati mengeditnya!' }, image: null } ] },

  't5_014': { slides: [ { emoji: '🏢', title: { en: 'WSUS — Patch Your Whole Company', id: 'WSUS — Patch Seluruh Perusahaan' }, body: { en: "WSUS (Windows Server Update Services) = centralized Windows Update for the company. Without it: 500 PCs each download the same 1GB update separately = 500GB bandwidth wasted! With WSUS: download once, distribute internally. Saves bandwidth + gives IT control over WHAT and WHEN updates deploy.", id: 'WSUS (Windows Server Update Services) = Windows Update terpusat untuk perusahaan. Tanpanya: 500 PC masing-masing mengunduh update 1GB yang sama = 500GB bandwidth terbuang! Dengan WSUS: unduh sekali, distribusikan secara internal. Menghemat bandwidth + memberi IT kendali atas APA dan KAPAN update di-deploy.' }, tip: { en: '💡 WSUS = saves bandwidth + controlled rollout + patch compliance reporting!', id: '💡 WSUS = hemat bandwidth + rollout terkontrol + laporan kepatuhan patch!' }, image: null }, { emoji: '✅', title: { en: 'The Approval Workflow', id: 'Alur Kerja Persetujuan' }, body: { en: "WSUS NEVER auto-installs — you APPROVE each update. Workflow: Sync → Review → Approve for Test group → Wait 1 week → Approve for Production. This catches bad updates BEFORE they break production! Microsoft occasionally releases buggy patches. Test first = IT hero. Skip testing = IT disaster.", id: 'WSUS TIDAK PERNAH auto-install — kamu MENYETUJUI setiap update. Alur kerja: Sinkron → Tinjau → Setujui untuk grup Uji → Tunggu 1 minggu → Setujui untuk Produksi. Ini menangkap update buruk SEBELUM merusak produksi! Uji dulu = hero IT. Lewati pengujian = bencana IT.' }, tip: { en: '💡 Always have a test computer group in WSUS — your production safety net!', id: '💡 Selalu punya grup komputer uji di WSUS — jaring pengaman produksi kamu!' }, image: null }, { emoji: '🔍', title: { en: 'Troubleshooting WSUS Clients', id: 'Troubleshooting Klien WSUS' }, body: { en: "Client not getting updates? Checklist: 1) Is GPO pointing to WSUS server URL? Run gpresult. 2) Run wuauclt /detectnow. 3) Check Windows Update log. 4) Verify PC is in correct WSUS computer group. 5) Check server has approved updates for this group. Systematic = solved in minutes!", id: 'Klien tidak mendapatkan update? Daftar periksa: 1) Apakah GPO menunjuk ke URL server WSUS? Jalankan gpresult. 2) Jalankan wuauclt /detectnow. 3) Periksa log Windows Update. 4) Verifikasi PC ada di grup komputer WSUS yang benar. 5) Periksa server telah menyetujui update. Sistematis = selesai dalam hitungan menit!' }, tip: { en: '🚀 WSUS reports show patch compliance % per computer group — track it monthly!', id: '🚀 Laporan WSUS menampilkan % kepatuhan patch per grup komputer — lacak bulanan!' }, image: null } ] },

  't5_015': { slides: [ { emoji: '🗄️', title: { en: 'NAS — Network Storage for Everyone', id: 'NAS — Penyimpanan Jaringan untuk Semua' }, body: { en: "NAS (Network Attached Storage) = shared hard drive on the network. Like a USB drive, but accessible by EVERYONE on the network simultaneously. Finance saves to \\\\NAS\\Finance, HR to \\\\NAS\\HR. No more emailing files! Centralized, backed up, accessible from any PC.", id: 'NAS (Network Attached Storage) = hard drive bersama di jaringan. Seperti USB drive, tapi bisa diakses oleh SEMUA ORANG di jaringan secara bersamaan. Finance menyimpan ke \\NAS\\Finance, HR ke \\NAS\\HR. Tidak perlu lagi email file! Terpusat, dibackup, dapat diakses dari PC mana pun.' }, tip: { en: '💡 NAS with RAID 1 = if one drive dies, zero data loss. Worth it!', id: '💡 NAS dengan RAID 1 = jika satu drive mati, tidak ada kehilangan data. Sepadan!' }, image: null }, { emoji: '🔐', title: { en: 'Securing Shared Folders', id: 'Mengamankan Folder Bersama' }, body: { en: "NTFS permissions are king: Finance folder → Finance AD group gets Read/Write, everyone else = No Access. HR folder → HR AD group only. NEVER give Everyone full access! Map drives via GPO so they appear automatically on all PCs. AD groups = the cleanest way to manage folder permissions.", id: 'Izin NTFS adalah raja: folder Finance → grup AD Finance mendapat Baca/Tulis, yang lain = Tidak Ada Akses. Folder HR → hanya grup AD HR. JANGAN PERNAH memberi Everyone akses penuh! Petakan drive via GPO agar muncul otomatis di semua PC. Grup AD = cara paling bersih untuk mengelola izin folder.' }, tip: { en: '💡 Always remove the built-in "Everyone" permission from shared folders!', id: '💡 Selalu hapus izin "Everyone" bawaan dari folder bersama!' }, image: null }, { emoji: '⚠️', title: { en: 'RAID ≠ Backup!', id: 'RAID ≠ Backup!' }, body: { en: "Common misconception: RAID protects data, so no backup needed. WRONG! RAID protects against drive FAILURE only. RAID cannot protect against: accidental deletion, ransomware, fire/flood, power surge. Always: NAS with RAID + separate offsite/cloud backup. Defense in depth!", id: 'Kesalahpahaman umum: RAID melindungi data, jadi tidak perlu backup. SALAH! RAID hanya melindungi dari kegagalan DRIVE. RAID tidak bisa melindungi dari: penghapusan tidak sengaja, ransomware, kebakaran/banjir. Selalu: NAS dengan RAID + backup offsite/cloud terpisah. Pertahanan berlapis!' }, tip: { en: '🚀 3-2-1 rule: 3 copies, 2 media types, 1 offsite. The gold standard!', id: '🚀 Aturan 3-2-1: 3 salinan, 2 jenis media, 1 di luar lokasi. Standar emas!' }, image: null } ] },

  't5_016': { slides: [ { emoji: '🤖', title: { en: 'PowerShell — Your IT Superpower', id: 'PowerShell — Kekuatan Super IT Kamu' }, body: { en: "PowerShell is the IT professional's Swiss Army knife. It can manage servers, users, files, services, and network across hundreds of machines simultaneously. What takes a human 2 hours manually, PowerShell does in 30 seconds. Learning PowerShell = multiplying your productivity 100x!", id: 'PowerShell adalah pisau Swiss Army profesional IT. Ia bisa mengelola server, pengguna, file, layanan, dan jaringan di ratusan mesin secara bersamaan. Yang membutuhkan manusia 2 jam secara manual, PowerShell lakukan dalam 30 detik. Belajar PowerShell = melipatgandakan produktivitas kamu 100x!' }, tip: { en: '💡 Get-Help [cmdlet] -Examples = your best friend for learning PowerShell!', id: '💡 Get-Help [cmdlet] -Examples = sahabat terbaik kamu untuk belajar PowerShell!' }, image: null }, { emoji: '📊', title: { en: 'Disk Monitoring Script Logic', id: 'Logika Script Monitoring Disk' }, body: { en: "Script structure: 1) Read server list from file. 2) Loop through each server. 3) Get disk info with Get-PSDrive. 4) Calculate % free. 5) If below threshold → add to alert list. 6) Send one email with ALL alerts. 7) Schedule with Task Scheduler daily at 6am. Proactive > reactive!", id: 'Struktur script: 1) Baca daftar server dari file. 2) Loop melalui setiap server. 3) Dapatkan info disk dengan Get-PSDrive. 4) Hitung % bebas. 5) Jika di bawah ambang → tambahkan ke daftar alert. 6) Kirim satu email dengan SEMUA alert. 7) Jadwalkan dengan Task Scheduler harian jam 6 pagi. Proaktif > reaktif!' }, tip: { en: '💡 Test manually first, then schedule — never schedule an untested script!', id: '💡 Uji secara manual dulu, lalu jadwalkan — jangan pernah jadwalkan script yang belum diuji!' }, image: null }, { emoji: '📅', title: { en: 'Task Scheduler Best Practices', id: 'Praktik Terbaik Task Scheduler' }, body: { en: "Schedule settings: Run whether user is logged on or not (critical for server scripts!). Run with highest privileges. Log all output to file. Add error handling — use try/catch in PowerShell. Monitor the scheduler itself — a silently failing scheduled task is worse than no monitoring!", id: 'Pengaturan jadwal: Jalankan terlepas pengguna login atau tidak (kritis untuk script server!). Jalankan dengan hak istimewa tertinggi. Catat semua output ke file. Tambahkan penanganan error — gunakan try/catch di PowerShell. Pantau scheduler itu sendiri — tugas terjadwal yang gagal diam-diam lebih buruk dari tidak ada monitoring!' }, tip: { en: '🚀 Automate 20% of repetitive tasks = free up 80% of your time for important work!', id: '🚀 Otomasi 20% tugas berulang = bebaskan 80% waktu kamu untuk pekerjaan penting!' }, image: null } ] },

  't5_017': { slides: [ { emoji: '📸', title: { en: 'What Are Hyper-V Snapshots?', id: 'Apa Itu Snapshot Hyper-V?' }, body: { en: "Hyper-V snapshot = a point-in-time photo of a VM. Like Ctrl+Z for an entire server — if a patch breaks something, revert instantly! Snapshots capture: disk state, memory state, VM configuration. Super powerful... but dangerous if left unmanaged on production VMs.", id: 'Snapshot Hyper-V = foto titik waktu dari VM. Seperti Ctrl+Z untuk seluruh server — jika patch merusak sesuatu, kembalikan seketika! Snapshot menangkap: status disk, status memori, konfigurasi VM. Sangat kuat... tapi berbahaya jika dibiarkan tidak dikelola di VM produksi.' }, tip: { en: '💡 Take snapshot BEFORE patches or config changes — delete AFTER verifying success!', id: '💡 Ambil snapshot SEBELUM patch atau perubahan konfigurasi — hapus SETELAH memverifikasi keberhasilan!' }, image: null }, { emoji: '⚠️', title: { en: 'The Snapshot Danger Zone', id: 'Zona Bahaya Snapshot' }, body: { en: "Each snapshot creates an AVHD differencing disk. 47 snapshots = 47 AVHD files chained together. Every disk I/O traverses all 47 files = massive performance degradation! Disk fills up fast. Microsoft recommends MAX 3-4 snapshots per VM. NEVER delete AVHD files manually — use Hyper-V Manager to merge!", id: 'Setiap snapshot membuat AVHD differencing disk. 47 snapshot = 47 file AVHD yang dirantai. Setiap I/O disk melintasi semua 47 file = degradasi performa masif! Disk cepat penuh. Microsoft merekomendasikan MAKSIMAL 3-4 snapshot per VM. JANGAN PERNAH hapus file AVHD secara manual — gunakan Hyper-V Manager untuk menggabungkan!' }, tip: { en: '💡 Check snapshot count monthly — prevent accumulation before it becomes a problem!', id: '💡 Periksa jumlah snapshot bulanan — cegah akumulasi sebelum menjadi masalah!' }, image: null }, { emoji: '🔧', title: { en: 'Safe Snapshot Cleanup', id: 'Pembersihan Snapshot yang Aman' }, body: { en: "Correct cleanup: 1) Hyper-V Manager → right-click snapshot → Delete Checkpoint Subtree. 2) Hyper-V automatically merges AVHD into parent VHD (takes hours for many snapshots!). 3) Schedule in maintenance window — disk I/O spikes during merge. 4) Monitor disk space during merge. 5) After merge: verify VM works, then re-enable automatic snapshots.", id: 'Pembersihan yang benar: 1) Hyper-V Manager → klik kanan snapshot → Hapus Checkpoint Subtree. 2) Hyper-V secara otomatis menggabungkan AVHD ke VHD parent (butuh berjam-jam!). 3) Jadwalkan dalam jendela pemeliharaan — I/O disk melonjak selama penggabungan. 4) Pantau ruang disk selama penggabungan. 5) Setelah penggabungan: verifikasi VM bekerja, lalu aktifkan kembali snapshot otomatis harian.' }, tip: { en: '🚀 Set max checkpoint count in VM Settings — prevent future accumulation automatically!', id: '🚀 Atur jumlah checkpoint maks di Pengaturan VM — cegah akumulasi di masa depan secara otomatis!' }, image: null } ] },

  // ─────────────────────────────────────────────────────────────
  //  TIER 6
  // ─────────────────────────────────────────────────────────────

  't6_001': { slides: [ { emoji: '🦠', title: { en: 'What Is Malware?', id: 'Apa Itu Malware?' }, body: { en: "Malware = malicious software sneaking into PC 🐛. Like a virus in a body — hides, spreads, damages. Types: virus, ransomware, spyware, trojan. Isolation = disconnect first, investigate second. Stop the spread!", id: 'Malware = software berbahaya yang menyelinap ke PC 🐛. Seperti virus di tubuh — bersembunyi, menyebar, merusak. Jenis: virus, ransomware, spyware, trojan. Isolasi = putuskan koneksi dulu, selidiki kedua. Hentikan penyebaran!' }, tip: { en: '💡 Disconnect IMMEDIATELY when malware is suspected!', id: '💡 Putuskan koneksi SEGERA ketika malware dicurigai!' }, image: null }, { emoji: '🔌', title: { en: 'Isolating Infected PC', id: 'Mengisolasi PC yang Terinfeksi' }, body: { en: "IMMEDIATELY: unplug network cable or disable WiFi. Like quarantine for sick patient 🏥. Stop malware spreading to other PCs on network. Do NOT reboot — some malware hides evidence on shutdown! 🚨", id: 'SEGERA: cabut kabel jaringan atau nonaktifkan WiFi. Seperti karantina untuk pasien sakit 🏥. Hentikan penyebaran malware ke PC lain di jaringan. JANGAN reboot — beberapa malware menyembunyikan bukti saat shutdown! 🚨' }, tip: { en: '💡 Disconnect from network BEFORE doing anything else!', id: '💡 Putuskan dari jaringan SEBELUM melakukan hal lain!' }, image: null }, { emoji: '🧹', title: { en: 'Cleaning and Recovery', id: 'Pembersihan dan Pemulihan' }, body: { en: "After isolating: 1) Scan with multiple AV tools (offline scanner best). 2) Quarantine threats. 3) Check startup/scheduled tasks. 4) Reset ALL passwords. 5) Restore from pre-infection backup. 6) Reconnect and monitor closely! 🔍", id: 'Setelah isolasi: 1) Pindai dengan beberapa alat AV (scanner offline terbaik). 2) Karantina ancaman. 3) Periksa startup/tugas terjadwal. 4) Reset SEMUA password. 5) Pulihkan dari backup sebelum infeksi. 6) Hubungkan kembali dan pantau dengan ketat! 🔍' }, tip: { en: '🚀 Severe infection: wipe and reinstall = guaranteed clean!', id: '🚀 Infeksi parah: hapus dan instal ulang = dijamin bersih!' }, image: null } ] },

  't6_002': { slides: [ { emoji: '🎣', title: { en: 'What Is Phishing?', id: 'Apa Itu Phishing?' }, body: { en: "Phishing = fake email pretending to be trusted source 🎭. Like fake police knocking — looks real, but lying! Goal: trick into clicking link or revealing password. 95% of cyber breaches start with phishing!", id: 'Phishing = email palsu yang berpura-pura dari sumber tepercaya 🎭. Seperti polisi palsu yang mengetuk — terlihat nyata, tapi berbohong! Tujuan: menipu untuk mengklik tautan atau mengungkapkan password. 95% pelanggaran siber dimulai dengan phishing!' }, tip: { en: '💡 If it feels urgent and suspicious — it probably IS phishing!', id: '💡 Jika terasa mendesak dan mencurigakan — kemungkinan ITU phishing!' }, image: null }, { emoji: '🔍', title: { en: 'Spotting Phishing Emails', id: 'Mengenali Email Phishing' }, body: { en: "Red flags: 1) Sender email doesn't match company (goog1e.com ≠ google.com). 2) Urgency ('Act NOW!'). 3) Suspicious links (hover before clicking!). 4) Asks for password. 5) Bad grammar. When in doubt — don't click!", id: 'Tanda bahaya: 1) Email pengirim tidak cocok perusahaan (goog1e.com ≠ google.com). 2) Urgensi ("Bertindak SEKARANG!"). 3) Tautan mencurigakan (hover sebelum mengklik!). 4) Meminta password. 5) Tata bahasa buruk. Jika ragu — jangan klik!' }, tip: { en: '💡 Hover over links BEFORE clicking to see real destination!', id: '💡 Hover di atas tautan SEBELUM mengklik untuk melihat tujuan nyata!' }, image: null }, { emoji: '📋', title: { en: 'User Clicked Phishing — Now What?', id: 'Pengguna Mengklik Phishing — Sekarang?' }, body: { en: "1) Stay calm (don't alarm user). 2) Immediately reset their password. 3) Check login logs for unauthorized access. 4) Scan their PC. 5) Report to security team. 6) Block sender in mail filter. 7) Brief all users! 🚨", id: '1) Tetap tenang (jangan alarmi pengguna). 2) Segera reset password mereka. 3) Periksa log login untuk akses tidak sah. 4) Pindai PC mereka. 5) Laporkan ke tim keamanan. 6) Blokir pengirim di filter mail. 7) Beri tahu semua pengguna! 🚨' }, tip: { en: '🚀 Run phishing simulation training — teach before real attack hits!', id: '🚀 Jalankan pelatihan simulasi phishing — ajarkan sebelum serangan nyata terjadi!' }, image: null } ] },

  't6_003': { slides: [ { emoji: '👁️', title: { en: 'Security Operations Center (SOC)', id: 'Security Operations Center (SOC)' }, body: { en: "SOC = team watching ALL company systems 24/7 — like a watchtower with cameras everywhere 🏰. Looks for attacks, suspicious activity, responds to security incidents in real time. The company's immune system!", id: 'SOC = tim yang mengawasi SEMUA sistem perusahaan 24/7 — seperti menara pengawas dengan kamera di mana-mana 🏰. Mencari serangan, aktivitas mencurigakan, merespons insiden keamanan secara real time. Sistem imun perusahaan!' }, tip: { en: '💡 SOC uses SIEM tools to correlate events across all systems!', id: '💡 SOC menggunakan alat SIEM untuk mengkorelasikan event di semua sistem!' }, image: null }, { emoji: '🚨', title: { en: 'Detecting Threats with SIEM', id: 'Mendeteksi Ancaman dengan SIEM' }, body: { en: "SIEM collects logs from ALL systems. Looks for patterns: 100 failed logins = brute force! Admin login at 3am = suspicious! After-hours data download = possible breach! SIEM finds hidden needles in massive haystacks. 🕵️", id: 'SIEM mengumpulkan log dari SEMUA sistem. Mencari pola: 100 login gagal = brute force! Login admin jam 3 pagi = mencurigakan! Unduhan data di luar jam = kemungkinan pelanggaran! SIEM menemukan jarum tersembunyi di tumpukan jerami besar. 🕵️' }, tip: { en: '💡 False positive = alert on normal activity. Tune rules to reduce noise!', id: '💡 False positive = alert pada aktivitas normal. Sesuaikan aturan untuk mengurangi kebisingan!' }, image: null }, { emoji: '⚡', title: { en: 'Speed of Response', id: 'Kecepatan Respons' }, body: { en: "Attackers move fast — 4 minutes from breach to spreading. SOC goal: detect in 1 hour, respond in 4. MTTR = Mean Time to Respond. Lower = better. Playbooks = pre-planned response for common attacks. Be ready! 🏃", id: 'Penyerang bergerak cepat — 4 menit dari pelanggaran ke penyebaran. Tujuan SOC: deteksi dalam 1 jam, respons dalam 4. MTTR = Rata-rata Waktu Respons. Lebih rendah = lebih baik. Playbook = respons yang direncanakan untuk serangan umum. Bersiaplah! 🏃' }, tip: { en: '🚀 Playbooks = practice scripts so you respond correctly under pressure!', id: '🚀 Playbook = skrip latihan agar kamu merespons dengan benar di bawah tekanan!' }, image: null } ] },

  't6_004': { slides: [ { emoji: '🔒', title: { en: 'What Is MFA?', id: 'Apa Itu MFA?' }, body: { en: "MFA = TWO locks on your door 🔒🔒. Password = what you KNOW. Phone code = what you HAVE. Fingerprint = what you ARE. Hacker gets password but has no phone = still can't enter! MFA blocks 99.9% of automated attacks!", id: 'MFA = DUA kunci di pintumu 🔒🔒. Password = apa yang KAMU TAHU. Kode HP = apa yang KAMU PUNYA. Sidik jari = apa yang KAMU. Hacker mendapat password tapi tidak punya HP = tetap tidak bisa masuk! MFA memblokir 99,9% serangan otomatis!' }, tip: { en: '💡 MFA blocks 99.9% of automated attacks — just turn it on!', id: '💡 MFA memblokir 99,9% serangan otomatis — cukup aktifkan!' }, image: null }, { emoji: '📱', title: { en: 'Deploying MFA Company-Wide', id: 'Menerapkan MFA Seluruh Perusahaan' }, body: { en: "Rollout: 1) Pilot with IT team. 2) Fix issues. 3) Train users (simple guide!). 4) Department by department rollout. 5) Set mandatory deadline. 6) Support struggling users. Patience = successful adoption! 🎓", id: 'Rollout: 1) Pilot dengan tim IT. 2) Perbaiki masalah. 3) Latih pengguna (panduan sederhana!). 4) Rollout departemen demi departemen. 5) Tetapkan batas waktu wajib. 6) Dukung pengguna yang kesulitan. Sabar = adopsi yang sukses! 🎓' }, tip: { en: '💡 Authenticator app > SMS codes — app is more secure!', id: '💡 Aplikasi Authenticator > kode SMS — aplikasi lebih aman!' }, image: null }, { emoji: '🛟', title: { en: 'When MFA Fails', id: 'Ketika MFA Gagal' }, body: { en: "User lost phone = locked out! Solution: use backup codes (print at enrollment!). Admin resets in Azure AD/Active Directory. Always keep backup codes printed and stored safely. MFA ≠ permanent lockout! 🔑", id: 'Pengguna kehilangan HP = terkunci! Solusi: gunakan kode cadangan (cetak saat pendaftaran!). Reset admin di Azure AD/Active Directory. Selalu simpan kode cadangan yang dicetak dengan aman. MFA ≠ kunci permanen! 🔑' }, tip: { en: '🚀 Conditional Access = MFA only from outside office network!', id: '🚀 Conditional Access = MFA hanya dari luar jaringan kantor!' }, image: null } ] },

  't6_005': { slides: [ { emoji: '📋', title: { en: 'VPN Logs — The Spy Diary', id: 'Log VPN — Buku Harian Mata-Mata' }, body: { en: "VPN logs record every connection: who, when, from where, how long. Like a hotel guest book 🏨. Suspicious: CEO VPN login from Moscow at 3am? CEO is in Jakarta. That is your red flag! 🚩", id: 'Log VPN merekam setiap koneksi: siapa, kapan, dari mana, berapa lama. Seperti buku tamu hotel 🏨. Mencurigakan: login VPN CEO dari Moskow jam 3 pagi? CEO ada di Jakarta. Itu tanda bahayamu! 🚩' }, tip: { en: '💡 Analyze VPN logs whenever investigating suspicious access!', id: '💡 Analisis log VPN setiap kali menyelidiki akses mencurigakan!' }, image: null }, { emoji: '🔍', title: { en: 'Investigating Suspicious Login', id: 'Menyelidiki Login Mencurigakan' }, body: { en: "Steps: 1) Check VPN logs for unusual location/time. 2) Contact user — did THEY login? 3) Check what was accessed post-VPN. 4) Look for data exfiltration. 5) Revoke session if compromise suspected. Act fast! 🚨", id: 'Langkah: 1) Periksa log VPN untuk lokasi/waktu yang tidak biasa. 2) Hubungi pengguna — apakah MEREKA yang login? 3) Periksa apa yang diakses setelah VPN. 4) Cari eksfiltrasi data. 5) Cabut sesi jika kompromi dicurigai. Bertindak cepat! 🚨' }, tip: { en: '💡 Impossible travel = login from London then Jakarta 1hr later = hacked!', id: '💡 Perjalanan tidak mungkin = login dari London lalu Jakarta 1 jam kemudian = diretas!' }, image: null }, { emoji: '🛡️', title: { en: 'VPN Security Hardening', id: 'Penguatan Keamanan VPN' }, body: { en: "Best practices: 1) MFA for VPN mandatory! 2) Geo-blocking (block unexpected countries). 3) Session time limits (auto-disconnect at 8hr). 4) Audit logs monthly. 5) Split tunneling off. Zero Trust approach! 🔐", id: 'Praktik terbaik: 1) MFA untuk VPN wajib! 2) Geo-blocking (blokir negara yang tidak diharapkan). 3) Batas waktu sesi (putus otomatis pada 8 jam). 4) Audit log bulanan. 5) Split tunneling mati. Pendekatan Zero Trust! 🔐' }, tip: { en: '🚀 Zero Trust = never trust, always verify — even internal users!', id: '🚀 Zero Trust = tidak pernah percaya, selalu verifikasi — bahkan pengguna internal!' }, image: null } ] },

  't6_006': { slides: [ { emoji: '🔒', title: { en: 'What Is Ransomware?', id: 'Apa Itu Ransomware?' }, body: { en: "Ransomware encrypts all files, demands payment for key 💰. Like thief locking house and selling key back. Average demand: $200,000+! And paying doesn't guarantee getting files back. Prevention = best defense!", id: 'Ransomware mengenkripsi semua file, meminta pembayaran untuk kunci 💰. Seperti pencuri yang mengunci rumah dan menjual kunci kembali. Tuntutan rata-rata: $200.000+! Dan membayar tidak menjamin mendapatkan file kembali. Pencegahan = pertahanan terbaik!' }, tip: { en: '💡 Air-gapped backup = ransomware cannot reach it. Ultimate protection!', id: '💡 Backup air-gapped = ransomware tidak bisa menjangkaunya. Perlindungan terbaik!' }, image: null }, { emoji: '🚨', title: { en: 'Containment — Stop the Spread!', id: 'Containment — Hentikan Penyebaran!' }, body: { en: "IMMEDIATELY: 1) Disconnect infected PC from network. 2) Notify security team. 3) Check which shared drives are encrypted. 4) Disconnect file servers if shares are being encrypted. 5) Preserve evidence — do NOT reboot!", id: 'SEGERA: 1) Putuskan PC yang terinfeksi dari jaringan. 2) Beritahu tim keamanan. 3) Periksa shared drive mana yang dienkripsi. 4) Putuskan server file jika share sedang dienkripsi. 5) Jaga bukti — JANGAN reboot!' }, tip: { en: '💡 Every second ransomware runs = more files encrypted! Speed is critical!', id: '💡 Setiap detik ransomware berjalan = lebih banyak file terenkripsi! Kecepatan kritis!' }, image: null }, { emoji: '🏥', title: { en: 'Recovery Process', id: 'Proses Pemulihan' }, body: { en: "After containment: 1) Wipe infected systems. 2) Restore from CLEAN backup (pre-infection). 3) Report to law enforcement. 4) Analyze entry point. 5) Fix vulnerability. 6) Train users. NEVER pay ransom!", id: 'Setelah penahanan: 1) Hapus sistem yang terinfeksi. 2) Restore dari backup BERSIH (sebelum infeksi). 3) Laporkan ke penegak hukum. 4) Analisis titik masuk. 5) Perbaiki kerentanan. 6) Latih pengguna. JANGAN PERNAH bayar tebusan!' }, tip: { en: '🚀 Offline backup = your BEST protection against ransomware!', id: '🚀 Backup offline = perlindungan TERBAIK-mu terhadap ransomware!' }, image: null } ] },

  't6_007': { slides: [ { emoji: '🏰', title: { en: 'Active Directory Security', id: 'Keamanan Active Directory' }, body: { en: "AD is the kingdom 👑 — Domain Admin = king of everything. Biggest enterprise attacks target AD. One compromised admin = attacker owns entire company. Protecting AD = protecting everything. Highest priority!", id: 'AD adalah kerajaan 👑 — Domain Admin = raja segalanya. Serangan enterprise terbesar menargetkan AD. Satu admin yang dikompromikan = penyerang memiliki seluruh perusahaan. Melindungi AD = melindungi segalanya. Prioritas tertinggi!' }, tip: { en: '💡 Audit Domain Admins group regularly — keep it minimal!', id: '💡 Audit grup Domain Admins secara teratur — pertahankan seminimal mungkin!' }, image: null }, { emoji: '🔍', title: { en: 'AD Security Audit', id: 'Audit Keamanan AD' }, body: { en: "Check regularly: 1) Who is Domain Admin? (Should be very few). 2) Accounts inactive 90+ days? (Disable them). 3) Service accounts with excess rights? (Remove). 4) Password policy enforced? 5) Audit logging on? ✅", id: 'Periksa secara teratur: 1) Siapa Domain Admin? (Harus sangat sedikit). 2) Akun tidak aktif 90+ hari? (Nonaktifkan). 3) Akun layanan dengan hak berlebih? (Hapus). 4) Kebijakan password diterapkan? 5) Logging audit aktif? ✅' }, tip: { en: '💡 Principle of Least Privilege = AD cornerstone. Less access = less risk!', id: '💡 Prinsip Hak Minimum = landasan AD. Akses lebih sedikit = risiko lebih sedikit!' }, image: null }, { emoji: '🛡️', title: { en: 'Protecting Admin Accounts', id: 'Melindungi Akun Admin' }, body: { en: "Use SEPARATE accounts for admin tasks (admin.john vs john). Never browse internet with admin account! Enable just-in-time access. Use PAM tools. Admin ≠ daily account. Treat admin credentials like gold! 🔐", id: 'Gunakan akun TERPISAH untuk tugas admin (admin.john vs john). Jangan pernah menjelajahi internet dengan akun admin! Aktifkan akses tepat waktu. Gunakan alat PAM. Admin ≠ akun sehari-hari. Perlakukan kredensial admin seperti emas! 🔐' }, tip: { en: '🚀 Tiered Admin Model: Tier 0 (AD) → Tier 1 (servers) → Tier 2 (PCs)!', id: '🚀 Model Admin Berjenjang: Tier 0 (AD) → Tier 1 (server) → Tier 2 (PC)!' }, image: null } ] },

  't6_008': { slides: [ { emoji: '📧', title: { en: 'Business Email Compromise (BEC)', id: 'Business Email Compromise (BEC)' }, body: { en: "BEC = hacker compromises email, pretends to be CEO/CFO. Emails Finance: 'Urgent wire transfer — $50,000 now!' No malware — just social engineering. Costs $26 billion/year globally! Very dangerous attack! 💸", id: 'BEC = hacker mengkompromikan email, berpura-pura jadi CEO/CFO. Mengirim email ke Keuangan: "Transfer kawat mendesak — $50.000 sekarang!" Tidak ada malware — hanya rekayasa sosial. Merugikan $26 miliar/tahun secara global! Serangan yang sangat berbahaya! 💸' }, tip: { en: '💡 ALWAYS call to verify any financial transfer request — never email only!', id: '💡 SELALU telepon untuk memverifikasi permintaan transfer keuangan — jangan hanya email!' }, image: null }, { emoji: '🔍', title: { en: 'Investigating BEC', id: 'Menyelidiki BEC' }, body: { en: "Check email headers: real 'From' server vs displayed name. Legitimate CEO email = from company server. Fake = from Gmail/Hotmail with CEO name. Check login history of compromised account. Reset password immediately! 🔑", id: 'Periksa header email: server "From" nyata vs nama yang ditampilkan. Email CEO legitim = dari server perusahaan. Palsu = dari Gmail/Hotmail dengan nama CEO. Periksa riwayat login akun yang dikompromikan. Reset password segera! 🔑' }, tip: { en: '💡 DKIM, SPF, DMARC = email auth preventing fake sender addresses!', id: '💡 DKIM, SPF, DMARC = autentikasi email yang mencegah alamat pengirim palsu!' }, image: null }, { emoji: '🛡️', title: { en: 'BEC Prevention', id: 'Pencegahan BEC' }, body: { en: "Protect: 1) MFA on all email accounts. 2) DMARC policy. 3) Finance must verify ALL transfers by phone. 4) Two-signature approval for large transfers. 5) Monitor email forwarding rules. Defense in depth! 🔐", id: 'Lindungi: 1) MFA di semua akun email. 2) Kebijakan DMARC. 3) Keuangan harus memverifikasi SEMUA transfer via telepon. 4) Persetujuan dua tanda tangan untuk transfer besar. 5) Pantau aturan penerusan email. Pertahanan berlapis! 🔐' }, tip: { en: '🚀 BEC takes avg 111 days to detect — monitoring catches it sooner!', id: '🚀 BEC rata-rata butuh 111 hari untuk terdeteksi — pemantauan mendeteksinya lebih cepat!' }, image: null } ] },

  // ─────────────────────────────────────────────────────────────
  //  TIER 7
  // ─────────────────────────────────────────────────────────────

  't7_001': { slides: [ { emoji: '🌍', title: { en: 'Global IT Infrastructure', id: 'Infrastruktur IT Global' }, body: { en: "At Tier 7 you manage infrastructure for THOUSANDS of users worldwide 🌍. Multiple data centers, cloud regions, redundant networks. A problem here = global impact. High Availability = 99.99% uptime = 52 min downtime/year!", id: 'Di Tier 7 kamu mengelola infrastruktur untuk RIBUAN pengguna di seluruh dunia 🌍. Beberapa data center, wilayah cloud, jaringan redundan. Masalah di sini = dampak global. High Availability = uptime 99,99% = 52 menit downtime/tahun!' }, tip: { en: '💡 No single point of failure = redundancy at every layer!', id: '💡 Tidak ada single point of failure = redundansi di setiap lapisan!' }, image: null }, { emoji: '🏗️', title: { en: 'P1 Incident Protocol', id: 'Protokol Insiden P1' }, body: { en: "P1 = critical system down, everyone affected. Protocol: 1) Open bridge call (all teams). 2) Assign incident commander. 3) Status update every 15 min. 4) Parallel investigation. 5) CEO briefing. 6) Post-mortem after. 🚨", id: 'P1 = sistem kritis mati, semua terpengaruh. Protokol: 1) Buka bridge call (semua tim). 2) Tunjuk komandan insiden. 3) Update status setiap 15 menit. 4) Investigasi paralel. 5) Briefing CEO. 6) Post-mortem setelah itu. 🚨' }, tip: { en: '💡 Stay calm under pressure — panic slows everyone down!', id: '💡 Tetap tenang di bawah tekanan — panik memperlambat semua orang!' }, image: null }, { emoji: '📋', title: { en: 'Your Mission', id: 'Misi Kamu' }, body: { en: "In this mission: a major incident is unfolding. Coordinate the response, investigate the root cause, communicate to stakeholders, and restore service within SLA. You are the captain in the storm. Lead! 🌪️⚓", id: 'Dalam misi ini: insiden besar sedang terjadi. Koordinasikan respons, selidiki akar penyebab, komunikasikan ke pemangku kepentingan, dan pulihkan layanan dalam SLA. Kamu adalah kapten dalam badai. Pimpin! 🌪️⚓' }, tip: { en: '🚀 Blameless culture = honest reporting = real solutions!', id: '🚀 Budaya tanpa menyalahkan = laporan jujur = solusi nyata!' }, image: null } ] },

  't7_002': { slides: [ { emoji: '☁️', title: { en: 'Cloud Architecture', id: 'Arsitektur Cloud' }, body: { en: "Cloud = instant scale! Need 100 servers for Black Friday? Click and done. Not needed next week? Scale back and stop paying 💸. Elasticity = why enterprises love cloud. Pay only for what you use!", id: 'Cloud = skala instan! Perlu 100 server untuk Harbolnas? Klik dan selesai. Tidak dibutuhkan minggu depan? Kurangi skala dan hentikan pembayaran 💸. Elastisitas = mengapa enterprise menyukai cloud. Bayar hanya untuk yang digunakan!' }, tip: { en: '💡 AWS, Azure, GCP = the 3 biggest cloud providers. Know all three!', id: '💡 AWS, Azure, GCP = 3 penyedia cloud terbesar. Ketahui ketiganya!' }, image: null }, { emoji: '🗄️', title: { en: 'Cloud Storage Recovery', id: 'Pemulihan Storage Cloud' }, body: { en: "Cloud storage stores in multiple AZs automatically. But accidents still happen! Enable versioning (keeps file history) and soft delete (recover deleted files for 30 days). Multiple safety nets! 🪢", id: 'Storage cloud menyimpan di beberapa AZ secara otomatis. Tapi kecelakaan masih bisa terjadi! Aktifkan versioning (menyimpan riwayat file) dan soft delete (pulihkan file yang dihapus selama 30 hari). Beberapa jaring pengaman! 🪢' }, tip: { en: '💡 S3 versioning = each file keeps every previous version!', id: '💡 S3 versioning = setiap file menyimpan setiap versi sebelumnya!' }, image: null }, { emoji: '💰', title: { en: 'Cloud Cost Control', id: 'Kontrol Biaya Cloud' }, body: { en: "Cloud bills explode without management! Right-size instances. Use Reserved Instances for steady workloads (up to 72% savings). Set budget alerts. Turn off dev servers on weekends. FinOps saves millions! 💸", id: 'Tagihan cloud meledak tanpa manajemen! Ukur instance dengan tepat. Gunakan Reserved Instance untuk workload stabil (hingga 72% penghematan). Atur alert anggaran. Matikan server dev di akhir pekan. FinOps menghemat jutaan! 💸' }, tip: { en: '🚀 FinOps = cloud financial management practice. Learn it!', id: '🚀 FinOps = praktik manajemen keuangan cloud. Pelajari!' }, image: null } ] },

  't7_003': { slides: [ { emoji: '🚨', title: { en: 'Major Incident Management', id: 'Manajemen Insiden Besar' }, body: { en: "Global P1 = every IT team, every manager watching. Your job: coordinate response, communicate clearly, drive to resolution. Stay calm 🧘 — panic is contagious. Calm leader = calmer team = faster fix. You set the tone!", id: 'P1 Global = setiap tim IT, setiap manajer mengawasi. Tugasmu: koordinasikan respons, komunikasikan dengan jelas, dorong ke resolusi. Tetap tenang 🧘 — panik menular. Pemimpin tenang = tim lebih tenang = perbaikan lebih cepat. Kamu menentukan nadanya!' }, tip: { en: '💡 Incident commander = one person directing all response tracks!', id: '💡 Komandan insiden = satu orang mengarahkan semua jalur respons!' }, image: null }, { emoji: '📢', title: { en: 'Stakeholder Communication', id: 'Komunikasi Pemangku Kepentingan' }, body: { en: "Every 15 minutes: status update. Template: 'Current status. What we know. What we are doing. ETA to fix.' Never say 'we don't know' — say 'investigating, update in 15min.' Manage expectations always! 📋", id: 'Setiap 15 menit: update status. Template: "Status terkini. Apa yang kita ketahui. Apa yang kita lakukan. Perkiraan waktu perbaikan." Jangan pernah katakan "kami tidak tahu" — katakan "sedang menyelidiki, update dalam 15 menit." Selalu kelola ekspektasi! 📋' }, tip: { en: '💡 status page = automated stakeholder communication!', id: '💡 Status page = komunikasi pemangku kepentingan otomatis!' }, image: null }, { emoji: '📝', title: { en: 'Post-Incident Review', id: 'Tinjauan Pasca-Insiden' }, body: { en: "After resolution: blameless post-mortem. Timeline what happened. Root cause (5 Whys). Action items to prevent recurrence. Share learnings with team. Incidents = FREE lessons. Every failure = future prevention! 🎓", id: 'Setelah resolusi: post-mortem tanpa menyalahkan. Timeline apa yang terjadi. Akar penyebab (5 Why). Item tindakan untuk mencegah pengulangan. Bagikan pembelajaran dengan tim. Insiden = pelajaran GRATIS. Setiap kegagalan = pencegahan masa depan! 🎓' }, tip: { en: '🚀 Run regular game days — simulated incidents build resilience!', id: '🚀 Jalankan game day secara teratur — insiden simulasi membangun ketahanan!' }, image: null } ] },

  't7_004': { slides: [ { emoji: '🔥', title: { en: 'What Is Disaster Recovery?', id: 'Apa Itu Disaster Recovery?' }, body: { en: "DR = the plan for when everything breaks 🔥🌊🌍. Data center destroyed, cyber attack, major outage. DR = escape plan keeping business running. Without DR = company could cease operations permanently. MUST HAVE!", id: 'DR = rencana ketika segalanya rusak 🔥🌊🌍. Data center hancur, serangan siber, pemadaman besar. DR = rencana pelarian yang menjaga bisnis berjalan. Tanpa DR = perusahaan bisa berhenti beroperasi permanen. WAJIB DIMILIKI!' }, tip: { en: '💡 DR plan = document nobody hopes to use, but everyone must have!', id: '💡 Rencana DR = dokumen yang tidak ada yang berharap digunakan, tapi semua harus punya!' }, image: null }, { emoji: '⏱️', title: { en: 'RTO and RPO', id: 'RTO dan RPO' }, body: { en: "RTO = Recovery Time Objective = max time to restore service (e.g., 4 hours). RPO = Recovery Point Objective = max data loss acceptable (e.g., 1 hour). Define these first — everything else is designed around them!", id: 'RTO = Recovery Time Objective = waktu maks untuk memulihkan layanan (mis., 4 jam). RPO = Recovery Point Objective = kehilangan data maks yang bisa diterima (mis., 1 jam). Tentukan ini dulu — segalanya dirancang di sekitar ini!' }, tip: { en: '💡 Lower RTO/RPO = more expensive infrastructure. Find the balance!', id: '💡 RTO/RPO lebih rendah = infrastruktur lebih mahal. Temukan keseimbangannya!' }, image: null }, { emoji: '🧪', title: { en: 'Testing the DR Plan', id: 'Menguji Rencana DR' }, body: { en: "Untested DR = false hope! Test types: Tabletop (talk through), Simulation (practice), Full Failover (actually switch). Tabletop quarterly, full failover annually. A plan that works = a plan that was tested! 🎯", id: 'DR yang belum diuji = harapan palsu! Jenis pengujian: Tabletop (bicara melalui), Simulasi (latihan), Failover Penuh (benar-benar beralih). Tabletop setiap kuartal, failover penuh setiap tahun. Rencana yang berhasil = rencana yang telah diuji! 🎯' }, tip: { en: '🚀 Chaos Engineering = intentionally break things to test resilience!', id: '🚀 Chaos Engineering = sengaja merusak sesuatu untuk menguji ketahanan!' }, image: null } ] },

  't7_005': { slides: [ { emoji: '🌐', title: { en: 'DNS Redundancy', id: 'Redundansi DNS' }, body: { en: "Single DNS server fails = company can't access anything 😱. Like having ONE copy of phonebook that burns. Solution: primary + secondary DNS. Primary fails → secondary takes over automatically. Always be redundant!", id: 'Server DNS tunggal gagal = perusahaan tidak bisa mengakses apa pun 😱. Seperti punya SATU salinan buku telepon yang terbakar. Solusi: DNS primer + sekunder. Primer gagal → sekunder mengambil alih otomatis. Selalu redundan!' }, tip: { en: '💡 Also add public DNS (8.8.8.8) as tertiary emergency fallback!', id: '💡 Juga tambahkan DNS publik (8.8.8.8) sebagai fallback darurat tersier!' }, image: null }, { emoji: '🔧', title: { en: 'Configuring DNS Redundancy', id: 'Mengonfigurasi Redundansi DNS' }, body: { en: "Setup: 1) Primary DNS (authoritative). 2) Secondary DNS with zone transfer from primary. 3) Set appropriate TTL (lower = faster failover). 4) Test: shut down primary, verify secondary responds. 5) Monitor both always! 🔍", id: 'Pengaturan: 1) DNS Primer (otoritatif). 2) DNS sekunder dengan transfer zona dari primer. 3) Atur TTL yang tepat (lebih rendah = failover lebih cepat). 4) Uji: matikan primer, verifikasi sekunder merespons. 5) Pantau keduanya selalu! 🔍' }, tip: { en: '💡 Zone transfer = secondary gets a copy of ALL DNS records from primary!', id: '💡 Transfer zona = sekunder mendapat salinan SEMUA record DNS dari primer!' }, image: null }, { emoji: '🌍', title: { en: 'Global DNS Strategy', id: 'Strategi DNS Global' }, body: { en: "For global company: GeoDNS routes users to nearest server 🗺️. Singapore users → Singapore server. Low latency + high performance! Cloudflare, Route53 handle this automatically. Think globally, route locally! 🚀", id: 'Untuk perusahaan global: GeoDNS mengarahkan pengguna ke server terdekat 🗺️. Pengguna Singapura → server Singapura. Latensi rendah + performa tinggi! Cloudflare, Route53 menangani ini secara otomatis. Berpikir global, routing lokal! 🚀' }, tip: { en: '🚀 Anycast DNS = single IP, multiple servers globally. Ultra-reliable!', id: '🚀 Anycast DNS = satu IP, beberapa server secara global. Ultra-andal!' }, image: null } ] },

  // ─────────────────────────────────────────────────────────────
  //  TIER 6 — Additional missions (009-011)
  // ─────────────────────────────────────────────────────────────

  't6_009': { slides: [ { emoji: '📱', title: { en: 'MFA Rollout Challenges', id: 'Tantangan Rollout MFA' }, body: { en: "Deploying MFA across a company sounds simple but users push back! 'It's too complicated!' 'I lost my phone!' 'It's slowing me down!' Your job: make MFA easy enough that users WANT to use it. Balance security + usability! 🎓", id: 'Menerapkan MFA di seluruh perusahaan terdengar sederhana tapi pengguna menolak! "Terlalu rumit!" "HP saya hilang!" "Ini memperlambat saya!" Tugasmu: membuat MFA cukup mudah agar pengguna MAU menggunakannya. Seimbangkan keamanan + kemudahan! 🎓' }, tip: { en: '💡 Good UX = better security adoption. Hard MFA = people find workarounds!', id: '💡 UX yang baik = adopsi keamanan lebih baik. MFA yang sulit = orang mencari jalan pintas!' }, image: null }, { emoji: '🔧', title: { en: 'Fixing Failed MFA Rollout', id: 'Memperbaiki Rollout MFA yang Gagal' }, body: { en: "Issues: 1) User can't enroll (account/license problem). 2) Authenticator app won't sync. 3) SMS codes not arriving. Fix: check Azure AD MFA config, verify user licenses, check conditional access policies. One step at a time! 🛠️", id: 'Masalah: 1) Pengguna tidak bisa mendaftar (masalah akun/lisensi). 2) Aplikasi authenticator tidak sinkron. 3) Kode SMS tidak datang. Perbaikan: periksa konfigurasi MFA Azure AD, verifikasi lisensi pengguna, periksa kebijakan akses bersyarat. Satu langkah sekaligus! 🛠️' }, tip: { en: '💡 Check Azure AD Sign-in logs — they show exactly where MFA fails!', id: '💡 Periksa log Masuk Azure AD — mereka menampilkan tepat di mana MFA gagal!' }, image: null }, { emoji: '📋', title: { en: 'Communication is Key', id: 'Komunikasi adalah Kuncinya' }, body: { en: "A failed rollout is often a communication failure, not a technical one. Send clear instructions BEFORE rollout day. Provide video tutorials. Have IT support ready. Set clear deadlines. Make it feel like help, not punishment! 🤝", id: 'Rollout yang gagal sering kali merupakan kegagalan komunikasi, bukan teknis. Kirim instruksi yang jelas SEBELUM hari rollout. Sediakan tutorial video. Siapkan dukungan IT. Tetapkan tenggat waktu yang jelas. Buat terasa seperti bantuan, bukan hukuman! 🤝' }, tip: { en: '🚀 Pilot → Communicate → Deploy → Support. Never skip steps!', id: '🚀 Pilot → Komunikasikan → Deploy → Dukung. Jangan pernah melewati langkah!' }, image: null } ] },

  't6_010': { slides: [ { emoji: '🌐', title: { en: 'Suspicious VPN Login', id: 'Login VPN Mencurigakan' }, body: { en: "VPN login from an unexpected location at odd hours = red flag 🚩. Could be: employee working remotely from new location, OR account compromised by hacker. Can't assume — must investigate! Every login tells a story.", id: 'Login VPN dari lokasi tak terduga pada jam aneh = tanda bahaya 🚩. Bisa: karyawan bekerja remote dari lokasi baru, ATAU akun dikompromikan oleh hacker. Tidak bisa berasumsi — harus diselidiki! Setiap login menceritakan sebuah kisah.' }, tip: { en: '💡 Compare login IP geolocation against employee home location!', id: '💡 Bandingkan geolokasi IP login dengan lokasi rumah karyawan!' }, image: null }, { emoji: '🔍', title: { en: 'Investigation Steps', id: 'Langkah Investigasi' }, body: { en: "1) Pull VPN logs — when, from where (IP/country), how long. 2) Contact user directly (call, don't email — hacker might have email too). 3) Check what was accessed during the session. 4) If suspicious: revoke token immediately. 5) Reset password + MFA. 🔐", id: '1) Tarik log VPN — kapan, dari mana (IP/negara), berapa lama. 2) Hubungi pengguna langsung (telepon, jangan email — hacker mungkin juga punya email). 3) Periksa apa yang diakses selama sesi. 4) Jika mencurigakan: cabut token segera. 5) Reset password + MFA. 🔐' }, tip: { en: '💡 Call the user — if they confirm they logged in, investigation over!', id: '💡 Telepon pengguna — jika mereka konfirmasi login, investigasi selesai!' }, image: null }, { emoji: '🛡️', title: { en: 'Responding to Confirmed Compromise', id: 'Merespons Kompromi yang Terkonfirmasi' }, body: { en: "Account IS compromised! Steps: 1) Disable account immediately. 2) Revoke all active sessions. 3) Reset password + new MFA device. 4) Check what data was accessed (breach assessment). 5) Report to security team. 6) Brief management. Fast action limits damage! ⚡", id: 'Akun MEMANG dikompromikan! Langkah: 1) Nonaktifkan akun segera. 2) Cabut semua sesi aktif. 3) Reset password + perangkat MFA baru. 4) Periksa data apa yang diakses (penilaian pelanggaran). 5) Laporkan ke tim keamanan. 6) Brifing manajemen. Tindakan cepat membatasi kerusakan! ⚡' }, tip: { en: '🚀 Disable first, investigate second — stop the bleeding immediately!', id: '🚀 Nonaktifkan dulu, selidiki kedua — hentikan pendarahan segera!' }, image: null } ] },

  't6_011': { slides: [ { emoji: '🔒', title: { en: 'Ransomware Containment', id: 'Penahanan Ransomware' }, body: { en: "Active ransomware = digital fire 🔥. Spreading through every connected share and drive. Containment = stopping the fire from spreading before it burns everything. SPEED is everything. Every minute = more encrypted files!", id: 'Ransomware aktif = kebakaran digital 🔥. Menyebar melalui setiap share dan drive yang terhubung. Containment = menghentikan api dari menyebar sebelum membakar segalanya. KECEPATAN adalah segalanya. Setiap menit = lebih banyak file terenkripsi!' }, tip: { en: '💡 Ransomware spreads via network shares — disconnect shared drives FIRST!', id: '💡 Ransomware menyebar melalui network share — putuskan shared drive DULU!' }, image: null }, { emoji: '🚨', title: { en: 'Containment Protocol', id: 'Protokol Penahanan' }, body: { en: "Emergency steps: 1) Identify infected machines (new .encrypted extension files). 2) IMMEDIATELY disconnect from network. 3) Notify all IT team + management. 4) Disable shared folder access. 5) Identify patient zero (first infected). 6) Preserve evidence — don't turn off machines yet!", id: 'Langkah darurat: 1) Identifikasi mesin yang terinfeksi (file dengan ekstensi .encrypted baru). 2) SEGERA putuskan dari jaringan. 3) Beritahu seluruh tim IT + manajemen. 4) Nonaktifkan akses folder bersama. 5) Identifikasi patient zero (yang pertama terinfeksi). 6) Jaga bukti — jangan matikan mesin dulu!' }, tip: { en: '💡 Find patient zero = find the entry point = prevent next attack!', id: '💡 Temukan patient zero = temukan titik masuk = cegah serangan berikutnya!' }, image: null }, { emoji: '🏥', title: { en: 'Recovery Roadmap', id: 'Peta Jalan Pemulihan' }, body: { en: "After containment: 1) Identify clean backup (pre-infection). 2) Rebuild infected systems from scratch. 3) Restore data from backup. 4) Report to BSSN/authorities. 5) Root cause analysis. 6) Patch the vulnerability. 7) Security training for all staff. Never pay ransom! 🚫💰", id: 'Setelah penahanan: 1) Identifikasi backup bersih (sebelum infeksi). 2) Bangun ulang sistem yang terinfeksi dari awal. 3) Pulihkan data dari backup. 4) Laporkan ke BSSN/berwenang. 5) Analisis akar penyebab. 6) Tambal kerentanan. 7) Pelatihan keamanan untuk semua staf. Jangan pernah bayar tebusan! 🚫💰' }, tip: { en: '🚀 Offline + air-gapped backup = ransomware cannot reach it. Build one today!', id: '🚀 Backup offline + air-gapped = ransomware tidak bisa menjangkaunya. Bangun hari ini!' }, image: null } ] },

  // ─────────────────────────────────────────────────────────────
  //  TIER 6 — Additional missions (012-017)
  // ─────────────────────────────────────────────────────────────

  't6_012': { slides: [ { emoji: '📋', title: { en: 'Security Audit — Why It Matters', id: 'Audit Keamanan — Kenapa Penting' }, body: { en: "Security audit = systematic review of all security controls. Like a health checkup for your IT systems. ISO 27001, SOC2, PCI DSS all require regular audits. Purpose: find vulnerabilities BEFORE attackers do! Auditors check: accounts, firewall rules, backups, patches, and access controls.", id: 'Audit keamanan = tinjauan sistematis semua kontrol keamanan. Seperti pemeriksaan kesehatan untuk sistem IT kamu. ISO 27001, SOC2, PCI DSS semuanya memerlukan audit rutin. Tujuan: temukan kerentanan SEBELUM penyerang! Auditor memeriksa: akun, aturan firewall, backup, patch, dan kontrol akses.' }, tip: { en: '💡 Top audit failure: active accounts for ex-employees. Check HR list monthly!', id: '💡 Kegagalan audit teratas: akun aktif untuk mantan karyawan. Periksa daftar HR bulanan!' }, image: null }, { emoji: '🔢', title: { en: 'Audit Order Matters', id: 'Urutan Audit Penting' }, body: { en: "Security audit has a correct sequence: 1) User accounts (stale accounts = top risk). 2) Firewall rules (remove unused). 3) Backup integrity (test restore). 4) Patch compliance (no critical patches >30 days). 5) Privileged access + MFA. 6) Generate report LAST. You cannot write findings before checking!", id: 'Audit keamanan memiliki urutan yang benar: 1) Akun pengguna (akun usang = risiko teratas). 2) Aturan firewall (hapus yang tidak terpakai). 3) Integritas backup (uji restore). 4) Kepatuhan patch (tidak ada patch kritis >30 hari). 5) Akses istimewa + MFA. 6) Buat laporan TERAKHIR. Kamu tidak bisa menulis temuan sebelum memeriksa!' }, tip: { en: '💡 Disable ex-employee accounts within 24h of termination — not weekly!', id: '💡 Nonaktifkan akun mantan karyawan dalam 24 jam setelah penghentian — bukan mingguan!' }, image: null }, { emoji: '📊', title: { en: 'Risk Rating and Remediation', id: 'Penilaian Risiko dan Remediasi' }, body: { en: "Every finding gets a risk rating: Critical (fix in 24h), High (7 days), Medium (30 days), Low (90 days). Each finding needs: description, risk level, remediation steps, owner, and deadline. Risk-rated report = actionable. Raw list = ignored!", id: 'Setiap temuan mendapat penilaian risiko: Kritis (perbaiki dalam 24 jam), Tinggi (7 hari), Sedang (30 hari), Rendah (90 hari). Setiap temuan membutuhkan: deskripsi, tingkat risiko, langkah remediasi, pemilik, dan tenggat waktu. Laporan berperingkat risiko = dapat ditindaklanjuti. Daftar mentah = diabaikan!' }, tip: { en: '🚀 Track remediation progress — auditors check if you fixed last year\'s findings!', id: '🚀 Lacak kemajuan remediasi — auditor memeriksa apakah kamu memperbaiki temuan tahun lalu!' }, image: null } ] },

  't6_013': { slides: [ { emoji: '🚨', title: { en: 'SIEM — Your Security Watchtower', id: 'SIEM — Menara Pengawas Keamanan Kamu' }, body: { en: "SIEM (Security Information and Event Management) = centralized security monitoring. Collects logs from ALL sources: firewall, servers, endpoints, AD, cloud. Correlates events across systems to detect threats no single tool would catch. 3,000 alerts/week is normal — triage is the key skill!", id: 'SIEM (Security Information and Event Management) = pemantauan keamanan terpusat. Mengumpulkan log dari SEMUA sumber: firewall, server, endpoint, AD, cloud. Mengkorelasikan event di seluruh sistem untuk mendeteksi ancaman yang tidak akan ditangkap satu alat pun. 3.000 alert/minggu adalah normal — triase adalah keahlian kunci!' }, tip: { en: '💡 SIEM power = correlation. Single log = noise. Correlated logs = signal!', id: '💡 Kekuatan SIEM = korelasi. Log tunggal = kebisingan. Log yang dikorelasikan = sinyal!' }, image: null }, { emoji: '🎯', title: { en: 'Alert Triage — Finding Real Threats', id: 'Triase Alert — Menemukan Ancaman Nyata' }, body: { en: "Priority order: Critical P1 (active exploitation, lateral movement) → High P2 → Medium P3 → Low P4. Most low alerts are noise — tune rules to reduce false positives. True positive = confirmed malicious activity. False positive = legitimate action that triggered the rule. High FP rate = alert fatigue = missed real threats!", id: 'Urutan prioritas: Kritis P1 (eksploitasi aktif, pergerakan lateral) → Tinggi P2 → Sedang P3 → Rendah P4. Kebanyakan alert rendah adalah kebisingan — sesuaikan aturan untuk mengurangi false positive. True positive = aktivitas berbahaya yang dikonfirmasi. False positive = tindakan sah yang memicu aturan. Tingkat FP tinggi = kelelahan alert = ancaman nyata terlewat!' }, tip: { en: '💡 Start with Criticals — a missed P1 = active breach. Never skip them!', id: '💡 Mulai dengan Kritis — P1 yang terlewat = pelanggaran aktif. Jangan pernah lewati!' }, image: null }, { emoji: '🔧', title: { en: 'Tuning SIEM Rules', id: 'Menyetel Aturan SIEM' }, body: { en: "Reduce alert fatigue: 1) Add whitelists for known-good activity (vulnerability scanner IPs, backup jobs). 2) Increase thresholds (5 failed logins → alert, not 1). 3) Correlate with context (admin login at 3am = alert; scheduled backup = suppress). 4) Review and tune monthly. Signal over noise!", id: 'Kurangi kelelahan alert: 1) Tambahkan whitelist untuk aktivitas yang diketahui baik (IP vulnerability scanner, pekerjaan backup). 2) Tingkatkan ambang batas (5 login gagal → alert, bukan 1). 3) Korelasikan dengan konteks (login admin jam 3 pagi = alert; backup terjadwal = suppress). 4) Tinjau dan sesuaikan bulanan. Sinyal daripada kebisingan!' }, tip: { en: '🚀 Good SIEM tuning = fewer but higher-quality alerts. Quality > quantity!', id: '🚀 Penyetelan SIEM yang baik = lebih sedikit tapi alert berkualitas lebih tinggi. Kualitas > kuantitas!' }, image: null } ] },

  't6_014': { slides: [ { emoji: '📞', title: { en: 'Social Engineering — Hacking Humans', id: 'Social Engineering — Meretas Manusia' }, body: { en: "Social engineering = manipulating people instead of systems. The attacker exploits TRUST and URGENCY. CEO voice call demanding password reset? Visitor claiming to be IT needing server room access? These attacks bypass all technical security. The weakest link is always human!", id: 'Social engineering = memanipulasi orang alih-alih sistem. Penyerang mengeksploitasi KEPERCAYAAN dan URGENSI. Telepon suara CEO yang meminta reset password? Pengunjung yang mengklaim sebagai IT yang membutuhkan akses ruang server? Serangan ini melewati semua keamanan teknis. Tautan terlemah selalu manusia!' }, tip: { en: '💡 Urgency + Authority = social engineering recipe. Slow down and verify!', id: '💡 Urgensi + Otoritas = resep social engineering. Perlambat dan verifikasi!' }, image: null }, { emoji: '🛡️', title: { en: 'Identity Verification — The Shield', id: 'Verifikasi Identitas — Perisai' }, body: { en: "ALWAYS verify identity before account changes — REGARDLESS of claimed rank. Real CEOs do not get upset at security procedures. Steps: 1) Ask for employee ID. 2) Verify in HR system — NOT from info the caller provides. 3) Confirm via known callback number. 4) Process through standard channel.", id: 'SELALU verifikasi identitas sebelum perubahan akun — TERLEPAS dari pangkat yang diklaim. CEO nyata tidak kesal dengan prosedur keamanan. Langkah: 1) Minta ID karyawan. 2) Verifikasi di sistem HR — BUKAN dari informasi yang diberikan penelepon. 3) Konfirmasi melalui nomor callback yang diketahui. 4) Proses melalui saluran standar.' }, tip: { en: '💡 Verify through an independent channel — never use info the caller gives you!', id: '💡 Verifikasi melalui saluran independen — jangan pernah gunakan info yang diberikan penelepon!' }, image: null }, { emoji: '🎓', title: { en: 'Security Awareness Training', id: 'Pelatihan Kesadaran Keamanan' }, body: { en: "Defend against social engineering: 1) Regular security awareness training. 2) Simulate phishing attacks (email and phone). 3) Reward staff who correctly report suspicious contact. 4) Make reporting easy and blame-free. 5) Brief all new employees in first week. Humans CAN be the strongest link with proper training!", id: 'Bertahan dari social engineering: 1) Pelatihan kesadaran keamanan rutin. 2) Simulasikan serangan phishing (email dan telepon). 3) Berikan penghargaan kepada staf yang melaporkan kontak mencurigakan. 4) Buat pelaporan mudah dan bebas dari menyalahkan. 5) Brifing semua karyawan baru di minggu pertama. Manusia BISA menjadi tautan terkuat dengan pelatihan yang tepat!' }, tip: { en: '🚀 Run a phishing simulation quarterly — results show where training is needed!', id: '🚀 Jalankan simulasi phishing setiap kuartal — hasilnya menunjukkan di mana pelatihan dibutuhkan!' }, image: null } ] },
't6_014': { slides: [ { emoji: '📞', title: { en: 'Social Engineering — Hacking Humans', id: 'Social Engineering — Meretas Manusia' }, body: { en: "Social engineering = manipulating people instead of systems. The attacker exploits TRUST and URGENCY. CEO voice call demanding password reset? Visitor claiming to be IT needing server room access? These attacks bypass all technical security. The weakest link is always human!", id: 'Social engineering = memanipulasi orang alih-alih sistem. Penyerang mengeksploitasi KEPERCAYAAN dan URGENSI. Telepon suara CEO yang meminta reset password? Pengunjung yang mengklaim sebagai IT yang membutuhkan akses ruang server? Serangan ini melewati semua keamanan teknis. Tautan terlemah selalu manusia!' }, tip: { en: '💡 Urgency + Authority = social engineering recipe. Slow down and verify!', id: '💡 Urgensi + Otoritas = resep social engineering. Perlambat dan verifikasi!' }, image: null }, { emoji: '🛡️', title: { en: 'Identity Verification — The Shield', id: 'Verifikasi Identitas — Perisai' }, body: { en: "ALWAYS verify identity before account changes — REGARDLESS of claimed rank. Real CEOs do not get upset at security procedures. Steps: 1) Ask for employee ID. 2) Verify in HR system — NOT from info the caller provides. 3) Confirm via known callback number. 4) Process through standard channel.", id: 'SELALU verifikasi identitas sebelum perubahan akun — TERLEPAS dari pangkat yang diklaim. CEO nyata tidak kesal dengan prosedur keamanan. Langkah: 1) Minta ID karyawan. 2) Verifikasi di sistem HR — BUKAN dari informasi yang diberikan penelepon. 3) Konfirmasi melalui nomor callback yang diketahui. 4) Proses melalui saluran standar.' }, tip: { en: '💡 Verify through an independent channel — never use info the caller gives you!', id: '💡 Verifikasi melalui saluran independen — jangan pernah gunakan info yang diberikan penelepon!' }, image: null }, { emoji: '🎓', title: { en: 'Security Awareness Training', id: 'Pelatihan Kesadaran Keamanan' }, body: { en: "Defend against social engineering: 1) Regular security awareness training. 2) Simulate phishing attacks (email and phone). 3) Reward staff who correctly report suspicious contact. 4) Make reporting easy and blame-free. 5) Brief all new employees in first week. Humans CAN be the strongest link with proper training!", id: 'Bertahan dari social engineering: 1) Pelatihan kesadaran keamanan rutin. 2) Simulasikan serangan phishing (email dan telepon). 3) Berikan penghargaan kepada staf yang melaporkan kontak mencurigakan. 4) Buat pelaporan mudah dan bebas dari menyalahkan. 5) Brifing semua karyawan baru di minggu pertama. Manusia BISA menjadi tautan terkuat dengan pelatihan yang tepat!' }, tip: { en: '🚀 Run a phishing simulation quarterly — results show where training is needed!', id: '🚀 Jalankan simulasi phishing setiap kuartal — hasilnya menunjukkan di mana pelatihan dibutuhkan!' }, image: null } ] },
  't7_008': { slides: [ { emoji: '☁️', title: { en: 'Cloud Storage Disaster', id: 'Bencana Cloud Storage' }, body: { en: "Cloud storage data disappears or gets corrupted! Accidental mass deletion, sync gone wrong (deleted on one device = deleted everywhere!), ransomware syncing encrypted files to cloud. Even cloud is not 100% immune!", id: 'Data cloud storage hilang atau rusak! Penghapusan massal yang tidak disengaja, sinkronisasi yang salah (dihapus di satu perangkat = dihapus di mana saja!), ransomware sinkronisasi file terenkripsi ke cloud. Bahkan cloud tidak 100% kebal!' }, tip: { en: "💡 Cloud is not backup. Cloud = sync. Enable versioning for real protection!", id: '💡 Cloud bukan backup. Cloud = sinkron. Aktifkan versioning untuk perlindungan nyata!' }, image: null }, { emoji: '🔄', title: { en: 'Cloud Recovery Options', id: 'Opsi Pemulihan Cloud' }, body: { en: "Recovery methods: 1) File versioning (restore previous version). 2) Recycle bin / soft delete (30 days usually). 3) Point-in-time restore (if enabled). 4) Backup from secondary location. 5) Contact cloud provider support. Faster is better!", id: 'Metode pemulihan: 1) Versioning file. 2) Recycle bin / soft delete (biasanya 30 hari). 3) Point-in-time restore. 4) Backup dari lokasi sekunder. 5) Hubungi dukungan penyedia cloud. Lebih cepat lebih baik!' }, tip: { en: '💡 Enable versioning BEFORE disaster — cannot turn it on retroactively!', id: '💡 Aktifkan versioning SEBELUM bencana — tidak bisa diaktifkan secara retroaktif!' }, image: null }, { emoji: '🛡️', title: { en: 'Cloud Data Protection Strategy', id: 'Strategi Perlindungan Data Cloud' }, body: { en: "Best practices: 1) Enable versioning. 2) Enable soft delete. 3) 3rd-party backup of cloud data (Veeam, Backupify). 4) Geo-redundant storage. 5) Regular recovery testing. Cloud is ONE layer, not the whole strategy!", id: 'Praktik terbaik: 1) Aktifkan versioning. 2) Aktifkan soft delete. 3) Backup pihak ketiga (Veeam, Backupify). 4) Penyimpanan geo-redundan. 5) Pengujian pemulihan rutin. Cloud adalah SATU lapisan, bukan seluruh strategi!' }, tip: { en: '🚀 High durability (S3) does not protect against user error. Backup anyway!', id: '🚀 Durabilitas tinggi (S3) tidak melindungi terhadap kesalahan pengguna. Backup tetap saja!' }, image: null } ] },

  't7_009': { slides: [ { emoji: '🎖️', title: { en: 'Global P1 Incident Command', id: 'Komando Insiden P1 Global' }, body: { en: "This is the highest-pressure IT scenario: a P1 global outage with thousands of users affected and C-suite watching. Your role = Incident Commander. You are NOT fixing the problem — you are COORDINATING those who fix it. Leadership test!", id: 'Ini adalah skenario IT bertekanan tertinggi: pemadaman global P1 dengan ribuan pengguna terpengaruh dan C-suite mengawasi. Peranmu = Komandan Insiden. Kamu TIDAK memperbaiki masalah — kamu MENGKOORDINASIKAN mereka yang memperbaikinya. Uji kepemimpinan!' }, tip: { en: '💡 Incident Commander = conductor, not player. Coordinate, do not do it yourself!', id: '💡 Komandan Insiden = konduktor, bukan pemain. Koordinasikan, jangan kerjakan sendiri!' }, image: null }, { emoji: '📢', title: { en: 'The War Room Protocol', id: 'Protokol War Room' }, body: { en: "War room rules: 1) One bridge call, all key teams. 2) IC speaks last (listens to status first). 3) 15-min status cadence. 4) Separate investigation tracks (infra team, app team, network team). 5) Status page updated every update. 6) Escalate to CTO at T+30min.", id: 'Aturan war room: 1) Satu bridge call, semua tim kunci. 2) IC berbicara terakhir. 3) Kadence status 15 menit. 4) Jalur investigasi terpisah. 5) Status page diperbarui setiap update. 6) Eskalasi ke CTO pada T+30 menit.' }, tip: { en: '💡 Status page = auto-communication to thousands. Set it up first!', id: '💡 Status page = komunikasi otomatis ke ribuan orang. Atur itu dulu!' }, image: null }, { emoji: '📝', title: { en: 'Post-Mortem Excellence', id: 'Keunggulan Post-Mortem' }, body: { en: "After resolution: within 24hrs write timeline. Within 48hrs: root cause analysis. Within 1 week: blameless post-mortem meeting. Action items with owners and deadlines. Share with whole company what you learned. Trust through transparency!", id: 'Setelah resolusi: dalam 24 jam tulis timeline. Dalam 48 jam: analisis akar penyebab. Dalam 1 minggu: pertemuan post-mortem tanpa menyalahkan. Item tindakan dengan pemilik dan tenggat waktu. Bagikan ke seluruh perusahaan apa yang dipelajari. Kepercayaan melalui transparansi!' }, tip: { en: '🚀 Great post-mortem = prevents next incident. Every outage = free lesson!', id: '🚀 Post-mortem yang bagus = mencegah insiden berikutnya. Setiap pemadaman = pelajaran gratis!' }, image: null } ] },

  't7_010': { slides: [ { emoji: '🏗️', title: { en: 'Disaster Recovery Failover', id: 'Failover Disaster Recovery' }, body: { en: "DR Failover = actually switching from primary data center to DR site when disaster strikes. This is the moment ALL your DR planning gets tested for real. Scary but if planned right — smooth!", id: 'DR Failover = benar-benar beralih dari data center primer ke situs DR ketika bencana terjadi. Ini adalah momen semua perencanaan DR diuji secara nyata. Menakutkan tapi jika direncanakan dengan benar — lancar!' }, tip: { en: '💡 Rehearsed DR = confident team. Untested DR = chaos. Test quarterly!', id: '💡 DR yang dilatih = tim yang percaya diri. DR yang belum diuji = kekacauan. Uji setiap kuartal!' }, image: null }, { emoji: '⏱️', title: { en: 'Latency Investigation', id: 'Investigasi Latensi' }, body: { en: "Latency = request time vs response time ⏱️. Users say 'everything is slow'. Like a conversation where every reply takes 5 seconds — annoying! Finding latency source requires systematic elimination.", id: 'Latensi = waktu permintaan dan menerima respons ⏱️. Pengguna berkata "segalanya lambat". Seperti percakapan di mana setiap jawaban butuh 5 detik — menyebalkan! Menemukan sumber latensi membutuhkan eliminasi sistematis.' }, tip: { en: '💡 ping + tracert = your two main tools for latency investigation!', id: '💡 ping + tracert = dua alat utama untuk investigasi latensi!' }, image: null }, { emoji: '🔬', title: { en: 'Tracing the Problem', id: 'Melacak Masalah' }, body: { en: "Tracert shows every hop and its latency: hop 1 = router (should be <1ms), hop 5 = ISP gateway (5-20ms ok), hop 10 = destination (depends on distance). High latency at ONE hop = problem there! Isolate and fix that hop.", id: 'Tracert menampilkan setiap hop dan latensinya: hop 1 = router (<1ms harusnya), hop 5 = gateway ISP (5-20ms ok), hop 10 = tujuan (tergantung jarak). Latensi tinggi di SATU hop = masalah di sana! Isolasi dan perbaiki hop itu.' }, tip: { en: '💡 Normal latency: <50ms great, <100ms ok, >200ms = problematic!', id: '💡 Latensi normal: <50ms bagus, <100ms ok, >200ms = bermasalah!' }, image: null }, { emoji: '🛠️', title: { en: 'Common Causes & Fixes', id: 'Penyebab Umum & Perbaikan' }, body: { en: "High latency causes: 1) Network congestion (too much traffic). 2) Faulty cable/switch port. 3) ISP routing problem. 4) DNS slow response. 5) Server overloaded. Use tools: Wireshark (packet analysis), PRTG (monitoring), iperf (bandwidth test). Methodical! 🎯", id: 'Penyebab latensi tinggi: 1) Kemacetan jaringan (terlalu banyak lalu lintas). 2) Kabel/port switch rusak. 3) Masalah routing ISP. 4) Respons DNS lambat. 5) Server kelebihan beban. Gunakan alat: Wireshark (analisis paket), PRTG (monitoring), iperf (tes bandwidth). Metodis! 🎯' }, tip: { en: '🚀 Monitor baseline latency — you need normal to spot abnormal!', id: '🚀 Pantau latensi baseline — kamu butuh normal untuk menemukan yang tidak normal!' }, image: null } ] },

  't7_011': { slides: [
    { emoji: '📈', title: { en: 'IT Capacity Planning', id: 'Perencanaan Kapasitas IT' }, body: { en: "Capacity planning = projecting future resource needs before things break! Rule: never run over 80% capacity. At 80% = plan expansion. At 90% = emergency. At 100% = outage. Always plan AHEAD, not reactive! 📊", id: 'Perencanaan kapasitas = memproyeksikan kebutuhan sumber daya masa depan sebelum sesuatu rusak! Aturan: jangan pernah berjalan lebih dari 80% kapasitas. Pada 80% = rencanakan ekspansi. Pada 90% = darurat. Pada 100% = pemadaman. Selalu rencanakan LEBIH AWAL, bukan reaktif! 📊' }, tip: { en: '💡 Monitor CPU, RAM, storage, and network trending monthly!', id: '💡 Pantau tren CPU, RAM, storage, dan jaringan setiap bulan!' }, image: null },
    { emoji: '🔮', title: { en: 'Growth Projections', id: 'Proyeksi Pertumbuhan' }, body: { en: "Capacity formula: current baseline × growth rate + 30% headroom. If storage grows 3TB/month now at 500 users → at 700 users (40% growth) it grows 4.2TB/month. Add 30% safety: plan for 5.5TB/month. Math saves your infrastructure! 🧮", id: 'Formula kapasitas: baseline saat ini × tingkat pertumbuhan + 30% headroom. Jika storage tumbuh 3TB/bulan sekarang dengan 500 pengguna → dengan 700 pengguna (pertumbuhan 40%) tumbuh 4.2TB/bulan. Tambahkan 30% keamanan: rencanakan 5,5TB/bulan. Matematika menyelamatkan infrastrukturmu! 🧮' }, tip: { en: '💡 Use Grafana or Datadog trending graphs to predict capacity bottlenecks!', id: '💡 Gunakan grafik tren Grafana atau Datadog untuk memprediksi bottleneck kapasitas!' }, image: null },
    { emoji: '🗺️', title: { en: '3-Year IT Roadmap', id: 'Peta Jalan IT 3 Tahun' }, body: { en: "A roadmap shows WHEN to invest: Year 1 = storage. Year 2 = servers. Year 3 = network. Prioritize by time-to-critical. Present to management with cost estimates and ROI. Proactive IT teams get budget. Reactive IT teams get blamed! 🏆", id: 'Peta jalan menunjukkan KAPAN berinvestasi: Tahun 1 = storage. Tahun 2 = server. Tahun 3 = jaringan. Prioritaskan berdasarkan waktu-ke-kritis. Presentasikan ke manajemen dengan estimasi biaya dan ROI. Tim IT proaktif mendapat anggaran. Tim IT reaktif disalahkan! 🏆' }, tip: { en: '🚀 ROI framing: "proactive expansion $50K vs emergency downtime cost $200K" wins budget!', id: '🚀 ROI framing: "ekspansi proaktif $50K vs biaya downtime darurat $200K" memenangkan anggaran!' }, image: null },
  ] },

  't7_012': { slides: [
    { emoji: '⚡', title: { en: 'High Availability Fundamentals', id: 'Dasar High Availability' }, body: { en: "HA = designing systems so failures don't cause downtime. Three nines (99.9%) = 8.7hr/year downtime. Four nines (99.99%) = 52min/year. Five nines (99.999%) = 5min/year. Each additional nine requires exponentially more redundancy and cost! 🏗️", id: 'HA = merancang sistem agar kegagalan tidak menyebabkan downtime. Tiga sembilan (99,9%) = 8,7 jam/tahun downtime. Empat sembilan (99,99%) = 52 menit/tahun. Lima sembilan (99,999%) = 5 menit/tahun. Setiap sembilan tambahan membutuhkan redundansi dan biaya yang lebih besar secara eksponensial! 🏗️' }, tip: { en: '💡 99.99% = the standard target for critical business systems (four nines)!', id: '💡 99,99% = target standar untuk sistem bisnis kritis (empat sembilan)!' }, image: null },
    { emoji: '🔁', title: { en: 'Eliminating Single Points of Failure', id: 'Menghilangkan Single Point of Failure' }, body: { en: "SPOF = one component whose failure brings down the whole system. Solution: N+1 redundancy at EVERY tier. Load balancer + 2 app servers. Primary + standby database. Dual power supply in servers. Redundant ISP links. Find every SPOF and eliminate it! 🛡️", id: 'SPOF = satu komponen yang kegagalannya menjatuhkan seluruh sistem. Solusi: Redundansi N+1 di SETIAP tier. Load balancer + 2 app server. Database primer + standby. Dual power supply di server. Link ISP redundan. Temukan setiap SPOF dan hilangkan! 🛡️' }, tip: { en: '💡 Draw your architecture. Circle every component. If it fails alone = SPOF. Fix it!', id: '💡 Gambar arsitekturmu. Lingkari setiap komponen. Jika gagal sendiri = SPOF. Perbaiki!' }, image: null },
    { emoji: '🏆', title: { en: 'Active-Active vs Active-Passive', id: 'Active-Active vs Active-Passive' }, body: { en: "Active-Active: both servers handle traffic simultaneously (zero failover time, higher throughput). Best for: read-heavy, stateless. Active-Passive: one primary + one standby, failover in 15-60 sec. Best for: write-heavy databases, simpler management. Choose based on your write pattern! 🎯", id: 'Active-Active: kedua server menangani lalu lintas secara bersamaan (waktu failover nol, throughput lebih tinggi). Terbaik untuk: read-heavy, stateless. Active-Passive: satu primer + satu standby, failover dalam 15-60 detik. Terbaik untuk: database write-heavy, manajemen lebih sederhana. Pilih berdasarkan pola penulisanmu! 🎯' }, tip: { en: '🚀 Active-Active for web tier + Active-Passive for database = the classic HA stack!', id: '🚀 Active-Active untuk tier web + Active-Passive untuk database = stack HA klasik!' }, image: null },
  ] },

  't7_013': { slides: [
    { emoji: '💸', title: { en: 'Cloud Cost Optimization', id: 'Optimasi Biaya Cloud' }, body: { en: "Cloud costs explode without governance! Common wastes: 1) Stopped EC2 still charging EBS. 2) Unattached Elastic IPs. 3) Oversized instances (5% CPU on 8vCPU = 7 wasted CPUs). 4) On-demand pricing for always-on servers. Audit monthly! 🔍", id: 'Biaya cloud meledak tanpa tata kelola! Pemborosan umum: 1) EC2 yang berhenti masih menagih EBS. 2) Elastic IP yang tidak terlampir. 3) Instance yang terlalu besar (CPU 5% pada 8vCPU = 7 CPU terbuang). 4) Harga on-demand untuk server yang selalu menyala. Audit setiap bulan! 🔍' }, tip: { en: '💡 AWS Cost Explorer: your first stop for every cost investigation!', id: '💡 AWS Cost Explorer: titik awal untuk setiap investigasi biaya!' }, image: null },
    { emoji: '💰', title: { en: 'Reserved Instances & Savings Plans', id: 'Reserved Instance & Savings Plan' }, body: { en: "On-Demand = pay as you go (expensive). Reserved Instance = commit 1-3 years, save up to 72%! Savings Plans = flexible commitment (like RI but for any instance type). Rule: stable production servers → buy Reserved. Variable workloads → Savings Plans. Dev/test → Spot Instances (90% off)! 🏷️", id: 'On-Demand = bayar sesuai penggunaan (mahal). Reserved Instance = komit 1-3 tahun, hemat hingga 72%! Savings Plans = komitmen fleksibel (seperti RI tapi untuk tipe instance apa pun). Aturan: server produksi stabil → beli Reserved. Workload variabel → Savings Plans. Dev/test → Spot Instance (diskon 90%)! 🏷️' }, tip: { en: '💡 Rule: if a server runs >720hrs/month (always-on), buy Reserved Instance!', id: '💡 Aturan: jika server berjalan >720 jam/bulan (selalu nyala), beli Reserved Instance!' }, image: null },
    { emoji: '🚨', title: { en: 'Cost Governance & Alerts', id: 'Tata Kelola Biaya & Peringatan' }, body: { en: "Prevention is cheaper than cleanup! Set up: AWS Budgets with email alert at 80% threshold. CloudWatch billing alarm at hard limit. Monthly cost report to management on the 1st. Tag ALL resources with CostCenter tag. No tag = no deployment policy enforced via SCP! 📋", id: 'Pencegahan lebih murah daripada pembersihan! Siapkan: AWS Budgets dengan alert email pada ambang 80%. Alarm billing CloudWatch pada batas keras. Laporan biaya bulanan ke manajemen pada tanggal 1. Tag SEMUA sumber daya dengan tag CostCenter. Tidak ada tag = kebijakan no deployment ditegakkan melalui SCP! 📋' }, tip: { en: "🚀 Cost optimization saves 30-40% of cloud bills — that's real money!", id: '🚀 Optimasi biaya menghemat 30-40% tagihan cloud — itu uang sungguhan!' }, image: null },
  ] },

  't7_014': { slides: [
    { emoji: '📋', title: { en: 'Business Continuity Planning', id: 'Perencanaan Kelangsungan Bisnis' }, body: { en: "BCP = the plan for HOW the whole business continues during a disaster. DR = the IT component of BCP. BCP covers: finance, HR, operations, customer service — not just IT! Start with Business Impact Analysis (BIA): what can't the business live without? 🏢", id: 'BCP = rencana BAGAIMANA seluruh bisnis berlanjut selama bencana. DR = komponen IT dari BCP. BCP mencakup: keuangan, HR, operasional, layanan pelanggan — bukan hanya IT! Mulai dengan Business Impact Analysis (BIA): apa yang tidak bisa bisnis jalani tanpa? 🏢' }, tip: { en: '💡 BCP without testing = just a document. Run tabletop exercises quarterly!', id: '💡 BCP tanpa pengujian = hanya dokumen. Jalankan latihan tabletop setiap kuartal!' }, image: null },
    { emoji: '⏱️', title: { en: 'BIA — Know Your Critical Systems', id: 'BIA — Kenali Sistem Kritis' }, body: { en: "BIA defines: MTD (Maximum Tolerable Downtime) per process. RTO (Recovery Time Objective) per system. RPO (Recovery Point Objective) = max data loss. Payment system: RTO 30min, RPO 0. Email: RTO 2hr, RPO 0. File shares: RTO 8hr, RPO 4hr. Numbers drive investment! 📊", id: 'BIA mendefinisikan: MTD (Maximum Tolerable Downtime) per proses. RTO (Recovery Time Objective) per sistem. RPO (Recovery Point Objective) = kehilangan data maks. Sistem pembayaran: RTO 30 menit, RPO 0. Email: RTO 2 jam, RPO 0. File share: RTO 8 jam, RPO 4 jam. Angka mendorong investasi! 📊' }, tip: { en: "💡 Interview every department head to understand their MTD — don't guess!", id: '💡 Wawancarai setiap kepala departemen untuk memahami MTD mereka — jangan menebak!' }, image: null },
    { emoji: '🛡️', title: { en: 'BCP Strategies & 3-2-1 Backup', id: 'Strategi BCP & Backup 3-2-1' }, body: { en: "3-2-1 Backup Rule: 3 copies of data, on 2 different media types, with 1 offsite. Example: primary on NAS + copy to tape + copy to AWS S3. Also: secondary ISP link, remote work via VPN, manual workarounds documented per process. Test it all annually! 🧪", id: 'Aturan Backup 3-2-1: 3 salinan data, di 2 jenis media berbeda, dengan 1 offsite. Contoh: primer di NAS + salin ke tape + salin ke AWS S3. Juga: link ISP sekunder, kerja jarak jauh via VPN, workaround manual didokumentasikan per proses. Uji semuanya setiap tahun! 🧪' }, tip: { en: '🚀 A business that survived a flood with zero data loss = 3-2-1 backup implemented!', id: '🚀 Bisnis yang selamat dari banjir dengan zero kehilangan data = 3-2-1 backup diimplementasikan!' }, image: null },
  ] },

  't7_015': { slides: [
    { emoji: '📚', title: { en: 'ITIL v4 — Service Value System', id: 'ITIL v4 — Sistem Nilai Layanan' }, body: { en: "ITIL v4 shifted from rigid process silos (v3) to a flexible Service Value Chain. Key: every IT activity should create VALUE for customers. Integrate with Agile and DevOps — ITIL v4 is not bureaucratic, it's practical. 7 Guiding Principles: Focus on Value, Start Where You Are, Progress Iteratively! 🔄", id: 'ITIL v4 beralih dari silo proses kaku (v3) ke Service Value Chain yang fleksibel. Kunci: setiap aktivitas IT harus menciptakan NILAI bagi pelanggan. Integrasikan dengan Agile dan DevOps — ITIL v4 tidak birokratis, ini praktis. 7 Prinsip Panduan: Fokus pada Nilai, Mulai dari Tempat Kamu Berada, Kemajuan Bertahap! 🔄' }, tip: { en: '💡 ITIL v4 = value-focused, Agile-compatible service management!', id: '💡 ITIL v4 = manajemen layanan berfokus nilai, kompatibel dengan Agile!' }, image: null },
    { emoji: '🚑', title: { en: 'Incident vs Problem Management', id: 'Incident vs Problem Management' }, body: { en: "Incident = restore service ASAP (like fixing a flat tire on the highway). Problem = find ROOT CAUSE to prevent recurrence (why did the tire blow?). Incident: P1 = 15min response. Problem: deeper investigation, Known Error Record, permanent fix via Change Management. Different goals! 🎯", id: 'Incident = pulihkan layanan SECEPAT MUNGKIN (seperti memperbaiki ban kempes di jalan tol). Problem = temukan AKAR PENYEBAB untuk mencegah pengulangan (kenapa ban kempes?). Incident: P1 = respons 15 menit. Problem: investigasi lebih dalam, Known Error Record, perbaikan permanen melalui Change Management. Tujuan berbeda! 🎯' }, tip: { en: '💡 Incident closed ≠ Problem solved. Open a Problem ticket to find root cause!', id: '💡 Incident ditutup ≠ Problem terpecahkan. Buka tiket Problem untuk temukan akar penyebab!' }, image: null },
    { emoji: '📝', title: { en: 'SLAs — More Than Just Numbers', id: 'SLA — Lebih dari Sekadar Angka' }, body: { en: "SLA = Service Level Agreement: what IT promises to deliver. Must include: availability target (99.9%), response times by priority (P1=15min, P2=1hr), support hours, escalation path, and measurement reporting. SLAs without measurement = empty promises! 📊", id: 'SLA = Service Level Agreement: apa yang IT janjikan untuk diberikan. Harus mencakup: target ketersediaan (99,9%), waktu respons berdasarkan prioritas (P1=15 menit, P2=1 jam), jam dukungan, jalur eskalasi, dan pelaporan pengukuran. SLA tanpa pengukuran = janji kosong! 📊' }, tip: { en: '🚀 Review SLAs annually — business needs change, SLAs must keep up!', id: '🚀 Tinjau SLA setiap tahun — kebutuhan bisnis berubah, SLA harus mengikuti!' }, image: null },
  ] },

  't7_016': { slides: [
    { emoji: '☁️', title: { en: 'Multi-Cloud Strategy', id: 'Strategi Multi-Cloud' }, body: { en: "Multi-cloud = using 2+ cloud providers. Why? Avoid vendor lock-in! AWS region down? Traffic moves to Azure. Strategy: AWS for compute/storage/ML, Azure for Microsoft 365/Active Directory integration. Play to each cloud's strengths! 🌐", id: 'Multi-cloud = menggunakan 2+ penyedia cloud. Kenapa? Hindari vendor lock-in! Region AWS down? Lalu lintas pindah ke Azure. Strategi: AWS untuk komputasi/storage/ML, Azure untuk integrasi Microsoft 365/Active Directory. Manfaatkan kekuatan masing-masing cloud! 🌐' }, tip: { en: '💡 Multi-cloud adds complexity — only adopt if resilience benefits justify it!', id: '💡 Multi-cloud menambah kompleksitas — hanya adopsi jika manfaat ketahanan membenarkannya!' }, image: null },
    { emoji: '🔗', title: { en: 'Cross-Cloud Connectivity', id: 'Konektivitas Lintas Cloud' }, body: { en: "Connecting AWS ↔ Azure securely: Option 1 = IPsec VPN (simpler, <1Gbps). Option 2 = AWS Direct Connect + Azure ExpressRoute via Exchange Provider (dedicated fiber, up to 100Gbps). For production: choose bandwidth based on data transfer volume. Latency between clouds = 10-50ms typical! 🌉", id: 'Menghubungkan AWS ↔ Azure dengan aman: Opsi 1 = IPsec VPN (lebih sederhana, <1Gbps). Opsi 2 = AWS Direct Connect + Azure ExpressRoute via Exchange Provider (fiber dedicated, hingga 100Gbps). Untuk produksi: pilih bandwidth berdasarkan volume transfer data. Latensi antar cloud = tipikal 10-50ms! 🌉' }, tip: { en: '💡 Watch egress costs! Data transfer between clouds is expensive — minimize cross-cloud traffic!', id: '💡 Perhatikan biaya egress! Transfer data antar cloud mahal — minimimalkan lalu lintas lintas cloud!' }, image: null },
    { emoji: '🔑', title: { en: 'Unified Identity — SSO Across Clouds', id: 'Identitas Terpadu — SSO Lintas Cloud' }, body: { en: "Problem: separate logins for AWS Console + Azure Portal. Solution: Azure AD as SAML 2.0 Identity Provider for AWS IAM Identity Center. Employees login ONCE with Microsoft account → access both clouds. No separate credentials! Zero password sprawl! 🔐", id: 'Masalah: login terpisah untuk AWS Console + Azure Portal. Solusi: Azure AD sebagai SAML 2.0 Identity Provider untuk AWS IAM Identity Center. Karyawan login SEKALI dengan akun Microsoft → akses kedua cloud. Tidak ada kredensial terpisah! Zero password sprawl! 🔐' }, tip: { en: '🚀 SAML federation = one login, many systems. The foundation of enterprise SSO!', id: '🚀 Federasi SAML = satu login, banyak sistem. Fondasi SSO enterprise!' }, image: null },
  ] },

  't7_017': { slides: [
    { emoji: '🏆', title: { en: 'IT as a Strategic Function', id: 'IT sebagai Fungsi Strategis' }, body: { en: "IT is either a cost center (\"keeps lights on\") or a strategic enabler (\"drives growth\"). The difference: how IT communicates to the board. Speak business language: ROI, risk reduction, competitive advantage. Never say 'we need more servers' — say 'this investment prevents $2M/year revenue loss'! 📊", id: 'IT adalah cost center (\"menjaga lampu menyala\") atau enabler strategis (\"mendorong pertumbuhan\"). Perbedaannya: bagaimana IT berkomunikasi dengan dewan. Berbicara bahasa bisnis: ROI, pengurangan risiko, keunggulan kompetitif. Jangan pernah katakan \"kita butuh lebih banyak server\" — katakan \"investasi ini mencegah kerugian pendapatan $2 juta/tahun\"! 📊' }, tip: { en: '💡 CIO who speaks business language = strategic partner. Cost center IT = always underfunded!', id: '💡 CIO yang berbicara bahasa bisnis = mitra strategis. IT cost center = selalu kekurangan dana!' }, image: null },
    { emoji: '🗺️', title: { en: 'IT Governance Frameworks', id: 'Kerangka Tata Kelola IT' }, body: { en: "COBIT 2019 = IT governance framework. Rate maturity 0-5 per domain. Most SMEs: score 1-2 (ad-hoc). Goal: reach 3-4 (defined, managed). Governance structure: IT Steering Committee (approves big investments), Change Advisory Board (approves production changes), IT Risk Committee (board-level reporting quarterly)! 🏛️", id: 'COBIT 2019 = kerangka tata kelola IT. Rate kematangan 0-5 per domain. Kebanyakan UKM: skor 1-2 (ad-hoc). Tujuan: mencapai 3-4 (terdefinisi, terkelola). Struktur tata kelola: IT Steering Committee (menyetujui investasi besar), Change Advisory Board (menyetujui perubahan produksi), IT Risk Committee (pelaporan ke dewan setiap kuartal)! 🏛️' }, tip: { en: '💡 COBIT maturity assessment = honest baseline that boards respect!', id: '💡 Penilaian kematangan COBIT = baseline jujur yang dihormati dewan!' }, image: null },
    { emoji: '📅', title: { en: '5-Year Technology Roadmap', id: 'Peta Jalan Teknologi 5 Tahun' }, body: { en: "Roadmap structure: Q1-Q2 = Foundation (stabilize, monitoring, ITIL). Q3-Q4 = Modernization (cloud migration Phase 1). Year 2 = Innovation (AI/ML pilots). Years 3-5 = Transformation (cloud-native, AI-embedded). Map each initiative to a business goal. Boards fund STRATEGY, not technology! 🎯", id: 'Struktur roadmap: Q1-Q2 = Fondasi (stabilisasi, monitoring, ITIL). Q3-Q4 = Modernisasi (cloud migration Fase 1). Tahun 2 = Inovasi (pilot AI/ML). Tahun 3-5 = Transformasi (cloud-native, AI-embedded). Petakan setiap inisiatif ke tujuan bisnis. Dewan mendanai STRATEGI, bukan teknologi! 🎯' }, tip: { en: '🚀 Every IT initiative needs a business sponsor — technology without a business case = no budget!', id: '🚀 Setiap inisiatif IT butuh sponsor bisnis — teknologi tanpa business case = tidak ada anggaran!' }, image: null },
  ] },

};



// ───────────────────────────────────────────────────────────────
//  Helper — returns learning data for a mission ID, or null
//  null = skip carousel for this mission
// ───────────────────────────────────────────────────────────────
export function getMissionLearning(missionId) {
  return MISSION_LEARNING[missionId] || null;
}
