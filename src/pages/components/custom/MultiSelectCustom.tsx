import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"
import { SpinnerLoading } from "./SpinnerLoading"

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
  contentDisplay?: (value: MultiSeclectOptions) => string,
  isLoading: boolean,
}

export default function MultiSelectCustom({
  overflowBehavior = "wrap",
  options,
  onChange,
  value,
  singleSelect = false,
  contentDisplay = (item) => (item.label),
  isLoading,
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

              isLoading == false ? (
                options?.map(item => (
                  /**
                   * trong react :
                   * ket : React dùng: Để quản lý danh sách trên DOM
                   * value: Form dùng: Khi click, mảng (mang nay duoc hien thi ra theo kieu nay   contentDisplay = (item) => (item.label) ) kết quả sẽ thêm số 10
                   * Người dùng thấy: Chữ "Nguyễn Văn A" hiển thị trên màn hình tron nguyen van a => lay so 10
                   */
                  <MultiSelectItem key={item.value} value={item.value.toString()}>
                    {
                      contentDisplay(item)
                    }
                  </MultiSelectItem>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <SpinnerLoading />
                </div>
              )

            }
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </>
  )
}
