import React, { useState } from 'react'
const currencies = [
  { code: "USD", country: "United States" },
  { code: "INR", country: "India" },
  { code: "EUR", country: "European Union" },
  { code: "GBP", country: "United Kingdom" },
  { code: "AUD", country: "Australia" },
  { code: "CAD", country: "Canada" },
  { code: "JPY", country: "Japan" },
  { code: "CNY", country: "China" },
  { code: "CHF", country: "Switzerland" },
  { code: "NZD", country: "New Zealand" },
  { code: "SGD", country: "Singapore" },
  { code: "HKD", country: "Hong Kong" },
  { code: "KRW", country: "South Korea" },
  { code: "ZAR", country: "South Africa" },
  { code: "BRL", country: "Brazil" },
  { code: "MXN", country: "Mexico" },
  { code: "RUB", country: "Russia" },
  { code: "TRY", country: "Turkey" },
  { code: "SEK", country: "Sweden" },
  { code: "NOK", country: "Norway" },
  { code: "DKK", country: "Denmark" },
  { code: "PLN", country: "Poland" },
  { code: "CZK", country: "Czech Republic" },
  { code: "HUF", country: "Hungary" },
  { code: "RON", country: "Romania" },
  { code: "ILS", country: "Israel" },
  { code: "THB", country: "Thailand" },
  { code: "MYR", country: "Malaysia" },
  { code: "IDR", country: "Indonesia" },
  { code: "PHP", country: "Philippines" },
  { code: "PKR", country: "Pakistan" },
  { code: "BDT", country: "Bangladesh" },
  { code: "LKR", country: "Sri Lanka" },
  { code: "NPR", country: "Nepal" },
  { code: "AED", country: "United Arab Emirates" },
  { code: "SAR", country: "Saudi Arabia" },
  { code: "QAR", country: "Qatar" },
  { code: "KWD", country: "Kuwait" },
  { code: "OMR", country: "Oman" },
  { code: "EGP", country: "Egypt" },
  { code: "NGN", country: "Nigeria" },
  { code: "KES", country: "Kenya" },
  { code: "GHS", country: "Ghana" },
  { code: "ARS", country: "Argentina" },
  { code: "CLP", country: "Chile" },
  { code: "COP", country: "Colombia" },
  { code: "PEN", country: "Peru" },
  { code: "VND", country: "Vietnam" },
  { code: "ISK", country: "Iceland" }
];  

const curr = () => {
   const [value,setalue]=useState(0);
   const [result,setresult]=useState("--");
    const [loading, setLoading] = useState(false);
     
   const [label1,setLable1]=useState("USD");
   const [label2,setLable2]=useState("INR");

  const interchange = () => {
    setLable1(label2);
    setLable2(label1);
  };
  const convert = async () => {
  if (!value) return;

  setLoading(true);

  try {
    const api = await fetch(
      `https://api.frankfurter.app/latest?amount=${value}&from=${label1}&to=${label2}`
    );

    const response = await api.json();
    setresult(response.rates[label2]);
  } catch (err) {
    setresult("Error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 text-slate-800">
      <div className="bg-[#1e293b] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-700/50">
        <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Currency Converter
        </h1>
        {/* Amount */}
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 ml-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={value}
            onChange={(e)=>(setalue(e.target.value))}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-600"
          />
        </div>
        {/* From */}
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 ml-1">
            From
          </label>
          <select className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 appearance-none cursor-pointer text-white"
                  value={label1}
                 onChange={(e)=>setLable1(e.target.value)}   >
              {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.country} ({c.code})
            </option>
          ))}      
          </select>
        </div>
        <div className="mb-8">
        <div className='flex  gap-[40%]'>

          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 ml-1">
            To  
           </label>
            <button  className='text-3xl   cursor-pointer mb-2'  onClick={interchange} >🔄</button>
        </div>
          
          <select className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 appearance-none cursor-pointer  text-white"
            value={label2}
            onChange={(e)=>setLable2(e.target.value)}   >
             {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.country} ({c.code})
            </option>
          ))}
          </select>
        </div>
        {/* Button */}
        <button className="w-full bg-indigo-600 hover:bg-red-200 text-white hover:text-black font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 "  
          onClick={convert} disabled={loading}>     
          Convert Now
        </button>

        {/* Result */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-700 border-dashed text-center">
          <p className="text-slate-400 text-sm mb-1">Converted Amount</p>
          <div className="text-2xl font-mono font-bold text-indigo-400">
            {result}
          </div>
        </div>

      </div>
    </div>
  )
}
export default curr