import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const VideoState = atom({
    key: "selectedVideoState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});


export const contentTypeAtom = atom({
    key: "contentTypeState",
    default: "",
    effects_UNSTABLE: [persistAtom],
})
