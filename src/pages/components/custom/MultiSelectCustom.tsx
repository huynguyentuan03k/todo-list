import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"

export type MultiSeclectOptions = {
  value: number,
  label: string,
}

type Props = {
  overflowBehavior?: "wrap-when-open" | "wrap" | "cutoff",
  options: MultiSeclectOptions[],
  onChange: (value: string[]) => void
  value: string[],
  singleSelect?: boolean,
  contentDisplay?: (value: MultiSeclectOptions) => string
}

export default function MultiSelectCustom({
  overflowBehavior = "wrap",
  options,
  onChange,
  value,
  singleSelect = false,
  contentDisplay = (item) => (item.label)
}: Props) {
  return (
    <>
      <MultiSelect
        onValuesChange={onChange}
        values={value}
        single={singleSelect}
      >
        <MultiSelectTrigger className="w-full max-w-[400px]">
          <MultiSelectValue placeholder="Select frameworks..." overflowBehavior={overflowBehavior} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {
              options?.map(item => (
                <MultiSelectItem key={item.value} value={item.label}>
                  {
                    contentDisplay(item)
                  }
                </MultiSelectItem>
              )) ?? []
            }
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </>
  )
}
