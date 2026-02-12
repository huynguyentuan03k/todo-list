import React, { useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [useDebounce, setUseDebounce] = React.useState(value);
  // nếu gỗ chữ a sau 1 giây thì nó với thực thi hàm setTimeout này
  // nếu dưới 1 giây mà người dùng vẫn gỗ tiếp thì clearTimeout đi , tiếp tục chờ 1 giây tiếp
  // viết 1 hàm , hàm này dựa vào sự kiện side-effect trong onChange thay vì dựa vào trạng thái của state Title

  useEffect(() => {
    const idOfSettimeout = setTimeout(() => {
      // hành động quan trọng nhất khi vượt qua deplay ms
      console.log('done');
      setUseDebounce(value);
    }, delay);

    console.log('clear khi chưa chờ xong or đã chờ xong');
    
    return () => clearTimeout(idOfSettimeout);
  }, [delay, value]);

  return useDebounce;
}

export { useDebounce };
