export default function AircraftCard({ plane }) {
  return (
    <div className="border rounded shadow-sm overflow-hidden">
      <img src={plane.image} alt={plane.model} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{plane.model}</h3>
        <p className="text-sm text-gray-600">{plane.year}</p>
        <p className="font-bold mt-2">{plane.price}</p>
      </div>
    </div>
  );
}
