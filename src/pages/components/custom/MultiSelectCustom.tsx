import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"

type MultiSeclectOptions = {
  value: number,
  label: string,
}

type Props = {
  overflowBehavior?: "wrap-when-open" | "wrap" | "cutoff",
  options: MultiSeclectOptions[],
  onChange: (value: string[]) => void
  value: string[],
}

export default function MultiSelectCustom({
  overflowBehavior = "wrap",
  options,
  onChange,
  value,
}: Props) {
  return (
    <>
      <MultiSelect
        onValuesChange={onChange}
        values={value}
      >
        <MultiSelectTrigger className="w-full max-w-[400px]">
          <MultiSelectValue placeholder="Select frameworks..." overflowBehavior={overflowBehavior} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            onChange
            {
              options?.map(item => (
                <MultiSelectItem key={item.value} value={item.label}>{item.label}</MultiSelectItem>
              )) ?? []
            }
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </>
  )
}
