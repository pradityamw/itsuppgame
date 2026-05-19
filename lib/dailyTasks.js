// dailyTasks.js — 40 tasks across 3 difficulties

const coinMap = { easy: 12, medium: 30, hard: 75 };
const getRandomCoinReward = (diff) => coinMap[diff] ?? 12;

const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

export const DAILY_TASK_POOL = {
  easy: [
    { id:'dt_e1', titleEn:'Reconnect the WiFi', titleId:'Sambungkan Kembali WiFi', descEn:'WiFi disconnected. Check and reconnect.', descId:'WiFi putus. Periksa dan sambungkan.', puzzleType:'quiz', xpReward:30,
      quiz:[Q('WiFi disconnected. First step?',['Restart PC','Check router power','Call ISP','Reinstall Windows'],1,'Always check if the router is powered on before any software troubleshooting.')] },
    { id:'dt_e2', titleEn:'Clear Stuck Print Queue', titleId:'Bersihkan Antrian Print', descEn:'Print queue stuck. Clear and restart.', descId:'Antrian print macet. Bersihkan.', puzzleType:'quiz', xpReward:30,
      quiz:[Q('Stuck print queue fix?',['Unplug printer','Restart Print Spooler service','Reinstall Windows','Buy new printer'],1,'Restarting Print Spooler clears the stuck queue.')] },
    { id:'dt_e3', titleEn:'Replace RAM Stick', titleId:'Ganti Stik RAM', descEn:'PC shows memory errors.', descId:'PC error memori.', puzzleType:'quiz', xpReward:35,
      quiz:[Q('Tool to identify faulty RAM?',['Task Manager','Windows Memory Diagnostic','Device Manager','Defragmenter'],1,'mdsched.exe (Windows Memory Diagnostic) tests RAM for errors.')] },
    { id:'dt_e4', titleEn:'Reset Forgotten Password', titleId:'Reset Password Terlupa', descEn:'User forgot Windows password.', descId:'User lupa password Windows.', puzzleType:'quiz', xpReward:30,
      quiz:[Q('Safest way to reset local account password?',['Reinstall Windows','Use another admin account to reset','Format drive','Guess it'],1,'Admin accounts can reset other users passwords via Computer Management.')] },
    { id:'dt_e5', titleEn:'Update Outdated Drivers', titleId:'Perbarui Driver Usang', descEn:'Device not working after update.', descId:'Perangkat tidak berfungsi setelah update.', puzzleType:'quiz', xpReward:30,
      quiz:[Q('Where to update device drivers?',['Add Programs','Device Manager','Task Manager','Windows Update only'],1,'Device Manager lets you update, rollback, or reinstall drivers.')] },
    { id:'dt_e6', titleEn:'Connect HDMI Monitor', titleId:'Sambungkan Monitor HDMI', descEn:'New monitor shows No Signal.', descId:'Monitor baru tampilkan No Signal.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Monitor shows No Signal. First step?',['Replace monitor','Check HDMI cable at both ends','Reinstall GPU driver','Replace GPU'],1,'Loose cable is the most common cause of No Signal.')] },
    { id:'dt_e7', titleEn:'Set Up Bluetooth Device', titleId:'Setup Perangkat Bluetooth', descEn:'Bluetooth headset won\'t pair.', descId:'Headset Bluetooth tidak mau pairing.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Bluetooth won\'t pair. First step?',['Buy new headset','Put both devices in pairing mode','Restart router','Update GPU'],1,'Both devices must be in discoverable/pairing mode simultaneously.')] },
    { id:'dt_e8', titleEn:'Fix USB Not Detected', titleId:'Perbaiki USB Tidak Terdeteksi', descEn:'USB drive not showing up.', descId:'USB drive tidak muncul.', puzzleType:'quiz', xpReward:30,
      quiz:[Q('USB not detected. First try?',['Format USB','Try different USB port','Reinstall Windows','Check Disk Management'],0,'Port may be faulty. Try another port first.')] },
    { id:'dt_e9', titleEn:'Default Printer Not Set', titleId:'Printer Default Belum Diset', descEn:'Print job goes nowhere.', descId:'Print job tidak kemana-mana.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Documents won\'t print. First check?',['Buy new ink','Check Default Printer setting','Restart router','Update Windows'],1,'Windows sends jobs to the default printer. Make sure the correct one is selected.')] },
    { id:'dt_e10', titleEn:'PC Running Hot', titleId:'PC Terlalu Panas', descEn:'Fan is loud, PC sluggish.', descId:'Kipas keras, PC lambat.', puzzleType:'quiz', xpReward:32,
      quiz:[Q('PC fan very loud and sluggish. Likely cause?',['RAM issue','CPU overheating due to dust','Virus','HDD failing'],1,'Dust buildup blocks airflow causing overheating and thermal throttling.')] },
    { id:'dt_e11', titleEn:'Install Software for User', titleId:'Install Software untuk User', descEn:'New user needs basic software installed.', descId:'User baru perlu software dasar.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Best practice when installing software on a work PC?',['Install everything available','Only install what is needed for the job (least privilege)','Install gaming software too','Skip antivirus'],1,'Install only what is required. Unnecessary software = security risk + performance impact.')] },
    { id:'dt_e12', titleEn:'Restart Frozen Application', titleId:'Restart Aplikasi Membeku', descEn:'Excel frozen, won\'t close.', descId:'Excel membeku, tidak bisa ditutup.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Application frozen and won\'t close. How to force-close?',['Restart PC','Task Manager → End Task','Pull power cord','Wait forever'],1,'Task Manager → Processes tab → End Task force-terminates any process.')] },
    { id:'dt_e13', titleEn:'Check Disk Space', titleId:'Cek Kapasitas Disk', descEn:'PC warning: disk almost full.', descId:'PC peringatan: disk hampir penuh.', puzzleType:'quiz', xpReward:30,
      quiz:[Q('Quick way to check disk space on Windows?',['Task Manager','This PC → Properties, or Settings → Storage','Device Manager','Event Viewer'],1,'Settings → Storage or right-clicking This PC shows disk usage per drive.')] },
    { id:'dt_e14', titleEn:'Keyboard Not Typing', titleId:'Keyboard Tidak Mengetik', descEn:'Some keyboard keys not working.', descId:'Beberapa tombol keyboard tidak bekerja.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Some keyboard keys not working. First step?',['Replace keyboard immediately','Try keyboard on another PC to isolate hardware vs software issue','Reinstall Windows','Check GPU'],1,'Test keyboard on another PC. If keys work there, it\'s a driver issue on original PC.')] },
    { id:'dt_e15', titleEn:'Screen Resolution Wrong', titleId:'Resolusi Layar Salah', descEn:'Monitor resolution looks blurry/wrong.', descId:'Resolusi monitor tampak buram/salah.', puzzleType:'quiz', xpReward:28,
      quiz:[Q('Monitor resolution looks blurry. How to fix?',['Buy new monitor','Right-click Desktop → Display Settings → Resolution','Update BIOS','Replace HDMI cable'],1,'Display Settings lets you change resolution to match the monitor\'s native resolution.')] },
  ],

  medium: [
    { id:'dt_m1', titleEn:'Fix a DNS Issue', titleId:'Perbaiki Masalah DNS', descEn:'Can ping IPs but not websites.', descId:'Bisa ping IP tapi tidak bisa buka website.', puzzleType:'quiz', xpReward:75,
      quiz:[
        Q('User pings 8.8.8.8 OK but can\'t open google.com. Problem?',['Cable broken','DNS failing','Firewall blocking','WiFi password'],1,'Being able to ping an IP but not a domain name = DNS issue.'),
        Q('Command to diagnose DNS?',['ping','nslookup','ipconfig','netstat'],1,'nslookup queries DNS directly and shows if resolution is working.'),
      ]},
    { id:'dt_m2', titleEn:'Configure Home Router', titleId:'Konfigurasi Router Rumah', descEn:'Set up new router with correct security.', descId:'Siapkan router baru dengan keamanan yang benar.', puzzleType:'quiz', xpReward:80,
      quiz:[Q('Best WiFi security protocol in 2024?',['WEP','WPA','WPA2','WPA3'],3,'WPA3 is most secure. WEP is completely broken. Never use WEP.')] },
    { id:'dt_m3', titleEn:'Remove Malware', titleId:'Hapus Malware', descEn:'Pop-ups everywhere, PC slow.', descId:'Pop-up di mana-mana, PC lambat.', puzzleType:'quiz', xpReward:85,
      quiz:[Q('Malware suspected. FIRST step?',['Delete all files','Disconnect from network','Play a game','Reinstall Windows'],1,'Isolate the machine first to prevent malware spreading to other devices.')] },
    { id:'dt_m4', titleEn:'Setup Static IP', titleId:'Setup IP Statis', descEn:'Server needs a fixed IP address.', descId:'Server perlu alamat IP tetap.', puzzleType:'quiz', xpReward:80,
      quiz:[Q('4 values needed for a static IP config?',['IP, MAC, Username, Password','IP, Subnet, Gateway, DNS','IP, Speed, Port, Protocol','IP, SSID, Channel, Band'],1,'Static IP requires: IP address, Subnet mask, Default gateway, and DNS server.')] },
    { id:'dt_m5', titleEn:'WiFi Keeps Dropping', titleId:'WiFi Terus Putus', descEn:'WiFi drops every hour.', descId:'WiFi putus setiap jam.', puzzleType:'quiz', xpReward:78,
      quiz:[Q('WiFi drops hourly in office. Most common cause?',['Too many users','Channel interference/congestion','Cable broken','ISP outage'],1,'WiFi channel congestion causes drops. Use a WiFi analyzer and switch to a less congested channel.')] },
    { id:'dt_m6', titleEn:'Shared Folder Access Denied', titleId:'Akses Folder Bersama Ditolak', descEn:'User gets Access Denied on network share.', descId:'User dapat Access Denied di share.', puzzleType:'quiz', xpReward:82,
      quiz:[Q('Access Denied on shared folder. First check?',['Restart server','Check user AD group and folder NTFS permissions','Reinstall Windows','Replace cable'],1,'Both Share and NTFS permissions must allow access. The most restrictive wins.')] },
    { id:'dt_m7', titleEn:'Laptop Overheating', titleId:'Laptop Kepanasan', descEn:'Laptop shuts down after 30 min.', descId:'Laptop mati setelah 30 menit.', puzzleType:'quiz', xpReward:80,
      quiz:[Q('Laptop shuts down after 30 minutes. Most likely cause?',['Battery issue','Thermal throttling from dust/dried thermal paste','RAM failure','OS crash'],1,'Clean the vents and reapply thermal paste to fix laptop overheating.')] },
    { id:'dt_m8', titleEn:'Reinstall Corrupted Driver', titleId:'Install Ulang Driver Rusak', descEn:'Audio device showing error after update.', descId:'Perangkat audio error setelah update.', puzzleType:'quiz', xpReward:76,
      quiz:[Q('Device Manager shows yellow warning on audio device. Fix?',['Replace the device','Update/reinstall driver from manufacturer website','Format PC','Restart router'],1,'Yellow warning = driver issue. Download correct driver from manufacturer website.')] },
    { id:'dt_m9', titleEn:'DHCP IP Conflict', titleId:'Konflik IP DHCP', descEn:'Two PCs got the same IP.', descId:'Dua PC dapat IP yang sama.', puzzleType:'quiz', xpReward:85,
      quiz:[Q('IP conflict between two PCs. Quick fix?',['Unplug one PC forever','ipconfig /release and /renew to get new DHCP lease, or set static IP','Restart router only','Call ISP'],1,'Release and renew DHCP lease. Long term: assign static IPs to servers, reduce DHCP pool conflicts.')] },
    { id:'dt_m10', titleEn:'Windows Startup Repair', titleId:'Perbaikan Startup Windows', descEn:'Windows won\'t boot — startup repair needed.', descId:'Windows tidak mau boot.', puzzleType:'quiz', xpReward:88,
      quiz:[Q('Windows won\'t boot. How to access Startup Repair?',['Press Delete','Boot from USB/DVD → Troubleshoot → Startup Repair','Press F12','Reinstall immediately'],1,'Boot from Windows installation media → Repair your computer → Troubleshoot → Startup Repair.')] },
    { id:'dt_m11', titleEn:'Remote Desktop Setup', titleId:'Setup Remote Desktop', descEn:'Set up RDP for remote work.', descId:'Setup RDP untuk kerja remote.', puzzleType:'quiz', xpReward:82,
      quiz:[Q('RDP default port?',['80','443','3389','22'],2,'RDP uses TCP 3389. This port must be open in the firewall for remote access to work.')] },
    { id:'dt_m12', titleEn:'Disk Cleanup', titleId:'Bersihkan Disk', descEn:'C: drive almost full. Clean up.', descId:'Drive C: hampir penuh. Bersihkan.', puzzleType:'quiz', xpReward:75,
      quiz:[Q('Safe way to free disk space on Windows?',['Delete System32','Run Disk Cleanup (cleanmgr) and empty Recycle Bin','Format drive','Remove Windows Update'],1,'Disk Cleanup removes temp files, update caches, and recycle bin safely.')] },
    { id:'dt_m13', titleEn:'Event Viewer Investigation', titleId:'Investigasi Event Viewer', descEn:'Application crashes randomly. Check logs.', descId:'Aplikasi crash acak. Cek log.', puzzleType:'quiz', xpReward:84,
      quiz:[Q('Where do you find application crash logs in Windows?',['Task Manager','Event Viewer → Windows Logs → Application','Device Manager','Registry Editor'],1,'Event Viewer Application log shows all app errors with timestamps and error codes.')] },
    { id:'dt_m14', titleEn:'Create System Restore Point', titleId:'Buat Restore Point', descEn:'Before installing risky software, create a restore point.', descId:'Sebelum install software berisiko, buat restore point.', puzzleType:'quiz', xpReward:76,
      quiz:[Q('How to create a System Restore Point?',['Task Manager','Control Panel → System → System Protection → Create','Device Manager','Registry'],1,'System Protection → Create lets you snapshot Windows state before risky changes.')] },
    { id:'dt_m15', titleEn:'Map Network Drive', titleId:'Petakan Network Drive', descEn:'User needs shared folder mapped as drive letter.', descId:'User perlu folder bersama dipetakan sebagai huruf drive.', puzzleType:'quiz', xpReward:78,
      quiz:[Q('How to map a network share as a drive letter?',['Copy-paste files','This PC → Map network drive → Enter UNC path (\\\\server\\share)','Format drive','Device Manager'],1,'Mapping a network drive gives persistent access via a drive letter like Z: or Y:.')] },
  ],

  hard: [
    { id:'dt_h1', titleEn:'Server Outage Recovery', titleId:'Pemulihan Server Mati', descEn:'Critical server down.', descId:'Server kritis mati.', puzzleType:'quiz', xpReward:180,
      quiz:[Q('Correct server outage response order?',['Fix immediately','Panic → random fixes','Identify → notify → diagnose → fix → document','Reinstall OS'],2,'ITIL incident management: Identify, Notify stakeholders, Diagnose, Fix, Document.')] },
    { id:'dt_h2', titleEn:'VLAN Configuration', titleId:'Konfigurasi VLAN', descEn:'Segment office network for security.', descId:'Segmentasi jaringan kantor untuk keamanan.', puzzleType:'quiz', xpReward:200,
      quiz:[Q('Primary purpose of VLANs?',['Speed up internet','Logically segment network without physical separation','Replace WiFi','Add RAM'],1,'VLANs create logical segments on same physical infrastructure — improves security and management.')] },
    { id:'dt_h3', titleEn:'Ransomware Response', titleId:'Respons Ransomware', descEn:'Files being encrypted. Stop it!', descId:'File dienkripsi. Hentikan!', puzzleType:'quiz', xpReward:220,
      quiz:[Q('FIRST action during ransomware?',['Pay ransom','Disconnect infected machines immediately','Run antivirus','Call police'],1,'Network isolation prevents ransomware spreading. Speed is critical.')] },
    { id:'dt_h4', titleEn:'SSL Certificate Renewal', titleId:'Pembaruan Sertifikat SSL', descEn:'Website showing certificate error.', descId:'Website tampilkan error sertifikat.', puzzleType:'quiz', xpReward:190,
      quiz:[Q('Website shows "Certificate Expired" error. Fix?',['Ignore it','Renew/replace the SSL certificate on the web server','Delete website cache','Restart PC'],1,'SSL certificates have expiry dates. Renew them before expiry. Set calendar reminders.')] },
    { id:'dt_h5', titleEn:'Active Directory Lockout', titleId:'Lockout Active Directory', descEn:'Multiple accounts locked simultaneously.', descId:'Banyak akun terkunci sekaligus.', puzzleType:'quiz', xpReward:210,
      quiz:[Q('Multiple AD accounts locked at once. Best first step?',['Reset all passwords','Check Event Viewer Security log for failed login source IP','Disable all accounts','Restart AD server'],1,'Event ID 4625 shows failed login source IPs. Block the attacker at the firewall first.')] },
    { id:'dt_h6', titleEn:'VPN Tunnel Down', titleId:'Tunnel VPN Mati', descEn:'Site-to-site VPN not connecting.', descId:'VPN site-to-site tidak terkoneksi.', puzzleType:'quiz', xpReward:200,
      quiz:[Q('Site-to-site VPN down. First check?',['Replace router','VPN phase 1/2 negotiation logs — check IKE errors, mismatched pre-shared keys or ciphers','Restart all PCs','Call ISP'],1,'VPN logs show Phase 1 (IKE) and Phase 2 (IPsec) negotiation details. Mismatched settings = connection fails.')] },
    { id:'dt_h7', titleEn:'Backup Verification', titleId:'Verifikasi Backup', descEn:'Verify backup can actually be restored.', descId:'Verifikasi backup bisa benar-benar dipulihkan.', puzzleType:'quiz', xpReward:195,
      quiz:[Q('Why must backups be regularly tested by restoring from them?',['Looks professional','An untested backup may be corrupt — you only discover during a real disaster','Takes less space','Faster backup'],1,'A backup that\'s never been tested is not a backup — it\'s hope. Test restore regularly.')] },
    { id:'dt_h8', titleEn:'Packet Loss Investigation', titleId:'Investigasi Packet Loss', descEn:'Video calls dropping. Find the cause.', descId:'Video call terputus. Temukan penyebabnya.', puzzleType:'quiz', xpReward:205,
      quiz:[Q('Which tool shows packet loss at each network hop?',['ping 8.8.8.8','tracert/traceroute','ipconfig /all','netstat -an'],1,'Traceroute shows each hop with latency. A hop showing * or high latency indicates the problem node.')] },
    { id:'dt_h9', titleEn:'Disk Failure Recovery', titleId:'Pemulihan Kegagalan Disk', descEn:'RAID disk failed. Recovery needed.', descId:'Disk RAID gagal. Perlu pemulihan.', puzzleType:'quiz', xpReward:215,
      quiz:[Q('RAID 1 has one disk failed. What is the immediate risk?',['Data lost already','Array is degraded — still functional but one more failure = total loss. Replace disk immediately.','No risk at all','Array is broken'],1,'RAID 1 mirrors data. One disk failure = degraded but operational. Replace ASAP — second failure = data loss.')] },
    { id:'dt_h10', titleEn:'Enterprise Firewall Rule Audit', titleId:'Audit Aturan Firewall Enterprise', descEn:'Audit firewall rules for security gaps.', descId:'Audit aturan firewall untuk celah keamanan.', puzzleType:'quiz', xpReward:220,
      quiz:[Q('What is the "default deny" firewall principle?',['Allow all traffic by default','Block all traffic by default, only allow explicitly needed services','Only allow HTTP/HTTPS','Block all outbound traffic'],1,'Default deny = minimum attack surface. Block everything, explicitly allow only what is required.')] },
  ],
};

export function getTodaysTasks() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const pick = (pool, offset) => {
    const idx = (seed + offset) % pool.length;
    const task = pool[idx];
    return { ...task, coinReward: getRandomCoinReward(task.xpReward > 150 ? 'hard' : task.xpReward > 60 ? 'medium' : 'easy') };
  };
  return {
    easy:   pick(DAILY_TASK_POOL.easy,   0),
    medium: pick(DAILY_TASK_POOL.medium, 1),
    hard:   pick(DAILY_TASK_POOL.hard,   2),
  };
}

export function getWeeklyTasks() {
  const now = new Date();
  const weekNum = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / 604800000);
  const seed = now.getFullYear() * 100 + weekNum;
  const allTasks = [...DAILY_TASK_POOL.easy, ...DAILY_TASK_POOL.medium, ...DAILY_TASK_POOL.hard];
  const picks = [];
  for (let i = 0; i < 5; i++) {
    picks.push(allTasks[(seed + i * 7) % allTasks.length]);
  }
  return picks;
}

export function getMsUntilReset() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow - now;
}

export function formatResetCountdown() {
  const ms = getMsUntilReset();
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}
