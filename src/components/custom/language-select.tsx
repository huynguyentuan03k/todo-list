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
      <SelectTrigger className="h-10 w-auto min-w-32 gap-2 rounded-full border-border/70 bg-background/80 px-3 shadow-sm backdrop-blur">
        <span className="flex items-center gap-2">
          {FlagMap[value]}
          <span className="text-sm font-medium">{currentLabel}</span>
        </span>
      </SelectTrigger>
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
  )
}
