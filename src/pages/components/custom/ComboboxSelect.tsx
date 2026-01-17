import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type comboboxOption = {
  label: string,
  value: number,
}

type Props = {

  /**
   * 1 / value?: number ,Đây là prop không bắt buộc.
   * 2 / value: number | undedfined , Đây là bắt buộc phải có prop value, nhưng nó có thể là undefined.
   */
  value: number | undefined,
  onChange: (value?: number) => void
  options: comboboxOption[]
  placeholder?: string
}

export function ComboboxSelect({
  value,
  onChange,
  options,
  placeholder = "Select..."
}: Props) {
  const [open, setOpen] = React.useState(false)
  const selectedOption = options.find(item => Number(item.value) === Number(value))
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? ` ${selectedOption?.label} - ID: ${selectedOption?.value}`
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={`${item.label} Id: ${item.value}`}

                  // on select co nhiem vu cap nhat lai form
                  onSelect={() => {
                    onChange(item.value) // cap nhat form
                    setOpen(false) // dong dropdown
                  }}

                >
                  {`${item.label}- ID: ${item.value}`}
                  <Check
                    className={cn(
                      "ml-auto",
                      Number(value) === Number(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  )

}
