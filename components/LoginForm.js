import { useState } from 'react';
export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '', role: 'buyer' });
  const submit = () => {
    if (form.email && form.password) onLogin(form);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">airplane.store Login</h1>
        <input className="border p-2 rounded w-full mb-2" placeholder="Email"
               value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="border p-2 rounded w-full mb-2" placeholder="Password" type="password"
               value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <select className="border p-2 rounded w-full mb-4" value={form.role}
                onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button onClick={submit} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
}
