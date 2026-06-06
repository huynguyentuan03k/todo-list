import { useEffect, useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select"
import { useQueryClient } from "@tanstack/react-query"
import i18n from "i18next"
import FlagMap from "./language-flags"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const languageLabels = {
  en: "English",
  vi: "Tiếng Việt",
} as const

type LanguageKey = keyof typeof languageLabels

export default function LanguageSelect() {
  const queryClient = useQueryClient()
  const [value, setValue] = useState<LanguageKey>(
    (i18n.language?.slice(0, 2) as LanguageKey) ?? "en"
  )

  useEffect(() => {
    const next = (i18n.language?.slice(0, 2) as LanguageKey) ?? "en"
    setValue(next in languageLabels ? next : "en")
    const handleLanguageChanged = (lng: string) => {
      const normalized = (lng?.slice(0, 2) as LanguageKey) ?? "en"
      setValue(normalized in languageLabels ? normalized : "en")
    }

    i18n.on("languageChanged", handleLanguageChanged)
    return () => {
      i18n.off("languageChanged", handleLanguageChanged)
    }
  }, [])

  const currentLabel = useMemo(() => languageLabels[value] ?? "English", [value])

  return (
    <Tooltip>
      <Select
        value={value}
        onValueChange={(val) => {
          const next = val as LanguageKey
          setValue(next)

          queryClient.removeQueries({
            queryKey: ["my_account_profile"],
            exact: true,
          })

          void i18n.changeLanguage(next)
        }}
      >
        <TooltipTrigger asChild>
          <SelectTrigger
            className="h-15 w-15 rounded-sm shadow-sm backdrop-blur"
            aria-label={`Language: ${currentLabel}`}
          >
            <span className="flex items-center justify-center">
              {FlagMap[value]}
            </span>
          </SelectTrigger>
        </TooltipTrigger>
        <TooltipContent className="border-blue-500 bg-blue-600 text-white shadow-lg">
          {currentLabel}
        </TooltipContent>
        <SelectContent>
          {(Object.keys(languageLabels) as LanguageKey[]).map((lang) => (
            <SelectItem key={lang} value={lang}>
              <div className="flex items-center gap-2">
                {FlagMap[lang]}
                <span>{languageLabels[lang]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Tooltip>
  )
}
