function useDebounce<T>(callback: (value: T) => void, delay: number) {
  // nếu gỗ chữ a sau 1 giây thì nó với thực thi hàm setTimeout này
  // nếu dưới 1 giây mà người dùng vẫn gỗ tiếp thì clearTimeout đi , tiếp tục chờ 1 giây tiếp
  // viết 1 hàm , hàm này dựa vào sự kiện side-effect trong onChange thay vì dựa vào trạng thái của state Title
}

export { useDebounce };
