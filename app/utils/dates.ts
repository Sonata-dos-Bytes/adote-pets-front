export function calculateAge(birth: string | null): string {
  if (!birth) return 'Idade desconhecida';
  try {
    const b = new Date(birth);
    const now = new Date();
    let years = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) {
      years--;
    }
    if (years <= 0) {
      const months = (now.getFullYear() - b.getFullYear()) * 12 + m;
      if (months <= 1) return `${months} mês`;
      return `${months} meses`;
    }
    return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  } catch {
    return 'Idade desconhecida';
  }
}
