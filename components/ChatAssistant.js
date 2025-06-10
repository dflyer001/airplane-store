import { useState } from 'react';
function detect(cmd) {
  const t = cmd.toLowerCase();
  if (t.includes('price') && (t.includes('low') || t.includes('asc'))) return 'price-low';
  if (t.includes('price') && (t.includes('high') || t.includes('desc'))) return 'price-high';
  if (t.includes('newest')) return 'newest';
  if (t.includes('oldest')) return 'oldest';
  return null;
}
export default function ChatAssistant({ onSort }) {
  const [msgs,setMsgs]=useState([{sender:'ai',text:'Hi! Type “sort by price low / high / newest / oldest”.'}]);
  const [inp,setInp]=useState('');
  const send=()=>{
    if(!inp.trim())return;
    const user={sender:'user',text:inp};
    const next=[...msgs,user];
    const cmd=detect(inp);
    if(cmd){ onSort(cmd); next.push({sender:'ai',text:`Catalog sorted (${cmd.replace('-',' ')}) ✅`}); }
    else { next.push({sender:'ai',text:'I understand only simple sort commands for now.'}); }
    setMsgs(next); setInp('');
  };
  return (
    <div className="border rounded-lg p-4 bg-gray-50 max-w-lg mx-auto">
      <h4 className="font-semibold mb-2 text-center">AI Assistant</h4>
      <div className="h-60 overflow-y-auto space-y-2 mb-2">
        {msgs.map((m,i)=>(
          <div key={i} className={\`p-2 rounded max-w-[80%] \${m.sender==='ai'?'bg-blue-100':'bg-green-100 self-end ml-auto'}\`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input className="flex-grow border p-2 rounded" placeholder="Type..." value={inp}
               onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}/>
        <button onClick={send} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
