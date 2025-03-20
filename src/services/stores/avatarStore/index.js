import { create } from "zustand";
import avatar1 from "../../../assets/images/Avatars/user01.png";
import avatar2 from "../../../assets/images/Avatars/user02.png";
import avatar3 from "../../../assets/images/Avatars/user03.png";
import avatar4 from "../../../assets/images/Avatars/user04.png";
import avatar5 from "../../../assets/images/Avatars/user05.png";
import avatar6 from "../../../assets/images/Avatars/user06.png";
import avatar7 from "../../../assets/images/Avatars/user07.png";	
import avatar8 from "../../../assets/images/Avatars/user08.png";


const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

const useAvatarStore = create((set, get) => ({
	avatars: avatars,
	avatarNumber: 1,
    setAvatarNumber: (avatarNumber) => set({ avatarNumber: avatarNumber }),
    getAvatarNumber: () => get().avatarNumber,
    getAvatarSrc: () => avatars[get().avatarNumber - 1],
    getAvatarByNumber: (avatarNumber) => avatars[avatarNumber - 1],
}));

export default useAvatarStore;
