import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { useQueryClient } from '@tanstack/react-query'
import i18n from 'i18next'
import FlagMap from './language-flags'


export default function LanguageSelect() {
  const queryClient = useQueryClient()

  return (
    <Select
      defaultValue={i18n.language}
      onValueChange={(val) => {
        queryClient.removeQueries({
          queryKey: ['my_account_profile'],
          exact: true
        })

        void i18n.changeLanguage(val)
      }}
    >
      <SelectTrigger className='w-24'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        {['en', 'vi'].map((lang) => (
          <SelectItem key={lang} value={lang}>
            <div className='flex items-center gap-2'>
              {FlagMap[lang as keyof typeof FlagMap]}
              <span>{lang.toUpperCase()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

