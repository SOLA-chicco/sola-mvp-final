import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Home, Briefcase, TrendingUp, AlertTriangle, Wind, Settings, 
  User, Sun, BatteryCharging, Plane, ChevronRight, Globe, Bell, 
  LogOut, X, ShieldCheck, Battery, Wrench, CheckCircle, PlusCircle, 
  Info, MessageCircle, Send, Edit3, HelpCircle, BarChart2,
  CloudSun, Share2, Download, ChevronDown, Check, Users, FileText, 
  Server, Code, CreditCard, Copy, Eye, EyeOff, ChevronUp, Activity, 
  Smartphone, Mail, Command, Layers, FileCheck
} from 'lucide-react';

// --- TRANSLATION DATA ---
const TRANSLATIONS = {
  id: {
    mode_business: "Profit Mode",
    mode_home: "Dream Mode",
    nav_dashboard: "Beranda",
    nav_energy: "Energi",
    nav_settings: "Pengaturan",
    consultation: "Konsultasi Sola",
    status_online: "Online",
    weather_label: "Cerah",
    b2b_margin_title: "Margin Profit Tambahan",
    b2b_margin_desc: "Efisiensi energi langsung dikonversi menjadi laba bersih.",
    b2b_input_vol: "Input Volume Produksi",
    b2b_energy_cost: "Analisa Biaya Energi",
    b2b_save: "Hemat",
    b2b_vs_last_month: "vs bulan lalu",
    b2b_battery_title: "Estimasi Daya Tahan Baterai",
    b2b_battery_status: "AMAN (Hingga 06:00 Pagi)",
    b2b_legend_no_sola: "Biaya Tanpa Sola",
    b2b_legend_with_sola: "Biaya Dengan Sola",
    b2b_smart_tip: "Tip: Tambah 1 unit Sola lagi untuk menekan biaya produksi sebesar Rp 50/unit.",
    b2b_edit_profile: "Edit Profil Bisnis",
    b2b_export: "Unduh Laporan",
    b2b_export_success: "Laporan PDF berhasil diunduh.",
    b2c_status_power: "Status Daya",
    b2c_safe_load: "Load Aman",
    b2c_dream_title: "Impian",
    b2c_target: "Target",
    b2c_collected: "Terkumpul",
    b2c_added: "ditambahkan bulan ini",
    b2c_daily: "Aktivitas Hari Ini",
    b2c_upsell: "Ingin tercapai lebih cepat? Tambah Unit Panel (+)",
    b2c_edit_goal: "Atur Impian",
    b2c_share: "Bagikan",
    b2c_share_success: "Siap dibagikan ke Instagram Story!",
    sys_health_ok: "Sistem Sehat",
    sys_health_warn: "Perlu Perawatan",
    sys_health_msg: "Efisiensi panel turun 15% (Kotor).",
    sys_btn_fix: "Jadwalkan Servis",
    chat_placeholder: "Ketik pesan...",
    chat_welcome: "Halo! Ada yang bisa Sola bantu hari ini?",
    chat_auto_maintenance: "Halo Sola, sistem mendeteksi efisiensi turun (panel kotor). Tolong jadwalkan perawatan.",
    settings_cat_general: "Umum & Preferensi",
    settings_cat_general_sub: "Bahasa, Mata Uang, Tema",
    settings_cat_energy: "Konfigurasi Energi",
    settings_cat_energy_sub: "Batas Grid, Tarif, Baterai",
    settings_cat_notif: "Peringatan & Aturan",
    settings_cat_notif_sub: "Notifikasi Granular",
    settings_cat_dev: "Developer API",
    settings_cat_dev_sub: "Kunci, Webhooks, Integrasi",
    settings_lang: "Bahasa & Wilayah",
    settings_currency: "Tampilan Mata Uang",
    settings_dark_mode: "Mode Gelap",
    settings_tariff: "Tarif Dasar (IDR/kWh)",
    settings_grid_limit: "Batas Daya Grid (VA)",
    settings_batt_threshold: "Ambang Batas Baterai",
    settings_batt_desc: "Otomatis beralih ke Grid jika baterai di bawah level ini.",
    settings_export: "Ekspor ke Grid",
    settings_export_desc: "Aktifkan Net Metering",
    settings_custom_rule: "Aturan Peringatan Kustom",
    settings_channels: "Saluran Pengiriman",
    settings_api_key: "Kunci API (Produksi)",
    settings_webhook: "URL Webhook",
    profile_role: "Pemilik Bisnis",
    profile_team: "Anggota Tim",
    profile_invite: "Undang",
    profile_business_info: "Info Bisnis",
    profile_assets: "Aset Perangkat",
    profile_warranty: "Garansi Tersisa",
    profile_maintenance: "Riwayat Perawatan",
    profile_billing: "Tagihan",
    profile_current_plan: "Paket Saat Ini",
    profile_invoices: "Faktur",
    btn_logout: "Keluar",
    info_vol_title: "Volume Produksi",
    info_vol_desc: "Masukkan jumlah produk yang Anda hasilkan hari ini untuk menghitung seberapa besar penghematan listrik per barang.",
    info_grid_title: "Sumber Grid (PLN)",
    info_grid_desc: "Listrik berbayar yang diambil dari jaringan PLN saat panel surya tidak mencukupi.",
    info_solar_title: "Sumber Solar",
    info_solar_desc: "Listrik GRATIS yang dihasilkan panel surya atap Anda.",
    info_tariff_title: "Tariff Rate (Harga Listrik)",
    info_tariff_desc: "Harga per kWh yang dibebankan oleh penyedia listrik (PLN). Sola menggunakan angka ini untuk menghitung estimasi penghematan Rupiah secara real-time.",
    info_grid_limit_title: "Grid Limit (Batas Daya)",
    info_grid_limit_desc: "Kapasitas daya maksimal MCB rumah/gedung Anda (VA). Sistem akan memberi peringatan 'Anti-Jepret' jika beban mendekati angka ini.",
    info_batt_threshold_title: "Battery Threshold",
    info_batt_threshold_desc: "Batas minimum daya baterai sebelum sistem otomatis memindahkan sumber listrik kembali ke PLN (Grid) untuk menjaga kesehatan baterai.",
    info_alert_rule_title: "Custom Alert Rule",
    info_alert_rule_desc: "Fitur canggih untuk membuat pemicu notifikasi sendiri. Contoh: 'Beri tahu saya jika Baterai < 10%' atau 'Jika Beban > 5000 Watt'.",
    info_export_title: "Export to Grid",
    info_export_desc: "Fitur Net Metering. Mengizinkan kelebihan listrik solar dikirim balik ke PLN untuk mengurangi tagihan (jika meteran mendukung).",
    info_api_title: "Developer API Key",
    info_api_desc: "Kunci akses untuk mengintegrasikan data Sola Sense ke sistem pihak ketiga (ERP, POS, atau Smart Home Hub).",
    info_webhook_title: "Webhook URL",
    info_webhook_desc: "Alamat server dimana Sola Sense akan mengirimkan notifikasi data real-time secara otomatis.",
    info_site_id_title: "Site ID (Identitas Lokasi)",
    info_site_id_desc: "Kode unik untuk lokasi pemasangan ini. Berikan kode ini kepada teknisi saat melakukan maintenance.",
    info_sla_title: "SLA Agreement",
    info_sla_desc: "Dokumen kontrak jaminan tingkat layanan. Menjelaskan garansi uptime dan respon support untuk akun Enterprise.",
    notif_title: "Notifikasi",
    notif_empty: "Tidak ada notifikasi baru.",
    device_selector: "Pilih Cabang / Device",
    device_add: "+ Tambah Device Baru",
    energy_title: "Monitor Energi",
    energy_current: "Beban Saat Ini",
    energy_grid: "Sumber: Grid",
    energy_solar: "Sumber: Solar",
    energy_today: "Total Hari Ini",
    settings_title: "Pengaturan Sistem",
  },
  en: {
    mode_business: "Profit Mode",
    mode_home: "Dream Mode",
    nav_dashboard: "Dashboard",
    nav_energy: "Energy",
    nav_settings: "Settings",
    consultation: "Sola Consultation",
    status_online: "Online",
    weather_label: "Sunny",
    b2b_margin_title: "Added Profit Margin",
    b2b_margin_desc: "Energy efficiency directly converted to net profit.",
    b2b_input_vol: "Input Production Volume",
    b2b_energy_cost: "Energy Cost Analysis",
    b2b_save: "Save",
    b2b_vs_last_month: "vs last month",
    b2b_battery_title: "Battery Runway Prediction",
    b2b_battery_status: "SAFE (Until 06:00 AM)",
    b2b_legend_no_sola: "Cost w/o Sola",
    b2b_legend_with_sola: "Cost w/ Sola",
    b2b_smart_tip: "Tip: Add 1 more Sola unit to reduce production cost by IDR 50/unit.",
    b2b_edit_profile: "Edit Business Profile",
    b2b_export: "Download Report",
    b2b_export_success: "PDF Report downloaded successfully.",
    b2c_status_power: "Power Status",
    b2c_safe_load: "Safe Load",
    b2c_dream_title: "Dream Goal",
    b2c_target: "Target",
    b2c_collected: "Collected",
    b2c_added: "added this month",
    b2c_daily: "Today's Activity",
    b2c_upsell: "Want to reach it sooner? Add Panel Unit (+)",
    b2c_edit_goal: "Set Dream Goal",
    b2c_share: "Share",
    b2c_share_success: "Ready to share to Instagram Story!",
    sys_health_ok: "System Healthy",
    sys_health_warn: "Maintenance Needed",
    sys_health_msg: "Panel efficiency dropped 15% (Dirty).",
    sys_btn_fix: "Schedule Fix",
    chat_placeholder: "Type a message...",
    chat_welcome: "Hello! How can Sola help you today?",
    chat_auto_maintenance: "Hi Sola, system detected efficiency drop (dirty panels). Please schedule maintenance.",
    settings_cat_general: "General & Preferences",
    settings_cat_general_sub: "Language, Currency, Theme",
    settings_cat_energy: "Energy Configuration",
    settings_cat_energy_sub: "Grid Limit, Tariff, Thresholds",
    settings_cat_notif: "Alerts & Rules",
    settings_cat_notif_sub: "Granular Notifications",
    settings_cat_dev: "Developer API",
    settings_cat_dev_sub: "Keys, Webhooks, Integration",
    settings_lang: "Language & Region",
    settings_currency: "Currency Display",
    settings_dark_mode: "Dark Mode",
    settings_tariff: "Tariff Rate (IDR/kWh)",
    settings_grid_limit: "Grid Limit (VA)",
    settings_batt_threshold: "Battery Threshold",
    settings_batt_desc: "Switch to Grid automatically when battery drops below this level.",
    settings_export: "Export to Grid",
    settings_export_desc: "Enable Net Metering",
    settings_custom_rule: "Custom Alert Rule",
    settings_channels: "Delivery Channels",
    settings_api_key: "API Key (Production)",
    settings_webhook: "Webhook URL",
    profile_role: "Business Owner",
    profile_team: "Team Members",
    profile_invite: "Invite",
    profile_business_info: "Business Info",
    profile_assets: "Assets",
    profile_warranty: "Warranty Left",
    profile_maintenance: "Maintenance Log",
    profile_billing: "Billing",
    profile_current_plan: "Current Plan",
    profile_invoices: "Invoices",
    btn_logout: "Logout",
    info_vol_title: "Production Volume",
    info_vol_desc: "Enter the number of products made today to calculate electricity savings per item.",
    info_grid_title: "Grid Source",
    info_grid_desc: "Paid electricity drawn from the main grid when solar is insufficient.",
    info_solar_title: "Solar Source",
    info_solar_desc: "FREE electricity generated by your rooftop solar panels.",
    info_tariff_title: "Tariff Rate",
    info_tariff_desc: "Cost per kWh charged by your utility provider. Sola uses this to calculate savings.",
    info_grid_limit_title: "Grid Limit",
    info_grid_limit_desc: "Maximum power capacity of your building (VA). System alerts you if load approaches this limit.",
    info_batt_threshold_title: "Battery Threshold",
    info_batt_threshold_desc: "Minimum battery level before system switches back to Grid power to preserve battery health.",
    info_alert_rule_title: "Custom Alert Rule",
    info_alert_rule_desc: "Create your own triggers. E.g., 'Alert me if Battery < 10%' or 'Load > 5000W'.",
    info_export_title: "Export to Grid",
    info_export_desc: "Net Metering feature. Allows excess solar energy to be sent back to the grid to reduce bills.",
    info_api_title: "Developer API Key",
    info_api_desc: "Access key to integrate Sola Sense data into third-party systems (ERP, POS, Smart Home).",
    info_webhook_title: "Webhook URL",
    info_webhook_desc: "Server address where Sola Sense will automatically push real-time data notifications.",
    info_site_id_title: "Site ID",
    info_site_id_desc: "Unique code for this installation site. Provide this to technicians during maintenance.",
    info_sla_title: "SLA Agreement",
    info_sla_desc: "Service Level Agreement contract. Explains uptime guarantees and support response times for Enterprise accounts.",
    notif_title: "Notifications",
    notif_empty: "No new notifications.",
    device_selector: "Select Branch / Device",
    device_add: "+ Add New Device",
    energy_title: "Energy Monitor",
    energy_current: "Current Load",
    energy_grid: "Source: Grid",
    energy_solar: "Source: Solar",
    energy_today: "Total Today",
    settings_title: "System Settings",
  },
  jp: {
    mode_business: "利益モード",
    mode_home: "夢モード",
    nav_dashboard: "ダッシュボード",
    nav_energy: "エネルギー",
    nav_settings: "設定",
    consultation: "Sola相談",
    status_online: "オンライン",
    weather_label: "晴れ",
    b2b_margin_title: "追加利益率",
    b2b_margin_desc: "エネルギー効率が純利益に直結します。",
    b2b_input_vol: "生産量入力",
    b2b_energy_cost: "エネルギーコスト分析",
    b2b_save: "節約",
    b2b_vs_last_month: "先月比",
    b2b_battery_title: "バッテリー予測",
    b2b_battery_status: "安全 (午前06:00まで)",
    b2b_legend_no_sola: "ソーラーなし",
    b2b_legend_with_sola: "ソーラーあり",
    b2b_smart_tip: "ヒント：Solaユニットを1つ追加して、製造コストを削減しましょう。",
    b2b_edit_profile: "ビジネスプロフィールの編集",
    b2b_export: "レポートをダウンロード",
    b2b_export_success: "PDFレポートが正常にダウンロードされました。",
    b2c_status_power: "電力状況",
    b2c_safe_load: "安全負荷",
    b2c_dream_title: "夢の目標",
    b2c_target: "目標",
    b2c_collected: "貯蓄額",
    b2c_added: "今月の追加",
    b2c_daily: "今日のアクティビティ",
    b2c_upsell: "もっと早く行きたい？ パネルを追加 (+)",
    b2c_edit_goal: "夢の目標を設定",
    b2c_share: "共有",
    b2c_share_success: "Instagramストーリーで共有する準備ができました！",
    sys_health_ok: "システム正常",
    sys_health_warn: "メンテナンスが必要",
    sys_health_msg: "効率が15%低下しました（汚れ）。",
    sys_btn_fix: "修理を予約",
    chat_placeholder: "メッセージを入力...",
    chat_welcome: "こんにちは！今日はどのようなお手伝いができますか？",
    chat_auto_maintenance: "こんにちはSola、効率の低下（パネルの汚れ）を検出しました。メンテナンスを予約してください。",
    settings_cat_general: "一般と設定",
    settings_cat_general_sub: "言語、通貨、テーマ",
    settings_cat_energy: "エネルギー構成",
    settings_cat_energy_sub: "グリッド制限、料金、バッテリー",
    settings_cat_notif: "アラートとルール",
    settings_cat_notif_sub: "詳細な通知設定",
    settings_cat_dev: "開発者API",
    settings_cat_dev_sub: "キー、Webhook、統合",
    settings_lang: "言語と地域",
    settings_currency: "通貨表示",
    settings_dark_mode: "ダークモード",
    settings_tariff: "基本料金 (IDR/kWh)",
    settings_grid_limit: "グリッド制限 (VA)",
    settings_batt_threshold: "バッテリーしきい値",
    settings_batt_desc: "バッテリーがこのレベルを下回ると自動的にグリッドに切り替わります。",
    settings_export: "グリッドへの輸出",
    settings_export_desc: "ネットメータリングを有効にする",
    settings_custom_rule: "カスタムアラートルール",
    settings_channels: "配信チャンネル",
    settings_api_key: "APIキー (本番)",
    settings_webhook: "Webhook URL",
    profile_role: "ビジネスオーナー",
    profile_team: "チームメンバー",
    profile_invite: "招待",
    profile_business_info: "ビジネス情報",
    profile_assets: "資産",
    profile_warranty: "保証期間",
    profile_maintenance: "メンテナンスログ",
    profile_billing: "請求",
    profile_current_plan: "現在のプラン",
    profile_invoices: "請求書",
    btn_logout: "ログアウト",
    info_vol_title: "生産量",
    info_vol_desc: "今日製造された製品の数を入力して、アイテムごとの電気代節約を計算します。",
    info_grid_title: "グリッド電源",
    info_grid_desc: "ソーラーが不足している場合にメイングリッドから引き出される有料の電気。",
    info_solar_title: "ソーラー電源",
    info_solar_desc: "屋上のソーラーパネルによって生成される無料の電気。",
    info_tariff_title: "料金レート",
    info_tariff_desc: "電力会社から請求されるkWhあたりのコスト。Solaはこれを使用して節約額を計算します。",
    info_grid_limit_title: "グリッド制限",
    info_grid_limit_desc: "建物の最大電力容量（VA）。負荷がこの制限に近づくとシステムが警告します。",
    info_batt_threshold_title: "バッテリーしきい値",
    info_batt_threshold_desc: "バッテリーの状態を維持するために、システムがグリッド電源に戻る前の最低バッテリーレベル。",
    info_alert_rule_title: "カスタムアラートルール",
    info_alert_rule_desc: "独自のトリガーを作成します。例：「バッテリー < 10%の場合に警告」または「負荷 > 5000W」。",
    info_export_title: "グリッドへの輸出",
    info_export_desc: "ネットメータリング機能。余剰の太陽エネルギーをグリッドに送り返して請求額を削減します。",
    info_api_title: "開発者APIキー",
    info_api_desc: "Sola Senseデータをサードパーティシステム（ERP、POS、スマートホーム）に統合するためのアクセスキー。",
    info_webhook_title: "Webhook URL",
    info_webhook_desc: "Sola Senseがリアルタイムのデータ通知を自動的にプッシュするサーバーアドレス。",
    info_site_id_title: "サイトID",
    info_site_id_desc: "この設置場所の固有コード。メンテナンス中に技術者にこれを提示してください。",
    info_sla_title: "SLA契約",
    info_sla_desc: "サービスレベルアグリーメント契約。エンタープライズアカウントの稼働時間保証とサポート対応時間について説明します。",
    notif_title: "通知",
    notif_empty: "新しい通知はありません。",
    device_selector: "支店/デバイスを選択",
    device_add: "+ 新しいデバイスを追加",
    energy_title: "エネルギーモニター",
    energy_current: "現在の負荷",
    energy_grid: "ソース: グリッド",
    energy_solar: "ソース: ソーラー",
    energy_today: "今日の合計",
    settings_title: "システム設定",
  }
};

// --- DUMMY DATA ---
const CHART_DATA = [
  { day: 'Sen', base: 100, sola: 45 },
  { day: 'Sel', base: 90, sola: 40 },
  { day: 'Rab', base: 80, sola: 35 },
  { day: 'Kam', base: 100, sola: 48 },
  { day: 'Jum', base: 95, sola: 42 },
  { day: 'Sab', base: 110, sola: 50 },
  { day: 'Min', base: 85, sola: 38 },
];

const NOTIFICATIONS = [
  { id: 1, title: 'Panel Efficiency Warning', time: '2h ago', type: 'warning' },
  { id: 2, title: 'Battery Full Charged', time: '5h ago', type: 'info' },
  { id: 3, title: 'Monthly Report Ready', time: '1d ago', type: 'success' },
];

// --- HELPER COMPONENTS ---

function NavItem({ icon, active, label, onClick, theme }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? `${theme.accentText} scale-105` : `${theme.textSec} hover:${theme.text}`}`}>
      {React.cloneElement(icon, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function ChatOverlay({ t, theme, messages, onClose, onSend }) {
    const [input, setInput] = useState('');
    return (
        <div className={`absolute inset-0 z-[100] flex flex-col transition-all duration-300 transform translate-y-0 opacity-100 ${theme.bg}`}>
            <div className={`p-4 border-b flex justify-between items-center ${theme.border} ${theme.card}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.accentBg}`}><Zap size={16} className="text-black fill-current" /></div>
                    <h3 className={`font-bold ${theme.text}`}>{t.consultation}</h3>
                </div>
                <button onClick={onClose}><X size={20} className={theme.textSec} /></button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">{messages.map((m, i) => (<div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`p-3 rounded-2xl text-xs max-w-[80%] ${m.sender === 'user' ? `${theme.accentBg} text-black rounded-tr-none` : `${theme.inputBg} ${theme.text} border ${theme.border} rounded-tl-none`}`}>{m.text}</div></div>))}</div>
            <div className={`p-4 border-t ${theme.border} flex gap-2 ${theme.bg}`}><input value={input} onChange={e => setInput(e.target.value)} className={`flex-1 ${theme.inputBg} border ${theme.inputBorder} rounded-full px-4 text-sm ${theme.inputText} focus:outline-none`} placeholder={t.chat_placeholder}/><button onClick={() => {if(input.trim()){ onSend(input); setInput(''); }}} className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.accentBg} text-black`}><Send size={16} /></button></div>
        </div>
    );
}

function InfoModal({ infoKey, t, theme, onClose }) {
    const content = {
      vol: { title: t.info_vol_title, desc: t.info_vol_desc },
      grid: { title: t.info_grid_title, desc: t.info_grid_desc },
      solar: { title: t.info_solar_title, desc: t.info_solar_desc },
      tariff: { title: t.info_tariff_title, desc: t.info_tariff_desc },
      grid_limit: { title: t.info_grid_limit_title, desc: t.info_grid_limit_desc },
      export: { title: t.info_export_title, desc: t.info_export_desc },
      api: { title: t.info_api_title, desc: t.info_api_desc },
      webhook: { title: t.info_webhook_title, desc: t.info_webhook_desc },
      batt_threshold: { title: t.info_batt_threshold_title, desc: t.info_batt_threshold_desc },
      alert_rule: { title: t.info_alert_rule_title, desc: t.info_alert_rule_desc },
      site_id: { title: t.info_site_id_title, desc: t.info_site_id_desc },
      sla: { title: t.info_sla_title, desc: t.info_sla_desc },
    }[infoKey];
  
    if (!content) return null;

    return (
      <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 transition-opacity duration-300" onClick={onClose}>
        <div className={`${theme.card} p-6 rounded-2xl shadow-2xl max-w-sm relative`} onClick={e => e.stopPropagation()}>
           <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{content?.title}</h3>
           <p className={`text-sm leading-relaxed ${theme.textSec}`}>{content?.desc}</p>
           <button onClick={onClose} className={`mt-6 w-full ${theme.accentBg} text-black py-2 rounded-lg font-medium transition-colors`}>OK</button>
        </div>
      </div>
    );
}

function NotificationsModal({ t, theme, notifications, onClose }) {
  return (
    <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity duration-300" onClick={onClose}>
      <div className={`w-full max-h-[60vh] rounded-2xl p-6 border shadow-2xl relative overflow-hidden flex flex-col ${theme.card}`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4"><h3 className={`text-lg font-bold ${theme.text}`}>{t.notif_title}</h3><button onClick={onClose}><X size={20} className={theme.textSec} /></button></div>
        <div className="flex-1 overflow-y-auto space-y-3">{notifications.length === 0 ? (<p className={`text-center py-4 ${theme.textSec}`}>{t.notif_empty}</p>) : (notifications.map(notif => (<div key={notif.id} className={`p-3 rounded-xl border flex gap-3 ${theme.card}`}><div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notif.type === 'warning' ? 'bg-yellow-500' : notif.type === 'success' ? 'bg-lime-400' : 'bg-blue-400'}`}></div><div><p className={`text-sm font-medium ${theme.text}`}>{notif.title}</p><p className={`text-xs ${theme.textSec}`}>{notif.time}</p></div></div>)))}</div>
      </div>
    </div>
  );
}

function ProfileOverlay({ t, theme, isDarkMode, onClose, openInfo }) {
  const [activeTab, setActiveTab] = useState('team'); 
  return (
    <div className={`absolute inset-0 z-[100] ${isDarkMode ? 'bg-black/90' : 'bg-zinc-900/50'} backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300`} onClick={onClose}>
      <div className={`${theme.card} w-full h-[85vh] rounded-3xl relative flex flex-col overflow-hidden shadow-2xl`} onClick={e=>e.stopPropagation()}>
        <div className={`p-6 border-b ${theme.border} flex justify-between items-start ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
           <div className="flex items-center gap-4"><div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${isDarkMode ? 'from-lime-400 to-emerald-600' : 'from-emerald-400 to-teal-500'} p-[2px]`}><div className={`w-full h-full ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} rounded-[14px] flex items-center justify-center`}><User size={32} className={theme.text}/></div></div><div><h2 className={`text-xl font-bold ${theme.text}`}>Chicco</h2><p className={`${theme.accentText} text-xs font-medium uppercase tracking-wider mb-1`}>Owner • Kopi Kenangan 7</p><span className={`text-[10px] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'} ${theme.textSec} px-2 py-0.5 rounded border ${theme.border}`}>ID: #SOLA-8821</span></div></div>
           <button onClick={onClose} className={`p-2 rounded-full border ${theme.border} ${theme.textSec} hover:${theme.text}`}><X size={20}/></button>
        </div>
        <div className={`flex border-b ${theme.border} ${isDarkMode ? 'bg-zinc-950/50' : 'bg-zinc-50'}`}>{[ {id: 'team', label: t.profile_team, icon: Users}, {id: 'asset', label: t.profile_assets, icon: Server}, {id: 'billing', label: t.profile_billing, icon: CreditCard} ].map(tab => (<button key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`flex-1 py-4 flex flex-col items-center gap-1 border-b-2 transition-colors ${activeTab===tab.id ? `border-${isDarkMode ? 'lime-400' : 'emerald-600'} ${theme.accentText} ${isDarkMode ? 'bg-lime-400/5' : 'bg-emerald-50'}` : 'border-transparent text-zinc-400 hover:text-zinc-500'}`}><tab.icon size={18} /><span className="text-[10px] font-medium uppercase tracking-wide">{tab.label}</span></button>))}</div>
        <div className={`flex-1 overflow-y-auto p-6 ${isDarkMode ? 'bg-zinc-950/30' : 'bg-zinc-50'}`}>
           {activeTab === 'team' && (<div className="space-y-6 transition-all duration-300"><div className="flex justify-between items-center"><h3 className={`font-bold text-sm ${theme.text}`}>{t.profile_team}</h3><button className={`text-[10px] flex items-center gap-1 ${theme.accentBg} text-black px-2 py-1 rounded font-bold hover:opacity-80`}><PlusCircle size={12}/> {t.profile_invite}</button></div><div className="space-y-3">{[{name: 'Chicco', role: 'Owner', email: 'owner@kopikenangan.com'}, {name: 'Budi Santoso', role: 'Manager', email: 'budi.mgr@kopikenangan.com'}, {name: 'Siti Aminah', role: 'Technician', email: 'tech.support@vendor.com'}].map((user, i) => (<div key={i} className={`flex items-center justify-between p-3 border ${theme.border} rounded-xl ${isDarkMode ? 'bg-zinc-900' : 'bg-white shadow-sm'}`}><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'} flex items-center justify-center text-xs font-bold`}>{user.name.charAt(0)}</div><div><p className={`text-xs font-bold ${theme.text}`}>{user.name}</p><p className={`text-[10px] ${theme.textSec}`}>{user.email}</p></div></div><div className="text-right"><span className={`text-[10px] px-2 py-0.5 rounded-full ${user.role==='Owner' ? `${isDarkMode ? 'bg-lime-400/20 text-lime-400' : 'bg-emerald-100 text-emerald-700'}` : `${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}`}>{user.role}</span></div></div>))}</div><div className={`pt-4 border-t ${theme.border} space-y-3`}><h3 className={`font-bold text-sm ${theme.text}`}>{t.profile_business_info}</h3><div className="grid grid-cols-2 gap-3"><div className="space-y-1"><label className={`text-[10px] ${theme.textSec}`}>NPWP</label><input className={`w-full ${theme.inputBg} border ${theme.inputBorder} rounded p-2 text-xs ${theme.inputText}`} defaultValue="82.111.222.3-444.000"/></div><div className="space-y-1"><label className={`text-[10px] ${theme.textSec} flex items-center gap-1`}>Site ID<button onClick={() => openInfo('site_id')} className="hover:text-current"><HelpCircle size={10} /></button></label><input className={`w-full ${theme.inputBg} border ${theme.inputBorder} rounded p-2 text-xs ${theme.inputText}`} defaultValue="JKT-SEL-007"/></div></div></div></div>)}
           {activeTab === 'asset' && (<div className="space-y-6 transition-all duration-300"><div className={`border ${theme.border} rounded-xl p-4 flex items-center gap-4 ${isDarkMode ? 'bg-zinc-900' : 'bg-white shadow-sm'}`}><div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}><Server className={theme.accentText} /></div><div className="flex-1"><h4 className={`text-sm font-bold ${theme.text}`}>Sola Inverter X-2000</h4><p className={`text-[10px] ${theme.textSec}`}>SN: 9982-1123-AABB</p><div className={`mt-2 w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}><div className={`w-[60%] h-full rounded-full ${theme.accentBg}`}></div></div><div className={`flex justify-between mt-1 text-[9px] ${theme.textSec}`}><span>{t.profile_warranty}: 4 Yrs</span><span>Active</span></div></div></div><div className="space-y-3"><h3 className={`text-xs font-bold uppercase tracking-wider ${theme.textSec}`}>{t.profile_maintenance}</h3><div className={`flex gap-3 items-start relative pb-4 border-l ${theme.border} ml-2 pl-4`}><div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ${theme.accentBg}`}></div><div><p className={`text-xs font-bold ${theme.text}`}>Routine Cleaning</p><p className={`text-[10px] ${theme.textSec}`}>20 Oct 2025 • by Tech Siti</p></div></div><div className={`flex gap-3 items-start relative pb-4 border-l ${theme.border} ml-2 pl-4`}><div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-zinc-300'}`}></div><div><p className={`text-xs ${theme.textSec}`}>Installation</p><p className={`text-[10px] ${theme.textSec}`}>15 Jan 2025 • by Sola Team</p></div></div></div></div>)}
           {activeTab === 'billing' && (<div className="space-y-6 transition-all duration-300"><div className={`bg-gradient-to-r ${isDarkMode ? 'from-zinc-800 to-zinc-900 border-zinc-700' : 'from-zinc-100 to-white border-zinc-200'} border rounded-xl p-4 text-center`}><p className={`text-[10px] uppercase tracking-widest mb-1 ${theme.textSec}`}>{t.profile_current_plan}</p><h2 className={`text-2xl font-bold mb-1 ${theme.text}`}>Sola Enterprise</h2><p className={`text-xs ${theme.accentText}`}>Active until Dec 2026</p></div><div className="space-y-2"><h3 className={`font-bold text-sm mb-2 ${theme.text}`}>{t.profile_invoices}</h3>{[{id: 'INV-2025-10', date: '01 Oct 2025', amount: 'IDR 450.000'}, {id: 'INV-2025-09', date: '01 Sep 2025', amount: 'IDR 450.000'}].map((inv, i) => (<div key={i} className={`flex items-center justify-between p-3 border ${theme.border} rounded-lg ${isDarkMode ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-zinc-50'} transition-colors cursor-pointer group`}><div className="flex items-center gap-3"><FileText size={16} className={`${theme.textSec} group-hover:${theme.text}`}/><div><p className={`text-xs font-medium ${theme.text}`}>{inv.id}</p><p className={`text-[10px] ${theme.textSec}`}>{inv.date}</p></div></div><div className="flex items-center gap-3"><span className={`text-xs ${theme.textSec}`}>{inv.amount}</span><Download size={14} className={theme.accentText}/></div></div>))}</div><div className={`border ${theme.border} rounded-xl p-3 flex items-center gap-3 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}><ShieldCheck className="text-emerald-500" size={20}/><div className="flex-1"><p className={`text-xs font-bold flex items-center gap-2 ${theme.text}`}>SLA Agreement.pdf<button onClick={() => openInfo('sla')} className="hover:text-current"><HelpCircle size={10} /></button></p><p className={`text-[10px] ${theme.textSec}`}>Signed on 15 Jan 2025</p></div><button className={`text-xs underline ${theme.accentText}`}>View</button></div></div>)}
        </div>
        <div className={`p-4 border-t ${theme.border} flex justify-between items-center ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
           <button className={`text-xs ${theme.textSec} hover:${theme.text} flex items-center gap-1`}><HelpCircle size={14}/> Support</button>
           <button onClick={onClose} className={`${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-black'} px-6 py-2 rounded-lg text-xs font-bold transition-colors`}>{t.btn_logout}</button>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ t, theme, isDarkMode, language, setLanguage, openInfo, currency, setCurrency, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('general');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [batteryThreshold, setBatteryThreshold] = useState(20);
  const SectionHeader = ({ id, icon, title, subtitle }) => (
    <button onClick={() => setActiveSection(activeSection === id ? null : id)} className={`w-full flex items-center justify-between p-4 border ${activeSection === id ? `rounded-t-2xl border-b-0 ${isDarkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'} ${theme.border}` : `rounded-2xl ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} ${theme.border} hover:opacity-80`} transition-all`}>
      <div className="flex items-center gap-3"><div className={`p-2 rounded-lg ${activeSection === id ? `${theme.accentBg} text-black` : `${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'} ${theme.textSec}`}`}>{React.cloneElement(icon, { size: 18 })}</div><div className="text-left"><h4 className={`text-sm font-bold ${activeSection === id ? theme.text : theme.textSec}`}>{title}</h4>{subtitle && <p className={`text-[10px] ${theme.textSec}`}>{subtitle}</p>}</div></div><ChevronUp className={`${theme.textSec} transition-transform ${activeSection === id ? '' : 'rotate-180'}`} size={16} />
    </button>
  );
  const containerClass = `${theme.card} border-t-0 rounded-b-2xl p-4 space-y-4`; 
  const itemClass = `flex items-center justify-between p-3 rounded-lg border ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`;
  return (
    <div className="space-y-4 pb-12 w-full">
      <div className="flex items-center justify-between mb-2"><h2 className={`text-2xl font-bold ${theme.text}`}>{t.settings_title}</h2><span className={`text-[10px] px-2 py-1 rounded border ${isDarkMode ? 'bg-lime-400/10 text-lime-400 border-lime-400/20' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>v2.6.2</span></div>
      <div className="space-y-0 w-full"><SectionHeader id="general" icon={<Settings />} title={t.settings_cat_general} subtitle={t.settings_cat_general_sub} />{activeSection === 'general' && (<div className={containerClass}><div className="space-y-1"><label className={`text-xs ${theme.textSec}`}>{t.settings_lang}</label><div className="flex gap-2">{['id', 'en', 'jp'].map(l => (<button key={l} onClick={()=>setLanguage(l)} className={`flex-1 py-2 text-xs rounded border ${language===l ? `${theme.accentBg} text-black font-bold border-transparent` : `${theme.inputBg} ${theme.textSec} ${theme.inputBorder}`}`}>{l.toUpperCase()}</button>))}</div></div><div className={itemClass}><span className={`text-xs ${theme.textSec}`}>{t.settings_currency}</span><select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`${theme.inputBg} ${theme.inputBorder} border rounded p-1 text-xs ${theme.accentText} focus:outline-none`}><option value="IDR">IDR (Rp)</option><option value="USD">USD ($)</option></select></div><button onClick={toggleTheme} className={`w-full ${itemClass}`}><span className={`text-xs ${theme.textSec}`}>{t.settings_dark_mode}</span><div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-lime-400' : 'bg-zinc-300'}`}><div className={`absolute top-0.5 w-3 h-3 bg-black rounded-full transition-all ${isDarkMode ? 'right-0.5' : 'left-0.5'}`}></div></div></button></div>)}</div>
      <div className="space-y-0 w-full"><SectionHeader id="energy" icon={<Zap />} title={t.settings_cat_energy} subtitle={t.settings_cat_energy_sub} />{activeSection === 'energy' && (<div className={containerClass}><div className="grid grid-cols-2 gap-3 w-full"><div className="space-y-1"><label className={`text-[10px] ${theme.textSec} flex items-center gap-1`}>{t.settings_tariff}<button onClick={() => openInfo('tariff')} className="hover:text-current"><HelpCircle size={10} /></button></label><input type="number" defaultValue="1444" className={`w-full ${theme.inputBg} ${theme.inputBorder} border rounded p-2 text-xs ${theme.inputText}`} /></div><div className="space-y-1"><label className={`text-[10px] ${theme.textSec} flex items-center gap-1`}>{t.settings_grid_limit}<button onClick={() => openInfo('grid_limit')} className="hover:text-current"><HelpCircle size={10} /></button></label><input type="number" defaultValue="6600" className={`w-full ${theme.inputBg} ${theme.inputBorder} border rounded p-2 text-xs ${theme.inputText}`} /></div></div><div className={`space-y-2 pt-2 border-t ${theme.border}`}><div className="flex justify-between text-xs"><span className={`${theme.textSec} flex items-center gap-1`}>{t.settings_batt_threshold}<button onClick={() => openInfo('batt_threshold')} className="hover:text-current"><HelpCircle size={10} /></button></span><span className={theme.accentText}>{batteryThreshold}%</span></div><input type="range" min="0" max="100" value={batteryThreshold} onChange={e=>setBatteryThreshold(e.target.value)} className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${isDarkMode ? 'bg-zinc-800 accent-lime-400' : 'bg-zinc-200 accent-emerald-600'}`} /><p className={`text-[10px] ${theme.textSec}`}>{t.settings_batt_desc}</p></div><div className={itemClass}><div><p className={`text-xs ${theme.text} flex items-center gap-1`}>{t.settings_export}<button onClick={() => openInfo('export')} className={`${theme.textSec} hover:text-current`}><HelpCircle size={10} /></button></p><p className={`text-[10px] ${theme.textSec}`}>{t.settings_export_desc}</p></div><div className={`w-8 h-4 rounded-full relative ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`}><div className={`absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full`}></div></div></div></div>)}</div>
      <div className="space-y-0 w-full"><SectionHeader id="notif" icon={<Bell />} title={t.settings_cat_notif} subtitle={t.settings_cat_notif_sub} />{activeSection === 'notif' && (<div className={containerClass}><div className={`p-3 rounded-lg border space-y-2 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}><label className={`text-xs ${theme.textSec} flex items-center gap-1`}>{t.settings_custom_rule}<button onClick={() => openInfo('alert_rule')} className="hover:text-current"><HelpCircle size={10} /></button></label><div className="flex gap-2"><select className={`${theme.inputBg} text-xs ${theme.inputText} p-2 rounded border ${theme.inputBorder}`}><option>Battery Level</option><option>Grid Load</option></select><select className={`${theme.inputBg} text-xs ${theme.inputText} p-2 rounded border ${theme.inputBorder}`}><option>&lt;</option><option>&gt;</option></select><input className={`w-12 ${theme.inputBg} text-xs ${theme.inputText} p-2 rounded border ${theme.inputBorder}`} defaultValue="10" /><button className={`${theme.accentBg} text-black text-xs px-3 rounded font-bold`}>Add</button></div></div><div className="space-y-2"><p className={`text-xs ${theme.textSec}`}>{t.settings_channels}</p>{['Push Notifications', 'Email Digest', 'WhatsApp (Premium)'].map(c => (<label key={c} className={`flex items-center gap-2 p-2 rounded cursor-pointer ${isDarkMode ? 'hover:bg-zinc-950' : 'hover:bg-zinc-100'}`}><div className={`w-4 h-4 rounded border flex items-center justify-center ${theme.accentBg} border-transparent`}><Check size={10} className="text-black"/></div><span className={`text-xs ${theme.textSec}`}>{c}</span></label>))}</div></div>)}</div>
      <div className="space-y-0 w-full"><SectionHeader id="dev" icon={<Code />} title={t.settings_cat_dev} subtitle={t.settings_cat_dev_sub} />{activeSection === 'dev' && (<div className={containerClass}><div className="space-y-1"><label className={`text-[10px] ${theme.textSec} flex items-center gap-1`}>{t.settings_api_key}<button onClick={() => openInfo('api')} className="hover:text-current"><HelpCircle size={10} /></button></label><div className="flex gap-2"><div className={`flex-1 ${theme.inputBg} border ${theme.inputBorder} rounded p-2 flex items-center justify-between`}><code className={`text-[10px] ${theme.accentText} font-mono`}>{apiKeyVisible ? 'sk_live_51Mz...9sT' : '•••••••••••••••••••••'}</code><button onClick={()=>setApiKeyVisible(!apiKeyVisible)} className={`${theme.textSec} hover:${theme.text}`}>{apiKeyVisible ? <EyeOff size={12}/> : <Eye size={12}/>}</button></div><button className={`${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'} px-3 rounded border ${theme.inputBorder}`}><Copy size={14} className={theme.textSec}/></button></div></div><div className="space-y-1"><label className={`text-[10px] ${theme.textSec} flex items-center gap-1`}>{t.settings_webhook}<button onClick={() => openInfo('webhook')} className="hover:text-current"><HelpCircle size={10} /></button></label><input defaultValue="https://api.pos-system.com/sola-hook" className={`w-full ${theme.inputBg} border ${theme.inputBorder} rounded p-2 text-xs ${theme.textSec} font-mono`} /></div></div>)}</div>
    </div>
  );
}

function BusinessView({ t, theme, isDarkMode, productionVol, setProductionVol, openInfo, onExport }) {
  const energyCostPerUnit = 1500;
  const solaSavingsPercent = 0.35; 
  const totalCost = productionVol * energyCostPerUnit;
  const savedAmount = totalCost * solaSavingsPercent;
  const profitMarginBoost = ((savedAmount / (totalCost - savedAmount)) * 100).toFixed(1);
  return (
    <div className="space-y-4">
      <div className={`rounded-2xl p-6 border relative overflow-hidden group ${theme.card}`}>
        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-10 -mt-10 ${isDarkMode ? 'bg-lime-400/10' : 'bg-emerald-400/20'}`}></div>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`text-sm font-medium ${theme.textSec}`}>{t.b2b_margin_title}</h3>
          <button onClick={onExport} className={`${theme.accentText} hover:opacity-80 transition-colors`} title={t.b2b_export}><Download size={18} /></button>
        </div>
        <div className="flex items-baseline gap-2"><span className={`text-5xl font-bold tracking-tight ${theme.text}`}>+{profitMarginBoost}%</span><span className={`text-sm ${theme.textSec}`}>{t.b2b_vs_last_month}</span></div>
        <div className={`mt-4 pt-4 border-t flex items-start gap-2 ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-200'}`}><Zap size={14} className="text-yellow-400 mt-0.5 shrink-0" /><p className={`text-xs italic ${theme.textSec}`}>{t.b2b_smart_tip}</p></div>
      </div>
      <div className={`rounded-2xl p-4 border flex items-center gap-4 shadow-sm ${theme.card}`}>
         <div className="bg-emerald-500/20 p-2.5 rounded-full shrink-0"><Battery size={24} className="text-emerald-500" /></div>
         <div className="flex-1"><p className={`text-xs mb-0.5 ${theme.textSec}`}>{t.b2b_battery_title}</p><p className="text-emerald-500 font-bold text-sm tracking-wide">{t.b2b_battery_status}</p></div>
         <div className={`w-16 h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}><div className="w-[85%] h-full bg-emerald-500 rounded-full"></div></div>
      </div>
      <div className={`rounded-2xl p-6 border ${theme.card}`}>
        <label className={`text-sm mb-4 block font-medium flex justify-between items-center ${theme.textSec}`}><div className="flex items-center gap-2"><span>{t.b2b_input_vol}</span><button onClick={() => openInfo('vol')} className="hover:text-current"><HelpCircle size={14} /></button></div><span className={theme.accentText}>{productionVol.toLocaleString()} Unit</span></label>
        <input type="range" min="1000" max="10000" step="100" value={productionVol} onChange={(e) => setProductionVol(parseInt(e.target.value))} className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isDarkMode ? 'bg-zinc-700 accent-lime-400' : 'bg-zinc-200 accent-emerald-600'}`} />
      </div>
      <div className={`rounded-2xl p-6 border ${theme.card}`}>
        <div className="flex justify-between items-start mb-6"><h3 className={`text-sm font-medium ${theme.textSec}`}>{t.b2b_energy_cost}</h3><div className="flex flex-col gap-1"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div><span className={`text-[10px] ${theme.textSec}`}>{t.b2b_legend_no_sola}</span></div><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-lime-400' : 'bg-emerald-500'}`}></div><span className={`text-[10px] font-medium ${theme.textSec}`}>{t.b2b_legend_with_sola}</span></div></div></div>
        <div className={`flex items-end justify-between h-40 w-full px-2 gap-2 border-b pb-2 ${theme.border}`}>
            {CHART_DATA.map((data, i) => (<div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group relative"><div className="w-full flex items-end gap-[4px] h-full justify-center"><div style={{ height: `${data.base * 0.7}%` }} className={`w-3 rounded-t-full opacity-60 ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div><div style={{ height: `${data.sola * 0.8}%` }} className={`w-3 rounded-t-full shadow-[0_0_10px_rgba(163,230,53,0.3)] ${isDarkMode ? 'bg-gradient-to-t from-lime-500 to-lime-300' : 'bg-gradient-to-t from-emerald-500 to-emerald-300'}`}></div></div><span className={`text-[10px] text-center font-medium mt-2 ${theme.textSec}`}>{data.day}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function HomeView({ t, theme, isDarkMode, dreamGoal, onEditGoal, onShare }) {
  const progress = Math.min((dreamGoal.current / dreamGoal.target) * 100, 100);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl border relative overflow-hidden ${theme.card}`}><div className="flex flex-col h-full justify-between"><div className="flex justify-between items-start"><AlertTriangle size={24} className={theme.accentText} /><div className="w-2 h-2 rounded-full bg-lime-500 animate-ping"></div></div><div><h4 className={`text-xs font-medium ${theme.textSec}`}>{t.b2c_status_power}</h4><p className={`font-bold text-lg ${theme.text}`}>Anti-Jepret</p><p className={`text-xs mt-1 ${theme.accentText}`}>{t.b2c_safe_load} (65%)</p></div></div></div>
        <div className={`bg-gradient-to-br p-4 rounded-2xl border ${isDarkMode ? 'from-zinc-800 to-zinc-900 border-zinc-700/50' : 'from-sky-50 to-white border-zinc-200'}`}><div className="flex flex-col h-full justify-between"><Wind size={24} className="text-sky-400" /><div><h4 className={`text-xs font-medium ${theme.textSec}`}>AC Master Bedroom</h4><p className={`font-bold text-lg ${theme.text}`}>Guilt-Free</p><p className="text-sky-400 text-xs mt-1">Powered by Solar</p></div></div></div>
      </div>
      <div className={`rounded-2xl p-6 border relative overflow-hidden ${theme.card}`}>
        <Plane size={120} className={`absolute -right-6 -bottom-6 rotate-[-10deg] ${isDarkMode ? 'text-zinc-800/50' : 'text-zinc-100'}`} />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4"><div><div className="flex items-center gap-2"><h3 className={`font-bold text-lg ${theme.text}`}>{t.b2c_dream_title}</h3><button onClick={onEditGoal} className={`${theme.textSec} hover:${theme.text} transition-colors`}><Edit3 size={14} /></button></div><p className={`text-xs ${theme.textSec}`}>{t.b2c_target}: {dreamGoal.name}</p></div><button onClick={onShare} className={`p-2 rounded-lg ${theme.accentText} hover:opacity-80 transition-colors ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}><Share2 size={16} /></button></div>
          <div className="flex justify-between items-end mb-2"><span className={`font-bold text-2xl ${theme.accentText}`}>{(dreamGoal.current / 1000000).toFixed(1)}M IDR</span><span className={`text-xs mb-1 ${theme.textSec}`}>/ {(dreamGoal.target / 1000000).toFixed(0)}M</span></div>
          <div className={`relative h-6 w-full rounded-full mt-2 overflow-hidden border ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
             <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-black/10 z-20"></div><div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-black/10 z-20"></div><div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-black/10 z-20"></div>
             <div className={`h-full rounded-full shadow-[0_0_15px_rgba(163,230,53,0.6)] relative transition-all duration-1000 flex items-center justify-end pr-2 ${isDarkMode ? 'bg-gradient-to-r from-lime-500 to-lime-300' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`} style={{ width: `${progress}%` }}><div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-shimmer"></div><span className="text-[9px] font-bold text-black relative z-10">{progress.toFixed(0)}%</span></div>
          </div>
          <button className={`mt-4 text-xs ${theme.accentText} hover:opacity-80 flex items-center gap-1.5 font-medium transition-colors px-2 py-1 -ml-2 rounded-lg ${isDarkMode ? 'hover:bg-lime-400/5' : 'hover:bg-emerald-50'}`}><PlusCircle size={14} />{t.b2c_upsell}</button>
        </div>
      </div>
    </div>
  );
}

function EnergyView({ t, theme, isDarkMode, openInfo }) {
  const [currentLoad, setCurrentLoad] = useState(2450);
  useEffect(() => { const interval = setInterval(() => setCurrentLoad(prev => 2450 + (Math.floor(Math.random() * 100) - 50)), 1500); return () => clearInterval(interval); }, []);
  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold mb-2 ${theme.text}`}>{t.energy_title}</h2>
      <div className="flex justify-center py-6"><div className={`w-64 h-64 rounded-full border-4 flex items-center justify-center relative ${isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}><div className="absolute inset-0 rounded-full border-4 border-lime-400/30 border-t-lime-400 animate-spin-slow"></div><div className="text-center"><p className={`text-xs font-mono mb-1 ${theme.textSec}`}>{t.energy_current}</p><h3 className={`text-4xl font-bold tabular-nums ${theme.text}`}>{currentLoad}</h3><p className={`text-sm font-medium ${theme.accentText}`}>Watts</p></div><div className={`absolute -bottom-2 px-4 py-1 rounded-full border text-xs flex gap-2 ${theme.textSec} ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}><span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span> Live</div></div></div>
      <div className="grid grid-cols-2 gap-4"><div className={`p-4 rounded-2xl border relative ${theme.card}`}><button onClick={() => openInfo('grid')} className={`absolute top-2 right-2 hover:${theme.text} ${theme.textSec}`}><HelpCircle size={12} /></button><div className="flex items-center gap-2 mb-2"><Zap size={16} className="text-yellow-400" /><span className={`text-xs ${theme.textSec}`}>{t.energy_grid}</span></div><p className={`text-xl font-bold ${theme.text}`}>45%</p><div className={`w-full h-1 mt-2 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}><div className="bg-yellow-400 h-1 rounded-full w-[45%]"></div></div></div><div className={`p-4 rounded-2xl border relative ${theme.card}`}><button onClick={() => openInfo('solar')} className={`absolute top-2 right-2 hover:${theme.text} ${theme.textSec}`}><HelpCircle size={12} /></button><div className="flex items-center gap-2 mb-2"><Sun size={16} className={theme.accentText} /><span className={`text-xs ${theme.textSec}`}>{t.energy_solar}</span></div><p className={`text-xl font-bold ${theme.text}`}>55%</p><div className={`w-full h-1 mt-2 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}><div className={`h-1 rounded-full w-[55%] ${theme.accentBg}`}></div></div></div></div>
      <div className={`rounded-2xl p-6 border ${theme.card}`}><div className="flex justify-between items-center mb-6"><div><h4 className={`text-sm font-medium ${theme.textSec}`}>{t.energy_today}</h4><p className={`text-[10px] ${theme.textSec}`}>24 Hours Monitoring</p></div><div className="text-right"><span className={`font-bold text-lg block ${theme.accentText}`}>18.5 kWh</span><span className={`text-[10px] ${theme.textSec}`}>Total</span></div></div><div className="flex items-end gap-2 h-32 w-full">{[20, 35, 45, 30, 60, 55, 40, 75, 50, 30, 45, 70].map((h, i) => (<div key={i} className="flex-1 group relative h-full flex items-end"><div className={`w-full rounded-t-sm transition-all duration-300 ${isDarkMode ? 'bg-zinc-800 group-hover:bg-lime-400' : 'bg-zinc-200 group-hover:bg-emerald-500'}`} style={{ height: `${h}%` }}></div></div>))}</div></div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
const App = () => {
  const [mode, setMode] = useState('business'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('id');
  const [showProfile, setShowProfile] = useState(false);
  const [productionVol, setProductionVol] = useState(5000);
  const [systemHealth, setSystemHealth] = useState('ok'); 
  
  // -- INTERACTION STATES --
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [activeInfo, setActiveInfo] = useState(null); 
  const [toastMessage, setToastMessage] = useState(null);
  
  // -- SCALABILITY STATES --
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState("Kopi Kenangan Cabang 7");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // -- SETTINGS STATES --
  const [currency, setCurrency] = useState('IDR');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // ... (Rest of logic remains identical, structure is preserved)
  // ... Theme definition ...
  const theme = {
    bg: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50',
    text: isDarkMode ? 'text-zinc-100' : 'text-zinc-900',
    textSec: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
    card: isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm',
    border: isDarkMode ? 'border-zinc-800' : 'border-zinc-200',
    accentText: isDarkMode ? 'text-lime-400' : 'text-emerald-600',
    accentBg: isDarkMode ? 'bg-lime-400' : 'bg-emerald-500',
    inputBg: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-100',
    inputText: isDarkMode ? 'text-zinc-100' : 'text-zinc-900',
    inputBorder: isDarkMode ? 'border-zinc-800' : 'border-zinc-300',
    iconMuted: isDarkMode ? 'text-zinc-500' : 'text-zinc-400',
  };

  const [businessProfile, setBusinessProfile] = useState({
    name: "Kopi Kenangan Cabang 7",
    type: "F&B Retail"
  });
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);

  const [dreamGoal, setDreamGoal] = useState({
    name: "Bali Trip 2026",
    target: 25000000,
    current: 12500000
  });
  const [isEditingDream, setIsEditingDream] = useState(false);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    setChatMessages([{ sender: 'bot', text: t.chat_welcome }]);
  }, [language]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg) => setToastMessage(msg);

  const handleFixMaintenance = () => {
    setIsChatOpen(true);
    setChatMessages(prev => [
      ...prev, 
      { sender: 'user', text: t.chat_auto_maintenance },
      { sender: 'bot', text: "Ok, I've received your request. Checking technician availability..."}
    ]);
  };

  const handleDeviceChange = (deviceName) => {
    setCurrentDevice(deviceName);
    setBusinessProfile(prev => ({ ...prev, name: deviceName }));
    setIsDeviceMenuOpen(false);
    showToast(`Switched to ${deviceName}`);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    showToast(isDarkMode ? "Light Mode Activated" : "Dark Mode Activated");
  };

  return (
    <div className={`h-[100dvh] w-full ${theme.bg} ${theme.text} font-sans selection:bg-lime-400 selection:text-black flex justify-center overflow-hidden transition-colors duration-500`}>
      <div className={`w-full max-w-md ${theme.bg} h-full relative flex flex-col shadow-2xl shadow-lime-900/20 border-x ${theme.border} transition-colors duration-500`}>
        {/* Header & Status Bar */}
        <header className="px-4 pt-4 pb-2 relative z-10 shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${theme.accentBg} rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.5)]`}>
                  <Zap size={20} className="text-black fill-current" />
                </div>
                <h1 className="text-xl font-bold tracking-wider">SOLA<span className={`${theme.accentText} font-light`}>SENSE</span></h1>
              </div>
              <div className="flex items-center gap-3 ml-1 mt-1">
                 <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-zinc-100 border-zinc-200'}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className={`text-[10px] font-medium ${theme.textSec}`}>{t.status_online}</span>
                 </div>
                 <div className={`flex items-center gap-1.5 ${theme.textSec}`}>
                    <CloudSun size={12} className="text-yellow-400" />
                    <span className="text-[10px]">32°C</span>
                 </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setSystemHealth(prev => prev === 'ok' ? 'warning' : 'ok')} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${systemHealth === 'ok' ? (isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200') : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                 {systemHealth === 'ok' ? (<CheckCircle size={16} className="text-emerald-500" />) : (<Wrench size={16} className="text-yellow-500 animate-pulse" />)}
              </button>
              <button onClick={() => setIsNotifOpen(true)} className={`w-8 h-8 rounded-full border flex items-center justify-center hover:${theme.accentText} transition-colors relative ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
                <Bell size={16} className={`${theme.textSec} hover:${theme.accentText} transition-colors`} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-zinc-900"></span>
              </button>
              <button onClick={() => setShowProfile(true)} className={`w-8 h-8 rounded-full border flex items-center justify-center hover:${theme.accentText} transition-colors ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
                <User size={16} className={`${theme.textSec} hover:${theme.accentText} transition-colors`} />
              </button>
            </div>
          </div>
          
          {systemHealth === 'warning' && (
             <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center justify-between animate-fade-in-down">
                <div className="flex items-start gap-3"><AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" /><div><p className="text-xs font-bold text-yellow-500">{t.sys_health_warn}</p><p className={`text-[10px] ${theme.textSec}`}>{t.sys_health_msg}</p></div></div>
                <button onClick={handleFixMaintenance} className="bg-yellow-500 text-black text-[10px] font-bold px-3 py-1.5 rounded-md hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">{t.sys_btn_fix}</button>
             </div>
          )}

          {activeTab === 'dashboard' && (
            <div className={`p-1 rounded-xl flex relative border animate-fade-in-down ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
              <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] ${theme.accentBg} rounded-lg transition-all duration-300 ease-out shadow-[0_0_10px_rgba(163,230,53,0.3)] ${mode === 'home' ? 'translate-x-[100%] ml-1' : 'translate-x-0'}`}></div>
              <button onClick={() => setMode('business')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg z-10 transition-colors ${mode === 'business' ? 'text-black font-bold' : `${theme.textSec} hover:${theme.text}`}`}><Briefcase size={18} /><span className="text-sm">{t.mode_business}</span></button>
              <button onClick={() => setMode('home')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg z-10 transition-colors ${mode === 'home' ? 'text-black font-bold' : `${theme.textSec} hover:${theme.text}`}`}><Home size={18} /><span className="text-sm">{t.mode_home}</span></button>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 pt-2 pb-24 scrollbar-hide w-full">
          {activeTab === 'dashboard' && mode === 'business' && (
            <div className="mb-4 animate-fade-in relative z-20">
              <button onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)} className="flex items-center gap-2 group"><span className={`text-sm font-bold group-hover:${theme.accentText} transition-colors ${theme.text}`}>{currentDevice}</span><ChevronDown size={14} className={`${theme.textSec} transition-transform ${isDeviceMenuOpen ? 'rotate-180' : ''}`} /></button>
              {isDeviceMenuOpen && (<div className={`absolute top-8 left-0 w-56 border rounded-xl shadow-xl overflow-hidden animate-fade-in-down ${theme.card}`}><div className="p-1">{["Kopi Kenangan Cabang 7", "Cabang 8 (Surabaya)", "Cabang 9 (Bandung)"].map((dev, idx) => (<button key={idx} onClick={() => handleDeviceChange(dev)} className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between ${currentDevice === dev ? `${isDarkMode ? 'bg-lime-400/10 text-lime-400' : 'bg-emerald-50 text-emerald-600'}` : `${theme.textSec} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'} hover:${theme.text}`}`}>{dev}{currentDevice === dev && <Check size={12} />}</button>))}<div className={`h-[1px] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} my-1`}></div><button className={`w-full text-left px-3 py-2 text-xs ${theme.accentText} hover:${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'} rounded-lg font-medium`}>{t.device_add}</button></div></div>)}
            </div>
          )}

          {activeTab === 'dashboard' && mode === 'business' && <BusinessView t={t} theme={theme} isDarkMode={isDarkMode} productionVol={productionVol} setProductionVol={setProductionVol} openInfo={(key) => setActiveInfo(key)} onExport={() => showToast(t.b2b_export_success)} />}
          {activeTab === 'dashboard' && mode === 'home' && <HomeView t={t} theme={theme} isDarkMode={isDarkMode} dreamGoal={dreamGoal} onEditGoal={() => setIsEditingDream(true)} onShare={() => showToast(t.b2c_share_success)} />}
          {activeTab === 'energy' && <EnergyView t={t} theme={theme} isDarkMode={isDarkMode} openInfo={(key) => setActiveInfo(key)} />}
          {activeTab === 'settings' && <SettingsView t={t} theme={theme} isDarkMode={isDarkMode} language={language} setLanguage={setLanguage} openInfo={(key) => setActiveInfo(key)} currency={currency} setCurrency={setCurrency} toggleTheme={toggleTheme} />}
        </main>

        <button onClick={() => setIsChatOpen(true)} className={`absolute bottom-28 right-6 w-14 h-14 ${theme.accentBg} rounded-full shadow-[0_4px_20px_rgba(163,230,53,0.4)] flex items-center justify-center text-black z-[60] hover:scale-110 active:scale-90 transition-transform cursor-pointer`}>
           <MessageCircle size={28} /><div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
        </button>

        <div className={`absolute bottom-0 w-full backdrop-blur-md border-t py-4 px-6 flex justify-between items-center z-30 shrink-0 ${isDarkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
          <NavItem icon={<TrendingUp />} active={activeTab === 'dashboard'} label={t.nav_dashboard} onClick={() => setActiveTab('dashboard')} theme={theme} />
          <NavItem icon={<BatteryCharging />} active={activeTab === 'energy'} label={t.nav_energy} onClick={() => setActiveTab('energy')} theme={theme} />
          <NavItem icon={<Settings />} active={activeTab === 'settings'} label={t.nav_settings} onClick={() => setActiveTab('settings')} theme={theme} />
        </div>

        {toastMessage && (<div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-full shadow-lg border border-zinc-700 flex items-center gap-2 animate-slide-up z-50 whitespace-nowrap"><CheckCircle size={16} className="text-lime-400" /><span className="text-xs font-medium">{toastMessage}</span></div>)}
        {isChatOpen && <ChatOverlay t={t} theme={theme} messages={chatMessages} onClose={() => setIsChatOpen(false)} onSend={(text) => setChatMessages([...chatMessages, {sender: 'user', text}])} />}
        {activeInfo && <InfoModal infoKey={activeInfo} t={t} theme={theme} onClose={() => setActiveInfo(null)} />}
        {isNotifOpen && <NotificationsModal t={t} theme={theme} notifications={NOTIFICATIONS} onClose={() => setIsNotifOpen(false)} />}
        {showProfile && <ProfileOverlay t={t} theme={theme} isDarkMode={isDarkMode} onClose={() => setShowProfile(false)} openInfo={(key) => setActiveInfo(key)} />}
        
        {isEditingBusiness && <div className="absolute inset-0 bg-black/80 z-50 p-6 flex items-center"><div className={`w-full p-6 rounded-2xl border ${theme.card}`}><h3 className={`font-bold mb-4 ${theme.text}`}>Edit Profile</h3><button onClick={() => setIsEditingBusiness(false)} className={`${theme.accentBg} w-full py-2 rounded font-bold text-black`}>Close</button></div></div>}
        {isEditingDream && <div className="absolute inset-0 bg-black/80 z-50 p-6 flex items-center"><div className={`w-full p-6 rounded-2xl border ${theme.card}`}><h3 className={`font-bold mb-4 ${theme.text}`}>Edit Goal</h3><button onClick={() => setIsEditingDream(false)} className={`${theme.accentBg} w-full py-2 rounded font-bold text-black`}>Close</button></div></div>}
      </div>
    </div>
  );
};

export default App;
