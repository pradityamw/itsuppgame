// TIER INTRO CAROUSEL DATA
// Language: Simple & fun, with analogies a 5-year-old can understand!
// Each tier has 4 slides: What, Why, How, Challenge

export const TIER_INTROS = {

  // ══════════════════════════════════════════════
  //  TIER 1 — Home IT Hero
  // ══════════════════════════════════════════════
  1: {
    badge: { en: 'Tier 1 · Home IT Hero', id: 'Tier 1 · Pahlawan IT Rumahan' },
    color: '#39ff14',
    slides: [
      {
        emoji: '🛏️',
        title: { en: 'Welcome to Your IT Journey!', id: 'Selamat Datang di Petualangan IT-mu!' },
        body: {
          en: "Imagine you're the neighborhood's go-to fixer! When someone's toy robot breaks, YOU know how to fix it. That's what IT Support does — but with computers! 🤖",
          id: 'Bayangkan kamu adalah "tukang reparasi" di lingkunganmu! Saat mainan robot temanmu rusak, KAMU yang bisa memperbaikinya. Itulah IT Support — tapi dengan komputer! 🤖',
        },
        tip: { en: '💡 Computers are just like robots — they need care too!', id: '💡 Komputer itu seperti robot — perlu dirawat juga!' },
      },
      {
        emoji: '🔌',
        title: { en: 'What Will You Learn?', id: 'Apa yang Akan Kamu Pelajari?' },
        body: {
          en: "You'll learn to turn computers on and off correctly, connect them to the internet like plugging in a garden hose 🪣, and help family members when their screen goes dark!",
          id: 'Kamu akan belajar cara menyalakan dan mematikan komputer dengan benar, menghubungkannya ke internet seperti menyambung selang air 🪣, dan membantu keluarga saat layar mereka mati!',
        },
        tip: { en: '💡 Internet = a giant invisible pipe that carries information!', id: '💡 Internet = pipa tak kasat mata yang mengalirkan informasi!' },
      },
      {
        emoji: '🧰',
        title: { en: 'Your Starter Tools', id: 'Alat-Alat Pertamamu' },
        body: {
          en: "Every hero needs a toolbox! Yours includes: a screwdriver to open PCs 🔧, your brain to think of solutions 🧠, and patience — like waiting for cookies to bake! 🍪",
          id: 'Setiap pahlawan butuh kotak alat! Punyamu ada: obeng untuk membuka PC 🔧, otakmu untuk berpikir solusi 🧠, dan kesabaran — seperti menunggu kue matang! 🍪',
        },
        tip: { en: '💡 Most computer problems can be fixed by just restarting!', id: '💡 Kebanyakan masalah komputer bisa diperbaiki hanya dengan restart!' },
      },
      {
        emoji: '🎯',
        title: { en: 'Your Mission Today!', id: 'Misi Kamu Hari Ini!' },
        body: {
          en: "Help your neighbors fix their home computers! A PC that won't start, internet that's slow, a printer that won't print... You are the HERO they need! 🦸",
          id: 'Bantu tetanggamu memperbaiki komputer rumah mereka! PC yang tidak mau nyala, internet yang lambat, printer yang tidak mau cetak... Kamu adalah PAHLAWAN yang mereka butuhkan! 🦸',
        },
        tip: { en: '🚀 Complete all missions to unlock the next tier!', id: '🚀 Selesaikan semua misi untuk membuka tier berikutnya!' },
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  TIER 2 — Repair Shop Rookie
  // ══════════════════════════════════════════════
  2: {
    badge: { en: 'Tier 2 · Repair Shop Rookie', id: 'Tier 2 · Pemula Toko Reparasi' },
    color: '#00f5ff',
    slides: [
      {
        emoji: '🏪',
        title: { en: 'Your First Real Job!', id: 'Pekerjaan Nyata Pertamamu!' },
        body: {
          en: "You've leveled up! Now you work at a real computer repair shop. Think of it like being a doctor for computers 🩺 — sick computers come in, and you make them healthy again!",
          id: 'Kamu sudah naik level! Sekarang kamu bekerja di toko reparasi komputer sungguhan. Bayangkan seperti menjadi dokter komputer 🩺 — komputer yang sakit masuk, dan kamu menyehatkannya kembali!',
        },
        tip: { en: '💡 Diagnose first, fix second — just like a real doctor!', id: '💡 Diagnosa dulu, baru diperbaiki — seperti dokter sungguhan!' },
      },
      {
        emoji: '🧩',
        title: { en: 'Inside a Computer', id: 'Di Dalam Komputer' },
        body: {
          en: "A computer is like a LEGO city! 🏙️ The CPU is the mayor (makes all decisions), RAM is the desk (holds things you're working on), and the hard drive is the house (stores everything).",
          id: 'Komputer itu seperti kota LEGO! 🏙️ CPU adalah walikotanya (membuat semua keputusan), RAM adalah meja kerja (menyimpan hal yang sedang dikerjakan), dan hard drive adalah rumahnya (menyimpan segalanya).',
        },
        tip: { en: '💡 If RAM is full — the computer gets confused, just like a messy desk!', id: '💡 Jika RAM penuh — komputer bingung, seperti meja yang berantakan!' },
      },
      {
        emoji: '⚙️',
        title: { en: 'Upgrading Computers', id: 'Meningkatkan Komputer' },
        body: {
          en: "Upgrading a PC is like leveling up a game character! 🎮 Add more RAM = more superpowers. Replace old HDD with SSD = run 5x faster! You'll help customers do exactly this.",
          id: 'Upgrade PC itu seperti menaikkan level karakter game! 🎮 Tambah RAM = lebih banyak kekuatan super. Ganti HDD lama dengan SSD = jalan 5x lebih cepat! Kamu akan membantu pelanggan melakukan ini.',
        },
        tip: { en: '💡 SSD is like rocket fuel ⛽ for a slow computer!', id: '💡 SSD itu seperti bahan bakar roket ⛽ untuk komputer yang lambat!' },
      },
      {
        emoji: '🎮',
        title: { en: 'Keep the Gaming Café Running!', id: 'Jaga Warnet Gaming Tetap Berjalan!' },
        body: {
          en: "20 gaming PCs, all needing to work perfectly! If one breaks during a tournament, gamers get angry 😤. Your job: fix it FAST before the round ends! Think you're up for it?",
          id: '20 PC gaming, semuanya harus bekerja sempurna! Jika satu rusak saat turnamen, gamer marah 😤. Tugasmu: perbaiki CEPAT sebelum ronde berakhir! Siap menerima tantangan?',
        },
        tip: { en: '🚀 Speed matters here — practice makes you faster!', id: '🚀 Kecepatan penting di sini — latihan membuat kamu lebih cepat!' },
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  TIER 3 — Office IT Support
  // ══════════════════════════════════════════════
  3: {
    badge: { en: 'Tier 3 · Office IT Support', id: 'Tier 3 · IT Support Kantor' },
    color: '#4fc3f7',
    slides: [
      {
        emoji: '🏢',
        title: { en: 'Welcome to the Office World!', id: 'Selamat Datang di Dunia Kantor!' },
        body: {
          en: "You're no longer fixing just home computers — now you support an ENTIRE office! Think of yourself as the IT janitor 🧹 — you keep everything clean and running so 50 people can work every day!",
          id: 'Kamu tidak lagi memperbaiki komputer rumah saja — sekarang kamu mendukung SELURUH kantor! Bayangkan dirimu seperti penjaga kebersihan IT 🧹 — kamu menjaga semuanya bersih dan berjalan agar 50 orang bisa bekerja setiap hari!',
        },
        tip: { en: '💡 One IT support = the backbone of the whole office!', id: '💡 Satu IT support = tulang punggung seluruh kantor!' },
      },
      {
        emoji: '📁',
        title: { en: 'Windows & Files — The Big Adventure', id: 'Windows & File — Petualangan Besar' },
        body: {
          en: "Windows OS is like the rules of a playground 🛝 — everyone uses the same rules. You'll learn to manage files, fix permission errors (like a locked gate 🔒), and set up accounts for new workers.",
          id: 'Windows OS itu seperti peraturan taman bermain 🛝 — semua orang menggunakan aturan yang sama. Kamu akan belajar mengelola file, memperbaiki error izin (seperti gerbang terkunci 🔒), dan menyiapkan akun untuk karyawan baru.',
        },
        tip: { en: '💡 "Access Denied" = someone forgot to give you the key!', id: '💡 "Access Denied" = seseorang lupa memberimu kuncinya!' },
      },
      {
        emoji: '🏫',
        title: { en: 'School Computer Lab', id: 'Lab Komputer Sekolah' },
        body: {
          en: "30 students, 30 computers, 1 teacher waiting... and one PC is broken! 😱 You need to fix it fast so the class doesn't stop. This teaches you to work quickly under pressure, like a pit stop crew in F1! 🏎️",
          id: '30 murid, 30 komputer, 1 guru menunggu... dan satu PC rusak! 😱 Kamu harus memperbaikinya cepat agar kelas tidak berhenti. Ini mengajarkanmu bekerja cepat di bawah tekanan, seperti kru pit stop F1! 🏎️',
        },
        tip: { en: '💡 Stay calm under pressure — panic makes mistakes worse!', id: '💡 Tetap tenang di bawah tekanan — panik membuat kesalahan lebih buruk!' },
      },
      {
        emoji: '📧',
        title: { en: 'Email & Communication Skills', id: 'Skill Email & Komunikasi' },
        body: {
          en: "An IT support who can't explain problems clearly is like a doctor who speaks in puzzles 🧩. You'll practice writing helpful emails and talking to bosses, coworkers, AND frustrated users!",
          id: 'IT support yang tidak bisa menjelaskan masalah dengan jelas itu seperti dokter yang berbicara dalam teka-teki 🧩. Kamu akan berlatih menulis email yang membantu dan berbicara dengan bos, rekan kerja, DAN pengguna yang frustrasi!',
        },
        tip: { en: '🚀 Communication is your most powerful tool!', id: '🚀 Komunikasi adalah alatmu yang paling kuat!' },
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  TIER 4 — Network Engineer
  // ══════════════════════════════════════════════
  4: {
    badge: { en: 'Tier 4 · Network Engineer', id: 'Tier 4 · Network Engineer' },
    color: '#bf00ff',
    slides: [
      {
        emoji: '🌐',
        title: { en: 'The Internet Is Yours to Control!', id: 'Internet Ada di Tanganmu!' },
        body: {
          en: "Networks are like the roads of a city 🏙️. Data travels from computer to computer like cars on a highway. As a Network Engineer, YOU build and repair those roads! If the road breaks, NO ONE can move!",
          id: 'Jaringan itu seperti jalan raya di sebuah kota 🏙️. Data berjalan dari komputer ke komputer seperti mobil di jalan raya. Sebagai Network Engineer, KAMU membangun dan memperbaiki jalan itu! Jika jalan rusak, TIDAK ADA yang bisa bergerak!',
        },
        tip: { en: '💡 Ping = knocking on a door to check if someone is home!', id: '💡 Ping = mengetuk pintu untuk memeriksa apakah seseorang ada di rumah!' },
      },
      {
        emoji: '📡',
        title: { en: 'Routers, Switches & IP Addresses', id: 'Router, Switch & Alamat IP' },
        body: {
          en: "A router is like a mailman 📬 — he knows everyone's address (IP) and delivers the right letter to the right house. A switch is the post office that connects all mailmen in one building.",
          id: 'Router itu seperti tukang pos 📬 — dia tahu alamat semua orang (IP) dan mengantar surat yang tepat ke rumah yang tepat. Switch adalah kantor pos yang menghubungkan semua tukang pos dalam satu gedung.',
        },
        tip: { en: '💡 IP Address = your computer\'s home address on the internet!', id: '💡 Alamat IP = alamat rumah komputermu di internet!' },
      },
      {
        emoji: '🔧',
        title: { en: 'When the Network Goes Down...', id: 'Ketika Jaringan Mati...' },
        body: {
          en: "Imagine 200 people suddenly losing internet at work 😱 — nobody can do anything! You'll learn to find where the 'road is broken' and fix it FAST, like a plumber fixing a burst pipe! 🚰",
          id: 'Bayangkan 200 orang tiba-tiba kehilangan internet di tempat kerja 😱 — tidak ada yang bisa melakukan apa pun! Kamu akan belajar menemukan di mana \'jalannya rusak\' dan memperbaikinya CEPAT, seperti tukang ledeng memperbaiki pipa bocor! 🚰',
        },
        tip: { en: '💡 Always check the simplest thing first — is the cable plugged in?', id: '💡 Selalu periksa hal paling sederhana dulu — apakah kabelnya terpasang?' },
      },
      {
        emoji: '🖧',
        title: { en: 'You Are the Internet Guardian!', id: 'Kamu Adalah Penjaga Internet!' },
        body: {
          en: "At a Network Ops Room, you watch over dozens of networks at once — like a traffic controller at an airport 🛫 watching 50 planes at the same time! No plane (data packet) gets lost on your watch!",
          id: 'Di Network Ops Room, kamu mengawasi puluhan jaringan sekaligus — seperti pengatur lalu lintas di bandara 🛫 yang mengawasi 50 pesawat sekaligus! Tidak ada pesawat (paket data) yang tersesat di bawah pengawasanmu!',
        },
        tip: { en: '🚀 Monitoring tools = your radar to see everything happening!', id: '🚀 Alat monitoring = radarmu untuk melihat semua yang terjadi!' },
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  TIER 5 — System Administrator
  // ══════════════════════════════════════════════
  5: {
    badge: { en: 'Tier 5 · System Administrator', id: 'Tier 5 · Administrator Sistem' },
    color: '#ff6b00',
    slides: [
      {
        emoji: '🏦',
        title: { en: 'You Now Run the Whole IT Kingdom!', id: 'Kamu Kini Mengelola Seluruh Kerajaan IT!' },
        body: {
          en: "A SysAdmin is like the King/Queen of a digital castle 🏰. You manage ALL the servers (the castle's engines), ALL user accounts (who gets which key), and make sure the kingdom never goes dark!",
          id: 'SysAdmin itu seperti Raja/Ratu kastil digital 🏰. Kamu mengelola SEMUA server (mesin kastil), SEMUA akun pengguna (siapa yang mendapat kunci mana), dan memastikan kerajaan tidak pernah mati!',
        },
        tip: { en: '💡 Server = a super-powerful computer that never sleeps!', id: '💡 Server = komputer super kuat yang tidak pernah tidur!' },
      },
      {
        emoji: '🖥️',
        title: { en: 'What Is Active Directory?', id: 'Apa Itu Active Directory?' },
        body: {
          en: "Active Directory is like the school attendance book 📒 for computers. It remembers WHO can log in, WHICH computer they can use, and WHAT files they are allowed to open. Without it — total chaos! 🌪️",
          id: 'Active Directory itu seperti buku absensi sekolah 📒 untuk komputer. Ini mengingat SIAPA yang bisa login, KOMPUTER MANA yang bisa mereka gunakan, dan FILE APA yang boleh mereka buka. Tanpa ini — kekacauan total! 🌪️',
        },
        tip: { en: '💡 Think of AD as the school\'s master key system!', id: '💡 Bayangkan AD sebagai sistem kunci induk sekolah!' },
      },
      {
        emoji: '💾',
        title: { en: 'Backup = Your Safety Net', id: 'Backup = Jaring Pengamanmu' },
        body: {
          en: "Backups are like saving your game before a boss fight! 🎮 If something goes wrong — data deleted, virus attack, power cut — you can RELOAD from your last save point and nothing is lost!",
          id: 'Backup itu seperti menyimpan game sebelum melawan boss! 🎮 Jika sesuatu salah — data terhapus, serangan virus, listrik mati — kamu bisa MUAT ULANG dari titik simpan terakhir dan tidak ada yang hilang!',
        },
        tip: { en: '💡 Rule: 3 copies, 2 different places, 1 offsite!', id: '💡 Aturan: 3 salinan, 2 tempat berbeda, 1 di luar lokasi!' },
      },
      {
        emoji: '📊',
        title: { en: 'Enterprise Scale — Bigger Challenges!', id: 'Skala Enterprise — Tantangan Lebih Besar!' },
        body: {
          en: "Now instead of 1 broken computer, you manage 500 at once! 😲 Virtualization lets you run MANY computers inside ONE big computer — like having 20 tablets running inside 1 giant computer!",
          id: 'Sekarang bukan 1 komputer rusak, tapi kamu mengelola 500 sekaligus! 😲 Virtualisasi memungkinkan kamu menjalankan BANYAK komputer di dalam SATU komputer besar — seperti punya 20 tablet yang berjalan di dalam 1 komputer raksasa!',
        },
        tip: { en: '🚀 Hyper-V & VMware = your magic boxes that multiply computers!', id: '🚀 Hyper-V & VMware = kotak ajaib yang melipatgandakan komputer!' },
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  TIER 6 — Cybersecurity Specialist
  // ══════════════════════════════════════════════
  6: {
    badge: { en: 'Tier 6 · Cybersecurity Specialist', id: 'Tier 6 · Spesialis Keamanan Siber' },
    color: '#ff2d78',
    slides: [
      {
        emoji: '🛡️',
        title: { en: 'You Are Now a Digital Knight!', id: 'Kamu Kini Seorang Ksatria Digital!' },
        body: {
          en: "Cybersecurity is like being a castle guard ⚔️. Bad guys (hackers) try to sneak into the castle (company network) to steal treasure (data). Your job: spot them and STOP them before they get in!",
          id: 'Keamanan siber itu seperti menjadi penjaga kastil ⚔️. Orang jahat (hacker) mencoba menyelinap masuk ke kastil (jaringan perusahaan) untuk mencuri harta (data). Tugasmu: temukan mereka dan HENTIKAN sebelum masuk!',
        },
        tip: { en: '💡 Hackers don\'t always look evil — they send friendly-looking emails!', id: '💡 Hacker tidak selalu terlihat jahat — mereka mengirim email yang terlihat ramah!' },
      },
      {
        emoji: '🎣',
        title: { en: 'What Is Phishing?', id: 'Apa Itu Phishing?' },
        body: {
          en: "Phishing is when a bad guy pretends to be your friend 🎭. Like a fake letter from your bank saying 'click here to win a prize!' — but really they're trying to steal your password! You learn to SPOT the fakes!",
          id: 'Phishing adalah ketika orang jahat berpura-pura menjadi temanmu 🎭. Seperti surat palsu dari bankmu yang berkata \'klik di sini untuk menang hadiah!\' — tapi sebenarnya mereka mencoba mencuri passwordmu! Kamu belajar MENGENALI yang palsu!',
        },
        tip: { en: '💡 Golden rule: If it feels too good — it\'s probably fake!', id: '💡 Aturan emas: Jika terasa terlalu bagus — kemungkinan itu palsu!' },
      },
      {
        emoji: '🚨',
        title: { en: 'Detecting Threats in Real Time', id: 'Mendeteksi Ancaman Secara Real Time' },
        body: {
          en: "You'll work in a Security Operations Center (SOC) — like a superhero watchtower 🦸‍♂️ with screens showing ALL activity in the company network. Any suspicious move = ALARM! You investigate and respond!",
          id: 'Kamu akan bekerja di Security Operations Center (SOC) — seperti menara pengawas superhero 🦸‍♂️ dengan layar yang menampilkan SEMUA aktivitas di jaringan perusahaan. Gerakan mencurigakan = ALARM! Kamu menyelidiki dan merespons!',
        },
        tip: { en: '💡 SIEM tools = your magical alarm system that watches everything!', id: '💡 Alat SIEM = sistem alarm ajaibmu yang mengawasi segalanya!' },
      },
      {
        emoji: '💣',
        title: { en: 'Ransomware — The Digital Kidnapper', id: 'Ransomware — Penculik Digital' },
        body: {
          en: "Ransomware is like a thief who locks your house and demands payment for the key 🔑. It encrypts (scrambles) all your files so you can't open them. You'll learn to CONTAIN and STOP these attacks!",
          id: 'Ransomware itu seperti pencuri yang mengunci rumahmu dan meminta bayaran untuk kuncinya 🔑. Ini mengenkripsi (mengacak) semua filenya sehingga kamu tidak bisa membukanya. Kamu akan belajar untuk MENAHAN dan MENGHENTIKAN serangan ini!',
        },
        tip: { en: '🚀 Backups are your best weapon against ransomware!', id: '🚀 Backup adalah senjata terbaikmu melawan ransomware!' },
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  TIER 7 — IT Architect & Disaster Recovery
  // ══════════════════════════════════════════════
  7: {
    badge: { en: 'Tier 7 · IT Architect & DR Expert', id: 'Tier 7 · Arsitek IT & Ahli DR' },
    color: '#ffd700',
    slides: [
      {
        emoji: '🌍',
        title: { en: 'You Have Reached the Top!', id: 'Kamu Telah Mencapai Puncak!' },
        body: {
          en: "Welcome to the elite! You now design IT systems for ENTIRE COMPANIES 🏛️. Think of yourself as an architect 🏗️ — you don't just fix problems, you BUILD systems so problems can't happen in the first place!",
          id: 'Selamat datang di tingkat elit! Kamu sekarang merancang sistem IT untuk SELURUH PERUSAHAAN 🏛️. Bayangkan dirimu sebagai arsitek 🏗️ — kamu tidak hanya memperbaiki masalah, tapi MEMBANGUN sistem agar masalah tidak bisa terjadi sejak awal!',
        },
        tip: { en: '💡 Prevention is always better than cure — especially in IT!', id: '💡 Mencegah selalu lebih baik dari mengobati — terutama di IT!' },
      },
      {
        emoji: '☁️',
        title: { en: 'The Cloud — Your New Playground!', id: 'Cloud — Taman Bermain Barumu!' },
        body: {
          en: "Cloud is like a magic rental warehouse ☁️ — instead of buying your own servers (expensive! 💸), you rent space from Amazon/Google/Microsoft. Need more space? Click a button and BOOM — instant expansion!",
          id: 'Cloud itu seperti gudang sewa ajaib ☁️ — daripada membeli server sendiri (mahal! 💸), kamu menyewa ruang dari Amazon/Google/Microsoft. Butuh lebih banyak ruang? Klik tombol dan BOOM — ekspansi instan!',
        },
        tip: { en: '💡 AWS, Azure, GCP = the 3 biggest cloud rental companies!', id: '💡 AWS, Azure, GCP = 3 perusahaan sewa cloud terbesar!' },
      },
      {
        emoji: '🏗️',
        title: { en: 'Disaster Recovery — Plan for the Worst!', id: 'Disaster Recovery — Rencanakan yang Terburuk!' },
        body: {
          en: "DR is like a school fire drill 🔥 — you practice what to do BEFORE the emergency happens. If the data center floods 🌊, earthquake 🌍, or fire 🔥... your DR plan makes sure the company keeps running!",
          id: 'DR itu seperti latihan kebakaran sekolah 🔥 — kamu berlatih apa yang harus dilakukan SEBELUM keadaan darurat terjadi. Jika pusat data banjir 🌊, gempa 🌍, atau terbakar 🔥... rencana DR-mu memastikan perusahaan tetap berjalan!',
        },
        tip: { en: '💡 RTO = how fast to recover. RPO = how much data you can afford to lose!', id: '💡 RTO = seberapa cepat pulih. RPO = berapa banyak data yang boleh hilang!' },
      },
      {
        emoji: '🏆',
        title: { en: 'You Are the Last Line of Defense!', id: 'Kamu Adalah Pertahanan Terakhir!' },
        body: {
          en: "At Tier 7, when EVERYTHING goes wrong — the earthquake, the hack, the power cut — ALL eyes are on YOU 👁️. You're the captain of the ship in a storm 🌪️. Stay calm, follow the plan, save the company! Are you ready?",
          id: 'Di Tier 7, ketika SEGALANYA salah — gempa, peretasan, listrik mati — SEMUA mata tertuju padamu 👁️. Kamu adalah kapten kapal dalam badai 🌪️. Tetap tenang, ikuti rencana, selamatkan perusahaan! Siap?',
        },
        tip: { en: '🏆 You are now an IT Legend. The highest level awaits!', id: '🏆 Kamu sekarang adalah Legenda IT. Level tertinggi menantimu!' },
      },
    ],
  },
};

// Helper to get tier intro by tier number
export function getTierIntro(tier) {
  return TIER_INTROS[tier] || null;
}
