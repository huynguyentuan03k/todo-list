import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode
}

// here we can initialise with any value we want.
export const AppAudioContext = createContext({});

// bọc vào các component nào muốn dùng chung các state này
export const AudioProvider = ({ children }: Props) => {

  return <AppAudioContext.Provider value={{}}>
    {children}
  </AppAudioContext.Provider>;

};

export const AudioConsumer = AppAudioContext.Consumer;

export default AppAudioContext;
