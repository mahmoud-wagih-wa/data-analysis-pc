
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { cairo: ['Cairo', 'sans-serif'] },
                }
            }
        }
    </script>
    <style>
        :root {
            --bg: #0a0f1a;
            --card: #131d2e;
            --card-hover: #1a2740;
            --border: #1e3050;
            --accent: #f59e0b;
            --accent2: #06b6d4;
            --success: #10b981;
            --danger: #f43f5e;
            --text: #e8edf5;
            --muted: #7a8ba8;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Cairo', sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            overflow-x: hidden;
        }
        .bg-grid {
            position: fixed; inset: 0; z-index: 0;
            background-image:
                radial-gradient(ellipse 80% 60% at 20% 10%, rgba(245,158,11,0.06) 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 60%),
                linear-gradient(rgba(30,48,80,0.25) 1px, transparent 1px),
                linear-gradient(90deg, rgba(30,48,80,0.25) 1px, transparent 1px);
            background-size: 100% 100%, 100% 100%, 60px 60px, 60px 60px;
            animation: gridPulse 8s ease-in-out infinite alternate;
        }
        @keyframes gridPulse { 0%{opacity:.6} 100%{opacity:1} }

        .glass-card {
            background: linear-gradient(135deg, rgba(19,29,46,0.95), rgba(15,23,38,0.9));
            border: 1px solid var(--border);
            border-radius: 16px;
            backdrop-filter: blur(12px);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border-color: rgba(245,158,11,0.2);
            box-shadow: 0 0 30px rgba(245,158,11,0.04);
            transform: translateY(-1px);
        }
        .kpi-card { position: relative; overflow: hidden; }
        .kpi-card::before {
            content: ''; position: absolute; top: 0; right: 0;
            width: 100%; height: 3px; border-radius: 16px 16px 0 0;
        }
        .kpi-card.amber::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
        .kpi-card.cyan::before { background: linear-gradient(90deg, #06b6d4, #22d3ee); }
        .kpi-card.emerald::before { background: linear-gradient(90deg, #10b981, #34d399); }
        .kpi-card.rose::before { background: linear-gradient(90deg, #f43f5e, #fb7185); }
        .kpi-card.purple::before { background: linear-gradient(90deg, #a855f7, #c084fc); }
        .kpi-icon {
            width: 48px; height: 48px; border-radius: 12px;
            display: flex; align-items: center; justify-content: center; font-size: 20px;
        }
        .kpi-value { font-size: 2rem; font-weight: 900; line-height: 1.1; }
        .animate-in {
            opacity: 0; transform: translateY(20px);
            animation: slideIn 0.6s ease forwards;
        }
        @keyframes slideIn { to { opacity: 1; transform: translateY(0); } }
        .delay-1{animation-delay:.1s}.delay-2{animation-delay:.2s}.delay-3{animation-delay:.3s}
        .delay-4{animation-delay:.4s}.delay-5{animation-delay:.5s}.delay-6{animation-delay:.6s}
        .delay-7{animation-delay:.7s}.delay-8{animation-delay:.8s}

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

        .pulse-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: var(--success); position: relative;
        }
        .pulse-dot::after {
            content: ''; position: absolute; inset: -4px; border-radius: 50%;
            background: rgba(16,185,129,0.3); animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.5);opacity:0} }

        .insight-item {
            padding: 14px 18px; border-radius: 12px; border-right: 3px solid;
            background: rgba(19,29,46,0.6); transition: background 0.3s;
        }
        .insight-item:hover { background: rgba(26,39,64,0.8); }
        .insight-critical { border-color: #f43f5e; }
        .insight-warning { border-color: #f59e0b; }
        .insight-info { border-color: #06b6d4; }
        .insight-success { border-color: #10b981; }

        .tab-btn {
            padding: 8px 20px; border-radius: 8px; font-size: 0.85rem;
            font-weight: 600; cursor: pointer; transition: all 0.3s;
            border: 1px solid transparent; background: transparent; color: var(--muted);
        }
        .tab-btn:hover { color: var(--text); background: rgba(255,255,255,0.05); }
        .tab-btn.active {
            background: rgba(245,158,11,0.15); color: #fbbf24;
            border-color: rgba(245,158,11,0.3);
        }

        .chart-container { position: relative; }
        canvas { max-width: 100%; }

        .floating-particle {
            position: fixed; border-radius: 50%; pointer-events: none;
            z-index: 0; animation: floatUp linear infinite;
        }
        @keyframes floatUp {
            0%{transform:translateY(100vh) scale(0);opacity:0}
            10%{opacity:1} 90%{opacity:1}
            100%{transform:translateY(-10vh) scale(1);opacity:0}
        }

        /* منطقة رفع الملف */
        .upload-zone {
            border: 2px dashed var(--border);
            border-radius: 16px;
            padding: 32px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(19,29,46,0.5);
        }
        .upload-zone:hover, .upload-zone.drag-over {
            border-color: var(--accent);
            background: rgba(245,158,11,0.05);
            box-shadow: 0 0 40px rgba(245,158,11,0.08);
        }
        .upload-zone.drag-over {
            transform: scale(1.01);
        }
        .upload-zone.has-file {
            border-color: var(--success);
            background: rgba(16,185,129,0.05);
        }

        /* توست الإشعار */
        .toast {
            position: fixed; top: 24px; left: 50%; transform: translateX(-50%) translateY(-100px);
            z-index: 9999; padding: 14px 28px; border-radius: 12px;
            font-size: 0.9rem; font-weight: 600;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex; align-items: center; gap: 10px;
        }
        .toast.show { transform: translateX(-50%) translateY(0); }
        .toast.success { background: linear-gradient(135deg, #065f46, #064e3b); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.3); }
        .toast.error { background: linear-gradient(135deg, #7f1d1d, #691a1a); color: #fca5a5; border: 1px solid rgba(244,63,94,0.3); }
        .toast.info { background: linear-gradient(135deg, #164e63, #155e75); color: #67e8f9; border: 1px solid rgba(6,182,212,0.3); }

        /* مؤشر التحميل */
        .loading-overlay {
            position: fixed; inset: 0; z-index: 9998;
            background: rgba(10,15,26,0.85); backdrop-filter: blur(8px);
            display: none; align-items: center; justify-content: center;
            flex-direction: column; gap: 16px;
        }
        .loading-overlay.active { display: flex; }
        .spinner {
            width: 48px; height: 48px; border-radius: 50%;
            border: 3px solid var(--border); border-top-color: var(--accent);
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* معلومات الملف */
        .file-info-bar {
            display: none; padding: 10px 18px; border-radius: 12px;
            background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
            font-size: 0.8rem; color: #6ee7b7;
        }
        .file-info-bar.show { display: flex; }

        @media (prefers-reduced-motion: reduce) {
            .animate-in { animation: none; opacity: 1; transform: none; }
            .pulse-dot::after { animation: none; }
            .floating-particle { animation: none; display: none; }
            .bg-grid { animation: none; }
            .toast { transition: none; }
        }
    </style>
</head>
<body>
    <div class="bg-grid" aria-hidden="true"></div>
    <div id="particles" aria-hidden="true"></div>

    <!-- توست -->
    <div id="toast" class="toast" role="alert" aria-live="polite"></div>

    <!-- مؤشر التحميل -->
    <div id="loadingOverlay" class="loading-overlay" aria-label="جاري التحميل">
        <div class="spinner"></div>
        <p class="text-sm text-[var(--muted)]">جاري قراءة الملف وتحديث البيانات...</p>
    </div>

    <div class="relative z-10 min-h-screen p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">

        <!-- الهيدر -->
        <header class="animate-in flex flex-wrap items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white text-xl">
                    <i class="fas fa-industry"></i>
                </div>
                <div>
                    <h1 class="text-2xl md:text-3xl font-black tracking-tight">مصنع الواحة</h1>
                    <p class="text-sm text-[var(--muted)]">لوحة تحكم طاقة آلات التلبيد — تحديث تلقائي</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <div class="pulse-dot" id="statusDot"></div>
                    <span id="statusText">بيانات افتراضية</span>
                </div>
            </div>
        </header>

        <!-- منطقة رفع الملف -->
        <section class="animate-in delay-1 mb-6" aria-label="رفع ملف الإنتاج">
            <div class="upload-zone" id="uploadZone" role="button" tabindex="0"
                 aria-label="اضغط أو اسحب ملف الإكسيل هنا لتحديث البيانات">
                <input type="file" id="fileInput" accept=".xlsx,.xls,.csv" class="hidden"
                       aria-label="اختيار ملف إكسيل">
                <div id="uploadContent">
                    <div class="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl mx-auto mb-4">
                        <i class="fas fa-cloud-arrow-up"></i>
                    </div>
                    <p class="text-base font-bold mb-1">ارفع ملف الإكسيل هنا لتحديث الداشبورد</p>
                    <p class="text-xs text-[var(--muted)] mb-4">اسحب الملف وأفلته أو اضغط للاختيار — يدعم xlsx, xls, csv</p>
                    <div class="flex flex-wrap justify-center gap-3">
                        <button class="px-5 py-2.5 rounded-xl bg-amber-500/15 text-amber-400 text-sm font-bold
                                       hover:bg-amber-500/25 transition-all border border-amber-500/20"
                                onclick="document.getElementById('fileInput').click()">
                            <i class="fas fa-folder-open ml-2"></i>اختيار ملف
                        </button>
                        <button class="px-5 py-2.5 rounded-xl bg-white/5 text-[var(--muted)] text-sm font-bold
                                       hover:bg-white/10 transition-all border border-white/10"
                                onclick="loadSampleData()">
                            <i class="fas fa-database ml-2"></i>تحميل بيانات تجريبية
                        </button>
                    </div>
                </div>
            </div>
            <!-- شريط معلومات الملف -->
            <div class="file-info-bar mt-3 items-center gap-4 flex-wrap" id="fileInfoBar">
                <i class="fas fa-file-excel text-lg"></i>
                <span id="fileName" class="font-bold"></span>
                <span class="opacity-60">|</span>
                <span id="fileSheets"></span>
                <span class="opacity-60">|</span>
                <span id="fileDate"></span>
                <span class="opacity-60">|</span>
                <span id="fileRows"></span>
                <button class="mr-auto px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition text-xs"
                        onclick="clearData()">
                    <i class="fas fa-xmark ml-1"></i>إزالة
                </button>
            </div>
        </section>

        <!-- بطاقات KPI -->
        <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6" aria-label="مؤشرات الأداء الرئيسية" id="kpiSection">
            <div class="glass-card kpi-card amber p-5 animate-in delay-2">
                <div class="flex items-center justify-between mb-3">
                    <div class="kpi-icon bg-amber-500/15 text-amber-400"><i class="fas fa-weight-hanging"></i></div>
                    <span class="text-xs text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-full" id="kpi1Badge">—</span>
                </div>
                <div class="kpi-value text-amber-400" id="kpi1">—</div>
                <p class="text-xs text-[var(--muted)] mt-1">طن / إجمالي الإنتاج الفعلي</p>
            </div>
            <div class="glass-card kpi-card cyan p-5 animate-in delay-3">
                <div class="flex items-center justify-between mb-3">
                    <div class="kpi-icon bg-cyan-500/15 text-cyan-400"><i class="fas fa-gauge-high"></i></div>
                    <span class="text-xs text-cyan-400 font-semibold bg-cyan-400/10 px-2 py-1 rounded-full" id="kpi2Badge">—</span>
                </div>
                <div class="kpi-value text-cyan-400" id="kpi2">—</div>
                <p class="text-xs text-[var(--muted)] mt-1">كفاءة الإنتاج الإجمالية</p>
            </div>
            <div class="glass-card kpi-card rose p-5 animate-in delay-4">
                <div class="flex items-center justify-between mb-3">
                    <div class="kpi-icon bg-rose-500/15 text-rose-400"><i class="fas fa-clock-rotate-left"></i></div>
                    <span class="text-xs text-rose-400 font-semibold bg-rose-400/10 px-2 py-1 rounded-full" id="kpi3Badge">—</span>
                </div>
                <div class="kpi-value text-rose-400" id="kpi3">—</div>
                <p class="text-xs text-[var(--muted)] mt-1">إجمالي ساعات التوقف</p>
            </div>
            <div class="glass-card kpi-card purple p-5 animate-in delay-5">
                <div class="flex items-center justify-between mb-3">
                    <div class="kpi-icon bg-purple-500/15 text-purple-400"><i class="fas fa-chart-line"></i></div>
                    <span class="text-xs text-rose-400 font-semibold bg-rose-400/10 px-2 py-1 rounded-full" id="kpi4Badge">—</span>
                </div>
                <div class="kpi-value text-purple-400" id="kpi4">—</div>
                <p class="text-xs text-[var(--muted)] mt-1">طن فجوة الإنتاج عن السعة</p>
            </div>
            <div class="glass-card kpi-card emerald p-5 animate-in delay-6 col-span-2 md:col-span-1">
                <div class="flex items-center justify-between mb-3">
                    <div class="kpi-icon bg-emerald-500/15 text-emerald-400"><i class="fas fa-bolt"></i></div>
                    <span class="text-xs text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-full" id="kpi5Badge">—</span>
                </div>
                <div class="kpi-value text-emerald-400" id="kpi5">—</div>
                <p class="text-xs text-[var(--muted)] mt-1">متوسط الإنتاج الفعلي لكل ساعة</p>
            </div>
        </section>

        <!-- الإنتاج اليومي -->
        <section class="glass-card p-6 mb-6 animate-in delay-5" aria-label="منحنى الإنتاج اليومي">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                    <h2 class="text-lg font-bold">الإنتاج اليومي مقابل السعة القصوى</h2>
                    <p class="text-xs text-[var(--muted)] mt-1">مقارنة يومية بين الإنتاج الفعلي والسعة المتاحة</p>
                </div>
                <div class="flex gap-2">
                    <button class="tab-btn active" data-chart="daily" data-mode="both" onclick="toggleDataset('dailyChart',0,this,'both')">الكلا</button>
                    <button class="tab-btn" data-chart="daily" data-mode="actual" onclick="toggleDataset('dailyChart',0,this,'actual')">الفعلي</button>
                    <button class="tab-btn" data-chart="daily" data-mode="max" onclick="toggleDataset('dailyChart',0,this,'max')">الأقصى</button>
                </div>
            </div>
            <div class="chart-container" style="height:320px;">
                <canvas id="dailyChart"></canvas>
            </div>
        </section>

        <!-- كفاءة الخطوط + أسباب التوقف -->
        <section class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div class="glass-card p-6 lg:col-span-3 animate-in delay-6" aria-label="كفاءة خطوط الإنتاج">
                <h2 class="text-lg font-bold mb-1">كفاءة خطوط الإنتاج</h2>
                <p class="text-xs text-[var(--muted)] mb-5">النسبة المئوية لتحقيق السعة القصوى لكل خط</p>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="efficiencyDonuts"></div>
                <div class="mt-6 space-y-3" id="efficiencyBars"></div>
            </div>
            <div class="glass-card p-6 lg:col-span-2 animate-in delay-7" aria-label="تحليل أسباب التوقف">
                <h2 class="text-lg font-bold mb-1">تحليل أسباب التوقف</h2>
                <p class="text-xs text-[var(--muted)] mb-5">توزيع ساعات التوقف حسب السبب</p>
                <div class="chart-container" style="height:260px;">
                    <canvas id="downtimeChart"></canvas>
                </div>
                <div class="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20" id="downtimeAlert">
                    <p class="text-xs text-rose-300 font-semibold"><i class="fas fa-triangle-exclamation ml-1"></i>ارفع ملف لعرض التحليل</p>
                </div>
            </div>
        </section>

        <!-- الكفاءة الأسبوعية + البروفايل -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div class="glass-card p-6 animate-in delay-7" aria-label="الكفاءة الأسبوعية">
                <h2 class="text-lg font-bold mb-1">اتجاه الكفاءة الأسبوعية</h2>
                <p class="text-xs text-[var(--muted)] mb-5">تتبع أداء كل خط عبر الأسابيع</p>
                <div class="chart-container" style="height:280px;">
                    <canvas id="weeklyChart"></canvas>
                </div>
            </div>
            <div class="glass-card p-6 animate-in delay-8" aria-label="أداء البروفايلات">
                <h2 class="text-lg font-bold mb-1">أداء البروفايلات</h2>
                <p class="text-xs text-[var(--muted)] mb-5">مقارنة كفاءة بروفايل 1 مقابل بروفايل 2</p>
                <div class="chart-container" style="height:280px;">
                    <canvas id="profileChart"></canvas>
                </div>
            </div>
        </section>

        <!-- الورديات + الفجوة -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div class="glass-card p-6 animate-in delay-8" aria-label="توزيع الورديات">
                <h2 class="text-lg font-bold mb-1">توزيع الورديات</h2>
                <p class="text-xs text-[var(--muted)] mb-5">نسبة مساهمة كل وردية</p>
                <div class="chart-container flex justify-center" style="height:220px;">
                    <canvas id="shiftChart"></canvas>
                </div>
                <div class="grid grid-cols-3 gap-2 mt-4 text-center text-xs" id="shiftLegend"></div>
            </div>
            <div class="glass-card p-6 lg:col-span-2 animate-in delay-8" aria-label="فجوة الإنتاج">
                <h2 class="text-lg font-bold mb-1">فجوة الإنتاج حسب الخط</h2>
                <p class="text-xs text-[var(--muted)] mb-5">الفرق بين السعة القصوى والإنتاج الفعلي</p>
                <div class="chart-container" style="height:250px;">
                    <canvas id="gapChart"></canvas>
                </div>
            </div>
        </section>

        <!-- توصيات -->
        <section class="glass-card p-6 animate-in delay-8 mb-8" aria-label="رؤى وتوصيات" id="insightsSection">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <div>
                    <h2 class="text-lg font-bold">رؤى وتوصيات</h2>
                    <p class="text-xs text-[var(--muted)]">تحليل ذكي مستخرج من البيانات تلقائياً</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="insightsContainer">
                <div class="insight-item insight-info">
                    <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-circle-info text-cyan-400"></i>
                        <span class="font-bold text-sm text-cyan-300">في انتظار البيانات</span>
                    </div>
                    <p class="text-xs text-[var(--muted)] leading-relaxed">ارفع ملف الإكسيل لعرض التحليل والتوصيات التلقائية بناءً على بياناتك الحقيقية.</p>
                </div>
            </div>
        </section>

        <!-- كيف تعمل التحديثات التلقائية -->
        <section class="glass-card p-6 mb-8 animate-in delay-8" aria-label="دليل التحديث التلقائي">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                    <i class="fas fa-rotate"></i>
                </div>
                <div>
                    <h2 class="text-lg font-bold">كيف تعمل التحديثات التلقائية</h2>
                    <p class="text-xs text-[var(--muted)]">3 طرق لربط الداشبورد بملف الإكسيل</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div class="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center text-lg mb-3">
                        <i class="fas fa-hand-pointer"></i>
                    </div>
                    <h3 class="font-bold text-sm mb-2 text-amber-300">الطريقة 1: رفع يدوي</h3>
                    <p class="text-xs text-[var(--muted)] leading-relaxed">ارفع ملف الإكسيل من الزر أعلاه في أي وقت. الداشبورد تقرأ الملف وتحدث كل الرسوم فوراً. مناسبة للتحديث اليومي.</p>
                    <div class="mt-3 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold inline-block">
                        متاحة الآن
                    </div>
                </div>
                <div class="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div class="w-10 h-10 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-lg mb-3">
                        <i class="fas fa-eye"></i>
                    </div>
                    <h3 class="font-bold text-sm mb-2 text-cyan-300">الطريقة 2: مراقبة مجلد</h3>
                    <p class="text-xs text-[var(--muted)] leading-relaxed">شغّل سكربت بايثون بسيط يراقب مجلد معين. لما الملف يتحدث، السكربت يبعت البيانات للداشبورد أوتوماتك.</p>
                    <div class="mt-3 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-semibold inline-block cursor-pointer"
                         onclick="showPythonScript()">
                        <i class="fas fa-code ml-1"></i>عرض السكربت
                    </div>
                </div>
                <div class="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div class="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-lg mb-3">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="font-bold text-sm mb-2 text-emerald-300">الطريقة 3: تحديث دوري</h3>
                    <p class="text-xs text-[var(--muted)] leading-relaxed">حدد فاصل زمني واضبط الداشبورد تعمل refresh تلقائي كل X دقيقة وتقرأ الملف من مسار ثابت على الجهاز.</p>
                    <div class="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold inline-block cursor-pointer"
                         onclick="showAutoRefreshSettings()">
                        <i class="fas fa-gear ml-1"></i>إعدادات التحديث
                    </div>
                </div>
            </div>
        </section>

        <!-- مودال السكربت -->
        <div id="scriptModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4" style="background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);">
            <div class="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" style="border-color:rgba(6,182,212,0.3);">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-lg text-cyan-300"><i class="fas fa-code ml-2"></i>سكربت مراقبة المجلد — Python</h3>
                    <button onclick="closeModal('scriptModal')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center transition">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
                <p class="text-xs text-[var(--muted)] mb-4">انسخ الكود ده واحفظه كملف <code class="bg-white/10 px-1.5 py-0.5 rounded">watcher.py</code> وشغّله في نفس مجلد ملف الإكسيل. لما الملف يتحدث، الداشبورد هتتحدث أوتوماتك.</p>
                <pre class="p-4 rounded-xl bg-black/40 text-xs leading-relaxed overflow-x-auto" dir="ltr" style="color:#a5f3fc;font-family:monospace;"><code id="pythonCode"></code></pre>
                <button onclick="copyCode('pythonCode')" class="mt-4 px-4 py-2 rounded-xl bg-cyan-500/15 text-cyan-400 text-sm font-bold hover:bg-cyan-500/25 transition border border-cyan-500/20">
                    <i class="fas fa-copy ml-2"></i>نسخ الكود
                </button>
            </div>
        </div>

        <!-- مودال إعدادات التحديث الدوري -->
        <div id="autoRefreshModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4" style="background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);">
            <div class="glass-card p-6 max-w-md w-full" style="border-color:rgba(16,185,129,0.3);">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-lg text-emerald-300"><i class="fas fa-gear ml-2"></i>إعدادات التحديث الدوري</h3>
                    <button onclick="closeModal('autoRefreshModal')" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center transition">
                        <i class="fas fa-xmark"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="text-sm font-semibold block mb-2">فاصل التحديث (بالدقائق)</label>
                        <div class="flex items-center gap-3">
                            <input type="range" id="refreshInterval" min="1" max="60" value="5"
                                   class="flex-1 accent-emerald-500" oninput="document.getElementById('intervalValue').textContent=this.value">
                            <span id="intervalValue" class="text-lg font-bold text-emerald-400 w-8 text-center">5</span>
                            <span class="text-xs text-[var(--muted)]">دقيقة</span>
                        </div>
                    </div>
                    <div>
                        <label class="text-sm font-semibold block mb-2">مسار ملف الإكسيل</label>
                        <input type="text" id="filePath" placeholder="مثال: C:\Production\data.xlsx"
                               class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-emerald-500/40 transition"
                               dir="ltr">
                    </div>
                    <div class="flex gap-3 mt-4">
                        <button onclick="startAutoRefresh()" class="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 text-sm font-bold hover:bg-emerald-500/25 transition border border-emerald-500/20">
                            <i class="fas fa-play ml-2"></i>تشغيل
                        </button>
                        <button onclick="stopAutoRefresh()" class="px-4 py-2.5 rounded-xl bg-rose-500/15 text-rose-400 text-sm font-bold hover:bg-rose-500/25 transition border border-rose-500/20">
                            <i class="fas fa-stop ml-2"></i>إيقاف
                        </button>
                    </div>
                    <p class="text-xs text-[var(--muted)] leading-relaxed p-3 rounded-lg bg-amber-500/10 text-amber-300">
                        <i class="fas fa-triangle-exclamation ml-1"></i>
                        ملاحظة: التحديث الدوري يعمل فقط لما تفتح الملف من مسار محلي (file://) في بعض المتصفحات. للعمل المثالي استخدم سكربت البايثون.
                    </p>
                    <div id="autoRefreshStatus" class="text-xs text-center text-[var(--muted)]"></div>
                </div>
            </div>
        </div>

        <footer class="text-center text-xs text-[var(--muted)] pb-4">
            <p>لوحة تحكم الإنتاج — مصنع الواحة — تحديث تلقائي من ملف الإكسيل</p>
        </footer>
    </div>

    <script>
    // ========================================
    // متغيرات عامة
    // ========================================
    let charts = {};              // تخزين مراجع الرسوم البيانية
    let autoRefreshTimer = null;  // مؤقت التحديث الدوري
    let currentData = null;       // البيانات الحالية المحملة

    // ========================================
    // إعدادات Chart.js العامة
    // ========================================
    Chart.defaults.color = '#7a8ba8';
    Chart.defaults.font.family = 'Cairo, sans-serif';
    Chart.defaults.font.size = 11;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(10,15,26,0.95)';
    Chart.defaults.plugins.tooltip.borderColor = 'rgba(30,48,80,0.8)';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 10;
    Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold', size: 13 };

    // ========================================
    // إنشاء الرسوم البيانية الفارغة مبدئياً
    // ========================================
    function initEmptyCharts() {
        // رسم الإنتاج اليومي
        charts.daily = new Chart(document.getElementById('dailyChart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'الإنتاج الفعلي (طن)', data: [], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6, pointBackgroundColor: '#f59e0b', pointBorderColor: '#0a0f1a', pointBorderWidth: 2 },
                    { label: 'السعة القصوى (طن)', data: [], borderColor: '#475569', backgroundColor: 'rgba(100,116,139,0.05)', borderWidth: 1.5, borderDash: [6, 4], fill: true, tension: 0.4, pointRadius: 0 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'top', align: 'start' }, tooltip: { callbacks: { afterBody: function(items) { if (items.length >= 2 && items[1].raw > 0) return 'الكفاءة: ' + ((items[0].raw / items[1].raw) * 100).toFixed(1) + '%'; return ''; } } } },
                scales: { x: { grid: { color: 'rgba(30,48,80,0.3)' } }, y: { grid: { color: 'rgba(30,48,80,0.3)' }, beginAtZero: true, ticks: { callback: v => v.toLocaleString('ar-EG') } } }
            }
        });

        // رسم أسباب التوقف
        charts.downtime = new Chart(document.getElementById('downtimeChart'), {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'ساعات التوقف', data: [], backgroundColor: [], borderWidth: 0, borderRadius: 6, barThickness: 22 }] },
            options: {
                indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { color: 'rgba(30,48,80,0.3)' }, beginAtZero: true }, y: { grid: { display: false } } }
            }
        });

        // رسم الكفاءة الأسبوعية
        charts.weekly = new Chart(document.getElementById('weeklyChart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'خط 1', data: [], borderColor: '#f59e0b', borderWidth: 2.5, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#f59e0b', pointBorderColor: '#0a0f1a', pointBorderWidth: 2, fill: false },
                    { label: 'خط 2', data: [], borderColor: '#06b6d4', borderWidth: 2.5, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#06b6d4', pointBorderColor: '#0a0f1a', pointBorderWidth: 2, fill: false },
                    { label: 'خط 3', data: [], borderColor: '#a855f7', borderWidth: 2.5, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#a855f7', pointBorderColor: '#0a0f1a', pointBorderWidth: 2, fill: false },
                    { label: 'خط 4', data: [], borderColor: '#10b981', borderWidth: 2.5, tension: 0.3, pointRadius: 4, pointBackgroundColor: '#10b981', pointBorderColor: '#0a0f1a', pointBorderWidth: 2, fill: false }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { legend: { position: 'top', align: 'start' } },
                scales: { x: { grid: { color: 'rgba(30,48,80,0.3)' } }, y: { grid: { color: 'rgba(30,48,80,0.3)' }, suggestedMin: 70, suggestedMax: 135, ticks: { callback: v => v + '%' } } }
            }
        });

        // رسم البروفايلات
        charts.profile = new Chart(document.getElementById('profileChart'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    { label: 'بروفايل 1 (30 طن/س)', data: [], backgroundColor: 'rgba(245,158,11,0.7)', borderColor: '#f59e0b', borderWidth: 1, borderRadius: 6 },
                    { label: 'بروفايل 2 (25 طن/س)', data: [], backgroundColor: 'rgba(6,182,212,0.7)', borderColor: '#06b6d4', borderWidth: 1, borderRadius: 6 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', align: 'start' } },
                scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(30,48,80,0.3)' }, beginAtZero: true, suggestedMax: 110, ticks: { callback: v => v + '%' } } }
            }
        });

        // رسم الورديات
        charts.shift = new Chart(document.getElementById('shiftChart'), {
            type: 'doughnut',
            data: {
                labels: ['الوردية الأولى', 'الوردية الثانية', 'الوردية الثالثة'],
                datasets: [{ data: [1, 1, 1], backgroundColor: ['#f59e0b', '#06b6d4', '#10b981'], borderWidth: 0, borderRadius: 4, spacing: 3 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '62%',
                plugins: { legend: { display: false } },
                animation: { animateRotate: true, duration: 1500 }
            }
        });

        // رسم الفجوة
        charts.gap = new Chart(document.getElementById('gapChart'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    { label: 'السعة القصوى', data: [], backgroundColor: 'rgba(100,116,139,0.3)', borderColor: 'rgba(100,116,139,0.5)', borderWidth: 1, borderRadius: 6 },
                    { label: 'الإنتاج الفعلي', data: [], backgroundColor: [], borderColor: [], borderWidth: 1, borderRadius: 6 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', align: 'start' }, tooltip: { callbacks: { afterBody: function(items) { if (items.length >= 2) return 'الفجوة: ' + (items[0].raw - items[1].raw).toLocaleString('ar-EG') + ' طن'; return ''; } } } },
                scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(30,48,80,0.3)' }, beginAtZero: true, ticks: { callback: v => (v / 1000).toFixed(0) + ' ألف' } } }
            }
        });
    }

    // ========================================
    // محرك تحليل ملف الإكسيل
    // ========================================
    function parseExcelFile(workbook) {
        const result = {
            daily: { labels: [], actual: [], max: [] },
            lines: [
                { name: 'خط 1', max: 0, actual: 0, gap: 0, eff: 0, color: '#f59e0b' },
                { name: 'خط 2', max: 0, actual: 0, gap: 0, eff: 0, color: '#06b6d4' },
                { name: 'خط 3', max: 0, actual: 0, gap: 0, eff: 0, color: '#a855f7' },
                { name: 'خط 4', max: 0, actual: 0, gap: 0, eff: 0, color: '#10b981' }
            ],
            downtime: {},
            weekly: { labels: [], line1: [], line2: [], line3: [], line4: [] },
            profile: { labels: ['خط 1', 'خط 2', 'خط 3', 'خط 4'], p1: [0,0,0,0], p2: [0,0,0,0] },
            shifts: { labels: ['الوردية الأولى\n7ص - 3م', 'الوردية الثانية\n3م - 11م', 'الوردية الثالثة\n11م - 7ص'], values: [0, 0, 0] },
            totalActual: 0,
            totalMax: 0,
            totalDowntime: 0,
            totalWorkingHours: 0
        };

        // ---- 1. تحليل شيت Actual Capacity ----
        const acSheet = workbook.Sheets['Actual Capacity'] || workbook.Sheets[workbook.SheetNames[0]];
        if (acSheet) {
            const rows = XLSX.utils.sheet_to_json(acSheet, { header: 1, defval: '' });
            let currentDate = '';
            let dailyActualTotal = 0;
            let dailyMaxTotal = 0;

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row || row.length < 8) continue;

                // التحقق من التاريخ
                const dateVal = row[0];
                if (dateVal && dateVal !== '*' && dateVal !== '') {
                    // حفظ يوم سابق
                    if (currentDate && dailyActualTotal > 0) {
                        result.daily.labels.push(currentDate);
                        result.daily.actual.push(Math.round(dailyActualTotal * 100) / 100);
                        result.daily.max.push(Math.round(dailyMaxTotal * 100) / 100);
                    }
                    // تاريخ جديد
                    if (typeof dateVal === 'number') {
                        // تاريخ إكسيل (رقم تسلسلي)
                        const d = XLSX.SSF.parse_date_code(dateVal);
                        currentDate = d.d + '/' + d.m;
                    } else {
                        const parts = String(dateVal).split('/');
                        currentDate = parts[0] + '/' + parts[1];
                    }
                    dailyActualTotal = 0;
                    dailyMaxTotal = 0;
                }

                const line = String(row[1] || '').toLowerCase().replace(/\s/g, '');
                const profile = parseInt(row[2]) || 0;
                const workingHours = parseFloat(row[3]) || 0;
                const actualProd = parseFloat(row[4]) || 0;
                const maxProd = parseFloat(row[5]) || 0;
                const downtimeVal = row[10];
                const comment = String(row[11] || '');

                // تجميع الإنتاج اليومي
                dailyActualTotal += actualProd;
                dailyMaxTotal += maxProd;

                // تجميع بيانات كل خط
                let lineIdx = -1;
                if (line.includes('line1') || line === 'line1') lineIdx = 0;
                else if (line.includes('line2') || line === 'line2') lineIdx = 1;
                else if (line.includes('line3') || line === 'line3') lineIdx = 2;
                else if (line.includes('line4') || line === 'line4') lineIdx = 3;

                if (lineIdx >= 0 && actualProd > 0) {
                    result.lines[lineIdx].actual += actualProd;
                    result.lines[lineIdx].max += maxProd;
                    result.totalWorkingHours += workingHours;
                }

                // تجميع بيانات البروفايلات (متوسط طن/ساعة فعلية)
                if (lineIdx >= 0 && workingHours > 0 && actualProd > 0) {
                    const tonPerHour = actualProd / workingHours;
                    const maxTonPerHour = parseFloat(row[7]) || (profile === 1 ? 30 : 25);
                    const effPercent = Math.min((tonPerHour / maxTonPerHour) * 100, 150);

                    if (profile === 1) result.profile.p1[lineIdx] += effPercent;
                    else if (profile === 2) result.profile.p2[lineIdx] += effPercent;
                }

                // تحليل أسباب التوقف
                if (downtimeVal && downtimeVal !== '*' && downtimeVal !== '' && parseFloat(downtimeVal) > 0) {
                    const hours = parseFloat(downtimeVal);
                    result.totalDowntime += hours;

                    // تصنيف السبب من التعليق
                    let cause = 'أخرى';
                    if (comment.includes('بلتات') || comment.includes('توفير بلتات')) cause = 'نقص بلتات';
                    else if (comment.includes('خزانات') || comment.includes('امتلاء')) cause = 'امتلاء خزانات';
                    else if (comment.includes('صيانة') || comment.includes('كوندنشر')) cause = 'صيانة';
                    else if (comment.includes('جهد')) cause = 'جهد كهربائي';
                    else if (comment.includes('داي') || comment.includes('بكر') || comment.includes('تغيير')) cause = 'تغيير داي وبكر';
                    else if (comment.includes('علف')) cause = 'عدم وجود علف';

                    result.downtime[cause] = (result.downtime[cause] || 0) + hours;
                }
            }

            // حفظ آخر يوم
            if (currentDate && dailyActualTotal > 0) {
                result.daily.labels.push(currentDate);
                result.daily.actual.push(Math.round(dailyActualTotal * 100) / 100);
                result.daily.max.push(Math.round(dailyMaxTotal * 100) / 100);
            }

            // حساب الكفاءة والفجوة لكل خط
            result.lines.forEach(line => {
                line.gap = Math.round(line.max - line.actual);
                line.eff = line.max > 0 ? Math.round((line.actual / line.max) * 1000) / 10 : 0;
                result.totalActual += line.actual;
                result.totalMax += line.max;
            });

            // حساب متوسط كفاءة البروفايلات
            // نحتاج عداد لكل بروفايل على كل خط
            // نُعيد حسابها بشكل أدق
        }

        // ---- 2. تحليل شيتات الأسابيع ----
        const weekSheets = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5'];
        const weekLabels = ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5'];

        weekSheets.forEach((wsName, wi) => {
            const ws = workbook.Sheets[wsName];
            if (!ws) return;
            const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

            result.weekly.labels.push(weekLabels[wi]);

            for (let r = 1; r < rows.length; r++) {
                const row = rows[r];
                if (!row || row.length < 6) continue;
                const lineName = String(row[0] || '').toLowerCase().replace(/\s/g, '');
                const eff = parseFloat(row[5]);
                if (isNaN(eff)) continue;

                if (lineName.includes('line1')) result.weekly.line1.push(eff);
                else if (lineName.includes('line2')) result.weekly.line2.push(eff);
                else if (lineName.includes('line3')) result.weekly.line3.push(eff);
                else if (lineName.includes('line4')) result.weekly.line4.push(eff);
            }
        });

        // ---- 3. تحليل شيت الانتاج اليومى (الورديات) ----
        const dailySheet = workbook.Sheets['الانتاج اليومى'];
        if (dailySheet) {
            const rows = XLSX.utils.sheet_to_json(dailySheet, { header: 1, defval: '' });
            // البحث عن صف "اجمالى كل وردية"
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                if (!row) continue;
                const cell0 = String(row[0] || '');
                if (cell0.includes('اجمالى كل وردية') || cell0.includes('اجمالي كل وردية')) {
                    // القيم عادة في الأعمدة المناسبة
                    // الوردية الثالثة، الأولى، الثانية، الثالثة
                    // نبحث عن الأرقام الكبيرة في الصف
                    const nums = [];
                    for (let c = 0; c < row.length; c++) {
                        const v = parseFloat(row[c]);
                        if (!isNaN(v) && v > 100) nums.push(v);
                    }
                    if (nums.length >= 3) {
                        result.shifts.values = [nums[1], nums[2], nums[0]]; // الأولى، الثانية، الثالثة
                    } else if (nums.length >= 1) {
                        result.shifts.values = nums;
                    }
                    break;
                }
            }
        }

        // ---- 4. تحليل شيت MONTHLY (لو موجود وبياناته أدق) ----
        const monthlySheet = workbook.Sheets['MONTHLY'];
        if (monthlySheet) {
            const rows = XLSX.utils.sheet_to_json(monthlySheet, { header: 1, defval: '' });
            for (let r = 1; r < rows.length; r++) {
                const row = rows[r];
                if (!row || row.length < 4) continue;
                const lineName = String(row[0] || '').toLowerCase().replace(/\s/g, '');
                const maxP = parseFloat(row[1]) || 0;
                const actP = parseFloat(row[2]) || 0;
                const eff = parseFloat(row[5]) || 0;

                let lineIdx = -1;
                if (lineName.includes('line1')) lineIdx = 0;
                else if (lineName.includes('line2')) lineIdx = 1;
                else if (lineName.includes('line3')) lineIdx = 2;
                else if (lineName.includes('line4')) lineIdx = 3;

                if (lineIdx >= 0) {
                    if (maxP > 0) {
                        result.lines[lineIdx].max = maxP;
                        result.lines[lineIdx].actual = actP;
                        result.lines[lineIdx].gap = Math.round(maxP - actP);
                        result.lines[lineIdx].eff = eff || Math.round((actP / maxP) * 1000) / 10;
                    }
                }
            }
            // إعادة حساب الإجمالي
            result.totalActual = result.lines.reduce((s, l) => s + l.actual, 0);
            result.totalMax = result.lines.reduce((s, l) => s + l.max, 0);
        }

        return result;
    }

    // ========================================
    // تحديث الداشبورد بالكامل من كائن البيانات
    // ========================================
    function updateDashboard(data) {
        currentData = data;

        // ---- تحديث KPIs ----
        const totalEff = data.totalMax > 0 ? ((data.totalActual / data.totalMax) * 100) : 0;
        const avgTonHour = data.totalWorkingHours > 0 ? (data.totalActual / data.totalWorkingHours) : 0;
        const totalGap = Math.round(data.totalMax - data.totalActual);

        animateValue('kpi1', Math.round(data.totalActual), '', 0);
        animateValue('kpi2', Math.round(totalEff * 10) / 10, '%', 1);
        animateValue('kpi3', Math.round(data.totalDowntime * 10) / 10, ' س', 1);
        animateValue('kpi4', totalGap, '', 0);
        animateValue('kpi5', Math.round(avgTonHour * 10) / 10, ' ط/س', 1);

        // شارات الحالة
        document.getElementById('kpi1Badge').textContent = data.totalActual > 30000 ? 'ممتاز' : 'جيد';
        document.getElementById('kpi2Badge').textContent = totalEff >= 95 ? 'ممتاز' : totalEff >= 90 ? 'مقبول' : 'ضعيف';
        document.getElementById('kpi3Badge').textContent = data.totalDowntime > 200 ? 'تحذير' : 'جيد';
        document.getElementById('kpi4Badge').innerHTML = '<i class="fas fa-arrow-down text-[10px] ml-1"></i>عجز';
        document.getElementById('kpi5Badge').textContent = avgTonHour >= 25 ? 'جيد' : 'مقبول';

        // ---- تحديث رسم الإنتاج اليومي ----
        charts.daily.data.labels = data.daily.labels;
        charts.daily.data.datasets[0].data = data.daily.actual;
        charts.daily.data.datasets[1].data = data.daily.max;
        // إعادة إنشاء التدرجات
        const ctx = document.getElementById('dailyChart').getContext('2d');
        const grad1 = ctx.createLinearGradient(0, 0, 0, 320);
        grad1.addColorStop(0, 'rgba(245,158,11,0.25)');
        grad1.addColorStop(1, 'rgba(245,158,11,0.0)');
        charts.daily.data.datasets[0].backgroundColor = grad1;
        const grad2 = ctx.createLinearGradient(0, 0, 0, 320);
        grad2.addColorStop(0, 'rgba(100,116,139,0.15)');
        grad2.addColorStop(1, 'rgba(100,116,139,0.0)');
        charts.daily.data.datasets[1].backgroundColor = grad2;
        charts.daily.update('active');

        // ---- تحديث دونات كفاءة الخطوط ----
        const donutsDiv = document.getElementById('efficiencyDonuts');
        const barsDiv = document.getElementById('efficiencyBars');
        donutsDiv.innerHTML = '';
        barsDiv.innerHTML = '';

        // تدمير الدونات القديمة
        Object.keys(charts).forEach(k => { if (k.startsWith('donut')) { charts[k].destroy(); delete charts[k]; } });

        data.lines.forEach((line, i) => {
            const div = document.createElement('div');
            div.className = 'text-center';
            div.innerHTML = `
                <div style="width:120px;height:120px;margin:0 auto;position:relative;">
                    <canvas id="donut${i}"></canvas>
                    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                        <span style="font-size:1.4rem;font-weight:900;color:${line.color}">${line.eff}%</span>
                        <span style="font-size:0.6rem;color:var(--muted)">كفاءة</span>
                    </div>
                </div>
                <p style="font-size:0.8rem;font-weight:700;margin-top:8px;color:${line.color}">${line.name}</p>
                <p style="font-size:0.65rem;color:var(--muted)">${Math.round(line.actual).toLocaleString('ar-EG')} / ${Math.round(line.max).toLocaleString('ar-EG')} طن</p>
            `;
            donutsDiv.appendChild(div);

            setTimeout(() => {
                const dctx = document.getElementById(`donut${i}`).getContext('2d');
                charts[`donut${i}`] = new Chart(dctx, {
                    type: 'doughnut',
                    data: { datasets: [{ data: [line.eff, 100 - line.eff], backgroundColor: [line.color, 'rgba(30,48,80,0.5)'], borderWidth: 0, borderRadius: 4 }] },
                    options: { responsive: true, maintainAspectRatio: true, cutout: '78%', plugins: { legend: { display: false }, tooltip: { enabled: false } }, animation: { animateRotate: true, duration: 1200, delay: i * 150 } }
                });
            }, 50);

            // شريط التقدم
            const barDiv = document.createElement('div');
            barDiv.innerHTML = `
                <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-semibold" style="color:${line.color}">${line.name}</span>
                    <span class="text-xs text-[var(--muted)]">${Math.round(line.actual).toLocaleString('ar-EG')} طن</span>
                </div>
                <div style="height:8px;border-radius:4px;background:rgba(30,48,80,0.5);overflow:hidden;">
                    <div style="height:100%;width:0%;border-radius:4px;background:${line.color};transition:width 1.2s ease ${i*0.15}s;" data-target-width="${line.eff}"></div>
                </div>
            `;
            barsDiv.appendChild(barDiv);
        });

        // تحريك الأشرطة
        setTimeout(() => {
            barsDiv.querySelectorAll('[data-target-width]').forEach(bar => {
                bar.style.width = bar.dataset.targetWidth + '%';
            });
        }, 100);

        // ---- تحديث رسم أسباب التوقف ----
        const dtEntries = Object.entries(data.downtime).sort((a, b) => b[1] - a[1]);
        const dtColors = ['#f43f5e', '#f59e0b', '#a855f7', '#06b6d4', '#64748b', '#78716c', '#fbbf24', '#22d3ee'];
        charts.downtime.data.labels = dtEntries.map(e => e[0]);
        charts.downtime.data.datasets[0].data = dtEntries.map(e => Math.round(e[1] * 100) / 100);
        charts.downtime.data.datasets[0].backgroundColor = dtEntries.map((_, i) => dtColors[i % dtColors.length]);
        charts.downtime.update('active');

        // تنبيه التوقف
        const alertDiv = document.getElementById('downtimeAlert');
        if (dtEntries.length > 0) {
            const topCause = dtEntries[0];
            const topPct = ((topCause[1] / data.totalDowntime) * 100).toFixed(1);
            alertDiv.innerHTML = `<p class="text-xs text-rose-300 font-semibold"><i class="fas fa-triangle-exclamation ml-1"></i>"${topCause[0]}" يمثل ${topPct}% من إجمالي التوقف (${Math.round(topCause[1])} ساعة)</p>`;
        }

        // ---- تحديث الكفاءة الأسبوعية ----
        charts.weekly.data.labels = data.weekly.labels;
        charts.weekly.data.datasets[0].data = data.weekly.line1;
        charts.weekly.data.datasets[1].data = data.weekly.line2;
        charts.weekly.data.datasets[2].data = data.weekly.line3;
        charts.weekly.data.datasets[3].data = data.weekly.line4;
        charts.weekly.update('active');

        // ---- تحديث رسم البروفايلات ----
        // نعيد حساب كفاءة البروفايل من البيانات الخام بشكل أدق
        charts.profile.data.labels = data.profile.labels;
        charts.profile.data.datasets[0].data = data.profile.p1.map(v => Math.round(v * 10) / 10);
        charts.profile.data.datasets[1].data = data.profile.p2.map(v => Math.round(v * 10) / 10);
        charts.profile.update('active');

        // ---- تحديث رسم الورديات ----
        const shiftVals = data.shifts.values;
        const shiftTotal = shiftVals.reduce((a, b) => a + b, 0);
        charts.shift.data.datasets[0].data = shiftTotal > 0 ? shiftVals : [1, 1, 1];
        charts.shift.update('active');

        const legendDiv = document.getElementById('shiftLegend');
        const shiftColors = ['#f59e0b', '#06b6d4', '#10b981'];
        const shiftNames = ['الأولى', 'الثانية', 'الثالثة'];
        legendDiv.innerHTML = shiftVals.map((v, i) => {
            const pct = shiftTotal > 0 ? ((v / shiftTotal) * 100).toFixed(1) : '—';
            return `<div><span class="inline-block w-2 h-2 rounded-full ml-1" style="background:${shiftColors[i]}"></span>${shiftNames[i]} ${pct}%</div>`;
        }).join('');

        // ---- تحديث رسم الفجوة ----
        charts.gap.data.labels = data.lines.map(l => l.name);
        charts.gap.data.datasets[0].data = data.lines.map(l => Math.round(l.max));
        charts.gap.data.datasets[1].data = data.lines.map(l => Math.round(l.actual));
        charts.gap.data.datasets[1].backgroundColor = data.lines.map(l => l.color + 'CC');
        charts.gap.data.datasets[1].borderColor = data.lines.map(l => l.color);
        charts.gap.update('active');

        // ---- تحديث التوصيات ----
        generateInsights(data);
    }

    // ========================================
    // توليد التوصيات تلقائياً من البيانات
    // ========================================
    function generateInsights(data) {
        const container = document.getElementById('insightsContainer');
        const insights = [];

        // 1. أكبر سبب توقف
        const dtEntries = Object.entries(data.downtime).sort((a, b) => b[1] - a[1]);
        if (dtEntries.length > 0) {
            const top = dtEntries[0];
            const topPct = ((top[1] / data.totalDowntime) * 100).toFixed(1);
            const lostTons = Math.round(top[1] * 25); // تقدير: 25 طن/ساعة متوسط
            insights.push({
                type: 'critical',
                icon: 'fa-circle-exclamation',
                iconColor: 'text-rose-400',
                title: 'أولوية قصوى: ' + top[0],
                text: `يتسبب في توقف ~${Math.round(top[1])} ساعة (${topPct}% من الإجمالي). هذا يعني خسارة تقريبية تتجاوز ${lostTons.toLocaleString('ar-EG')} طن إضافي. يُنصح بمعالجة هذا السبب فوراً لتقليل الفجوة الإنتاجية.`
            });
        }

        // 2. أضعف خط
        const sortedByEff = [...data.lines].sort((a, b) => a.eff - b.eff);
        const weakest = sortedByEff[0];
        if (weakest.eff > 0) {
            insights.push({
                type: 'warning',
                icon: 'fa-triangle-exclamation',
                iconColor: 'text-amber-400',
                title: weakest.name + ': أداء أقل من المطلوب',
                text: `يسجل أدنى كفاءة (${weakest.eff}%) وأكبر فجوة إنتاجية (${weakest.gap.toLocaleString('ar-EG')} طن). يُوصى بفحص حالة المعدات وتوحيد معاملات التشغيل.`
            });
        }

        // 3. أفضل خط
        const best = sortedByEff[sortedByEff.length - 1];
        if (best.eff > 0) {
            insights.push({
                type: 'success',
                icon: 'fa-circle-check',
                iconColor: 'text-emerald-400',
                title: best.name + ': أفضل أداء',
                text: `يحقق أعلى كفاءة (${best.eff}%) بأقل فجوة (${best.gap.toLocaleString('ar-EG')} طن). يُوصى بدراسة ممارسات هذا الخط وتعميمها على باقي الخطوط.`
            });
        }

        // 4. مقارنة أيام جيدة مقابل ضعيفة
        if (data.daily.actual.length > 3) {
            const bestDay = Math.max(...data.daily.actual);
            const worstDay = Math.min(...data.daily.actual.filter(v => v > 0));
            const bestDayIdx = data.daily.actual.indexOf(bestDay);
            const avgDay = Math.round(data.daily.actual.reduce((a, b) => a + b, 0) / data.daily.actual.filter(v => v > 0).length);
            insights.push({
                type: 'info',
                icon: 'fa-circle-info',
                iconColor: 'text-cyan-400',
                title: 'فرصة تحسين: رفع المتوسط اليومي',
                text: `أفضل يوم (${data.daily.labels[bestDayIdx]}) أنتج ${bestDay.toLocaleString('ar-EG')} طن، مقابل ${worstDay.toLocaleString('ar-EG')} طن في أسوأ يوم. المتوسط الحالي ${avgDay.toLocaleString('ar-EG')} طن/يوم — يمكن رفعه بتقليل أوقات التوقف.`
            });
        }

        // 5. بروفايل متوقف
        data.profile.p1.forEach((v, i) => {
            if (v === 0 && data.profile.p2[i] > 0) {
                insights.push({
                    type: 'warning',
                    icon: 'fa-triangle-exclamation',
                    iconColor: 'text-amber-400',
                    title: 'بروفايل 1 على ' + data.profile.labels[i] + ': متوقف',
                    text: `لم يسجل أي إنتاج. إذا كان بسبب عطل، إصلاحه يضيف سعة 30 طن/س إضافية. إذا كان قرار تشغيلي، يُراجع جدول التشغيل.`
                });
            }
        });

        // 6. كفاءة إجمالية
        const totalEff = data.totalMax > 0 ? ((data.totalActual / data.totalMax) * 100) : 0;
        if (totalEff > 0) {
            const potentialGain = Math.round(data.totalMax - data.totalActual);
            insights.push({
                type: totalEff >= 95 ? 'success' : 'info',
                icon: totalEff >= 95 ? 'fa-circle-check' : 'fa-circle-info',
                iconColor: totalEff >= 95 ? 'text-emerald-400' : 'text-cyan-400',
                title: 'الصورة الكلية: كفاءة ' + (Math.round(totalEff * 10) / 10) + '%',
                text: `المصنع أنتج ${Math.round(data.totalActual).toLocaleString('ar-EG')} طن من أصل ${Math.round(data.totalMax).toLocaleString('ar-EG')} طن سعة. هناك فرصة لإضافة ${potentialGain.toLocaleString('ar-EG')} طن شهرياً بالوصول لكفاءة 100%.`
            });
        }

        // عرض التوصيات
        container.innerHTML = insights.map(ins => `
            <div class="insight-item insight-${ins.type}">
                <div class="flex items-center gap-2 mb-2">
                    <i class="fas ${ins.icon} ${ins.iconColor}"></i>
                    <span class="font-bold text-sm" style="color:var(--text)">${ins.title}</span>
                </div>
                <p class="text-xs text-[var(--muted)] leading-relaxed">${ins.text}</p>
            </div>
        `).join('');
    }

    // ========================================
    // دالة تحريك القيم الرقمية
    // ========================================
    function animateValue(elementId, target, suffix, decimals) {
        const el = document.getElementById(elementId);
        const duration = 1500;
        const start = performance.now();
        const startVal = 0;

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = startVal + (target - startVal) * eased;

            if (decimals > 0) {
                el.textContent = current.toFixed(decimals) + suffix;
            } else {
                el.textContent = Math.round(current).toLocaleString('ar-EG') + suffix;
            }
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // ========================================
    // معالجة رفع الملف
    // ========================================
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');

    // سحب وإفلات
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    });

    // ضغط للاختيار
    uploadZone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') fileInput.click();
    });
    uploadZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) processFile(fileInput.files[0]);
    });

    function processFile(file) {
        // التحقق من نوع الملف
        const validTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv'
        ];
        const ext = file.name.split('.').pop().toLowerCase();
        if (!validTypes.includes(file.type) && !['xlsx', 'xls', 'csv'].includes(ext)) {
            showToast('خطأ: يُرجى رفع ملف إكسيل (xlsx, xls) أو CSV', 'error');
            return;
        }

        // إظهار مؤشر التحميل
        document.getElementById('loadingOverlay').classList.add('active');

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array', cellDates: true });

                // تحليل البيانات
                const parsed = parseExcelFile(workbook);

                // تحديث الداشبورد
                updateDashboard(parsed);

                // تحديث معلومات الملف
                const infoBar = document.getElementById('fileInfoBar');
                document.getElementById('fileName').textContent = file.name;
                document.getElementById('fileSheets').textContent = workbook.SheetNames.length + ' شيت';
                document.getElementById('fileDate').textContent = 'آخر تعديل: ' + new Date(file.lastModified).toLocaleString('ar-EG');
                const totalRows = workbook.SheetNames.reduce((sum, name) => {
                    const ws = workbook.Sheets[name];
                    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
                    return sum + (range.e.r - range.s.r);
                }, 0);
                document.getElementById('fileRows').textContent = totalRows + ' صف تقريباً';
                infoBar.classList.add('show');

                // تحديث حالة الاتصال
                document.getElementById('statusText').textContent = 'متصل بالملف';
                uploadZone.classList.add('has-file');

                // حفظ في localStorage
                try {
                    localStorage.setItem('lastFileName', file.name);
                    localStorage.setItem('lastUpload', new Date().toISOString());
                } catch(e) {}

                showToast('تم تحديث الداشبورد بنجاح من "' + file.name + '"', 'success');

            } catch (err) {
                console.error('خطأ في قراءة الملف:', err);
                showToast('خطأ في قراءة الملف: ' + err.message, 'error');
            } finally {
                document.getElementById('loadingOverlay').classList.remove('active');
            }
        };
        reader.onerror = function() {
            document.getElementById('loadingOverlay').classList.remove('active');
            showToast('فشل في قراءة الملف', 'error');
        };
        reader.readAsArrayBuffer(file);
    }

    // ========================================
    // بيانات تجريبية (للتجربة بدون ملف)
    // ========================================
    function loadSampleData() {
        const sampleData = {
            daily: {
                labels: ['1/6','2/6','3/6','4/6','5/6','6/6','7/6','8/6','9/6','10/6',
                         '11/6','12/6','13/6','14/6','15/6','16/6','17/6','18/6','19/6','20/6',
                         '21/6','22/6','23/6','24/6'],
                actual: [2212,2265,2443,2310,1045,2010,1716,1572,1385,2299,
                         800,1823,2198,1171,1526,1716,1270,2256,571,1231,
                         2077,2322,1548,1155],
                max: [1980,1979,1934,1986,965,1807,1559,1441,1347,1794,
                      746,1695,1800,929,1230,1820,1237,1949,752,1124,
                      1889,1999,1413,576]
            },
            lines: [
                { name: 'خط 1', max: 10550, actual: 10116, gap: -434, eff: 95.89, color: '#f59e0b' },
                { name: 'خط 2', max: 11213, actual: 10333, gap: -880, eff: 92.15, color: '#06b6d4' },
                { name: 'خط 3', max: 10819, actual: 9535, gap: -1284, eff: 88.14, color: '#a855f7' },
                { name: 'خط 4', max: 11239, actual: 10939, gap: -300, eff: 97.33, color: '#10b981' }
            ],
            downtime: {
                'نقص بلتات': 373,
                'امتلاء خزانات': 17.3,
                'صيانة': 8.5,
                'جهد كهربائي': 5,
                'تغيير داي وبكر': 5.5,
                'عدم وجود علف': 1.55
            },
            weekly: {
                labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                line1: [90, 94, 96, 124],
                line2: [94, 87, 90, 109],
                line3: [85, 84, 86, 120],
                line4: [99, 87, 96, 131]
            },
            profile: {
                labels: ['خط 1', 'خط 2', 'خط 3', 'خط 4'],
                p1: [93.7, 0, 83.5, 88.2],
                p2: [0, 89.2, 92.8, 96.0]
            },
            shifts: { labels: ['الوردية الأولى\n7ص - 3م', 'الوردية الثانية\n3م - 11م', 'الوردية الثالثة\n11م - 7ص'], values: [708, 748, 642] },
            totalActual: 40923,
            totalMax: 43821,
            totalDowntime: 410.35,
            totalWorkingHours: 1621
        };

        document.getElementById('loadingOverlay').classList.add('active');
        setTimeout(() => {
            updateDashboard(sampleData);
            document.getElementById('loadingOverlay').classList.remove('active');
            document.getElementById('statusText').textContent = 'بيانات تجريبية';
            showToast('تم تحميل البيانات التجريبية — ارفع ملفك لتشغيل الداشبورد ببياناتك الحقيقية', 'info');
        }, 600);
    }

    // ========================================
    // إزالة البيانات
    // ========================================
    function clearData() {
        document.getElementById('fileInfoBar').classList.remove('show');
        uploadZone.classList.remove('has-file');
        document.getElementById('statusText').textContent = 'بيانات افتراضية';
        fileInput.value = '';
        localStorage.removeItem('lastFileName');
        localStorage.removeItem('lastUpload');
        showToast('تم إزالة الملف', 'info');
    }

    // ========================================
    // تبديل عرض Dataset
    // ========================================
    function toggleDataset(chartId, baseIdx, btn, mode) {
        document.querySelectorAll(`[data-chart="${chartId}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const chart = charts[chartId];
        if (mode === 'actual') {
            chart.data.datasets[baseIdx].hidden = false;
            chart.data.datasets[baseIdx + 1].hidden = true;
        } else if (mode === 'max') {
            chart.data.datasets[baseIdx].hidden = true;
            chart.data.datasets[baseIdx + 1].hidden = false;
        } else {
            chart.data.datasets[baseIdx].hidden = false;
            chart.data.datasets[baseIdx + 1].hidden = false;
        }
        chart.update('active');
    }

    // ========================================
    // نظام التوست
    // ========================================
    function showToast(message, type) {
        const toast = document.getElementById('toast');
        toast.className = 'toast ' + type;
        const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
        toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => toast.classList.remove('show'), 4000);
    }

    // ========================================
    // سكربت البايثون لمراقبة المجلد
    // ========================================
    function showPythonScript() {
        const code = `# =============================================
# سكربت مراقبة مجلد ملف الإكسيل
# يراقب التغييرات ويبعت البيانات للداشبورد
# =============================================
# التثبيت المطلوب:
# pip install watchdog

import os
import json
import time
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import threading
import openpyxl

EXCEL_FILE = "pelleting_machine_capacity%20(6-2026)..XLSX"
DASHBOARD_PORT = 8765

def parse_excel(filepath):
    """قراءة وتحليل ملف الإكسيل مثل الداشبورد"""
    wb = openpyxl.load_workbook(filepath, data_only=True)
    result = {"status": "ok", "file": os.path.basename(filepath)}

    # قراءة شيت Actual Capacity
    if "Actual Capacity" in wb.sheetnames:
        ws = wb["Actual Capacity"]
        daily = []
        for row in ws.iter_rows(min_row=2, values_only=True):
            if row[0] and hasattr(row[0], 'day'):
                daily.append({
                    "date": f"{row[0].day}/{row[0].month}",
                    "line": row[1],
                    "profile": row[2],
                    "hours": row[3],
                    "actual": row[4],
                    "max": row[5],
                    "downtime": row[10],
                    "comment": row[11]
                })
        result["daily"] = daily

    wb.close()
    return result

class ExcelHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith(('.xlsx', '.xls', '.csv')):
            print(f"[{time.strftime('%H:%M:%S')}] تم اكتشاف تعديل: {event.src_path}")
            try:
                data = parse_excel(event.src_path)
                # حفظ كـ JSON لقراءته من الداشبورد
                with open("latest_data.json", "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2, default=str)
                print(f"  -> تم تحديث latest_data.json ({len(data.get('daily',[]))} صف)")
            except Exception as e:
                print(f"  -> خطأ: {e}")

def start_file_watcher():
    """تشغيل مراقب المجلد"""
    folder = os.path.dirname(os.path.abspath(EXCEL_FILE)) or "."
    print(f"مراقبة المجلد: {folder}")
    print(f"الملف المستهدف: {EXCEL_FILE}")
    print("-" * 50)

    event_handler = ExcelHandler()
    observer = Observer()
    observer.schedule(event_handler, folder, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    # فتح الداشبورد في المتصفح
    dashboard_path = os.path.abspath("dashboard.html")
    if os.path.exists(dashboard_path):
        webbrowser.open(f"http://localhost:{DASHBOARD_PORT}")
        print(f"تم فتح الداشبورد: http://localhost:{DASHBOARD_PORT}")

    # تشغيل المراقب في thread منفصل
    watcher_thread = threading.Thread(target=start_file_watcher, daemon=True)
    watcher_thread.start()

    # تشغيل سيرفر بسيط للداشبورد
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")
    server = HTTPServer(("", DASHBOARD_PORT), SimpleHTTPRequestHandler)
    print(f"سيرفر الداشبورد يعمل على المنفذ {DASHBOARD_PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\\nتم الإيقاف.")
        server.server_close()`;

        document.getElementById('pythonCode').textContent = code;
        document.getElementById('scriptModal').style.display = 'flex';
    }

    function showAutoRefreshSettings() {
        document.getElementById('autoRefreshModal').style.display = 'flex';
    }

    function closeModal(id) {
        document.getElementById(id).style.display = 'none';
    }

    // إغلاق المودال بالضغط خارجه
    document.querySelectorAll('[id$="Modal"]').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    });

    function copyCode(elementId) {
        const code = document.getElementById(elementId).textContent;
        navigator.clipboard.writeText(code).then(() => {
            showToast('تم نسخ الكود بنجاح', 'success');
        }).catch(() => {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('تم نسخ الكود', 'success');
        });
    }

    // ========================================
    // التحديث الدوري
    // ========================================
    function startAutoRefresh() {
        const interval = parseInt(document.getElementById('refreshInterval').value) * 60 * 1000;
        const filePath = document.getElementById('filePath').value.trim();

        if (!filePath) {
            showToast('يُرجى تحديد مسار ملف الإكسيل', 'error');
            return;
        }

        // محاولة قراءة الملف (تعمل مع file:// في Firefox)
        // في باقي المتصفحات تحتاج سيرفر محلي
        stopAutoRefresh();

        async function refreshCycle() {
            try {
                const response = await fetch(filePath);
                const buffer = await response.arrayBuffer();
                const data = new Uint8Array(buffer);
                const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                const parsed = parseExcelFile(workbook);
                updateDashboard(parsed);
                document.getElementById('autoRefreshStatus').innerHTML =
                    `<span class="text-emerald-400"><i class="fas fa-check-circle ml-1"></i>آخر تحديث: ${new Date().toLocaleTimeString('ar-EG')}</span>`;
            } catch (err) {
                document.getElementById('autoRefreshStatus').innerHTML =
                    `<span class="text-rose-400"><i class="fas fa-xmark-circle ml-1"></i>خطأ: ${err.message}</span>`;
            }
        }

        refreshCycle(); // أول مرة فوراً
        autoRefreshTimer = setInterval(refreshCycle, interval);
        closeModal('autoRefreshModal');
        showToast(`تم تفعيل التحديث الدوري كل ${document.getElementById('refreshInterval').value} دقيقة`, 'success');
    }

    function stopAutoRefresh() {
        if (autoRefreshTimer) {
            clearInterval(autoRefreshTimer);
            autoRefreshTimer = null;
        }
        document.getElementById('autoRefreshStatus').innerHTML = '<span class="text-[var(--muted)]">متوقف</span>';
    }

    // ========================================
    // جسيمات الخلفية
    // ========================================
    function createParticles() {
        const container = document.getElementById('particles');
        const colors = ['rgba(245,158,11,0.15)', 'rgba(6,182,212,0.12)', 'rgba(16,185,129,0.1)'];
        for (let i = 0; i < 12; i++) {
            const p = document.createElement('div');
            p.className = 'floating-particle';
            const size = Math.random() * 4 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDuration = (Math.random() * 15 + 15) + 's';
            p.style.animationDelay = (Math.random() * 20) + 's';
            container.appendChild(p);
        }
    }
    createParticles();

    // ========================================
    // التهيئة الأولية
    // ========================================
    initEmptyCharts();

    // التحقق من وجود ملف محفوظ سابقاً
    const lastFile = localStorage.getItem('lastFileName');
    if (lastFile) {
        document.getElementById('statusText').textContent = 'آخر ملف: ' + lastFile;
    }
    