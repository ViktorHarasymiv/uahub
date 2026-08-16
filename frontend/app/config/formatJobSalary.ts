export const formatJobSalary = (fields: any) => {
  const { salaryFrom, salaryTo, salaryType, salaryPeriod, employmentType } =
    fields;

  // Якщо зарплати немає — повертаємо пусто
  if (!salaryFrom && !salaryTo) return "";

  // Форматування чисел з пробілами: 6000 → 6 000
  const formatNumber = (num: number) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Діапазон зарплати
  const salaryRange =
    salaryFrom && salaryTo
      ? `${formatNumber(salaryFrom)} – ${formatNumber(salaryTo)}`
      : salaryFrom
        ? `${formatNumber(salaryFrom)}`
        : `${formatNumber(salaryTo)}`;

  // Тип зарплати (brutto/netto)
  const type = salaryType ? salaryType.toLowerCase() : "";

  // Період оплати
  const period = salaryPeriod ? salaryPeriod.toLowerCase() : "";

  // Форма працевлаштування
  const emp = employmentType ? employmentType : "";

  return `${salaryRange} zł ${type} / ${period} | ${emp}`;
};
