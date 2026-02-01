import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode
}

// here we can initialise with any value we want.
export const AppAudioContext = createContext({});

// bọc vào các component nào muốn dùng chung các state này , vì ko biết children sẽ là các componenet nào nên định nghĩa chung là kiểu React.ReactNode
export const AudioProvider = ({ children }: Props) => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return <AppAudioContext.Provider value={{ isPlaying }}>
    {children}
  </AppAudioContext.Provider>;

};

export const AudioConsumer = AppAudioContext.Consumer;

export default AppAudioContext;
