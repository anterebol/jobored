import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { appDispatch, RootStore } from '@/store/configReducer';
export const useAppDispatch = () => useDispatch<appDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
