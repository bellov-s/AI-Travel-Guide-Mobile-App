// components/ui/number-format.ts
export const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
export const formatNumber = (n: number) => nf.format(n);
