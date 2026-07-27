export function FeaturedListings() {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm border">
      <h4 className="font-semibold mb-3">Рекомендовані оголошення</h4>

      <div className="flex flex-col gap-3">
        {/* Тут будуть міні-карточки */}
        <div className="p-2 border rounded">Оголошення №1</div>
        <div className="p-2 border rounded">Оголошення №2</div>
        <div className="p-2 border rounded">Оголошення №3</div>
      </div>
    </div>
  );
}
