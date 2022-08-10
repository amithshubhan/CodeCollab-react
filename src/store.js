import create from 'zustand'

export const useStore = create((set) => ({
  username: null,
  roomId: null,
  text: '',
  setUsername: (username) => set(() => ({ username })),
  setRoomId: (roomId) => set(() => ({ roomId: roomId })),
  setText: (text) => set(() => ({text})),
}))
