import { useState } from 'react';
import AircraftCard from '../components/AircraftCard';
import ChatAssistant from '../components/ChatAssistant';
import LoginForm from '../components/LoginForm';

const initialCatalog = [
  { id:1, model:'Cessna 172 Skyhawk', price:145000, year:2012, image:'/cessna.jpg' },
  { id:2, model:'Pilatus PC-12 NGX', price:4200000, year:2021, image:'/pilatus.jpg' },
  { id:3, model:'Gulfstream G550', price:9800000, year:2020, image:'/gulfstream.jpg' }
];

export default function Home(){
  const [catalog,setCatalog]=useState(initialCatalog);
  const [auth,setAuth]=useState(null);   // {email, role}
  const [newPlane,setNewPlane]=useState({model:'',price:'',year:'',image:''});

  const sortCatalog=type=>{
    const sorted=[...catalog];
    switch(type){
      case 'price-low': sorted.sort((a,b)=>a.price-b.price); break;
      case 'price-high':sorted.sort((a,b)=>b.price-a.price); break;
      case 'newest': sorted.sort((a,b)=>b.year-a.year); break;
      case 'oldest': sorted.sort((a,b)=>a.year-b.year); break;
      default: return;
    }
    setCatalog(sorted);
  };

  /* ---------- login ---------- */
  if(!auth) return <LoginForm onLogin={setAuth}/>;

  /* ---------- add listing (seller) ---------- */
  const addListing=()=>{
    const {model,price,year,image}=newPlane;
    if(!model||!price||!year||!image) return;
    setCatalog([...catalog,{id:catalog.length+1,model,price:+price,year:+year,image}]);
    setNewPlane({model:'',price:'',year:'',image:''});
  };

  return(
    <div className="min-h-screen bg-white">
      <header className="shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">airplane.store</h1>
        <span className="text-sm">{auth.email} ({auth.role})</span>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-12">
        {/* AI assistant */}
        <ChatAssistant onSort={sortCatalog}/>

        {/* Catalog */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Aircraft Catalog</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {catalog.map(p=><AircraftCard key={p.id} plane={{...p,price:`€${p.price.toLocaleString()}`}}/>)}
          </div>
        </section>

        {/* Add listing form */}
        {auth.role==='seller'&&(
          <section className="max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">Add New Aircraft</h3>
            <input className="border p-2 rounded w-full mb-2" placeholder="Model"
                   value={newPlane.model} onChange={e=>setNewPlane({...newPlane,model:e.target.value})}/>
            <input className="border p-2 rounded w-full mb-2" placeholder="Price"
                   value={newPlane.price} onChange={e=>setNewPlane({...newPlane,price:e.target.value})}/>
            <input className="border p-2 rounded w-full mb-2" placeholder="Year"
                   value={newPlane.year} onChange={e=>setNewPlane({...newPlane,year:e.target.value})}/>
            <input className="border p-2 rounded w-full mb-4" placeholder="Image URL"
                   value={newPlane.image} onChange={e=>setNewPlane({...newPlane,image:e.target.value})}/>
            <button onClick={addListing} className="bg-green-600 text-white py-2 px-4 rounded">
              Add Listing
            </button>
          </section>
        )}
      </main>

      <footer className="text-center text-sm text-gray-400 py-4">
        &copy; {new Date().getFullYear()} airplane.store
      </footer>
    </div>
  );
}
