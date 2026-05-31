import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function YearSelect({ value, onChange }: { value?: number | null; onChange: (val: number) => void }) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <Select value={value?.toString()} onValueChange={(val) => onChange(Number(val))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((y) => (
          <SelectItem key={y} value={y.toString()}>
            {y}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
