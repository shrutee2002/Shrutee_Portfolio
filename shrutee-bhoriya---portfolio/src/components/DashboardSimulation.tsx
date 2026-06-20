import React, { useState } from 'react';
import { Play, Database, FileSpreadsheet, RefreshCw } from 'lucide-react';

interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
  conversion: number;
}

const CATEGORY_DATA = {
  All: [
    { label: 'Jan', revenue: 6500, orders: 120, conversion: 2.1 },
    { label: 'Feb', revenue: 8200, orders: 154, conversion: 2.4 },
    { label: 'Mar', revenue: 12400, orders: 210, conversion: 3.1 },
    { label: 'Apr', revenue: 9800, orders: 180, conversion: 2.7 },
    { label: 'May', revenue: 14500, orders: 250, conversion: 3.5 },
    { label: 'Jun', revenue: 18900, orders: 320, conversion: 3.9 },
  ],
  Electronics: [
    { label: 'Jan', revenue: 4200, orders: 60, conversion: 1.8 },
    { label: 'Feb', revenue: 5100, orders: 75, conversion: 2.0 },
    { label: 'Mar', revenue: 7800, orders: 95, conversion: 2.5 },
    { label: 'Apr', revenue: 6000, orders: 82, conversion: 2.2 },
    { label: 'May', revenue: 9100, orders: 110, conversion: 2.9 },
    { label: 'Jun', revenue: 11500, orders: 145, conversion: 3.2 },
  ],
  Fashion: [
    { label: 'Jan', revenue: 1500, orders: 45, conversion: 2.5 },
    { label: 'Feb', revenue: 2100, orders: 58, conversion: 2.8 },
    { label: 'Mar', revenue: 3100, orders: 80, conversion: 3.4 },
    { label: 'Apr', revenue: 2600, orders: 70, conversion: 3.0 },
    { label: 'May', revenue: 3800, orders: 105, conversion: 3.8 },
    { label: 'Jun', revenue: 5200, orders: 130, conversion: 4.2 },
  ],
  HomeLiving: [
    { label: 'Jan', revenue: 800, orders: 15, conversion: 2.2 },
    { label: 'Feb', revenue: 1000, orders: 21, conversion: 2.4 },
    { label: 'Mar', revenue: 1500, orders: 35, conversion: 3.2 },
    { label: 'Apr', revenue: 1200, orders: 28, conversion: 2.8 },
    { label: 'May', revenue: 1600, orders: 35, conversion: 3.4 },
    { label: 'Jun', revenue: 2200, orders: 45, conversion: 3.8 },
  ],
};

const MOCK_METRIC_CARDS = {
  All: [
    { title: 'Total Revenue', value: '$70,300', growth: '+24.5%', label: 'vs previous H1' },
    { title: 'Total Orders', value: '1,234', growth: '+15.2%', label: 'avg order size 43$' },
    { title: 'Avg Conversion', value: '2.95%', growth: '+8.4%', label: 'Cart completion rate' },
  ],
  Electronics: [
    { title: 'Total Revenue', value: '$43,700', growth: '+31.2%', label: '62% of business' },
    { title: 'Total Orders', value: '567', growth: '+12.4%', label: 'High basket value' },
    { title: 'Avg Conversion', value: '2.43%', growth: '+4.1%', label: 'Extended consideration' },
  ],
  Fashion: [
    { title: 'Total Revenue', value: '$18,300', growth: '+18.1%', label: 'Return rate 12%' },
    { title: 'Total Orders', value: '496', growth: '+22.5%', label: 'High frequency repeat' },
    { title: 'Avg Conversion', value: '3.28%', growth: '+12.0%', label: 'High organic funnel' },
  ],
  HomeLiving: [
    { title: 'Total Revenue', value: '$8,300', growth: '+11.4%', label: 'Furniture spikes' },
    { title: 'Total Orders', value: '171', growth: '+5.8%', label: 'Bulk seasonal shipping' },
    { title: 'Avg Conversion', value: '2.96%', growth: '+2.5%', label: 'High catalog views' },
  ],
};

const SQL_TEMPLATES = [
  {
    name: 'Highest margin products queries',
    query: `SELECT product_id, product_name, price, cost,\n       (price - cost) AS margin_absolute,\n       ROUND(((price - cost) / price) * 100, 2) AS margin_percentage\nFROM products_meta\nORDER BY margin_percentage DESC\nLIMIT 5;`,
    headers: ['Product ID', 'Product Name', 'Price ($)', 'Cost ($)', 'Margin', 'Margin (%)'],
    rows: [
      ['EL-8849', 'OLED Cinema Screen 45"', '1,299.00', '840.00', '459.00', '35.33'],
      ['FA-4043', 'Organic Cotton Canvas Bag', '45.00', '12.50', '32.50', '72.22'],
      ['HI-1211', 'Luxe Porcelain Teaset 8pc', '120.00', '44.00', '76.00', '63.33'],
      ['EL-9302', 'Mini ANC Audiobuds Pro', '150.00', '62.00', '88.00', '58.67'],
      ['FA-1849', 'Merino Wool Thermal Knitwear', '110.00', '48.00', '62.00', '56.36'],
    ],
  },
  {
    name: 'Customer Lifetime Value Cohorts',
    query: `SELECT DATE_FORMAT(u.signup_date, '%Y-%m') AS cohort_month,\n       COUNT(DISTINCT u.user_id) AS cohort_size,\n       ROUND(SUM(o.amount_paid), 2) AS total_ltv,\n       ROUND(SUM(o.amount_paid) / COUNT(DISTINCT u.user_id), 2) AS arpu\nFROM users u\nLEFT JOIN orders_analytics o ON u.user_id = o.user_id\nGROUP BY cohort_month\nORDER BY cohort_month DESC;`,
    headers: ['Cohort', 'Cohort Size', 'Total Income ($)', 'ARPU ($)'],
    rows: [
      ['2026-05', '124 users', '13,540.00', '109.19'],
      ['2026-04', '98 users', '11,400.00', '116.32'],
      ['2026-03', '156 users', '23,400.00', '150.00'],
      ['2026-02', '112 users', '18,810.00', '167.94'],
      ['2026-01', '85 users', '15,640.00', '184.00'],
    ],
  },
  {
    name: 'Transaction Anomalies Detection',
    query: `SELECT transaction_id, user_email, amount_units, ip_country, fraud_index\nFROM incoming_transactions\nWHERE amount_units > 2500\n   OR fraud_index > 0.85\n   OR ip_country NOT IN (SELECT billing_country FROM geo_profiles)\nORDER BY fraud_index DESC;`,
    headers: ['TX ID', 'User Email', 'Units ($)', 'Country', 'Fraud Score'],
    rows: [
      ['TX-55342', 'r***@cybermesh.cc', '4,800.00', 'Unknown', '0.94'],
      ['TX-44391', 'm***@pockethound.org', '3,100.00', 'Romania', '0.88'],
      ['TX-09202', 's***@proton.me', '2,900.00', 'Russia', '0.86'],
    ],
  },
];

export default function DashboardSimulation() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Electronics' | 'Fashion' | 'HomeLiving'>('All');
  const [activeSqlId, setActiveSqlId] = useState<number>(0);
  const [sqlTermInput, setSqlTermInput] = useState<string>(SQL_TEMPLATES[0].query);
  const [sqlResults, setSqlResults] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [isExecutingSql, setIsExecutingSql] = useState<boolean>(false);

  const currentPoints = CATEGORY_DATA[selectedCategory];
  const maxRevenue = Math.max(...currentPoints.map((p) => p.revenue));

  const handleSqlSelect = (index: number) => {
    setActiveSqlId(index);
    setSqlTermInput(SQL_TEMPLATES[index].query);
    setSqlResults(null);
  };

  const handleRunQuery = () => {
    setIsExecutingSql(true);
    setTimeout(() => {
      setSqlResults({
        headers: SQL_TEMPLATES[activeSqlId].headers,
        rows: SQL_TEMPLATES[activeSqlId].rows,
      });
      setIsExecutingSql(false);
    }, 850);
  };

  return (
    <div id="ecommerce-dashboard-main" className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/85 shadow-lg backdrop-blur-sm">
      
      {/* LEFT COL: Interactive controls and widgets (8 spans on Large screens) */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-sky-400" />
              E-Commerce Analytics Portal
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Bi-weekly predictive analytics reports &bull; Active H1 Sales Data</p>
          </div>
          
          <div className="flex flex-wrap gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            {(['All', 'Electronics', 'Fashion', 'HomeLiving'] as const).map((catName) => (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`text-[11px] px-3 py-1.5 rounded-md font-mono transition-all ${
                  selectedCategory === catName
                    ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold shadow-md shadow-sky-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                {catName === 'HomeLiving' ? 'Home & Living' : catName}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_METRIC_CARDS[selectedCategory].map((card, idx) => (
            <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700/80 transition-all flex flex-col justify-between relative group overflow-hidden">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">{card.title}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-xl md:text-2xl font-sans tracking-tight text-slate-100 font-extrabold">{card.value}</span>
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/40 border border-teal-900/50 px-1.5 py-0.5 rounded">{card.growth}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans mt-1.5 italic">&bull; {card.label}</span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/3 rounded-full blur-xl group-hover:bg-sky-500/5 transition-all pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Main interactive SVG Revenue bar chart with glass-morphic depth */}
        <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 animate-pulse" />
              Monthly Normalized Revenue Trend ($)
            </span>
            <span className="text-[10px] font-mono text-slate-500">H1 Reporting Range</span>
          </div>

          <div className="relative h-[180px] w-full flex items-end justify-between px-2 pt-6 pb-2">
            {/* Guide Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-mono text-slate-600/70 py-2 border-b border-slate-800/50">
              <div className="border-b border-slate-800/30 pb-0.5">${maxRevenue.toLocaleString()}</div>
              <div className="border-b border-slate-800/30 pb-0.5">${(maxRevenue * 0.66).toLocaleString().split('.')[0]}</div>
              <div className="border-b border-slate-800/30 pb-0.5">${(maxRevenue * 0.33).toLocaleString().split('.')[0]}</div>
              <div className="pb-0.5">$0</div>
            </div>

            {currentPoints.map((item, idx) => {
              const barHeightPercent = (item.revenue / maxRevenue) * 100;
              return (
                <div key={idx} className="flex flex-col items-center flex-1 h-full relative group">
                  {/* Hover tooltip */}
                  <div className="absolute -top-7 opacity-0 pointer-events-none group-hover:opacity-100 transition-all bg-slate-900 border border-slate-800 text-white font-mono text-[9px] px-2 py-1 rounded shadow-xl z-20 whitespace-nowrap">
                    Rev: <strong className="text-sky-300">${item.revenue.toLocaleString()}</strong> &bull; Conv: <strong className="text-pink-400">{item.conversion}%</strong>
                  </div>

                  {/* Glass isometric styled Column */}
                  <div className="w-8 md:w-12 bg-slate-800/40 rounded-t-lg flex items-end h-full relative overflow-hidden transition-all duration-300">
                    <div
                      style={{ height: `${barHeightPercent}%` }}
                      className="w-full bg-gradient-to-t from-indigo-950/60 via-indigo-500/40 to-sky-400/85 rounded-t-md relative transition-all duration-700 ease-out flex items-start justify-center group-hover:brightness-110"
                    >
                      {/* Top highlight line */}
                      <div className="w-full h-[2px] bg-sky-200" />
                    </div>
                  </div>

                  {/* Horizontal Labels */}
                  <span className="text-[10px] text-slate-400 font-mono mt-2">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT COL: Custom SQL Sandbox Interface (4 spans on LG screens) */}
      <div className="lg:col-span-4 bg-slate-950/90 rounded-xl border border-slate-800 p-4 flex flex-col justify-between gap-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h5 className="text-xs font-bold font-mono tracking-wider text-fuchsia-400 flex items-center gap-2">
            <Database className="w-4 h-4" />
            MySQL Relational Engine
          </h5>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-md shadow-emerald-500/20" />
        </div>

        {/* Selector for pre-written complex analytic queries */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Select Analytical Objective</span>
          {SQL_TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => handleSqlSelect(idx)}
              className={`text-[10px] text-left p-2 rounded-md border transition-all ${
                activeSqlId === idx
                  ? 'bg-fuchsia-950/40 border-fuchsia-800 text-fuchsia-300'
                  : 'bg-slate-900/60 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              &bull; {tmpl.name}
            </button>
          ))}
        </div>

        {/* Live SQL Input frame / Readonly Textarea */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Interactive Query Console</span>
            <span className="text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400">MySQL 8.2</span>
          </div>
          <textarea
            value={sqlTermInput}
            onChange={(e) => setSqlTermInput(e.target.value)}
            className="w-full text-[10px]/normal text-emerald-400 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono h-[110px] focus:outline-none focus:border-fuchsia-800 resize-none outline-none leading-relaxed"
            placeholder="Write analytical queries..."
          />
        </div>

        {/* Run SQL CTA */}
        <button
          onClick={handleRunQuery}
          disabled={isExecutingSql}
          className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-lg py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold hover:shadow-lg transition-all border border-fuchsia-400/25 disabled:brightness-75 font-mono cursor-pointer"
        >
          {isExecutingSql ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Querying database indexes...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Execute MySQL Query
            </>
          )}
        </button>

        {/* Output table */}
        <div className="border border-slate-850 bg-slate-950 p-2.5 rounded-lg h-[115px] overflow-auto flex flex-col justify-start">
          {isExecutingSql ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center text-[10px] gap-2 py-4">
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
              <span>Full table scan in progress (0.003s)</span>
            </div>
          ) : sqlResults ? (
            <table className="w-full text-left text-[9px]/tight font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  {sqlResults.headers.map((h, i) => (
                    <th key={i} className="pb-1 text-[8px] uppercase tracking-wider font-extrabold pr-2 font-mono whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {sqlResults.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="text-slate-300 hover:bg-slate-900/50">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-1.5 pr-2 whitespace-nowrap truncate max-w-[80px] font-mono">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-600 text-center text-[10px] py-4">
              <span>Execute SQL to view result set</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
